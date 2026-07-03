# Architecture notes

## Core engine vs. per-page layer

The repo is split so that adding a new landing page never requires touching
detection logic:

- `src/core/` — reusable, site-agnostic. Owns: IP/geolocation/weather
  detection, consent state, normalized profile shape, bounded persistence.
  A page never talks to `ipapi.co` / Open-Meteo directly — it goes through
  `ContextEngine`.
- `src/config/` — one small config file per page/site, describing which
  i18n keys, theme variables, and widget mount point that page uses. The
  loader (Phase 2/3) reads this config + the profile from `ContextEngine`
  and applies both i18n text and CSS variable overrides.

## Visitor profile shape (Phase 1 output)

```js
{
  timestamp: "2026-07-03T08:12:00.000Z",
  ip: "203.0.113.10" | null,
  city: "Warsaw" | null,
  region: "Mazovia" | null,
  country: "Poland" | null,
  countryCode: "PL" | null,
  coordinates: { lat: 52.23, lon: 21.01, source: "geolocation" | "ip" | "unavailable" },
  timezone: "Europe/Warsaw" | null,
  weather: {
    temperature: 24.3,
    windSpeedKmh: 8.1,
    code: 2,
    codeKey: "partly_cloudy",
    observedAt: "2026-07-03T14:00",
    timezone: "Europe/Warsaw"
  } | null
}
```

`codeKey` (not a hardcoded Italian/English string) is what Phase 2's
weather→theme/description dataset will key off, so translations and theme
mappings live in one place instead of being duplicated per language.

## Consent flow (Phase 1 contract)

`ContextEngine` never calls `navigator.geolocation` on its own. The page is
responsible for showing a consent prompt (Phase 4 will standardize this UI)
and calling `engine.grantGeoConsent()` / `engine.denyGeoConsent()` based on
the user's choice. If consent was never granted, `detectGeolocation()`
resolves `null` and the engine falls back to IP-based coordinates.

## Full WMO weather code reference

The reduced table used by `WEATHER_CODES` in `context-engine.js` covers the
common cases from the original feasibility test. The official WMO code table
has more granularity; extend the map in `context-engine.js` if a given
weather condition needs to be distinguished further.

## Open questions carried into later phases

- Widget presentation (Phase 3): fixed badge vs. toast vs. dedicated section —
  not decided yet.
- Holiday notification presentation (Phase 3): toast vs. banner vs. marquee —
  not decided yet.
- Day/night theme (mentioned as a future extension, not yet scheduled into a
  phase).
