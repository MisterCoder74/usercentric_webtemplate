/**
 * country-themes.js — Phase 2: centralized country → language/palette dataset.
 *
 * Keyed by ISO 3166-1 alpha-2 country code (matches `countryCode` from
 * context-engine.js's IP detection). Used to:
 *  - pre-select the page's i18n language (still user-overridable — see the
 *    `<select id="langSelect">` in the existing landing page prototype)
 *  - optionally accent the page with a national color note (a banner/accent,
 *    NOT a full theme replacement — the weather theme in weather-themes.js
 *    remains the primary visual driver)
 *
 * This is a starter set covering the countries mentioned in the original
 * brief plus a few common ones. Extend as needed — no code changes required
 * elsewhere, everything reads from this table.
 */

export const COUNTRY_THEMES = {
  RO: {
    languageCode: 'ro',
    nationalPalette: { primary: '#002B7F', accent: '#FCD116', accent2: '#CE1126' }, // Romania flag colors
  },
  IT: {
    languageCode: 'it',
    nationalPalette: { primary: '#009246', accent: '#F1F2F1', accent2: '#CE2B37' }, // Italy flag colors
  },
  PL: {
    languageCode: 'pl',
    nationalPalette: { primary: '#DC143C', accent: '#FFFFFF' }, // Poland flag colors
  },
  ES: {
    languageCode: 'es',
    nationalPalette: { primary: '#AA151B', accent: '#F1BF00' }, // Spain flag colors
  },
  FR: {
    languageCode: 'fr',
    nationalPalette: { primary: '#0055A4', accent: '#FFFFFF', accent2: '#EF4135' }, // France flag colors
  },
  US: {
    languageCode: 'en',
    nationalPalette: { primary: '#3C3B6E', accent: '#B22234', accent2: '#FFFFFF' }, // USA flag colors
  },
  GB: {
    languageCode: 'en',
    nationalPalette: { primary: '#012169', accent: '#C8102E', accent2: '#FFFFFF' }, // UK flag colors
  },
  DE: {
    languageCode: 'de',
    nationalPalette: { primary: '#000000', accent: '#DD0000', accent2: '#FFCE00' }, // Germany flag colors
  },
};

// Language/palette used when the detected country isn't in COUNTRY_THEMES.
export const DEFAULT_COUNTRY_THEME = {
  languageCode: 'en',
  nationalPalette: null,
};

/** Looks up a country theme by ISO alpha-2 code, always returning a usable entry. */
export function getCountryTheme(countryCode) {
  if (!countryCode) return DEFAULT_COUNTRY_THEME;
  return COUNTRY_THEMES[countryCode.toUpperCase()] ?? DEFAULT_COUNTRY_THEME;
}
