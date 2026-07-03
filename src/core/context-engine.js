/**
 * context-engine.js — Phase 1: reusable visitor context engine.
 *
 * Site-agnostic module: detects visitor IP/location, browser geolocation
 * (with explicit consent), and current weather, then produces a normalized
 * "visitor profile" object. Persists a bounded history in localStorage.
 *
 * This module does NOT touch the DOM and does NOT decide page theme/i18n/
 * holidays — those are Phase 2/3 concerns that read the profile this engine
 * produces. Keeping this engine side-effect-free w.r.t. rendering is what
 * makes it reusable across different landing pages/sites.
 *
 * Usage (per page):
 *   import { ContextEngine } from './core/context-engine.js';
 *   const engine = new ContextEngine();
 *   // Show your own consent UI, then:
 *   engine.grantGeoConsent();   // or engine.denyGeoConsent();
 *   const profile = await engine.buildProfile();
 */

const STORAGE_KEY = 'visitorProfiles';
const CONSENT_KEY = 'visitorGeoConsent'; // 'granted' | 'denied' | undefined
const MAX_STORED_PROFILES = 20; // bounded history — avoid unbounded localStorage growth

const IP_ENDPOINT = 'https://ipapi.co/json/';
const WEATHER_ENDPOINT = 'https://api.open-meteo.com/v1/forecast';

// Reduced WMO weather code table (see docs/ARCHITECTURE.md for the full official table).
export const WEATHER_CODES = {
  0: 'clear',
  1: 'mostly_clear',
  2: 'partly_cloudy',
  3: 'cloudy',
  45: 'fog',
  48: 'fog_rime',
  51: 'drizzle_light',
  53: 'drizzle_moderate',
  55: 'drizzle_dense',
  56: 'freezing_drizzle_light',
  57: 'freezing_drizzle_dense',
  61: 'rain_light',
  63: 'rain_moderate',
  65: 'rain_heavy',
  66: 'freezing_rain_light',
  67: 'freezing_rain_heavy',
  71: 'snow_light',
  73: 'snow_moderate',
  75: 'snow_heavy',
  77: 'snow_grains',
  80: 'rain_showers_light',
  81: 'rain_showers_moderate',
  82: 'rain_showers_violent',
  85: 'snow_showers_light',
  86: 'snow_showers_heavy',
  95: 'thunderstorm',
  96: 'thunderstorm_hail_light',
  99: 'thunderstorm_hail_heavy',
};

export class ContextEngine {
  /**
   * @param {object} [options]
   * @param {number} [options.geoTimeoutMs] - timeout for navigator.geolocation
   * @param {number} [options.maxStoredProfiles] - bound on stored profile history
   */
  constructor(options = {}) {
    this.geoTimeoutMs = options.geoTimeoutMs ?? 8000;
    this.maxStoredProfiles = options.maxStoredProfiles ?? MAX_STORED_PROFILES;
  }

  // ---- Consent -----------------------------------------------------------

  /** Current stored consent state: 'granted' | 'denied' | null (not yet asked). */
  getGeoConsentState() {
    try {
      return localStorage.getItem(CONSENT_KEY);
    } catch {
      return null;
    }
  }

  /** Call after the page's own consent UI confirms the user opted in. */
  grantGeoConsent() {
    this._setConsent('granted');
  }

  /** Call after the page's own consent UI records a decline. */
  denyGeoConsent() {
    this._setConsent('denied');
  }

  _setConsent(value) {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      /* localStorage unavailable (private mode, quota) — degrade silently */
    }
  }

  // ---- Detection -----------------------------------------------------------

  /** IP-based approximate location. Used as fallback and for extra fields (ip, city). */
  async detectIP() {
    try {
      const res = await fetch(IP_ENDPOINT);
      if (!res.ok) return null;
      const data = await res.json();
      return {
        ip: data.ip ?? null,
        city: data.city ?? null,
        region: data.region ?? null,
        country: data.country_name ?? null,
        countryCode: data.country_code ?? null,
        lat: data.latitude ?? null,
        lon: data.longitude ?? null,
        timezone: data.timezone ?? null,
      };
    } catch {
      return null;
    }
  }

  /**
   * Browser geolocation — ONLY called if consent was granted via grantGeoConsent().
   * Resolves null if consent missing, denied by user, unavailable, or timed out.
   */
  async detectGeolocation() {
    if (this.getGeoConsentState() !== 'granted') return null;
    if (typeof navigator === 'undefined' || !navigator.geolocation) return null;

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          resolve({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
            source: 'geolocation',
          }),
        () => resolve(null),
        { timeout: this.geoTimeoutMs }
      );
    });
  }

  /** Current weather for given coordinates via Open-Meteo (no API key). */
  async detectWeather(lat, lon) {
    if (lat == null || lon == null) return null;
    const url = `${WEATHER_ENDPOINT}?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`;
    try {
      const res = await fetch(url);
      if (!res.ok) return null;
      const data = await res.json();
      const cw = data.current_weather;
      if (!cw) return null;
      return {
        temperature: cw.temperature ?? null,
        windSpeedKmh: cw.windspeed ?? null,
        code: cw.weathercode ?? null,
        codeKey: WEATHER_CODES[cw.weathercode] ?? 'unknown',
        observedAt: cw.time ?? null,
        timezone: data.timezone ?? null,
      };
    } catch {
      return null;
    }
  }

  // ---- Profile assembly -----------------------------------------------------

  /**
   * Builds and persists a normalized visitor profile. Does not throw — any
   * failed sub-detection degrades to null fields rather than blocking the page.
   */
  async buildProfile() {
    const infoIP = await this.detectIP();
    const geo = await this.detectGeolocation();

    const lat = geo?.lat ?? infoIP?.lat ?? null;
    const lon = geo?.lon ?? infoIP?.lon ?? null;
    const coordSource = geo ? 'geolocation' : infoIP ? 'ip' : 'unavailable';

    const weather = lat != null && lon != null ? await this.detectWeather(lat, lon) : null;

    const now = new Date();
    const profile = {
      timestamp: now.toISOString(),
      ip: infoIP?.ip ?? null,
      city: infoIP?.city ?? null,
      region: infoIP?.region ?? null,
      country: infoIP?.country ?? null,
      countryCode: infoIP?.countryCode ?? null,
      coordinates: { lat, lon, source: coordSource },
      timezone: geo ? null : infoIP?.timezone ?? null,
      weather,
    };

    this._persist(profile);
    return profile;
  }

  // ---- Storage (bounded history) --------------------------------------------

  _persist(profile) {
    try {
      const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      list.push(profile);
      // Keep only the most recent N profiles — avoid unbounded growth.
      const bounded = list.slice(-this.maxStoredProfiles);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bounded));
    } catch {
      /* localStorage unavailable — profile is still returned to caller, just not persisted */
    }
  }

  /** Full stored profile history (most recent last), or []. */
  getStoredProfiles() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  }

  /** Clears stored profile history (not the consent flag). */
  clearStoredProfiles() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* no-op */
    }
  }
}
