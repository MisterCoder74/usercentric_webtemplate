// integration.js — wires the shared context engine + config datasets into
// the Nayla Nails demo page. Same pattern as demo/novasphere/integration.js
// (see docs/DEVELOPER_GUIDE.md, section 3): all detection logic lives in
// src/core/context-engine.js, all lookup tables live in src/config/*.js —
// this file only asks for consent, builds the profile, and applies it to
// THIS page's DOM/CSS/i18n, plus the one thing unique to this page: a
// client-side-only contact form (no backend — see handleContactForm below).
import { ContextEngine } from '../../src/core/context-engine.js';
import { getWeatherTheme } from '../../src/config/weather-themes.js';
import { getWeatherIconSvg } from '../../src/config/weather-icons.js';
import { getCountryTheme } from '../../src/config/country-themes.js';
import { getTodaysHoliday } from '../../src/config/holidays.js';
import { getHolidayTranslation } from '../../src/config/holiday-i18n.js';

const engine = new ContextEngine();
const CONTACT_EMAIL = 'ciao@naylanails.it'; // placeholder studio inbox

function t(key, lang) {
  const dict = window.NaylaI18n?.getDict?.(lang) ?? {};
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
  const iconSvg = profile.weather ? getWeatherIconSvg(weatherTheme.icon) : '';
  widget.innerHTML = `
    <div class="context-widget-row context-widget-title">${label}</div>
    <div class="context-widget-row context-widget-main">
      ${iconSvg ? `<span class="context-widget-icon" aria-hidden="true">${iconSvg}</span>` : ''}
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
  // Resolution order: (1) this page's own dictionary, in case it ever wants
  // a custom holiday message; (2) the shared project-wide holiday-i18n.js
  // dictionary, which covers every key declared in holidays.js across all
  // 7 languages; (3) the generic template as a last-resort safety net.
  const pageSpecific = t(holiday.i18nKey, lang);
  const shared = getHolidayTranslation(holiday.i18nKey, lang);
  const message = pageSpecific !== holiday.i18nKey
    ? pageSpecific
    : shared ?? t('holiday_banner_template', lang).replace('{country}', profile.country || '');
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
    onDone();
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

// No backend for this demo (explicit requirement): the contact form builds a
// `mailto:` link from the fields and lets the visitor's own email client send
// it. Nothing is transmitted or stored by this page itself.
function wireContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const lang = window.NaylaI18n?.getCurrentLang?.() ?? 'it';
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();
    if (!name || !email || !message) return; // native `required` already blocks this in supporting browsers

    const subjectByLang = {
      it: `Richiesta appuntamento da ${name}`,
      en: `Booking request from ${name}`,
      es: `Solicitud de cita de ${name}`,
      fr: `Demande de rendez-vous de ${name}`,
      ro: `Cerere de programare de la ${name}`,
      pl: `Prośba o wizytę od ${name}`,
      de: `Terminanfrage von ${name}`,
    };
    const subject = subjectByLang[lang] ?? subjectByLang.it;
    const body = `${message}\n\n— ${name} (${email})`;
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  });
}

async function run() {
  const startLang = window.NaylaI18n?.getCurrentLang?.() ?? 'it';
  wireContactForm();

  showGeoConsentPrompt(startLang, async () => {
    const profile = await engine.buildProfile();
    const codeKey = profile.weather?.codeKey ?? 'unknown';
    const weatherTheme = applyWeatherTheme(codeKey);
    const country = applyNationalAccent(profile.countryCode);

    // Auto-select language from country, unless the visitor already picked one manually.
    window.NaylaI18n?.setLanguageFromContext?.(country.languageCode);
    const activeLang = window.NaylaI18n?.getCurrentLang?.() ?? startLang;

    renderWidget(profile, weatherTheme, activeLang);
    maybeShowHolidayBanner(profile, activeLang);

    setInterval(() => renderWidget(profile, weatherTheme, window.NaylaI18n?.getCurrentLang?.() ?? activeLang), 60000);
  });
}

document.addEventListener('DOMContentLoaded', run);
