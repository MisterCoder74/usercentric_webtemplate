// app.js — NovaSphere demo i18n scaffold (Phase 3 integration target)
//
// Kept intentionally simple (manual language switcher, static dictionary) —
// this is the surface Phase 3 will extend to auto-select the language from
// the visitor's detected country (src/config/country-themes.js) while still
// letting the user override it here.
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
      year: "" // will be replaced by current year
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
      year: ""
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
      year: ""
    }
    // Additional languages can be added here
  };
  const defaultLang = 'en';
  let currentLang = (navigator.language || navigator.userLanguage || 'en').split('-')[0];
  if (!translations[currentLang]) currentLang = defaultLang;
  function localize(lang) {
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
    const langSelect = document.getElementById('langSelect');
    if (langSelect) {
      langSelect.value = currentLang in translations ? currentLang : 'en';
      langSelect.addEventListener('change', (e) => {
        const lang = e.target.value;
        localize(lang);
      });
    }
  });
})();
