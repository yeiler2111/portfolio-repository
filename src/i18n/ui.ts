import type { Localized } from "@/i18n";

type UiLeaf = Localized<string>;

/** Cadenas de interfaz (no de contenido) en ES/EN. */
export const ui = {
  language: { es: "Idioma", en: "Language" } as UiLeaf,

  hero: {
    greeting: { es: "Hola, soy", en: "Hi, I'm" },
    available: {
      es: "Disponible para nuevos proyectos",
      en: "Available for new projects",
    },
    contact: { es: "Contáctame", en: "Get in touch" },
    downloadCV: { es: "Descargar CV", en: "Download CV" },
    viewCases: { es: "Ver casos", en: "View cases" },
    stats: {
      years: { es: "Años de experiencia", en: "Years of experience" },
      projects: { es: "Proyectos", en: "Projects" },
      companies: { es: "Empresas y clientes", en: "Companies & clients" },
      technologies: { es: "Tecnologías", en: "Technologies" },
    },
  },

  cases: {
    eyebrow: { es: "Casos de estudio", en: "Case studies" },
    title: {
      es: "Del problema de negocio al resultado",
      en: "From business problem to result",
    },
    subtitle: {
      es: "Cómo abordo proyectos reales: el reto que enfrenté, la arquitectura que diseñé y el impacto que dejó. Show, don't tell.",
      en: "How I approach real projects: the challenge I faced, the architecture I designed, and the impact I left. Show, don't tell.",
    },
    note: {
      es: "Son productos privados bajo acuerdos de confidencialidad. Puedo aportar referencias verificables de cada empresa a solicitud.",
      en: "These are private products under confidentiality agreements. I can provide verifiable references for each company on request.",
    },
    noteStrong: { es: "referencias verificables", en: "verifiable references" },
    current: { es: "Actual", en: "Current" },
    challenge: { es: "El reto", en: "The challenge" },
    architecture: { es: "Arquitectura", en: "Architecture" },
    outcome: { es: "Resultado", en: "Outcome" },
    viewMore: { es: "Ver más", en: "View more" },
  },

  experience: {
    eyebrow: { es: "Trayectoria", en: "Career" },
    title: { es: "Experiencia laboral", en: "Work experience" },
    subtitle: {
      es: "Empresas y equipos con los que he construido productos reales, del frontend a la infraestructura.",
      en: "Companies and teams with which I've built real products, from frontend to infrastructure.",
    },
    current: { es: "Actual", en: "Current" },
    visit: { es: "Visitar sitio", en: "Visit site" },
  },

  skills: {
    eyebrow: { es: "Skills", en: "Skills" },
    title: {
      es: "Un perfil versátil de extremo a extremo",
      en: "A versatile end-to-end profile",
    },
    subtitle: {
      es: "Del frontend multi-framework al backend y la arquitectura de microservicios en la nube: elijo la herramienta según el problema, no al revés.",
      en: "From multi-framework frontend to backend and cloud microservice architecture: I pick the tool for the problem, not the other way around.",
    },
  },

  tech: {
    eyebrow: { es: "Tech Stack", en: "Tech Stack" },
    title: { es: "Tecnologías & Herramientas", en: "Technologies & Tools" },
    subtitle: {
      es: "Stack completo con el que desarrollo soluciones modernas, escalables y mantenibles.",
      en: "Full stack I use to build modern, scalable and maintainable solutions.",
    },
  },

  process: {
    eyebrow: { es: "Cómo trabajo", en: "How I work" },
    title: {
      es: "Un proceso claro, de la idea a producción",
      en: "A clear process, from idea to production",
    },
    subtitle: {
      es: "Sin sorpresas: sabes qué esperar en cada etapa y ves avances de forma continua.",
      en: "No surprises: you know what to expect at each stage and see progress continuously.",
    },
    step: { es: "Paso", en: "Step" },
  },

  projects: {
    eyebrow: { es: "Más trabajo", en: "More work" },
    title: {
      es: "Proyectos propios",
      en: "My own projects",
    },
    subtitle: {
      es: "Producto en producción, trabajo en curso y proyectos personales donde exploro nuevas tecnologías.",
      en: "A product in production, work in progress and personal projects where I explore new technologies.",
    },
    view: { es: "Ver proyecto", en: "View project" },
    readMore: { es: "Leer más", en: "Read more" },
    readLess: { es: "Leer menos", en: "Read less" },
    status: {
      production: { es: "En producción", en: "In production" },
      inProgress: { es: "En desarrollo", en: "In progress" },
      archived: { es: "Archivado", en: "Archived" },
    },
    noPreview: {
      es: "Capturas próximamente",
      en: "Screenshots coming soon",
    },
    screenshotAlt: { es: "captura", en: "screenshot" },
    prevImage: { es: "Imagen anterior", en: "Previous image" },
    nextImage: { es: "Imagen siguiente", en: "Next image" },
    goToImage: { es: "Ir a la imagen", en: "Go to image" },
    prevProject: { es: "Proyecto anterior", en: "Previous project" },
    nextProject: { es: "Proyecto siguiente", en: "Next project" },
  },

  about: {
    eyebrow: { es: "Sobre mí", en: "About me" },
    title: {
      es: "Un poco más sobre mi trayectoria",
      en: "A bit more about my journey",
    },
    subtitle: {
      es: "Conoce mi enfoque, mi filosofía y lo que me impulsa como desarrollador.",
      en: "Get to know my approach, my philosophy and what drives me as a developer.",
    },
  },

  testimonials: {
    eyebrow: { es: "Prueba social", en: "Social proof" },
    title: {
      es: "Lo que dicen de trabajar conmigo",
      en: "What people say about working with me",
    },
  },

  contact: {
    eyebrow: { es: "Contacto", en: "Contact" },
    title: {
      es: "¿Listo para dar vida a tu próximo proyecto?",
      en: "Ready to bring your next project to life?",
    },
    lead: {
      es: "Si tienes una idea en mente o necesitas ayuda con tu proyecto, me encantaría escucharte. Trabajemos juntos para crear algo increíble.",
      en: "If you have an idea in mind or need help with your project, I'd love to hear from you. Let's work together to build something amazing.",
    },
    send: { es: "Enviar mensaje", en: "Send message" },
    directEmail: { es: "Email directo", en: "Direct email" },
    connectVia: { es: "O conéctate conmigo en", en: "Or connect with me on" },
    features: {
      fastTitle: { es: "Respuesta rápida", en: "Fast response" },
      fastDesc: {
        es: "Respondo en menos de 24 horas",
        en: "I reply in under 24 hours",
      },
      freeTitle: { es: "Consulta gratuita", en: "Free consultation" },
      freeDesc: {
        es: "Primera reunión sin compromiso",
        en: "First meeting, no commitment",
      },
      flexTitle: { es: "Colaboración flexible", en: "Flexible collaboration" },
      flexDesc: {
        es: "Freelance o tiempo completo",
        en: "Freelance or full-time",
      },
    },
  },

  contactPage: {
    title: { es: "Contáctame", en: "Get in touch" },
    description: {
      es: "Completa el formulario y me pondré en contacto contigo lo antes posible",
      en: "Fill out the form and I'll get back to you as soon as possible",
    },
    name: { es: "Nombre completo", en: "Full name" },
    namePlaceholder: { es: "Tu nombre", en: "Your name" },
    email: { es: "Correo electrónico", en: "Email address" },
    emailPlaceholder: { es: "tu@email.com", en: "you@email.com" },
    subject: { es: "Asunto", en: "Subject" },
    subjectPlaceholder: {
      es: "¿De qué trata tu mensaje?",
      en: "What is your message about?",
    },
    message: { es: "Mensaje", en: "Message" },
    messagePlaceholder: {
      es: "Escribe tu mensaje aquí...",
      en: "Write your message here...",
    },
    send: { es: "Enviar mensaje", en: "Send message" },
    sending: { es: "Enviando...", en: "Sending..." },
    findMeAlso: {
      es: "También puedes encontrarme en",
      en: "You can also find me on",
    },
    validationError: {
      es: "Por favor, completa todos los campos correctamente.",
      en: "Please fill in all fields correctly.",
    },
    success: {
      es: "¡Mensaje enviado exitosamente! Te responderé pronto.",
      en: "Message sent successfully! I'll reply soon.",
    },
    sendError: {
      es: "Error al enviar el mensaje. Por favor, inténtalo de nuevo.",
      en: "Error sending the message. Please try again.",
    },
  },

  footer: {
    navHeading: { es: "Navegación", en: "Navigation" },
    connectHeading: { es: "Conectemos", en: "Let's connect" },
    rights: {
      es: "Todos los derechos reservados.",
      en: "All rights reserved.",
    },
  },

  theme: {
    toLight: { es: "Activar modo claro", en: "Switch to light mode" },
    toDark: { es: "Activar modo oscuro", en: "Switch to dark mode" },
  },

  menu: {
    open: { es: "Abrir menú", en: "Open menu" },
    close: { es: "Cerrar menú", en: "Close menu" },
  },

  toast: {
    dismiss: { es: "Cerrar aviso", en: "Dismiss notification" },
  },

  skipToContent: {
    es: "Saltar al contenido principal",
    en: "Skip to main content",
  },
};
