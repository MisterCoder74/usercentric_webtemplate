// app.js — Nayla Nails demo i18n scaffold, wired to the shared context engine.
//
// Same pattern as demo/novasphere/app.js: the dictionary carries page copy
// PLUS weather/holiday/consent label translations (reused verbatim from
// NovaSphere's validated set) so integration.js can render both without a
// second i18n system. Manual language changes always win over
// auto-detection — see `manualOverride` and `setLanguageFromContext` below.
//
// Testimonials are intentionally NOT part of this dictionary: they are real
// client quotes hardcoded in index.html and stay in their original Italian,
// same as a real local business site would do — see docs/DEVELOPER_GUIDE.md
// ("a page doesn't have to translate everything, only what it declares").
(() => {
  const translations = {
    en: {
      nav_about: "About", nav_services: "Services", nav_portfolio: "Work", nav_testimonials: "Reviews", nav_contact: "Contact", nav_cta: "Book",
      hero_eyebrow: "Mobile Nail Art · Lazio", hero_title: "Nails that don't ask for permission", hero_sub: "Gel and glitter powder, made to measure for anyone done settling for basic polish. I come to you, wherever you are in Lazio.", hero_cta_primary: "Book your session", hero_cta_secondary: "See the work",
      about_title: "This isn't just polish. It's personality.", about_text: "I'm Nayla, a mobile nail artist serving all of Lazio. No crowded salons, no waiting around — I bring my full professional setup to you, with the same care and products you'd expect from a top-end beauty studio. I work almost exclusively in gel and glitter powder, because let's be honest, classic polish isn't built for people who actually want to stand out.",
      services_title: "What I do", services_sub: "Every treatment at your place, with professional materials and proper curing times.",
      service_1_title: "Gel extensions", service_1_desc: "Structure, length and shape built to order — almond to coffin, strong and natural to the touch.",
      service_2_title: "Glitter powder nail art", service_2_desc: "Ombré, chrome and full-glitter effects that regular polish could never pull off.",
      service_3_title: "Semi-permanent", service_3_desc: "For anyone who wants clean, brilliant colour without committing to gel.",
      service_4_title: "Safe removal", service_4_desc: "I remove your old set — even someone else's work — without wrecking your natural nail.",
      portfolio_title: "My work", portfolio_sub: "A selection of what comes out of my kit.",
      portfolio_1: "Burgundy Glitter Ombré", portfolio_2: "Black & Gold Chrome", portfolio_3: "Emerald Green Stiletto",
      portfolio_4: "Holographic Silver Fade", portfolio_5: "Plum & Gold Powder", portfolio_6: "Matte Black & Gold French",
      testimonials_title: "What they say about me", testimonials_sub: "Real clients, all across Lazio.",
      contact_title: "Let's talk", contact_sub: "Message me for a quote or to lock in a date — I reply personally.",
      form_name: "Name", form_email: "Email", form_message: "Tell me what you have in mind", form_submit: "Send request", form_note: "This form opens your email client — no data is stored on this site.",
      footer_tagline: "Mobile nail art across all of Lazio.", footer_link_privacy: "Privacy", footer_rights: "All rights reserved.", year: "",
      // Weather labels (keyed to context-engine.js WEATHER_CODES / weather-themes.js labelKey)
      weather_clear: "Clear sky", weather_mostly_clear: "Mostly clear", weather_partly_cloudy: "Partly cloudy",
      weather_cloudy: "Cloudy", weather_fog: "Fog", weather_fog_rime: "Rime fog",
      weather_drizzle_light: "Light drizzle", weather_drizzle_moderate: "Drizzle", weather_drizzle_dense: "Dense drizzle",
      weather_freezing_drizzle_light: "Light freezing drizzle", weather_freezing_drizzle_dense: "Freezing drizzle", weather_rain_light: "Light rain",
      weather_rain_moderate: "Rain", weather_rain_heavy: "Heavy rain", weather_freezing_rain_light: "Light freezing rain",
      weather_freezing_rain_heavy: "Freezing rain", weather_snow_light: "Light snow", weather_snow_moderate: "Snow",
      weather_snow_heavy: "Heavy snow", weather_snow_grains: "Snow grains", weather_rain_showers_light: "Light showers",
      weather_rain_showers_moderate: "Showers", weather_rain_showers_violent: "Violent showers", weather_snow_showers_light: "Light snow showers",
      weather_snow_showers_heavy: "Heavy snow showers", weather_thunderstorm: "Thunderstorm", weather_thunderstorm_hail_light: "Thunderstorm with light hail",
      weather_thunderstorm_hail_heavy: "Thunderstorm with heavy hail", weather_unknown: "Weather unavailable",
      // Widget & holiday banner
      widget_weather_label: "Right now in {city}",
      widget_updated_label: "Updated",
      holiday_banner_template: "Happy holiday! Today is a public holiday in {country}.",
      geo_consent_prompt: "Allow precise location for more accurate local weather?",
      geo_consent_note: "The site works fine without it — precise location is only used for local weather.",
      geo_consent_allow: "Allow",
      geo_consent_deny: "No thanks",
    },
    es: {
      nav_about: "Quién soy", nav_services: "Servicios", nav_portfolio: "Trabajos", nav_testimonials: "Reseñas", nav_contact: "Contacto", nav_cta: "Reserva",
      hero_eyebrow: "Nail Art a domicilio · Lazio", hero_title: "Uñas que no piden permiso", hero_sub: "Gel y polvo glitter, hechos a medida para quien no se conforma con el esmalte de siempre. Voy yo, donde estés en el Lazio.", hero_cta_primary: "Reserva tu sesión", hero_cta_secondary: "Ver los trabajos",
      about_title: "No es solo esmalte. Es carácter.", about_text: "Soy Nayla, nail artist a domicilio en todo el Lazio. Sin salones abarrotados, sin esperas: llevo mi puesto profesional hasta ti, con el mismo cuidado y los mismos productos que un centro de estética de alto nivel. Trabajo casi exclusivamente en gel y polvo glitter, porque el esmalte clásico, seamos sinceras, no es para quien quiere destacar.",
      services_title: "Qué hago", services_sub: "Cada tratamiento a domicilio, con materiales profesionales y tiempos de aplicación respetados.",
      service_1_title: "Reconstrucción en gel", service_1_desc: "Estructura, longitud y forma a medida — desde la almendra hasta la coffin, resistente y natural al tacto.",
      service_2_title: "Nail art en polvo glitter", service_2_desc: "Efectos ombré, chrome y full glitter que el esmalte clásico no puede dar.",
      service_3_title: "Semipermanente", service_3_desc: "Para quien quiere color limpio y brillante sin comprometerse con el gel.",
      service_4_title: "Retirada segura", service_4_desc: "Retiro el trabajo anterior (aunque no sea mío) sin dañar la uña natural.",
      portfolio_title: "Mis trabajos", portfolio_sub: "Una selección de lo que sale de mi maletín.",
      portfolio_1: "Ombré Glitter Burdeos", portfolio_2: "Black & Gold Chrome", portfolio_3: "Stiletto Verde Esmeralda",
      portfolio_4: "Fade Plata Holográfico", portfolio_5: "Ciruela y Polvo Dorado", portfolio_6: "French Negro Mate y Dorado",
      testimonials_title: "Qué dicen de mí", testimonials_sub: "Clientas reales, de todo el Lazio.",
      contact_title: "Hablemos", contact_sub: "Escríbeme para un presupuesto o para fijar la fecha — respondo en persona.",
      form_name: "Nombre", form_email: "Email", form_message: "Cuéntame qué tienes en mente", form_submit: "Enviar solicitud", form_note: "El formulario abre tu cliente de correo — ningún dato se guarda en este sitio.",
      footer_tagline: "Nail art a domicilio en todo el Lazio.", footer_link_privacy: "Privacidad", footer_rights: "Todos los derechos reservados.", year: "",
      // Weather labels (keyed to context-engine.js WEATHER_CODES / weather-themes.js labelKey)
      weather_clear: "Cielo despejado", weather_mostly_clear: "Mayormente despejado", weather_partly_cloudy: "Parcialmente nublado",
      weather_cloudy: "Nublado", weather_fog: "Niebla", weather_fog_rime: "Niebla helada",
      weather_drizzle_light: "Llovizna ligera", weather_drizzle_moderate: "Llovizna", weather_drizzle_dense: "Llovizna densa",
      weather_freezing_drizzle_light: "Llovizna helada ligera", weather_freezing_drizzle_dense: "Llovizna helada", weather_rain_light: "Lluvia ligera",
      weather_rain_moderate: "Lluvia", weather_rain_heavy: "Lluvia intensa", weather_freezing_rain_light: "Lluvia helada ligera",
      weather_freezing_rain_heavy: "Lluvia helada", weather_snow_light: "Nieve ligera", weather_snow_moderate: "Nieve",
      weather_snow_heavy: "Nieve intensa", weather_snow_grains: "Granos de nieve", weather_rain_showers_light: "Chubascos ligeros",
      weather_rain_showers_moderate: "Chubascos", weather_rain_showers_violent: "Chubascos violentos", weather_snow_showers_light: "Chubascos de nieve ligeros",
      weather_snow_showers_heavy: "Chubascos de nieve intensos", weather_thunderstorm: "Tormenta", weather_thunderstorm_hail_light: "Tormenta con granizo ligero",
      weather_thunderstorm_hail_heavy: "Tormenta con granizo intenso", weather_unknown: "Clima no disponible",
      // Widget & holiday banner
      widget_weather_label: "Ahora mismo en {city}",
      widget_updated_label: "Actualizado",
      holiday_banner_template: "¡Feliz día festivo! Hoy es festivo nacional en {country}.",
      geo_consent_prompt: "¿Permitir ubicación precisa para un clima local más exacto?",
      geo_consent_note: "El sitio funciona igual sin ella — la ubicación precisa solo se usa para el clima local.",
      geo_consent_allow: "Permitir",
      geo_consent_deny: "No, gracias",
    },
    fr: {
      nav_about: "Qui suis-je", nav_services: "Services", nav_portfolio: "Réalisations", nav_testimonials: "Avis", nav_contact: "Contact", nav_cta: "Réserver",
      hero_eyebrow: "Nail Art à domicile · Lazio", hero_title: "Des ongles qui ne demandent la permission à personne", hero_sub: "Gel et poudre pailletée, faits sur mesure pour celles qui refusent de se contenter du vernis ordinaire. C'est moi qui me déplace, où que tu sois dans le Lazio.", hero_cta_primary: "Réserve ta séance", hero_cta_secondary: "Voir les réalisations",
      about_title: "Ce n'est pas juste du vernis. C'est du caractère.", about_text: "Je suis Nayla, nail artist à domicile dans tout le Lazio. Fini les salons bondés, fini l'attente : j'apporte mon poste professionnel chez toi, avec le même soin et les mêmes produits qu'un institut haut de gamme. Je travaille quasi exclusivement en gel et poudre pailletée — parce que le vernis classique, soyons honnêtes, ce n'est pas fait pour celles qui veulent se démarquer.",
      services_title: "Ce que je fais", services_sub: "Chaque soin à domicile, avec des matériaux professionnels et des temps de pose respectés.",
      service_1_title: "Reconstruction en gel", service_1_desc: "Structure, longueur et forme sur mesure — de l'amande à la coffin, résistant et naturel au toucher.",
      service_2_title: "Nail art en poudre pailletée", service_2_desc: "Effets ombré, chrome et full glitter que le vernis classique ne peut tout simplement pas offrir.",
      service_3_title: "Semi-permanent", service_3_desc: "Pour celles qui veulent une couleur nette et brillante sans s'engager avec le gel.",
      service_4_title: "Retrait sécurisé", service_4_desc: "Je retire l'ancien travail (même si ce n'est pas le mien) sans abîmer l'ongle naturel.",
      portfolio_title: "Mes réalisations", portfolio_sub: "Une sélection de ce qui sort de ma mallette.",
      portfolio_1: "Ombré Pailleté Bordeaux", portfolio_2: "Black & Gold Chrome", portfolio_3: "Stiletto Vert Émeraude",
      portfolio_4: "Fondu Argent Holographique", portfolio_5: "Prune et Poudre Or", portfolio_6: "French Noir Mat et Or",
      testimonials_title: "Ce qu'elles disent de moi", testimonials_sub: "Des vraies clientes, dans tout le Lazio.",
      contact_title: "Parlons-en", contact_sub: "Écris-moi pour un devis ou pour fixer une date — je réponds en personne.",
      form_name: "Nom", form_email: "Email", form_message: "Dis-moi ce que tu as en tête", form_submit: "Envoyer la demande", form_note: "Le formulaire ouvre ton client email — aucune donnée n'est enregistrée sur ce site.",
      footer_tagline: "Nail art à domicile dans tout le Lazio.", footer_link_privacy: "Confidentialité", footer_rights: "Tous droits réservés.", year: "",
      // Weather labels (keyed to context-engine.js WEATHER_CODES / weather-themes.js labelKey)
      weather_clear: "Ciel dégagé", weather_mostly_clear: "Plutôt dégagé", weather_partly_cloudy: "Partiellement nuageux",
      weather_cloudy: "Nuageux", weather_fog: "Brouillard", weather_fog_rime: "Brouillard givrant",
      weather_drizzle_light: "Bruine légère", weather_drizzle_moderate: "Bruine", weather_drizzle_dense: "Bruine dense",
      weather_freezing_drizzle_light: "Bruine verglaçante légère", weather_freezing_drizzle_dense: "Bruine verglaçante", weather_rain_light: "Pluie légère",
      weather_rain_moderate: "Pluie", weather_rain_heavy: "Forte pluie", weather_freezing_rain_light: "Pluie verglaçante légère",
      weather_freezing_rain_heavy: "Pluie verglaçante", weather_snow_light: "Neige légère", weather_snow_moderate: "Neige",
      weather_snow_heavy: "Forte neige", weather_snow_grains: "Grains de neige", weather_rain_showers_light: "Averses légères",
      weather_rain_showers_moderate: "Averses", weather_rain_showers_violent: "Averses violentes", weather_snow_showers_light: "Averses de neige légères",
      weather_snow_showers_heavy: "Averses de neige fortes", weather_thunderstorm: "Orage", weather_thunderstorm_hail_light: "Orage avec grêle légère",
      weather_thunderstorm_hail_heavy: "Orage avec forte grêle", weather_unknown: "Météo indisponible",
      // Widget & holiday banner
      widget_weather_label: "En ce moment à {city}",
      widget_updated_label: "Mis à jour",
      holiday_banner_template: "Joyeuse fête ! Aujourd'hui est un jour férié en {country}.",
      geo_consent_prompt: "Autoriser la localisation précise pour une météo locale plus juste ?",
      geo_consent_note: "Le site fonctionne très bien sans — la position précise sert uniquement à la météo locale.",
      geo_consent_allow: "Autoriser",
      geo_consent_deny: "Non merci",
    },
    it: {
      nav_about: "Chi sono", nav_services: "Servizi", nav_portfolio: "Lavori", nav_testimonials: "Recensioni", nav_contact: "Contatti", nav_cta: "Prenota",
      hero_eyebrow: "Nail Art a domicilio · Lazio", hero_title: "Unghie che non chiedono permesso", hero_sub: "Gel e polvere glitter, fatti su misura per chi non si accontenta del solito smalto. Vengo io, ovunque tu sia nel Lazio.", hero_cta_primary: "Prenota la tua seduta", hero_cta_secondary: "Guarda i lavori",
      about_title: "Non è solo smalto. È carattere.", about_text: "Sono Nayla, nail artist a domicilio in tutto il Lazio. Niente saloni affollati, niente attese: porto la mia postazione professionale da te, con la stessa cura e gli stessi prodotti di un centro estetico di livello. Lavoro quasi esclusivamente in gel e polvere glitter, perché lo smalto classico, diciamocelo, non fa per chi vuole distinguersi.",
      services_title: "Cosa faccio", services_sub: "Ogni trattamento a domicilio, con materiali professionali e tempi di posa rispettati.",
      service_1_title: "Ricostruzione in gel", service_1_desc: "Struttura, lunghezza e forma su misura — dalla mandorla alla coffin, resistente e naturale al tatto.",
      service_2_title: "Nail art in polvere glitter", service_2_desc: "Effetti ombré, chrome e full glitter che il classico smalto non riesce a dare.",
      service_3_title: "Semipermanente", service_3_desc: "Per chi vuole colore pulito e brillante senza impegnarsi con il gel.",
      service_4_title: "Rimozione sicura", service_4_desc: "Rimuovo il vecchio lavoro (anche non mio) senza rovinare l'unghia naturale.",
      portfolio_title: "I miei lavori", portfolio_sub: "Una selezione di quello che esce dalla mia valigetta.",
      portfolio_1: "Ombré Glitter Bordeaux", portfolio_2: "Black & Gold Chrome", portfolio_3: "Stiletto Verde Smeraldo",
      portfolio_4: "Fade Argento Olografico", portfolio_5: "Prugna e Polvere Oro", portfolio_6: "French Nero Opaco e Oro",
      testimonials_title: "Cosa dicono di me", testimonials_sub: "Clienti vere, in tutto il Lazio.",
      contact_title: "Parliamone", contact_sub: "Scrivimi per un preventivo o per fissare la data — rispondo di persona.",
      form_name: "Nome", form_email: "Email", form_message: "Raccontami cosa hai in mente", form_submit: "Invia richiesta", form_note: "Il modulo apre il tuo client email — nessun dato viene salvato su questo sito.",
      footer_tagline: "Nail art a domicilio in tutto il Lazio.", footer_link_privacy: "Privacy", footer_rights: "Tutti i diritti riservati.", year: "",
      // Weather labels (keyed to context-engine.js WEATHER_CODES / weather-themes.js labelKey)
      weather_clear: "Cielo sereno", weather_mostly_clear: "Prevalentemente sereno", weather_partly_cloudy: "Parzialmente nuvoloso",
      weather_cloudy: "Nuvoloso", weather_fog: "Nebbia", weather_fog_rime: "Nebbia gelata",
      weather_drizzle_light: "Pioviggine leggera", weather_drizzle_moderate: "Pioviggine", weather_drizzle_dense: "Pioviggine intensa",
      weather_freezing_drizzle_light: "Pioviggine gelata leggera", weather_freezing_drizzle_dense: "Pioviggine gelata", weather_rain_light: "Pioggia leggera",
      weather_rain_moderate: "Pioggia", weather_rain_heavy: "Pioggia intensa", weather_freezing_rain_light: "Pioggia gelata leggera",
      weather_freezing_rain_heavy: "Pioggia gelata", weather_snow_light: "Neve leggera", weather_snow_moderate: "Neve",
      weather_snow_heavy: "Neve intensa", weather_snow_grains: "Granuli di neve", weather_rain_showers_light: "Rovesci leggeri",
      weather_rain_showers_moderate: "Rovesci", weather_rain_showers_violent: "Rovesci violenti", weather_snow_showers_light: "Rovesci di neve leggeri",
      weather_snow_showers_heavy: "Rovesci di neve intensi", weather_thunderstorm: "Temporale", weather_thunderstorm_hail_light: "Temporale con grandine leggera",
      weather_thunderstorm_hail_heavy: "Temporale con grandine intensa", weather_unknown: "Meteo non disponibile",
      // Widget & holiday banner
      widget_weather_label: "In questo momento a {city}",
      widget_updated_label: "Aggiornato",
      holiday_banner_template: "Buona festa! Oggi è festività nazionale in {country}.",
      geo_consent_prompt: "Consentire la posizione precisa per un meteo locale più accurato?",
      geo_consent_note: "Il sito funziona comunque senza — la posizione precisa serve solo per il meteo locale.",
      geo_consent_allow: "Consenti",
      geo_consent_deny: "No grazie",
    },
    ro: {
      nav_about: "Despre mine", nav_services: "Servicii", nav_portfolio: "Lucrări", nav_testimonials: "Recenzii", nav_contact: "Contact", nav_cta: "Rezervă",
      hero_eyebrow: "Nail Art la domiciliu · Lazio", hero_title: "Unghii care nu cer permisiunea nimănui", hero_sub: "Gel și pulbere glitter, făcute pe măsura celor care nu se mulțumesc cu oja obișnuită. Vin eu, oriunde te-ai afla în Lazio.", hero_cta_primary: "Rezervă-ți ședința", hero_cta_secondary: "Vezi lucrările",
      about_title: "Nu e doar ojă. E caracter.", about_text: "Sunt Nayla, nail artist la domiciliu în tot Lazio-ul. Fără saloane aglomerate, fără așteptări: îmi aduc stația profesională la tine, cu aceeași grijă și aceleași produse ca într-un centru estetic de top. Lucrez aproape exclusiv în gel și pulbere glitter, pentru că oja clasică, să fim sincere, nu e pentru cele care vor să iasă din rând.",
      services_title: "Ce fac", services_sub: "Fiecare tratament la domiciliu, cu materiale profesionale și timpi de aplicare respectați.",
      service_1_title: "Reconstrucție în gel", service_1_desc: "Structură, lungime și formă pe măsură — de la migdală la coffin, rezistentă și naturală la atingere.",
      service_2_title: "Nail art cu pulbere glitter", service_2_desc: "Efecte ombré, chrome și full glitter pe care oja clasică nu le poate oferi.",
      service_3_title: "Semipermanentă", service_3_desc: "Pentru cele care vor culoare curată și strălucitoare fără să se angajeze la gel.",
      service_4_title: "Îndepărtare în siguranță", service_4_desc: "Îndepărtez lucrarea veche (inclusiv a altcuiva) fără să deteriorez unghia naturală.",
      portfolio_title: "Lucrările mele", portfolio_sub: "O selecție din ce iese din geanta mea.",
      portfolio_1: "Ombré Glitter Bordeaux", portfolio_2: "Black & Gold Chrome", portfolio_3: "Stiletto Verde Smarald",
      portfolio_4: "Fade Argintiu Holografic", portfolio_5: "Prună și Pulbere Aurie", portfolio_6: "French Negru Mat și Auriu",
      testimonials_title: "Ce spun despre mine", testimonials_sub: "Cliente reale, din tot Lazio-ul.",
      contact_title: "Hai să vorbim", contact_sub: "Scrie-mi pentru un deviz sau ca să stabilim data — răspund eu personal.",
      form_name: "Nume", form_email: "Email", form_message: "Spune-mi ce ai în minte", form_submit: "Trimite cererea", form_note: "Formularul deschide clientul tău de email — niciun date nu este salvat pe acest site.",
      footer_tagline: "Nail art la domiciliu în tot Lazio-ul.", footer_link_privacy: "Confidențialitate", footer_rights: "Toate drepturile rezervate.", year: "",
      // Weather labels (keyed to context-engine.js WEATHER_CODES / weather-themes.js labelKey)
      weather_clear: "Cer senin", weather_mostly_clear: "Predominant senin", weather_partly_cloudy: "Parțial noros",
      weather_cloudy: "Noros", weather_fog: "Ceață", weather_fog_rime: "Ceață cu chiciură",
      weather_drizzle_light: "Burniță ușoară", weather_drizzle_moderate: "Burniță", weather_drizzle_dense: "Burniță deasă",
      weather_freezing_drizzle_light: "Burniță înghețată ușoară", weather_freezing_drizzle_dense: "Burniță înghețată", weather_rain_light: "Ploaie ușoară",
      weather_rain_moderate: "Ploaie", weather_rain_heavy: "Ploaie puternică", weather_freezing_rain_light: "Ploaie înghețată ușoară",
      weather_freezing_rain_heavy: "Ploaie înghețată", weather_snow_light: "Ninsoare ușoară", weather_snow_moderate: "Ninsoare",
      weather_snow_heavy: "Ninsoare puternică", weather_snow_grains: "Grăunțe de zăpadă", weather_rain_showers_light: "Averse ușoare",
      weather_rain_showers_moderate: "Averse", weather_rain_showers_violent: "Averse violente", weather_snow_showers_light: "Averse de zăpadă ușoare",
      weather_snow_showers_heavy: "Averse de zăpadă puternice", weather_thunderstorm: "Furtună", weather_thunderstorm_hail_light: "Furtună cu grindină ușoară",
      weather_thunderstorm_hail_heavy: "Furtună cu grindină puternică", weather_unknown: "Vreme indisponibilă",
      // Widget & holiday banner
      widget_weather_label: "Chiar acum în {city}",
      widget_updated_label: "Actualizat",
      holiday_banner_template: "Sărbătoare fericită! Astăzi este sărbătoare națională în {country}.",
      geo_consent_prompt: "Permiți localizarea precisă pentru o vreme locală mai exactă?",
      geo_consent_note: "Site-ul funcționează normal și fără ea — locația precisă este folosită doar pentru vremea locală.",
      geo_consent_allow: "Permite",
      geo_consent_deny: "Nu, mulțumesc",
    },
    pl: {
      nav_about: "O mnie", nav_services: "Usługi", nav_portfolio: "Realizacje", nav_testimonials: "Opinie", nav_contact: "Kontakt", nav_cta: "Zarezerwuj",
      hero_eyebrow: "Nail Art w domu · Lacjum", hero_title: "Paznokcie, które nie pytają o zgodę", hero_sub: "Żel i puder brokatowy, robione na miarę dla tych, którym zwykły lakier już dawno nie wystarcza. Przyjeżdżam do Ciebie, gdziekolwiek jesteś w Lacjum.", hero_cta_primary: "Zarezerwuj swoją sesję", hero_cta_secondary: "Zobacz realizacje",
      about_title: "To nie jest tylko lakier. To charakter.", about_text: "Jestem Nayla, nail artistka świadcząca usługi w domu na terenie całego Lacjum. Żadnych zatłoczonych salonów, żadnego czekania — przyjeżdżam do Ciebie z profesjonalnym stanowiskiem pracy, z taką samą starannością i tymi samymi produktami, co w topowym studiu kosmetycznym. Pracuję niemal wyłącznie w żelu i pudrze brokatowym, bo klasyczny lakier — powiedzmy sobie wprost — nie jest dla tych, którzy chcą się wyróżniać.",
      services_title: "Co robię", services_sub: "Każdy zabieg w domu, z profesjonalnymi materiałami i zachowanymi czasami utwardzania.",
      service_1_title: "Rekonstrukcja żelowa", service_1_desc: "Struktura, długość i kształt na miarę — od migdałowego po coffin, wytrzymałe i naturalne w dotyku.",
      service_2_title: "Nail art w pudrze brokatowym", service_2_desc: "Efekty ombré, chrome i full glitter, których zwykły lakier po prostu nie da.",
      service_3_title: "Semipermanentny", service_3_desc: "Dla tych, które chcą czystego, błyszczącego koloru bez zobowiązań związanych z żelem.",
      service_4_title: "Bezpieczne usuwanie", service_4_desc: "Usuwam poprzednią stylizację (nawet nie moją) bez niszczenia naturalnej płytki.",
      portfolio_title: "Moje realizacje", portfolio_sub: "Wybór tego, co wychodzi z mojej walizki.",
      portfolio_1: "Ombré Glitter Bordowy", portfolio_2: "Black & Gold Chrome", portfolio_3: "Stiletto Szmaragdowa Zieleń",
      portfolio_4: "Fade Holograficzne Srebro", portfolio_5: "Śliwka i Złoty Puder", portfolio_6: "French Matowa Czerń i Złoto",
      testimonials_title: "Co o mnie mówią", testimonials_sub: "Prawdziwe klientki z całego Lacjum.",
      contact_title: "Pogadajmy", contact_sub: "Napisz do mnie po wycenę lub żeby ustalić termin — odpisuję osobiście.",
      form_name: "Imię", form_email: "Email", form_message: "Powiedz mi, co masz w głowie", form_submit: "Wyślij zapytanie", form_note: "Formularz otwiera Twojego klienta pocztowego — żadne dane nie są zapisywane na tej stronie.",
      footer_tagline: "Nail art w domu na terenie całego Lacjum.", footer_link_privacy: "Prywatność", footer_rights: "Wszelkie prawa zastrzeżone.", year: "",
      // Weather labels (keyed to context-engine.js WEATHER_CODES / weather-themes.js labelKey)
      weather_clear: "Bezchmurnie", weather_mostly_clear: "Przeważnie bezchmurnie", weather_partly_cloudy: "Częściowe zachmurzenie",
      weather_cloudy: "Pochmurno", weather_fog: "Mgła", weather_fog_rime: "Mgła szadziowa",
      weather_drizzle_light: "Lekka mżawka", weather_drizzle_moderate: "Mżawka", weather_drizzle_dense: "Gęsta mżawka",
      weather_freezing_drizzle_light: "Lekka marznąca mżawka", weather_freezing_drizzle_dense: "Marznąca mżawka", weather_rain_light: "Lekki deszcz",
      weather_rain_moderate: "Deszcz", weather_rain_heavy: "Silny deszcz", weather_freezing_rain_light: "Lekki marznący deszcz",
      weather_freezing_rain_heavy: "Marznący deszcz", weather_snow_light: "Lekki śnieg", weather_snow_moderate: "Śnieg",
      weather_snow_heavy: "Silny śnieg", weather_snow_grains: "Ziarna śniegu", weather_rain_showers_light: "Lekkie przelotne opady",
      weather_rain_showers_moderate: "Przelotne opady deszczu", weather_rain_showers_violent: "Gwałtowne przelotne opady", weather_snow_showers_light: "Lekkie przelotne opady śniegu",
      weather_snow_showers_heavy: "Silne przelotne opady śniegu", weather_thunderstorm: "Burza", weather_thunderstorm_hail_light: "Burza z lekkim gradem",
      weather_thunderstorm_hail_heavy: "Burza z silnym gradem", weather_unknown: "Pogoda niedostępna",
      // Widget & holiday banner
      widget_weather_label: "Teraz w {city}",
      widget_updated_label: "Zaktualizowano",
      holiday_banner_template: "Wesołych świąt! Dziś jest święto narodowe w {country}.",
      geo_consent_prompt: "Zezwolić na precyzyjną lokalizację dla dokładniejszej pogody lokalnej?",
      geo_consent_note: "Strona działa bez tego równie dobrze — dokładna lokalizacja służy tylko do pogody lokalnej.",
      geo_consent_allow: "Zezwól",
      geo_consent_deny: "Nie, dziękuję",
    },
    de: {
      nav_about: "Über mich", nav_services: "Leistungen", nav_portfolio: "Arbeiten", nav_testimonials: "Bewertungen", nav_contact: "Kontakt", nav_cta: "Buchen",
      hero_eyebrow: "Nail Art auf Hausbesuch · Lazio", hero_title: "Nägel, die um keine Erlaubnis bitten", hero_sub: "Gel und Glitterpuder, maßgeschneidert für alle, denen normaler Nagellack einfach nicht reicht. Ich komme zu dir — egal wo du im Lazio bist.", hero_cta_primary: "Jetzt Termin buchen", hero_cta_secondary: "Arbeiten ansehen",
      about_title: "Das ist kein Nagellack. Das ist Persönlichkeit.", about_text: "Ich bin Nayla, mobile Nail Artist im gesamten Lazio. Keine überfüllten Salons, keine Wartezeiten: Ich bringe meine professionelle Ausrüstung zu dir — mit derselben Sorgfalt und denselben Produkten wie ein erstklassiges Kosmetikstudio. Ich arbeite fast ausschließlich mit Gel und Glitterpuder, weil klassischer Nagellack, seien wir ehrlich, nichts für die ist, die auffallen will.",
      services_title: "Was ich mache", services_sub: "Jede Behandlung beim Hausbesuch — mit Profi-Materialien und sauber eingehaltenen Einwirkzeiten.",
      service_1_title: "Gel-Aufbau", service_1_desc: "Struktur, Länge und Form nach Maß — von Mandel bis Coffin, widerstandsfähig und natürlich im Anfühlen.",
      service_2_title: "Nail Art mit Glitterpuder", service_2_desc: "Ombré-, Chrome- und Full-Glitter-Effekte, die klassischer Nagellack niemals hinbekommt.",
      service_3_title: "Semipermanent", service_3_desc: "Für alle, die saubere, strahlende Farbe wollen — ohne sich auf Gel einlassen zu müssen.",
      service_4_title: "Sichere Abnahme", service_4_desc: "Ich entferne alte Arbeiten (auch von anderen) ohne den natürlichen Nagel zu ruinieren.",
      portfolio_title: "Meine Arbeiten", portfolio_sub: "Eine Auswahl aus dem, was aus meinem Koffer kommt.",
      portfolio_1: "Ombré Glitter Bordeaux", portfolio_2: "Black & Gold Chrome", portfolio_3: "Stiletto Smaragdgrün",
      portfolio_4: "Fade Holografisches Silber", portfolio_5: "Pflaume und Goldpuder", portfolio_6: "French Matt Schwarz und Gold",
      testimonials_title: "Was sie über mich sagen", testimonials_sub: "Echte Kundinnen aus dem gesamten Lazio.",
      contact_title: "Lass uns reden", contact_sub: "Schreib mir für ein Angebot oder um einen Termin festzulegen — ich antworte persönlich.",
      form_name: "Name", form_email: "E-Mail", form_message: "Erzähl mir, was du dir vorstellst", form_submit: "Anfrage senden", form_note: "Das Formular öffnet dein E-Mail-Programm — auf dieser Seite werden keinerlei Daten gespeichert.",
      footer_tagline: "Nail Art auf Hausbesuch im gesamten Lazio.", footer_link_privacy: "Datenschutz", footer_rights: "Alle Rechte vorbehalten.", year: "",
      // Weather labels (keyed to context-engine.js WEATHER_CODES / weather-themes.js labelKey)
      weather_clear: "Klarer Himmel", weather_mostly_clear: "Überwiegend klar", weather_partly_cloudy: "Teilweise bewölkt",
      weather_cloudy: "Bewölkt", weather_fog: "Nebel", weather_fog_rime: "Reifnebel",
      weather_drizzle_light: "Leichter Nieselregen", weather_drizzle_moderate: "Nieselregen", weather_drizzle_dense: "Starker Nieselregen",
      weather_freezing_drizzle_light: "Leichter gefrierender Nieselregen", weather_freezing_drizzle_dense: "Gefrierender Nieselregen", weather_rain_light: "Leichter Regen",
      weather_rain_moderate: "Regen", weather_rain_heavy: "Starker Regen", weather_freezing_rain_light: "Leichter gefrierender Regen",
      weather_freezing_rain_heavy: "Gefrierender Regen", weather_snow_light: "Leichter Schneefall", weather_snow_moderate: "Schneefall",
      weather_snow_heavy: "Starker Schneefall", weather_snow_grains: "Schneegriesel", weather_rain_showers_light: "Leichte Schauer",
      weather_rain_showers_moderate: "Schauer", weather_rain_showers_violent: "Heftige Schauer", weather_snow_showers_light: "Leichte Schneeschauer",
      weather_snow_showers_heavy: "Starke Schneeschauer", weather_thunderstorm: "Gewitter", weather_thunderstorm_hail_light: "Gewitter mit leichtem Hagel",
      weather_thunderstorm_hail_heavy: "Gewitter mit starkem Hagel", weather_unknown: "Wetter nicht verfügbar",
      // Widget & holiday banner
      widget_weather_label: "Gerade jetzt in {city}",
      widget_updated_label: "Aktualisiert",
      holiday_banner_template: "Frohen Feiertag! Heute ist ein gesetzlicher Feiertag in {country}.",
      geo_consent_prompt: "Präzisen Standort für genaueres lokales Wetter zulassen?",
      geo_consent_note: "Die Seite funktioniert auch ohne — der genaue Standort wird nur für das lokale Wetter verwendet.",
      geo_consent_allow: "Zulassen",
      geo_consent_deny: "Nein danke",
    },
  };
  const defaultLang = 'it'; // Nayla's primary audience is Italian (Lazio home-service)
  let currentLang = (navigator.language || navigator.userLanguage || 'it').split('-')[0];
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
    const yearEl = document.querySelector('[data-i18n="year"]');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  document.addEventListener('DOMContentLoaded', () => {
    localize(currentLang);
    langSelectEl = document.getElementById('langSelect');
    if (langSelectEl) {
      langSelectEl.value = currentLang in translations ? currentLang : defaultLang;
      langSelectEl.addEventListener('change', (e) => {
        manualOverride = true; // a manual pick always wins over context-based detection
        localize(e.target.value);
      });
    }
  });

  // Bridge used by integration.js (context wiring). A manual language pick
  // always wins — this only applies the detected language pre-emptively.
  window.NaylaI18n = {
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
