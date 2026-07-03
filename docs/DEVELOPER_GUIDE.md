# Developer Guide — Reusing the Adaptive Visitor Engine

This guide is for a developer who wants to bring the adaptive-visitor system
(IP/geo detection, weather, national theming, holidays, i18n) to a **different**
site or landing page than the `demo/novasphere/` reference implementation.
Read `docs/ARCHITECTURE.md` first for the design rationale — this doc is the
practical how-to.

## 1. Requirements

- **No build step required.** Everything is plain ES modules (`import`/`export`).
  A `<script type="module">` tag is enough; a bundler (Vite, esbuild, etc.) is
  optional if your site already uses one.
- **Browser support**: anything with `fetch`, `Promise`, ES modules, and
  `Intl.DateTimeFormat` — i.e. any browser from the last ~6 years. No polyfills
  ship with the engine.
- **No API keys, no backend for the engine itself.** Both external services
  are free and keyless:
  - `ipapi.co` — IP → city/region/country/coordinates
  - `Open-Meteo` — coordinates → current weather
  Rate limits are generous for a landing page but are the caller's
  responsibility to monitor if traffic is high (see ipapi.co's free-tier docs).
- **PHP-capable hosting, for cache-busting only.** Both reference demos use
  `<?php echo time(); ?>` as the `?v=` query string on their `<link>`/`<script>`
  tags so every deploy busts the cache automatically — no version number to
  remember to bump. This means both demos ship as `index.php`, not
  `index.html` (a `.html` file never executes PHP). This is the one narrow,
  deliberate exception to "no backend": if your site's host is pure static
  (no PHP), replace the `<?php echo time(); ?>` tags with a build-time
  timestamp your deploy script injects instead — same effect, zero PHP.
- **A consent UI.** The engine never requests geolocation on its own — your
  page must show a prompt and call `engine.grantGeoConsent()` /
  `engine.denyGeoConsent()`. Copy the pattern in `demo/novasphere/integration.js`
  (`showGeoConsentPrompt`) rather than writing this from scratch — it already
  handles focus management, Escape-to-dismiss, and ARIA labeling.

## 2. What to copy into the new site

| File | Copy as-is? | Why |
|---|---|---|
| `src/core/context-engine.js` | Yes, unchanged | Site-agnostic detection engine |
| `src/config/weather-themes.js` | Yes, unless you want different weather palettes | Central weather → theme/label map |
| `src/config/country-themes.js` | Yes, extend if you need more countries | Central country → language/flag-accent map |
| `src/config/holidays.js` | Yes, extend per country as needed | Central holiday calendar |
| `src/config/holiday-i18n.js` | Yes, unchanged (extend when you add a holiday key) | Shared translations (7 languages) for every `holidays.js` `i18nKey` — written once for the whole project, not per page |
| `src/config/weather-icons.js` | Yes, unchanged (extend when you add a weather `icon` key) | Inline SVG glyph per `weather-themes.js` `icon` key — no icon font, no CDN request |
| `src/config/example-page.config.js` | No — reference only | Shows the config shape a page authors |
| `demo/novasphere/integration.js` | No — copy the **pattern**, not the file | It's wired to NovaSphere's specific DOM ids/classes and i18n dictionary; your page needs its own thin version |
| `demo/novasphere/app.js` (i18n dict) | No | Every page owns its own translations |
| `demo/novasphere/styles.css` (widget/banner/consent CSS) | Optional starting point | Copy the classes you want (`.context-widget`, `.holiday-banner`, `.geo-consent-prompt`) and restyle to match your brand |

**Rule of thumb**: `src/core/` and `src/config/*.js` are the reusable engine —
touch them only to extend datasets (new country, new weather code, new
holiday). Everything under `demo/novasphere/` is one page's *consumption* of
that engine — a new site writes its own equivalent of `integration.js`, sized
to what it actually needs.

## 3. Wiring a new page (step by step)

1. **Add the i18n keys your page needs to your own dictionary** (however your
   site does i18n — it can reuse the `app.js` pattern or plug into an existing
   i18n library). Minimum keys if you use the standard widget/banner/consent
   pieces: `geo_consent_prompt`, `geo_consent_note`, `geo_consent_allow`,
   `geo_consent_deny`, `widget_weather_label`, `weather_unknown`,
   `holiday_banner_template`, plus one `weather_<codeKey>` key per weather
   code you care about (see `weather-themes.js` for the full `codeKey` list).
2. **Instantiate the engine and build the profile**, gated by consent:
   ```js
   import { ContextEngine } from './src/core/context-engine.js';
   const engine = new ContextEngine();

   showYourConsentUI(() => {
     // called after the visitor answers, or immediately if already answered
     engine.buildProfile().then((profile) => { /* step 3 */ });
   });
   ```
3. **Apply what you need from the profile** — you are not required to use all
   of it. Common lookups:
   ```js
   import { getWeatherTheme } from './src/config/weather-themes.js';
   import { getCountryTheme } from './src/config/country-themes.js';
   import { getTodaysHoliday } from './src/config/holidays.js';

   const weatherTheme = getWeatherTheme(profile.weather?.codeKey ?? 'unknown');
   const country = getCountryTheme(profile.countryCode);
   // weatherTheme.palette -> CSS custom properties to set on :root
   // country.languageCode -> feed into your i18n switcher
   // country.nationalPalette -> optional accent bar / accent color
   ```
4. **Holiday check** needs the visitor's *local* date, not the server's — use
   the visitor's timezone (`profile.weather?.timezone ?? profile.timezone`) to
   compute it, exactly as `integration.js`'s `maybeShowHolidayBanner` does; do
   not just call `new Date()` (that's the server/browser's own clock, which
   can be a different calendar day than the visitor's).
5. **Reuse the widget/banner/consent-prompt UI** by copying the relevant
   functions from `demo/novasphere/integration.js` (`ensureWidget`,
   `renderWidget`, `maybeShowHolidayBanner`, `showGeoConsentPrompt`) and
   swapping in your own i18n `t()` function and DOM ids/classes. They're
   deliberately small and dependency-free.

## 4. Adding new location- or weather-dependent effects

The three datasets in `src/config/` are the extension points. Pick the one
that matches what you're adding — you're almost never editing
`context-engine.js` itself.

### A. New weather-driven effect (e.g. a different hero image when it's snowing)

- If it's a **visual theme** (colors), add/edit an entry in
  `weather-themes.js` — add a new `palette` key or reuse an existing one.
- If it's **not a CSS variable** (e.g. swap a hero image, show/hide a banner,
  change copy), don't force it into `weather-themes.js`'s palette shape.
  Instead branch directly on `profile.weather.codeKey` in your integration
  script:
  ```js
  if (profile.weather?.codeKey === 'snow_heavy') {
    heroImg.src = '/assets/hero-snow.jpg';
  }
  ```
  Keep the `codeKey` as the branch key (never the raw WMO numeric `code` or a
  hardcoded language string) so it stays consistent with the rest of the
  engine.
- Need a weather condition the current `WEATHER_CODES` map in
  `context-engine.js` doesn't distinguish? The official WMO code table has
  more granularity than the reduced set currently mapped there — extend that
  map first, then add the corresponding `codeKey` entry to
  `weather-themes.js`.
- The widget's icon comes from `weather-themes.js`'s `icon` field, resolved
  to an inline SVG by `getWeatherIconSvg()` in `weather-icons.js`. If you add
  a `weather-themes.js` entry with a new `icon` value, add the matching SVG
  key to `weather-icons.js` too — unrecognized keys fall back to a generic
  `question` glyph rather than rendering nothing.

### B. New country-driven effect (e.g. currency formatting, a country-specific banner image)

- Add the country to `country-themes.js` if it's not there yet (`languageCode`
  + `nationalPalette` at minimum).
- For effects beyond language/accent-color (currency symbol, region-specific
  copy, a country-specific image), don't overload `country-themes.js`'s shape.
  Add a **new sibling dataset** file instead (e.g. `src/config/currency-by-country.js`)
  keyed by the same ISO alpha-2 codes, and look it up alongside
  `getCountryTheme()` in your integration script — this is the same pattern
  `holidays.js` already follows next to `country-themes.js`.

### C. New holiday or holiday-specific message

- Add the date to the country's array in `holidays.js`: `{ month, day, i18nKey }`.
  Reuse one of the existing `holiday_common_*` keys (new year, labour day,
  assumption, all saints, christmas) when the holiday is genuinely shared
  across countries — that's the lever that keeps the translation dictionary
  from growing linearly with country count.
- Holiday greetings are translated **once, for the whole project**, in
  `src/config/holiday-i18n.js` (all 7 languages) — not per page. Add your new
  `i18nKey` there and every page picks it up automatically.
- Resolution order in each page's `maybeShowHolidayBanner` (fixed in Phase 4,
  extended post-Phase-4 to add the shared dictionary): (1) the page's own
  i18n dictionary, in case a specific page wants a custom message for a
  holiday; (2) `holiday-i18n.js`'s shared translation; (3) the generic
  "today is a holiday in {country}" template as a last-resort fallback if
  somehow neither has the key. In practice, once you add a key to
  `holiday-i18n.js`, every page (NovaSphere, Nayla, and any future site)
  shows the specific message with zero page-level changes.

### D. A completely new profile dimension (not weather/country/holiday)

- Extend `buildProfile()` in `context-engine.js` to add the new field to the
  normalized profile object (keep the existing fields — don't rename/remove
  them, other pages may depend on the shape).
- Add a new `src/config/<dimension>.js` dataset file following the same
  pattern (semantic key in, display data out) if the new dimension needs a
  lookup table.

## 5. Testing before you ship

Real IP/geolocation/weather is hard to test reliably in CI or without
traveling. Use a mocked-profile matrix instead — script the three lookup
functions directly against fabricated `(country, weatherCode, date)`
combinations to catch mapping bugs (missing entries, wrong `i18nKey`, wrong
fallback) with zero network calls. See `scripts/qa_multicountry_weather.mjs`
in this project's workspace for the pattern used on NovaSphere's Phase 4 pass
— it is not part of the repo (it's a one-off QA script), but it's a template
worth copying into a new site's own test folder.
