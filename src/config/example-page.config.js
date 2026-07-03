/**
 * example-page.config.js — sample per-page adaptation config.
 *
 * This is what a NEW landing page needs to author to plug into the core
 * engine (src/core/context-engine.js) — it does not reimplement detection
 * logic, it only describes what this specific page wants adapted.
 *
 * Phase 1 ships this as a shape reference only; Phase 2/3 will add the
 * loader that reads this config and applies it (i18n dictionary lookup,
 * CSS theme variable overrides, holiday message injection).
 */

export const pageConfig = {
  // Which i18n keys this page uses (must match data-i18n attributes in markup).
  i18nKeys: [
    'nav_features',
    'nav_pricing',
    'nav_cta',
    'hero_title',
    'hero_sub',
    'cta_primary',
  ],

  // Which CSS custom properties this page exposes for dynamic theming.
  themeVariables: ['--bg', '--primary', '--surface'],

  // Where the context/holiday widget should render on this page.
  widgetMountSelector: '#visitor-context-widget',
};
