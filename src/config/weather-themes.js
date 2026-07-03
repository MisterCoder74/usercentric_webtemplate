/**
 * weather-themes.js — Phase 2: centralized weather → visual theme dataset.
 *
 * Keyed by the semantic `codeKey` produced by context-engine.js's WEATHER_CODES
 * map (not the raw WMO numeric code, and not hardcoded text) — this is what
 * keeps the mapping stable even if the WMO code table is extended later.
 *
 * `labelKey` is an i18n key, not display text — actual translated strings
 * live in each page's translation dictionary (Phase 3 integration), so the
 * same theme dataset works regardless of the visitor's language.
 *
 * `palette` values are meant to override the page's CSS custom properties
 * (e.g. `--bg`, `--primary`, `--surface` — see example-page.config.js
 * `themeVariables`). Keep palettes readable on top of existing text colors;
 * exact contrast/accessibility tuning happens when wired into a real page
 * in Phase 3.
 */

export const WEATHER_THEMES = {
  clear: {
    labelKey: 'weather_clear',
    icon: 'sun',
    palette: { '--bg': '#1e3a8a', '--primary': '#facc15', '--surface': '#1e40af' },
  },
  mostly_clear: {
    labelKey: 'weather_mostly_clear',
    icon: 'sun-cloud',
    palette: { '--bg': '#1e3a8a', '--primary': '#fbbf24', '--surface': '#1e40af' },
  },
  partly_cloudy: {
    labelKey: 'weather_partly_cloudy',
    icon: 'cloud-sun',
    palette: { '--bg': '#334155', '--primary': '#94a3b8', '--surface': '#1e293b' },
  },
  cloudy: {
    labelKey: 'weather_cloudy',
    icon: 'cloud',
    palette: { '--bg': '#374151', '--primary': '#9ca3af', '--surface': '#1f2937' },
  },
  fog: {
    labelKey: 'weather_fog',
    icon: 'fog',
    palette: { '--bg': '#4b5563', '--primary': '#d1d5db', '--surface': '#374151' },
  },
  fog_rime: {
    labelKey: 'weather_fog_rime',
    icon: 'fog',
    palette: { '--bg': '#4b5563', '--primary': '#e5e7eb', '--surface': '#374151' },
  },
  drizzle_light: {
    labelKey: 'weather_drizzle_light',
    icon: 'cloud-drizzle',
    palette: { '--bg': '#1e293b', '--primary': '#60a5fa', '--surface': '#0f172a' },
  },
  drizzle_moderate: {
    labelKey: 'weather_drizzle_moderate',
    icon: 'cloud-drizzle',
    palette: { '--bg': '#1e293b', '--primary': '#3b82f6', '--surface': '#0f172a' },
  },
  drizzle_dense: {
    labelKey: 'weather_drizzle_dense',
    icon: 'cloud-drizzle',
    palette: { '--bg': '#1e293b', '--primary': '#2563eb', '--surface': '#0f172a' },
  },
  freezing_drizzle_light: {
    labelKey: 'weather_freezing_drizzle_light',
    icon: 'cloud-sleet',
    palette: { '--bg': '#1e293b', '--primary': '#93c5fd', '--surface': '#0f172a' },
  },
  freezing_drizzle_dense: {
    labelKey: 'weather_freezing_drizzle_dense',
    icon: 'cloud-sleet',
    palette: { '--bg': '#1e293b', '--primary': '#60a5fa', '--surface': '#0f172a' },
  },
  rain_light: {
    labelKey: 'weather_rain_light',
    icon: 'cloud-rain',
    palette: { '--bg': '#0f172a', '--primary': '#38bdf8', '--surface': '#0b1120' },
  },
  rain_moderate: {
    labelKey: 'weather_rain_moderate',
    icon: 'cloud-rain',
    palette: { '--bg': '#0f172a', '--primary': '#0ea5e9', '--surface': '#0b1120' },
  },
  rain_heavy: {
    labelKey: 'weather_rain_heavy',
    icon: 'cloud-rain-heavy',
    palette: { '--bg': '#0b1120', '--primary': '#0284c7', '--surface': '#080d1a' },
  },
  freezing_rain_light: {
    labelKey: 'weather_freezing_rain_light',
    icon: 'cloud-sleet',
    palette: { '--bg': '#0f172a', '--primary': '#7dd3fc', '--surface': '#0b1120' },
  },
  freezing_rain_heavy: {
    labelKey: 'weather_freezing_rain_heavy',
    icon: 'cloud-sleet',
    palette: { '--bg': '#0b1120', '--primary': '#38bdf8', '--surface': '#080d1a' },
  },
  snow_light: {
    labelKey: 'weather_snow_light',
    icon: 'snowflake',
    palette: { '--bg': '#1e293b', '--primary': '#f1f5f9', '--surface': '#0f172a' },
  },
  snow_moderate: {
    labelKey: 'weather_snow_moderate',
    icon: 'snowflake',
    palette: { '--bg': '#1e293b', '--primary': '#e2e8f0', '--surface': '#0f172a' },
  },
  snow_heavy: {
    labelKey: 'weather_snow_heavy',
    icon: 'snowflake',
    palette: { '--bg': '#0f172a', '--primary': '#cbd5e1', '--surface': '#0b1120' },
  },
  snow_grains: {
    labelKey: 'weather_snow_grains',
    icon: 'snowflake',
    palette: { '--bg': '#1e293b', '--primary': '#e2e8f0', '--surface': '#0f172a' },
  },
  rain_showers_light: {
    labelKey: 'weather_rain_showers_light',
    icon: 'cloud-rain',
    palette: { '--bg': '#0f172a', '--primary': '#38bdf8', '--surface': '#0b1120' },
  },
  rain_showers_moderate: {
    labelKey: 'weather_rain_showers_moderate',
    icon: 'cloud-rain',
    palette: { '--bg': '#0f172a', '--primary': '#0ea5e9', '--surface': '#0b1120' },
  },
  rain_showers_violent: {
    labelKey: 'weather_rain_showers_violent',
    icon: 'cloud-rain-heavy',
    palette: { '--bg': '#0b1120', '--primary': '#0369a1', '--surface': '#080d1a' },
  },
  snow_showers_light: {
    labelKey: 'weather_snow_showers_light',
    icon: 'snowflake',
    palette: { '--bg': '#1e293b', '--primary': '#f1f5f9', '--surface': '#0f172a' },
  },
  snow_showers_heavy: {
    labelKey: 'weather_snow_showers_heavy',
    icon: 'snowflake',
    palette: { '--bg': '#0f172a', '--primary': '#e2e8f0', '--surface': '#0b1120' },
  },
  thunderstorm: {
    labelKey: 'weather_thunderstorm',
    icon: 'cloud-lightning',
    palette: { '--bg': '#111827', '--primary': '#a78bfa', '--surface': '#030712' },
  },
  thunderstorm_hail_light: {
    labelKey: 'weather_thunderstorm_hail_light',
    icon: 'cloud-lightning',
    palette: { '--bg': '#111827', '--primary': '#8b5cf6', '--surface': '#030712' },
  },
  thunderstorm_hail_heavy: {
    labelKey: 'weather_thunderstorm_hail_heavy',
    icon: 'cloud-lightning',
    palette: { '--bg': '#030712', '--primary': '#7c3aed', '--surface': '#000000' },
  },
  // Fallback used when codeKey is 'unknown' or weather detection failed.
  unknown: {
    labelKey: 'weather_unknown',
    icon: 'question',
    palette: { '--bg': '#0b1020', '--primary': '#7c3aed', '--surface': '#111428' },
  },
};

/** Looks up a theme by codeKey, always returning a usable theme (never undefined). */
export function getWeatherTheme(codeKey) {
  return WEATHER_THEMES[codeKey] ?? WEATHER_THEMES.unknown;
}
