# usercentric_webtemplate

Reusable **context-aware adaptive layer** for landing pages and websites. Instead of
building "one custom personalized site", this repo provides a **core engine** that
any landing page / website can plug into, plus a thin **per-page config** so a new
site adapts without rewriting the personalization logic.

## Context

Original idea: a website that, on each visit, detects the visitor's IP/location,
current date/time and local weather (with consent), then adapts:
- displayed date, time, location and weather
- page color theme / palette based on weather conditions and/or country
- language (i18n) based on detected location
- national holidays / observances (e.g. a greeting banner on a country's national day)

All without login or sensitive personal data collection, respecting privacy/consent.

Two working prototypes were validated as feasibility tests before this repo existed:
- A SaaS landing page (`index.html` / `styles.css` / `app.js`) with an i18n scaffold:
  `data-i18n` attributes, a language `<select>` switcher, and a `translations` object
  (EN/ES) applied via `localize(lang)`.
- A "visitor mini-profile" prototype that: detects IP via `ipapi.co` (free, no key),
  requests browser geolocation (`navigator.geolocation`) with IP-based fallback,
  fetches current weather via `Open-Meteo` (free, no key: `current_weather=true`),
  maps the WMO `weathercode` to a description, and appends a normalized profile
  object into a `localStorage` array (`miniProfiliVisitatore`) on every page load.

Both prototypes work standalone but were **not connected to each other** and were
tied to one specific demo page — not reusable as-is across different sites.

## Design principle: reusable core, per-page config

To answer "do I need to redo everything for every new site?" — no. The system is
split in two layers:

1. **Core engine** (this repo, site-agnostic): visitor context collection (IP,
   geolocation, weather), consent handling, normalized profile storage, weather/
   country theme datasets, holiday calendar datasets, i18n engine driven by keys.
   Written once, reused everywhere.
2. **Per-page adaptation layer** (lives in each site that uses this engine): only
   markup (`data-i18n` keys, theme CSS variables) plus a small page-specific config
   file (which translations it needs, which theme variables it exposes, which
   holiday messages to show). The core engine reads that config and applies it.

A new landing page/site only needs its own config + markup conventions — not a
rewrite of the detection/geolocation/weather/holiday logic.

## Roadmap

- **Phase 1 — Context engine** (done): isolate IP/geolocation/weather
  detection into a standalone, reusable module with explicit consent handling,
  a normalized "visitor profile" object, and bounded `localStorage` persistence
  (no unbounded growth).
- **Phase 2 — Data layer** (done): centralized config datasets —
  `codeKey → {labelKey, icon, palette}` (weather themes), `countryCode →
  {languageCode, nationalPalette}` (country themes), `countryCode →
  [{month, day, i18nKey}]` (recurring holidays). All keyed by stable ids
  (`codeKey`, ISO country code) rather than hardcoded display text, so
  translated strings stay centralized in the per-page i18n dictionary
  (Phase 3), not duplicated across datasets.
- **Phase 3 — Template integration** (next): extend the i18n-scaffolded landing
  page so the language switcher auto-selects from detected country (still
  user-overridable), CSS theme variables are overridden dynamically from
  weather/country, a widget shows location/date/time/weather, and a
  toast/banner shows holiday messages when the date matches. This is where
  the "NovaSphere" demo landing page becomes the real integration target.
- **Phase 4 — Privacy & QA**: explicit consent banner before requesting geolocation,
  multi-country/multi-weather testing, API call performance (lazy/non-blocking).

## External services used (both free, no API key)

| Service | Purpose | Endpoint |
|---|---|---|
| ipapi.co | IP-based geolocation (fallback) | `https://ipapi.co/json/` |
| Open-Meteo | Current weather from coordinates | `https://api.open-meteo.com/v1/forecast` |

## Repository structure

```
src/
  core/
    context-engine.js       # visitor context collection + consent + storage (Phase 1)
  config/
    weather-themes.js       # codeKey -> {labelKey, icon, palette} (Phase 2)
    country-themes.js       # countryCode -> {languageCode, nationalPalette} (Phase 2)
    holidays.js              # countryCode -> [{month, day, i18nKey}] (Phase 2)
    example-page.config.js  # example of a per-page adaptation config (Phase 1)
docs/
  ARCHITECTURE.md            # design notes for the core/per-page split
```
