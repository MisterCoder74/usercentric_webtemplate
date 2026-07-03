// app.js — NovaSphere demo i18n scaffold, now wired to the context engine (Phase 3).
//
// The dictionary also carries weather/holiday label translations so
// integration.js can render them without a second i18n system. Manual
// language changes always win over auto-detection — see `manualOverride`
// and `setLanguageFromContext` below, which integration.js calls.
(() => {
  const translations = {
    en: {
      nav_features: "Features",
      nav_pricing: "Pricing",
      nav_cta: "Get Started",
      hero_title: "The operating system for teams that move fast",
      hero_sub: "Plan, automate, and ship together — one workspace, no busywork.",
      hero_note: "No credit card required · Cancel anytime",
      cta_primary: "Start free trial",
      features_title: "Everything your team needs, in one place",
      feature_1_title: "Unified workspace",
      feature_1_desc: "Tasks, chat, and roadmaps in one shared space — no more switching between five tools.",
      feature_2_title: "Automation & AI assist",
      feature_2_desc: "Smart workflows learn how your team works and take the repetitive tasks off your plate.",
      feature_3_title: "Secure by design",
      feature_3_desc: "SOC 2 and ISO-aligned controls with granular, role-based access — built in, not bolted on.",
      pricing_title: "Simple pricing that scales with you",
      pricing_sub: "No surprise charges. Cancel anytime.",
      pricing_basic_title: "Starter",
      pricing_basic_feature1: "Up to 5 users",
      pricing_basic_feature2: "Core features",
      pricing_basic_feature3: "Email support",
      pricing_pro_badge: "Most popular",
      pricing_pro_title: "Pro",
      pricing_pro_feature1: "Everything in Starter",
      pricing_pro_feature2: "Advanced automation",
      pricing_pro_feature3: "Priority support",
      pricing_getstarted: "Get started",
      pricing_enterprise_title: "Enterprise",
      pricing_enterprise_price: "Custom pricing",
      pricing_enterprise_feature1: "Unlimited users",
      pricing_enterprise_feature2: "Dedicated success manager",
      pricing_enterprise_feature3: "SSO & custom contracts",
      pricing_enterprise_feature4: "24/7 priority support",
      pricing_contact: "Contact sales",
      footer_tagline: "The operating system for teams that move fast.",
      footer_link_pricing: "Pricing",
      footer_link_privacy: "Privacy",
      footer_link_terms: "Terms",
      footer_link_contact: "Contact",
      footer_rights: "All rights reserved.",
      year: "", // will be replaced by current year
      // Weather labels (keyed to context-engine.js WEATHER_CODES / weather-themes.js labelKey)
      weather_clear: "Clear sky", weather_mostly_clear: "Mostly clear", weather_partly_cloudy: "Partly cloudy",
      weather_cloudy: "Cloudy", weather_fog: "Fog", weather_fog_rime: "Rime fog",
      weather_drizzle_light: "Light drizzle", weather_drizzle_moderate: "Drizzle", weather_drizzle_dense: "Dense drizzle",
      weather_freezing_drizzle_light: "Light freezing drizzle", weather_freezing_drizzle_dense: "Freezing drizzle",
      weather_rain_light: "Light rain", weather_rain_moderate: "Rain", weather_rain_heavy: "Heavy rain",
      weather_freezing_rain_light: "Light freezing rain", weather_freezing_rain_heavy: "Freezing rain",
      weather_snow_light: "Light snow", weather_snow_moderate: "Snow", weather_snow_heavy: "Heavy snow",
      weather_snow_grains: "Snow grains", weather_rain_showers_light: "Light showers",
      weather_rain_showers_moderate: "Showers", weather_rain_showers_violent: "Violent showers",
      weather_snow_showers_light: "Light snow showers", weather_snow_showers_heavy: "Heavy snow showers",
      weather_thunderstorm: "Thunderstorm", weather_thunderstorm_hail_light: "Thunderstorm with light hail",
      weather_thunderstorm_hail_heavy: "Thunderstorm with heavy hail", weather_unknown: "Weather unavailable",
      // Widget & holiday banner
      widget_weather_label: "Right now in {city}",
      widget_updated_label: "Updated",
      holiday_banner_template: "Happy holiday! Today is a public holiday in {country}.",
      geo_consent_prompt: "Allow precise location for more accurate local weather?",
      geo_consent_allow: "Allow",
      geo_consent_deny: "No thanks",
    },
    es: {
      nav_features: "Funciones",
      nav_pricing: "Precios",
      nav_cta: "Comenzar",
      hero_title: "El sistema operativo para equipos que avanzan rápido",
      hero_sub: "Planifica, automatiza y lanza en equipo — un solo espacio, sin tareas repetitivas.",
      hero_note: "Sin tarjeta de crédito · Cancela cuando quieras",
      cta_primary: "Iniciar prueba gratuita",
      features_title: "Todo lo que tu equipo necesita, en un solo lugar",
      feature_1_title: "Espacio de trabajo unificado",
      feature_1_desc: "Tareas, chat y hojas de ruta en un solo lugar — sin saltar entre cinco herramientas.",
      feature_2_title: "Automatización e IA",
      feature_2_desc: "Flujos inteligentes que aprenden cómo trabaja tu equipo y eliminan las tareas repetitivas.",
      feature_3_title: "Seguridad desde el diseño",
      feature_3_desc: "Controles alineados con SOC 2 e ISO, con acceso granular basado en roles.",
      pricing_title: "Precios simples que escalan contigo",
      pricing_sub: "Sin sorpresas. Cancela cuando quieras.",
      pricing_basic_title: "Inicio",
      pricing_basic_feature1: "Hasta 5 usuarios",
      pricing_basic_feature2: "Funciones básicas",
      pricing_basic_feature3: "Soporte por correo",
      pricing_pro_badge: "Más popular",
      pricing_pro_title: "Pro",
      pricing_pro_feature1: "Todo lo de Inicio",
      pricing_pro_feature2: "Automatización avanzada",
      pricing_pro_feature3: "Soporte prioritario",
      pricing_getstarted: "Empezar",
      pricing_enterprise_title: "Empresarial",
      pricing_enterprise_price: "Precio a medida",
      pricing_enterprise_feature1: "Usuarios ilimitados",
      pricing_enterprise_feature2: "Gestor de éxito dedicado",
      pricing_enterprise_feature3: "SSO y contratos personalizados",
      pricing_enterprise_feature4: "Soporte prioritario 24/7",
      pricing_contact: "Contactar ventas",
      footer_tagline: "El sistema operativo para equipos que avanzan rápido.",
      footer_link_pricing: "Precios",
      footer_link_privacy: "Privacidad",
      footer_link_terms: "Términos",
      footer_link_contact: "Contacto",
      footer_rights: "Todos los derechos reservados.",
      year: "",
      weather_clear: "Cielo despejado", weather_mostly_clear: "Mayormente despejado", weather_partly_cloudy: "Parcialmente nublado",
      weather_cloudy: "Nublado", weather_fog: "Niebla", weather_fog_rime: "Niebla helada",
      weather_drizzle_light: "Llovizna ligera", weather_drizzle_moderate: "Llovizna", weather_drizzle_dense: "Llovizna densa",
      weather_freezing_drizzle_light: "Llovizna helada ligera", weather_freezing_drizzle_dense: "Llovizna helada",
      weather_rain_light: "Lluvia ligera", weather_rain_moderate: "Lluvia", weather_rain_heavy: "Lluvia intensa",
      weather_freezing_rain_light: "Lluvia helada ligera", weather_freezing_rain_heavy: "Lluvia helada",
      weather_snow_light: "Nieve ligera", weather_snow_moderate: "Nieve", weather_snow_heavy: "Nieve intensa",
      weather_snow_grains: "Granos de nieve", weather_rain_showers_light: "Chubascos ligeros",
      weather_rain_showers_moderate: "Chubascos", weather_rain_showers_violent: "Chubascos violentos",
      weather_snow_showers_light: "Chubascos de nieve ligeros", weather_snow_showers_heavy: "Chubascos de nieve intensos",
      weather_thunderstorm: "Tormenta", weather_thunderstorm_hail_light: "Tormenta con granizo ligero",
      weather_thunderstorm_hail_heavy: "Tormenta con granizo intenso", weather_unknown: "Clima no disponible",
      widget_weather_label: "Ahora mismo en {city}",
      widget_updated_label: "Actualizado",
      holiday_banner_template: "¡Feliz día festivo! Hoy es festivo nacional en {country}.",
      geo_consent_prompt: "¿Permitir ubicación precisa para un clima local más exacto?",
      geo_consent_allow: "Permitir",
      geo_consent_deny: "No, gracias",
    },
    fr: {
      nav_features: "Fonctionnalités",
      nav_pricing: "Tarifs",
      nav_cta: "Commencer",
      hero_title: "Le système d'exploitation des équipes qui avancent vite",
      hero_sub: "Planifiez, automatisez et livrez ensemble — un seul espace, zéro tâche répétitive.",
      hero_note: "Sans carte bancaire · Annulez à tout moment",
      cta_primary: "Essai gratuit",
      features_title: "Tout ce dont votre équipe a besoin, au même endroit",
      feature_1_title: "Espace de travail unifié",
      feature_1_desc: "Tâches, discussions et feuilles de route au même endroit — finies les allées et venues entre cinq outils.",
      feature_2_title: "Automatisation & IA",
      feature_2_desc: "Des workflows intelligents qui apprennent votre façon de travailler et automatisent les tâches répétitives.",
      feature_3_title: "Sécurité dès la conception",
      feature_3_desc: "Contrôles alignés SOC 2 et ISO, avec accès granulaire basé sur les rôles.",
      pricing_title: "Des tarifs simples qui évoluent avec vous",
      pricing_sub: "Aucune surprise. Annulez à tout moment.",
      pricing_basic_title: "Starter",
      pricing_basic_feature1: "Jusqu'à 5 utilisateurs",
      pricing_basic_feature2: "Fonctionnalités essentielles",
      pricing_basic_feature3: "Support par e-mail",
      pricing_pro_badge: "Le plus populaire",
      pricing_pro_title: "Pro",
      pricing_pro_feature1: "Tout Starter inclus",
      pricing_pro_feature2: "Automatisation avancée",
      pricing_pro_feature3: "Support prioritaire",
      pricing_getstarted: "Commencer",
      pricing_enterprise_title: "Entreprise",
      pricing_enterprise_price: "Tarif sur mesure",
      pricing_enterprise_feature1: "Utilisateurs illimités",
      pricing_enterprise_feature2: "Chargé de compte dédié",
      pricing_enterprise_feature3: "SSO et contrats personnalisés",
      pricing_enterprise_feature4: "Support prioritaire 24/7",
      pricing_contact: "Contacter les ventes",
      footer_tagline: "Le système d'exploitation des équipes qui avancent vite.",
      footer_link_pricing: "Tarifs",
      footer_link_privacy: "Confidentialité",
      footer_link_terms: "Conditions",
      footer_link_contact: "Contact",
      footer_rights: "Tous droits réservés.",
      year: "",
      weather_clear: "Ciel dégagé", weather_mostly_clear: "Plutôt dégagé", weather_partly_cloudy: "Partiellement nuageux",
      weather_cloudy: "Nuageux", weather_fog: "Brouillard", weather_fog_rime: "Brouillard givrant",
      weather_drizzle_light: "Bruine légère", weather_drizzle_moderate: "Bruine", weather_drizzle_dense: "Bruine dense",
      weather_freezing_drizzle_light: "Bruine verglaçante légère", weather_freezing_drizzle_dense: "Bruine verglaçante",
      weather_rain_light: "Pluie légère", weather_rain_moderate: "Pluie", weather_rain_heavy: "Forte pluie",
      weather_freezing_rain_light: "Pluie verglaçante légère", weather_freezing_rain_heavy: "Pluie verglaçante",
      weather_snow_light: "Neige légère", weather_snow_moderate: "Neige", weather_snow_heavy: "Forte neige",
      weather_snow_grains: "Grains de neige", weather_rain_showers_light: "Averses légères",
      weather_rain_showers_moderate: "Averses", weather_rain_showers_violent: "Averses violentes",
      weather_snow_showers_light: "Averses de neige légères", weather_snow_showers_heavy: "Averses de neige fortes",
      weather_thunderstorm: "Orage", weather_thunderstorm_hail_light: "Orage avec grêle légère",
      weather_thunderstorm_hail_heavy: "Orage avec forte grêle", weather_unknown: "Météo indisponible",
      widget_weather_label: "En ce moment à {city}",
      widget_updated_label: "Mis à jour",
      holiday_banner_template: "Joyeuse fête ! Aujourd'hui est un jour férié en {country}.",
      geo_consent_prompt: "Autoriser la localisation précise pour une météo locale plus juste ?",
      geo_consent_allow: "Autoriser",
      geo_consent_deny: "Non merci",
    }
    // Additional languages can be added here
  };
  const defaultLang = 'en';
  let currentLang = (navigator.language || navigator.userLanguage || 'en').split('-')[0];
  if (!translations[currentLang]) currentLang = defaultLang;
  let manualOverride = false;
  let langSelectEl = null;

  function localize(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    const dict = translations[lang] || translations[defaultLang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      const text = dict[key];
      if (typeof text === 'string') el.textContent = text;
    });
    // Always set year to current year
    const yearEl = document.querySelector('[data-i18n="year"]');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  document.addEventListener('DOMContentLoaded', () => {
    localize(currentLang);
    langSelectEl = document.getElementById('langSelect');
    if (langSelectEl) {
      langSelectEl.value = currentLang in translations ? currentLang : 'en';
      langSelectEl.addEventListener('change', (e) => {
        manualOverride = true; // a manual pick always wins over context-based detection
        localize(e.target.value);
      });
    }
  });

  // Bridge used by integration.js (Phase 3 context wiring). A manual language
  // pick always wins — this only applies the detected language pre-emptively.
  window.NovaSphereI18n = {
    localize,
    getCurrentLang: () => currentLang,
    getDict: (lang) => translations[lang] || translations[defaultLang],
    isManualOverride: () => manualOverride,
    setLanguageFromContext(lang) {
      if (manualOverride || !translations[lang]) return false;
      localize(lang);
      if (langSelectEl) langSelectEl.value = lang;
      return true;
    },
  };
})();
