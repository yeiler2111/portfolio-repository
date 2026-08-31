import type { Project } from "@/utils/types";

/**
 * Proyectos propios. Campos de texto bilingües: `t()` no tiene fallback, así que
 * omitir `en` deja la card vacía en inglés.
 *
 * Orden intencionado: primero el trabajo real (producto en producción y proyecto
 * en curso), después los personales/académicos.
 */
export const projects: Project[] = [
  {
    id: "tocata",
    title: {
      es: "Tocata — Solicitud de canciones para karaokes",
      en: "Tocata — Song requests for karaoke bars",
    },
    description: {
      es: "Producto propio en producción, rentado a un karaoke de Santa Marta. El sistema gestiona y organiza el orden en que las mesas piden sus canciones: cada solicitud entra a una cola priorizada, e incorpora un algoritmo de recomendación que sugiere qué poner a continuación a partir de lo que van pidiendo las distintas mesas, para mantener el ritmo de la noche. El DJ es el gestor de toda la operación y trabaja desde una app de escritorio en Electron que concentra las herramientas: comandas agrupadas por mesa, biblioteca local con descarga desde YouTube, cola de reproducción, control de la pantalla de proyección en un segundo monitor y normalización de sonoridad para que todas las canciones salgan al mismo nivel. Son tres aplicaciones sobre un mismo backend en tiempo real: la de escritorio del DJ, una app Android con Capacitor para los meseros —que administra puestos por zona y genera un QR por mesa— y una web pública sin login que se abre al escanear ese QR, donde el cliente arma su lista de karaoke o música y la envía. El backend corre en AWS Lightsail con Express, Socket.IO, Prisma sobre PostgreSQL y sesiones de mesa en Redis, con autenticación JWT por rol. El escritorio se distribuye como instalador con auto-actualización.",
      en: "My own product, live in production and rented to a karaoke bar in Santa Marta. The system manages and organises the order in which tables request their songs: every request enters a prioritised queue, and a recommendation algorithm suggests what to play next based on what the different tables are asking for, keeping the night flowing. The DJ runs the whole operation from an Electron desktop app that brings the tools together: song orders grouped by table, a local library with YouTube downloads, a playback queue, control of the projection screen on a second monitor, and loudness normalisation so every track plays at the same level. It is three applications on top of a single real-time backend: the DJ desktop app, a Capacitor Android app for the waiters —managing seats by zone and generating a QR code per table— and a public, login-free web app that opens when the customer scans that QR, where they build their karaoke or music list and submit it. The backend runs on AWS Lightsail with Express, Socket.IO, Prisma over PostgreSQL and table sessions in Redis, with role-based JWT authentication. The desktop app ships as an installer with auto-updates.",
    },
    // Orden: el panel del DJ, el flujo del cliente por QR, la app de meseros
    // y la pantalla de proyección. Cubre las tres aplicaciones.
    images: [
      "/img/tocata/dj-biblioteca.webp",
      "/img/tocata/cliente-pedir.webp",
      "/img/tocata/cliente-enviada.webp",
      "/img/tocata/meseros-qr.webp",
      "/img/tocata/dj-presentacion.webp",
    ],
    technologies: [
      "Vue 3",
      "TypeScript",
      "Electron",
      "Capacitor",
      "Socket.IO",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Redis",
      "AWS Lightsail",
      "Tailwind CSS",
    ],
    highlights: {
      es: [
        "Rentado a un karaoke en Santa Marta, en operación",
        "Tres aplicaciones sobre un mismo backend en tiempo real",
        "Cola priorizada con recomendador de canciones",
      ],
      en: [
        "Rented to a karaoke bar in Santa Marta, up and running",
        "Three applications on a single real-time backend",
        "Prioritised queue with a song recommender",
      ],
    },
    status: "revenue",
    context: {
      es: "Producto propio · Santa Marta",
      en: "Own product · Santa Marta",
    },
     note: {
      es: "Repositorio privado. Escríbeme si quieres conocer más detalles del proyecto.",
      en: "Private repository. Get in touch if you would like to know more about it.",
    },
  },
  {
    id: "icar-rsa",
    title: {
      es: "ICAR-RSA — Monitoreo de residuos en playas turísticas",
      en: "ICAR-RSA — Waste monitoring on tourist beaches",
    },
    description: {
      es: "Aplicación móvil para el monitoreo de residuos sólidos en playas turísticas siguiendo la metodología científica ICAPTU. El equipo de campo recorre la playa dividida en cuadrículas y registra cada muestreo con conteo por tipo de residuo, fotografías y geolocalización del punto. Está diseñada offline-first porque en la playa no hay señal: todo se captura sobre una base SQLite local y se sincroniza contra el servidor cuando vuelve la conexión. Con esos datos calcula los índices PRS y CAR, asigna un grado y un nivel de riesgo a cada tramo, y genera alertas priorizadas que el administrador revisa ordenadas por urgencia para decidir dónde intervenir primero. El motor de índices está escrito en TypeScript puro, sin dependencias de la interfaz, para poder recalcularlo también en la ingesta del servidor y no confiar en lo que envía el cliente. Cubierto por 264 pruebas automatizadas entre la app y la API.",
      en: "Mobile app for monitoring solid waste on tourist beaches, following the ICAPTU scientific methodology. Field teams walk the beach split into grid cells and record each sample with counts by waste type, photographs and the geolocation of the point. It is offline-first by design because there is no signal on the beach: everything is captured into a local SQLite database and synced to the server once connectivity returns. From that data it computes the PRS and CAR indices, assigns a grade and risk level to each stretch, and raises prioritised alerts that the administrator reviews sorted by urgency to decide where to act first. The index engine is written in plain TypeScript, free of UI dependencies, so it can also recompute on server ingestion instead of trusting what the client sends. Covered by 264 automated tests across app and API.",
    },
    // Resumen, bandeja de muestreos y mapa, compuestos en una sola imagen apaisada.
    images: ["/img/icar-rsa/app-monitoreo.webp"],
    technologies: [
      "Expo SDK 54",
      "React Native",
      "TypeScript",
      "expo-sqlite",
      "Zustand",
      "Express 5",
      "PostgreSQL",
      "Vitest",
    ],
    highlights: {
      es: [
        "Offline-first: SQLite local y sincronización diferida",
        "264 pruebas automatizadas entre la app y la API",
        "Índices PRS y CAR recalculados en el servidor",
      ],
      en: [
        "Offline-first: local SQLite with deferred sync",
        "264 automated tests across the app and the API",
        "PRS and CAR indices recomputed server-side",
      ],
    },
    status: "production",
    context: {
      es: "Metodología ICAPTU · repositorio privado",
      en: "ICAPTU methodology · private repository",
    },
     note: {
      es: "Repositorio privado. Escríbeme si quieres conocer más detalles del proyecto.",
      en: "Private repository. Get in touch if you would like to know more about it.",
    },
  },
  {
    id: "seprinort",
    title: {
      es: "SEPRINORT — Landing de seguridad privada",
      en: "SEPRINORT — Private security landing page",
    },
    description: {
      es: "Landing corporativa en producción para SEPRINORT LTDA, empresa de seguridad privada de Cúcuta constituida en 2001 y administrada por la Sociedad de Activos Especiales (SAE). Es una página única con navegación por secciones: servicios en acordeón (vigilancia con y sin arma, monitoreo electrónico 24/7, sistemas CCTV), quiénes somos, marco legal, economía circular estatal y contacto, con un selector de WhatsApp para solicitar cotización. Construida con React 18 y Vite, con CSS propio en lugar de un framework de estilos, iconografía de lucide y animaciones de entrada al hacer scroll. Incluye trabajo de posicionamiento: title y meta description orientados a búsqueda local, keywords del sector, Open Graph e indexación abierta; según el propietario, hoy aparece de primera en las búsquedas de su sector. Publicada en el portafolio con su autorización.",
      en: "Corporate landing page in production for SEPRINORT LTDA, a private security company from Cúcuta, incorporated in 2001 and managed by Colombia's Special Assets Agency (SAE). A single page with section-based navigation: services in an accordion (armed and unarmed guarding, 24/7 electronic monitoring, CCTV systems), about us, legal framework, state circular economy and contact, with a WhatsApp selector to request a quote. Built with React 18 and Vite, using handwritten CSS instead of a styling framework, lucide icons and scroll-triggered entrance animations. It includes SEO work: title and meta description aimed at local search, industry keywords, Open Graph and open indexing; according to the owner it currently ranks first for its sector. Published here with their permission.",
    },
    images: [
      "/img/seprinort/hero.webp",
      "/img/seprinort/servicios.webp",
      "/img/seprinort/nosotros.webp",
    ],
    technologies: [
      "React 18",
      "Vite 5",
      "JavaScript",
      "lucide-react",
      "CSS propio",
      "SEO",
      "Netlify",
    ],
    highlights: {
      es: [
        "Cliente real: empresa administrada por la SAE",
        "Primera en búsquedas de su sector, según el propietario",
        "CSS propio, sin framework de estilos",
      ],
      en: [
        "Real client: a company managed by Colombia's SAE",
        "Ranks first in its sector's searches, according to the owner",
        "Handwritten CSS, no styling framework",
      ],
    },
    status: "client",
    context: {
      es: "SEPRINORT LTDA · Cúcuta",
      en: "SEPRINORT LTDA · Cúcuta",
    },
    link: "https://seprinort.com/",
  },
  /*
   * Boda y XV fueron dos encargos distintos, pero son el mismo motor: enlace
   * único por invitado, RSVP y panel de gestión. Ocupaban dos tarjetas con la
   * misma narrativa; juntas cuentan algo mejor —que el producto se reusó y se
   * adaptó— y liberan un slot en la parrilla.
   */
  {
    id: "invitaciones-digitales",
    title: {
      es: "Invitaciones digitales con RSVP y panel de gestión",
      en: "Digital invitations with RSVP and a management panel",
    },
    description: {
      es: "Un mismo motor de invitaciones desplegado en dos eventos reales, una boda y unos XV años. La pieza central es el enlace único por invitado: cada URL carga su nombre, sus cupos y los eventos a los que está invitado, confirma asistencia y —en la boda— elige menú. Detrás hay un panel de gestión con estadísticas de confirmación, cupos comprometidos y disponibles, listado de invitados con acompañantes, y generación de enlaces con el mensaje de WhatsApp listo para enviar. El backend es Express con Prisma sobre PostgreSQL en ambos casos; lo que cambia es la capa de experiencia: la boda es Vue 3 + TypeScript con Pinia y un recorrido por secciones, y los XV son un recorrido a pantalla completa animado con GSAP, con gráficos en Chart.js dentro del panel. Para poder enseñarlas sin backend y sin exponer datos reales de invitados, las dos tienen modo demostración con datos ficticios: en la boda el RSVP se guarda en el navegador y funciona de punta a punta; en los XV las escrituras se rechazan a propósito con un aviso, para que se vea dónde termina el frontend y empieza el servidor.",
      en: "One invitation engine deployed for two real events, a wedding and a quinceañera. The core piece is the per-guest link: each URL loads their name, their seats and the events they are invited to, takes the RSVP and —for the wedding— the menu choice. Behind it sits a management panel with RSVP statistics, committed and available seats, the guest list with companions, and link generation with a ready-to-send WhatsApp message. The backend is Express with Prisma over PostgreSQL in both cases; what changes is the experience layer: the wedding is Vue 3 + TypeScript with Pinia and a section-by-section journey, while the quinceañera is a full-screen journey animated with GSAP, with Chart.js charts inside the panel. To be able to show them without a backend and without exposing real guest data, both ship a demo mode with fictional data: in the wedding the RSVP is stored in the browser and works end to end; in the quinceañera writes are deliberately rejected with a notice, so it is clear where the frontend ends and the server begins.",
    },
    images: [
      "/img/matrimonio/invitacion-hero.webp",
      "/img/matrimonio/invitacion-rsvp.webp",
      "/img/nicolle-xv/invitacion.webp",
      "/img/nicolle-xv/panel.webp",
    ],
    technologies: [
      "Vue 3",
      "TypeScript",
      "Pinia",
      "Tailwind CSS",
      "GSAP",
      "Chart.js",
      "Express",
      "Prisma",
      "PostgreSQL",
    ],
    highlights: {
      es: [
        "Un motor reusado en dos eventos reales, con distinta capa de experiencia",
        "URL única por invitado y panel con estadísticas y generación de enlaces",
        "Modo demo sin backend, con el RSVP funcionando de punta a punta",
      ],
      en: [
        "One engine reused across two real events, with a different experience layer",
        "A unique URL per guest and a panel with statistics and link generation",
        "Demo mode without a backend, with the RSVP working end to end",
      ],
    },
    status: "demo",
    context: {
      es: "Proyecto personal",
      en: "Personal project",
    },
    /*
     * Cuatro entradas: cada evento se recorre como invitado y como quien lo
     * organiza. En `sm` caen en una rejilla 2x2, una fila por evento.
     */
    links: [
      {
        label: { es: "Boda · invitado", en: "Wedding · guest" },
        url: "https://wedding-invitation-yeiler.netlify.app/",
      },
      {
        label: { es: "Boda · panel", en: "Wedding · panel" },
        url: "https://wedding-invitation-yeiler.netlify.app/admin/login",
        hint: { es: "Boda, contraseña: demo", en: "Wedding, password: demo" },
      },
      {
        label: { es: "XV · invitado", en: "Quinceañera · guest" },
        url: "https://myfiffteendbirthday.netlify.app/",
      },
      {
        label: { es: "XV · panel", en: "Quinceañera · panel" },
        url: "https://myfiffteendbirthday.netlify.app/admin",
        hint: { es: "XV, PIN: 0000", en: "Quinceañera, PIN: 0000" },
      },
    ],
  },
  {
    id: "puc-app",
    title: {
      es: "PUC App (Plan Único De Cuentas)",
      en: "PUC App (Chart of Accounts)",
    },
    description: {
      es: "Aplicación publicada en Google Play para consultar el Plan Único de Cuentas. Desarrollada con React (web) y React Native (móvil), compartiendo lógica y estilos para mantener consistencia entre ambos entornos. La interfaz, diseñada con Tailwind CSS, ofrece una experiencia moderna, limpia y adaptable en dispositivos móviles.",
      en: "App published on Google Play to browse Colombia's Chart of Accounts (PUC). Built with React (web) and React Native (mobile), sharing logic and styles to keep consistency across both environments. The interface, designed with Tailwind CSS, offers a modern, clean and adaptable experience on mobile devices.",
    },
    images: [
      "/img/puc/pageWeb.png",
      "/img/puc/appMobil.jpg",
      "/img/puc/appMobil2.jpg",
    ],
    technologies: ["React", "React Native", "Tailwind CSS", "Google Play"],
    highlights: {
      es: [
        "Publicada en Google Play",
        "Lógica y estilos compartidos entre web y móvil",
      ],
      en: [
        "Published on Google Play",
        "Logic and styles shared between web and mobile",
      ],
    },
    status: "store",
    context: {
      es: "Web y móvil",
      en: "Web and mobile",
    },
    link: "https://play.google.com/store/apps/details?id=com.yeiler2209.puc&hl=es_CO",
  },
  {
    id: "ml-japanese-characters",
    title: {
      es: "Trabajo Final ML — Clasificación de caracteres japoneses",
      en: "Final ML Project — Japanese character classification",
    },
    description: {
      es: "Proyecto académico de Machine Learning centrado en la clasificación de caracteres japoneses (hiragana) a partir de imágenes 28x28 píxeles. El notebook principal desarrolla todo el flujo de análisis: desde la carga y limpieza de datos hasta la reducción de dimensionalidad con PCA y la evaluación de un modelo de Regresión Logística multinomial. El dataset contiene 10.000 registros de 10 clases distintas, con visualización de resultados mediante Plotly y seaborn.",
      en: "Academic Machine Learning project focused on classifying Japanese (hiragana) characters from 28x28 pixel images. The main notebook covers the full analysis pipeline: from data loading and cleaning to dimensionality reduction with PCA and evaluation of a multinomial Logistic Regression model. The dataset contains 10,000 records across 10 distinct classes, with results visualized using Plotly and seaborn.",
    },
    images: [
      "/img/ml/caracteres_dataset.png",
      "/img/ml/matriz_confusion.png",
      "/img/ml/correlacion_pca.webp",
    ],
    technologies: [
      "Python 3.12",
      "scikit-learn",
      "pandas",
      "numpy",
      "matplotlib",
      "seaborn",
      "plotly",
      "scipy",
      "Jupyter Notebook",
    ],
    highlights: {
      es: [
        "10.000 imágenes repartidas en 10 clases de hiragana",
        "PCA y regresión logística multinomial",
      ],
      en: [
        "10,000 images across 10 hiragana classes",
        "PCA and multinomial logistic regression",
      ],
    },
    status: "academic",
    context: {
      es: "Machine Learning",
      en: "Machine Learning",
    },
    link: "https://github.com/yeiler2111/classificationHiraganaCharacters",
  },
];
