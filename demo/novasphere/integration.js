// integration.js — Phase 3: wires the reusable context engine + config
// datasets into the NovaSphere demo page.
//
// This is deliberately thin: all detection logic lives in
// src/core/context-engine.js, all lookup tables live in src/config/*.js.
// This file only (a) asks for consent, (b) builds the profile, and
// (c) applies the result to THIS page's DOM/CSS/i18n — the part every new
// page using the engine would write for itself.
import { ContextEngine } from '../../src/core/context-engine.js';
import { getWeatherTheme } from '../../src/config/weather-themes.js';
import { getCountryTheme } from '../../src/config/country-themes.js';
import { getTodaysHoliday } from '../../src/config/holidays.js';

const engine = new ContextEngine();

function t(key, lang) {
  const dict = window.NovaSphereI18n?.getDict?.(lang) ?? {};
  return dict[key] ?? key;
}

function applyWeatherTheme(codeKey) {
  const theme = getWeatherTheme(codeKey);
  const root = document.documentElement.style;
  Object.entries(theme.palette).forEach(([cssVar, value]) => root.setProperty(cssVar, value));
  return theme;
}

function applyNationalAccent(countryCode) {
  const country = getCountryTheme(countryCode);
  const bar = document.getElementById('nationalAccentBar');
  if (bar && country.nationalPalette?.primary) {
    bar.style.background = country.nationalPalette.accent2
      ? `linear-gradient(90deg, ${country.nationalPalette.primary}, ${country.nationalPalette.accent}, ${country.nationalPalette.accent2})`
      : `linear-gradient(90deg, ${country.nationalPalette.primary}, ${country.nationalPalette.accent})`;
    bar.hidden = false;
  }
  return country;
}

function ensureWidget() {
  let widget = document.getElementById('contextWidget');
  if (widget) return widget;
  widget = document.createElement('div');
  widget.id = 'contextWidget';
  widget.className = 'context-widget';
  widget.setAttribute('aria-label', 'Local context');
  document.body.appendChild(widget);
  return widget;
}

function renderWidget(profile, weatherTheme, lang) {
  const widget = ensureWidget();
  const city = profile.city || profile.region || profile.country || '—';
  const label = t('widget_weather_label', lang).replace('{city}', city);
  const tempText = profile.weather?.temperature != null ? `${Math.round(profile.weather.temperature)}\u00B0C` : '';
  const desc = profile.weather ? t(weatherTheme.labelKey, lang) : t('weather_unknown', lang);
  const timeText = formatLocalTime(profile);
  widget.innerHTML = `
    <div class="context-widget-row context-widget-title">${label}</div>
    <div class="context-widget-row context-widget-main">
      <span class="context-widget-temp">${tempText}</span>
      <span class="context-widget-desc">${desc}</span>
    </div>
    <div class="context-widget-row context-widget-time">${timeText}</div>
  `;
}

function formatLocalTime(profile) {
  try {
    const tz = profile.weather?.timezone || profile.timezone;
    const opts = { hour: '2-digit', minute: '2-digit', weekday: 'short', day: '2-digit', month: 'short' };
    if (tz) opts.timeZone = tz;
    return new Intl.DateTimeFormat(undefined, opts).format(new Date());
  } catch {
    return new Date().toLocaleString();
  }
}

function maybeShowHolidayBanner(profile, lang) {
  const localDate = (() => {
    try {
      const tz = profile.weather?.timezone || profile.timezone;
      if (!tz) return new Date();
      const parts = new Intl.DateTimeFormat('en-US', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' })
        .formatToParts(new Date());
      const map = Object.fromEntries(parts.map((p) => [p.type, p.value]));
      return new Date(`${map.year}-${map.month}-${map.day}T00:00:00`);
    } catch {
      return new Date();
    }
  })();

  const holiday = getTodaysHoliday(profile.countryCode, localDate);
  if (!holiday) return;

  let banner = document.getElementById('holidayBanner');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'holidayBanner';
    banner.className = 'holiday-banner';
    banner.setAttribute('role', 'status');
    document.body.prepend(banner);
  }
  // Prefer a holiday-specific message (holiday.i18nKey) if the page dictionary
  // defines one; otherwise fall back to the generic template. Today no page
  // dictionary defines per-holiday keys, so this always falls back — but it's
  // wired correctly for any page that adds them later (t() returns the key
  // itself, unchanged, when a translation is missing).
  const specific = t(holiday.i18nKey, lang);
  const message = specific !== holiday.i18nKey
    ? specific
    : t('holiday_banner_template', lang).replace('{country}', profile.country || '');
  banner.innerHTML = `<span>${message}</span><button aria-label="Dismiss" class="holiday-banner-close">&times;</button>`;
  banner.hidden = false;
  const dismiss = () => { banner.hidden = true; };
  banner.querySelector('.holiday-banner-close')?.addEventListener('click', dismiss);
  document.addEventListener('keydown', function onKeydown(e) {
    if (e.key !== 'Escape' || banner.hidden) return;
    dismiss();
    document.removeEventListener('keydown', onKeydown);
  });
}

function showGeoConsentPrompt(lang, onDone) {
  if (engine.getGeoConsentState()) { onDone(); return; } // already asked
  if (typeof navigator === 'undefined' || !navigator.geolocation) { onDone(); return; }

  const previouslyFocused = document.activeElement;
  const prompt = document.createElement('div');
  prompt.id = 'geoConsentPrompt';
  prompt.className = 'geo-consent-prompt';
  prompt.setAttribute('role', 'dialog');
  prompt.setAttribute('aria-labelledby', 'geoConsentPromptText');
  prompt.setAttribute('aria-describedby', 'geoConsentPromptNote');
  prompt.innerHTML = `
    <p id="geoConsentPromptText">${t('geo_consent_prompt', lang)}</p>
    <p id="geoConsentPromptNote" class="geo-consent-note">${t('geo_consent_note', lang)}</p>
    <div class="geo-consent-actions">
      <button class="btn btn-primary" data-action="allow">${t('geo_consent_allow', lang)}</button>
      <button class="btn btn-ghost" data-action="deny">${t('geo_consent_deny', lang)}</button>
    </div>
  `;
  document.body.appendChild(prompt);

  const close = () => {
    prompt.remove();
    document.removeEventListener('keydown', onKeydown);
    if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
  };
  const onKeydown = (e) => {
    if (e.key !== 'Escape') return;
    close();
    onDone(); // dismissed without an answer — re-asked next visit, same as ignoring it
  };
  document.addEventListener('keydown', onKeydown);

  prompt.addEventListener('click', (e) => {
    const action = e.target?.dataset?.action;
    if (!action) return;
    if (action === 'allow') engine.grantGeoConsent();
    if (action === 'deny') engine.denyGeoConsent();
    close();
    onDone();
  });

  prompt.querySelector('[data-action="allow"]')?.focus();
}

async function run() {
  const startLang = window.NovaSphereI18n?.getCurrentLang?.() ?? 'en';

  showGeoConsentPrompt(startLang, async () => {
    const profile = await engine.buildProfile();
    const codeKey = profile.weather?.codeKey ?? 'unknown';
    const weatherTheme = applyWeatherTheme(codeKey);
    const country = applyNationalAccent(profile.countryCode);

    // Auto-select language from country, unless the visitor already picked one manually.
    window.NovaSphereI18n?.setLanguageFromContext?.(country.languageCode);
    const activeLang = window.NovaSphereI18n?.getCurrentLang?.() ?? startLang;

    renderWidget(profile, weatherTheme, activeLang);
    maybeShowHolidayBanner(profile, activeLang);

    // Keep the widget's local time fresh without re-fetching weather/IP.
    setInterval(() => renderWidget(profile, weatherTheme, window.NovaSphereI18n?.getCurrentLang?.() ?? activeLang), 60000);
  });
}

document.addEventListener('DOMContentLoaded', run);
