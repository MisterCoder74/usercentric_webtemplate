/**
 * weather-icons.js — inline SVG glyphs for each weather-themes.js `icon` key.
 *
 * Why this exists: weather-themes.js has carried an `icon` field since Phase 2,
 * but no page's integration.js ever rendered it — the widget only ever showed
 * temperature + text description. This closes that gap for every page at once
 * (core/config layer, same reuse pattern as everything else here), instead of
 * each site inventing its own icon set.
 *
 * Inline SVG, not an icon font or CDN glyph set: no extra network request,
 * consistent with the project's "no backend, no third-party services beyond
 * ipapi.co/Open-Meteo" design decision. Each icon uses `currentColor` so it
 * inherits whatever text/accent color the page applies via CSS — no palette
 * coupling here.
 *
 * Keys must match every `icon` value used in weather-themes.js. `question`
 * is the default/fallback glyph for an unrecognized or missing key.
 */

export const WEATHER_ICONS = {
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.4M12 19.1v2.4M4.6 4.6l1.7 1.7M17.7 17.7l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.6 19.4l1.7-1.7M17.7 6.3l1.7-1.7"/></svg>',

  'sun-cloud': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="8.2" cy="8.2" r="3.2"/><path d="M8.2 2.8v1.6M3.2 8.2h1.6M13.2 8.2h-1.4"/><path d="M8.5 15.5a3.6 3.6 0 0 1 3.4-4.9 4.6 4.6 0 0 1 8.7 1.9 3.2 3.2 0 0 1-.6 6.3H8.9a3.1 3.1 0 0 1-.4-6.2"/></svg>',

  'cloud-sun': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="16.5" cy="7.5" r="2.6"/><path d="M16.5 3.4v1.4M20.6 7.5h-1.4M13.4 10l1-1"/><path d="M7.5 17.5a3.6 3.6 0 0 1 3.2-5 4.6 4.6 0 0 1 8.6 2 3.2 3.2 0 0 1-.6 6.2H8a3.1 3.1 0 0 1-.5-6.1"/></svg>',

  cloud: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 18.5a4 4 0 0 1 .4-8 5.2 5.2 0 0 1 10-1.6 3.6 3.6 0 0 1-.7 9.6z"/></svg>',

  fog: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5.5 9.5a4 4 0 0 1 3.9-3.2 5.2 5.2 0 0 1 9.9 1.9M4 13.5h16M3 17h18M6 20.5h12"/></svg>',

  'cloud-drizzle': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 14.5a4 4 0 0 1 .4-8 5.2 5.2 0 0 1 10-1.6 3.6 3.6 0 0 1-.7 9.6z"/><path d="M8.5 19.5l-.8 1.6M12 19.5l-.8 1.6M15.5 19.5l-.8 1.6"/></svg>',

  'cloud-sleet': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 13.5a4 4 0 0 1 .4-8 5.2 5.2 0 0 1 10-1.6 3.6 3.6 0 0 1-.7 9.6z"/><path d="M8.3 18.3l-.9 1.8M12 18l-.9 1.8M15.7 18.3l1 2M9 21.3h.01M13 21.3h.01"/></svg>',

  'cloud-rain': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 13.5a4 4 0 0 1 .4-8 5.2 5.2 0 0 1 10-1.6 3.6 3.6 0 0 1-.7 9.6z"/><path d="M8.5 18.5v2.2M12 18.5v2.2M15.5 18.5v2.2"/></svg>',

  'cloud-rain-heavy': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 12.5a4 4 0 0 1 .4-8 5.2 5.2 0 0 1 10-1.6 3.6 3.6 0 0 1-.7 9.6z"/><path d="M7.5 17l-1 2.4M11 17l-1 2.4M14.5 17l-1 2.4M18 17l-1 2.4"/></svg>',

  snowflake: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 2.5v19M4 7l16 10M20 7L4 17"/><path d="M9 4.5l3 2 3-2M9 19.5l3-2 3 2M6.5 9l.5 3.5-3 1.5M6.5 15l.5-3.5-3-1.5M17.5 9l-.5 3.5 3 1.5M17.5 15l-.5-3.5 3-1.5"/></svg>',

  'cloud-lightning': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 13.5a4 4 0 0 1 .4-8 5.2 5.2 0 0 1 10-1.6 3.6 3.6 0 0 1-.7 9.6z"/><path d="M12.5 16l-2.5 4h2.5l-1.5 3.2 4-4.7h-2.3l1.3-2.5z" fill="currentColor" stroke="none"/></svg>',

  question: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9.2"/><path d="M9.3 9.3a2.7 2.7 0 1 1 3.8 2.5c-.9.4-1.4 1-1.4 2v.4"/><path d="M12 17.2h.01"/></svg>',
};

/**
 * Returns the SVG markup for a weather-themes.js `icon` key.
 * Always returns a usable glyph — falls back to `question` for an unknown key.
 * @param {string|undefined} iconKey
 * @returns {string} raw inline SVG markup
 */
export function getWeatherIconSvg(iconKey) {
  return WEATHER_ICONS[iconKey] || WEATHER_ICONS.question;
}
