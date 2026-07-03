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
- **Phase 3 — Template integration** (done): `demo/novasphere/integration.js`
  wires the Phase 1 engine + Phase 2 datasets into the demo page — language
  auto-selects from the detected country (a manual pick in the switcher
  always wins), CSS theme variables update from the weather theme, a
  non-blocking consent prompt gates precise geolocation (IP-based context
  works either way), a floating widget shows city/local time/weather, a
  dismissible banner shows a holiday message when the visitor's local date
  matches their country's calendar, and a thin national-color accent bar
  reflects the detected country.
- **Phase 3.5 — Full localization** (done): `demo/novasphere/app.js` dictionary
  extended from EN/ES/FR to all 8 countries `country-themes.js` detects — added
  IT, RO, PL, DE (also added as manual options in the language switcher). Closes
  a real gap: before this, RO/IT/PL/DE visitors were detected correctly but
  silently fell back to English because no dictionary entry existed for their
  language.
- **Phase 4 — Privacy & QA** (done): consent prompt now shows a short
  reassurance note ("the site works fine without this — only used for local
  weather") next to the ask, in all 7 languages; focus moves to the prompt
  when it appears and returns to the page on close; Escape dismisses the
  consent prompt and the holiday banner without recording a decision (same
  as ignoring it — re-asked next visit); the widget temperature color was
  darkened from `--primary` to a lighter shade for AA contrast on the dark
  card background; visible-focus outlines added to prompt/banner buttons.
  Ran a mocked profile matrix (9 countries × 5 weather codes × 8 real
  holiday dates) through the config datasets to confirm mappings resolve
  correctly with no network calls — all passed. Confirmed API calls
  (IP/geolocation/weather) only fire after `DOMContentLoaded` and only once
  consent is resolved, so they never block first paint. Also fixed a real
  bug this QA pass surfaced: `holidays.js` defines a per-holiday `i18nKey`
  (e.g. `holiday_us_independence_day`) that `integration.js` was silently
  ignoring — every holiday showed the same generic banner text regardless of
  which holiday it was. The banner now uses the specific key when a page
  dictionary defines it, falling back to the generic template otherwise (no
  page defines specific holiday text yet, so behavior is unchanged today —
  it's just wired correctly for the next page that adds them).

## External services used (both free, no API key)

| Service | Purpose | Endpoint |
|---|---|---|
| ipapi.co | IP-based geolocation (fallback) | `https://ipapi.co/json/` |
| Open-Meteo | Current weather from coordinates | `https://api.open-meteo.com/v1/forecast` |

## Repository structure

```
demo/
  novasphere/
    index.html              # NovaSphere demo landing page — engine wired in (Phase 3)
    styles.css               # polished layout + widget/banner/consent-prompt styles
    app.js                   # i18n dictionary (en/es/fr/it/ro/pl/de) + bridge consumed by integration.js
    integration.js           # Phase 3: wires context-engine.js + config datasets into the page
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

### NovaSphere demo — draft polish pass

`demo/novasphere/` refines the original feasibility-test draft ahead of Phase 3
wiring: sharper hero/feature copy, a fleshed-out Enterprise pricing tier
(unlimited users, SSO, dedicated success manager — matching the other cards'
style, and fixing a bug where the draft's `data-i18n` attribute sat on the
whole card instead of its title), a "Most popular" badge on Pro, a credible
minimal footer (tagline + Pricing/Privacy/Terms/Contact links + copyright),
and a completed French dictionary (the draft's language switcher offered
French but had no translations for it). Structure and visual identity are
unchanged from the draft — this is a copy/layout pass, not a rebuild.
