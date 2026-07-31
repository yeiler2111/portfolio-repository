import type { NavigationOption, SocialLink } from "@/utils/types";
import { jobs, techCategories } from "@/data/data";

/** Total de tecnologías listadas en la sección Tech Stack. */
const techCount = techCategories.reduce((n, c) => n + c.techs.length, 0);

/**
 * URL canónica del sitio, sin barra final. Se usa para og:url, canonical,
 * JSON-LD y sitemap, así que debe coincidir con el dominio realmente
 * publicado. Si algún día se activa un dominio propio, este es el único
 * sitio que hay que tocar (y `public/robots.txt`).
 */
export const SITE_URL = "https://portfolio-yeiler.netlify.app";

/** Identidad / hero */
export const profile = {
  name: "Yeiler Simons",
  role: { es: "Ingeniero de Sistemas", en: "Systems Engineer" },
  focus: {
    es: "Full Stack · Arquitectura de microservicios",
    en: "Full Stack · Microservice architecture",
  },
  tagline: {
    es: "Ayudo a empresas y equipos a llevar productos web de la idea a producción: interfaces rápidas y accesibles, backends escalables y arquitecturas de microservicios en AWS que sostienen el crecimiento.",
    en: "I help companies and teams take web products from idea to production: fast, accessible interfaces, scalable backends and microservice architectures on AWS that sustain growth.",
  },
  location: "Santa Marta, Colombia",
  available: true,
  image: {
    src: "/img/imagen_mia_240.webp",
    alt: "Retrato de Yeiler Simons",
    sources: [
      { srcset: "/img/imagen_mia_768.webp", media: "(min-width: 1024px)", type: "image/webp" },
      { srcset: "/img/imagen_mia_480.webp", media: "(min-width: 641px)", type: "image/webp" },
    ],
  },
};

/**
 * Métricas del hero.
 *
 * Se derivan de los propios datos del portafolio en vez de escribirse a mano:
 * antes decía "20+ Proyectos" mostrando 2 y "10+ Tecnologías" listando 29, y
 * una cifra que la misma página contradice resta credibilidad en lugar de
 * sumarla. Ahora cada número se puede comprobar bajando a su sección.
 *
 * `years` sigue siendo manual porque depende de la fecha de inicio profesional,
 * que no está modelada.
 */
export const stats = [
  { value: "3+", labelKey: "years" as const },
  { value: String(jobs.length), labelKey: "companies" as const },
  { value: `${Math.floor(techCount / 5) * 5}+`, labelKey: "technologies" as const },
];

/** Navegación in-page (secciones de la home) */
export const navItems: NavigationOption[] = [
  { id: "cases", label: { es: "Casos", en: "Cases" } },
  { id: "experience", label: { es: "Experiencia", en: "Experience" } },
  { id: "skills", label: { es: "Skills", en: "Skills" } },
  { id: "process", label: { es: "Proceso", en: "Process" } },
  { id: "projects", label: { es: "Proyectos", en: "Projects" } },
  { id: "about", label: { es: "Sobre mí", en: "About" } },
];

/** CVs descargables */
export const resumes = [
  {
    label: "CV · ATS",
    description: {
      es: "Formato simple, optimizado para filtros automáticos",
      en: "Simple format, optimized for automated filters",
    },
    href: "/documents/HvAts.pdf",
    filename: "Yeiler-Simons-CV-ATS.pdf",
  },
  {
    label: "CV · Harvard",
    description: {
      es: "Formato visual, ideal para leer directamente",
      en: "Visual format, ideal for reading directly",
    },
    href: "/documents/hvHarvard.pdf",
    filename: "Yeiler-Simons-CV-Visual.pdf",
  },
];

/** Redes / contacto */
export const socials: SocialLink[] = [
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com/yeiler2111",
    icon: "github",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/yeiler-andres-simons-romero-86b578261/",
    icon: "linkedin",
  },
];

/**
 * Contacto directo. Valores reales centralizados (ya no dependen de
 * variables de entorno). `phone` debe ir solo con dígitos e indicativo
 * de país para que funcione el enlace de WhatsApp (wa.me).
 */
export const contact = {
  email: "yeiler2209@gmail.com",
  phone: "573005199147", // indicativo + número, sin signos (para wa.me)
  whatsappText: "Hola Yeiler, vi tu portafolio y me gustaría conversar contigo.",
  linkedin: "https://www.linkedin.com/in/yeiler-andres-simons-romero-86b578261/",
  github: "https://github.com/yeiler2111",
};
