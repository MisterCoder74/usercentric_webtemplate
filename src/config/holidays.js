/**
 * holidays.js — Phase 2: centralized country → recurring holiday dataset.
 *
 * Keyed by ISO 3166-1 alpha-2 country code (same key as country-themes.js).
 * Each entry is a yearly-recurring date (month/day, no year) with an i18n
 * key for the greeting message — actual translated text lives in the page's
 * translation dictionary (Phase 3), same pattern as weather-themes.js.
 *
 * `month` is 1-12. Matching against "today" is done by the loader (Phase 3)
 * using the visitor's local date (from context-engine.js's profile), not
 * the server's date — a visitor's national holiday should trigger based on
 * their own calendar day.
 */

export const HOLIDAYS = {
  RO: [
    { month: 1, day: 1, i18nKey: 'holiday_common_new_year' },
    { month: 1, day: 24, i18nKey: 'holiday_ro_unification_day' }, // Unification of the Romanian Principalities
    { month: 5, day: 1, i18nKey: 'holiday_common_labour_day' },
    { month: 8, day: 15, i18nKey: 'holiday_common_assumption_day' },
    { month: 12, day: 1, i18nKey: 'holiday_ro_national_day' }, // Romania National Day
    { month: 12, day: 25, i18nKey: 'holiday_common_christmas' },
  ],
  IT: [
    { month: 1, day: 1, i18nKey: 'holiday_common_new_year' },
    { month: 1, day: 6, i18nKey: 'holiday_it_epiphany' }, // Epifania
    { month: 4, day: 25, i18nKey: 'holiday_it_liberation_day' }, // Festa della Liberazione
    { month: 5, day: 1, i18nKey: 'holiday_common_labour_day' },
    { month: 6, day: 2, i18nKey: 'holiday_it_republic_day' }, // Festa della Repubblica
    { month: 8, day: 15, i18nKey: 'holiday_common_assumption_day' }, // Ferragosto
    { month: 12, day: 25, i18nKey: 'holiday_common_christmas' },
    { month: 12, day: 26, i18nKey: 'holiday_it_santo_stefano' }, // Santo Stefano
  ],
  PL: [
    { month: 1, day: 1, i18nKey: 'holiday_common_new_year' },
    { month: 5, day: 3, i18nKey: 'holiday_pl_constitution_day' }, // Constitution Day
    { month: 8, day: 15, i18nKey: 'holiday_pl_armed_forces_day' }, // Armed Forces Day / Assumption
    { month: 11, day: 1, i18nKey: 'holiday_common_all_saints' },
    { month: 11, day: 11, i18nKey: 'holiday_pl_independence_day' }, // Polish Independence Day
    { month: 12, day: 25, i18nKey: 'holiday_common_christmas' },
    { month: 12, day: 26, i18nKey: 'holiday_pl_second_christmas_day' }, // Drugi dzień Świąt
  ],
  ES: [
    { month: 1, day: 1, i18nKey: 'holiday_common_new_year' },
    { month: 1, day: 6, i18nKey: 'holiday_es_epiphany' }, // Día de Reyes
    { month: 5, day: 1, i18nKey: 'holiday_common_labour_day' },
    { month: 8, day: 15, i18nKey: 'holiday_common_assumption_day' },
    { month: 10, day: 12, i18nKey: 'holiday_es_national_day' }, // Fiesta Nacional de España
    { month: 12, day: 6, i18nKey: 'holiday_es_constitution_day' }, // Día de la Constitución
    { month: 12, day: 25, i18nKey: 'holiday_common_christmas' },
  ],
  FR: [
    { month: 1, day: 1, i18nKey: 'holiday_common_new_year' },
    { month: 5, day: 1, i18nKey: 'holiday_common_labour_day' },
    { month: 5, day: 8, i18nKey: 'holiday_fr_victory_1945' }, // Victoire 1945
    { month: 7, day: 14, i18nKey: 'holiday_fr_bastille_day' }, // Bastille Day
    { month: 8, day: 15, i18nKey: 'holiday_common_assumption_day' },
    { month: 11, day: 11, i18nKey: 'holiday_fr_armistice_day' }, // Armistice 1918
    { month: 12, day: 25, i18nKey: 'holiday_common_christmas' },
  ],
  US: [
    { month: 1, day: 1, i18nKey: 'holiday_common_new_year' },
    { month: 6, day: 19, i18nKey: 'holiday_us_juneteenth' }, // Juneteenth
    { month: 7, day: 4, i18nKey: 'holiday_us_independence_day' }, // Independence Day
    { month: 11, day: 11, i18nKey: 'holiday_us_veterans_day' }, // Veterans Day
    { month: 12, day: 25, i18nKey: 'holiday_common_christmas' },
  ],
  GB: [
    { month: 1, day: 1, i18nKey: 'holiday_common_new_year' },
    { month: 12, day: 25, i18nKey: 'holiday_common_christmas' },
    { month: 12, day: 26, i18nKey: 'holiday_gb_boxing_day' }, // Boxing Day
    // Note: no single fixed-date national day; Good Friday/Easter Monday are movable, extend per use case.
  ],
  DE: [
    { month: 1, day: 1, i18nKey: 'holiday_common_new_year' },
    { month: 5, day: 1, i18nKey: 'holiday_common_labour_day' },
    { month: 10, day: 3, i18nKey: 'holiday_de_unity_day' }, // German Unity Day
    { month: 11, day: 1, i18nKey: 'holiday_common_all_saints' },
    { month: 12, day: 25, i18nKey: 'holiday_common_christmas' },
    { month: 12, day: 26, i18nKey: 'holiday_de_second_christmas_day' }, // 2. Weihnachtsfeiertag
  ],
};

/**
 * Returns the holiday entry (if any) matching a given country + local date.
 * @param {string|null} countryCode - ISO alpha-2 code
 * @param {Date} localDate - the visitor's local date/time
 * @returns {{month:number, day:number, i18nKey:string}|null}
 */
export function getTodaysHoliday(countryCode, localDate) {
  if (!countryCode) return null;
  const entries = HOLIDAYS[countryCode.toUpperCase()];
  if (!entries || entries.length === 0) return null;

  const month = localDate.getMonth() + 1;
  const day = localDate.getDate();
  return entries.find((h) => h.month === month && h.day === day) ?? null;
}
