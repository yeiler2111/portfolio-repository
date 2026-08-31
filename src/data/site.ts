import type { NavigationOption, SocialLink } from "@/utils/types";
import { careerStart, jobs } from "@/data/data";
import { skillGroups } from "@/data/skills";
import { monthsBetween } from "@/utils/duration";

/**
 * Total de tecnologías del stat del hero.
 *
 * Antes se derivaba de `techCategories`, cuya sección está comentada en
 * `Home.vue`: el número apuntaba a algo que el visitante no podía bajar a
 * comprobar. Ahora sale de `skillGroups`, que sí está en la página.
 */
const techCount = skillGroups.reduce((n, g) => n + g.items.length, 0);

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
  /**
   * En español "Ingeniero de Sistemas" es el título profesional literal. En
   * inglés "Systems Engineer" significa infraestructura/SRE fuera de Colombia,
   * que no es el puesto que se busca: por eso el inglés no es una traducción.
   */
  role: { es: "Ingeniero de Sistemas", en: "Full Stack Engineer" },
  focus: {
    es: "Full Stack de producto · Construyo y opero en producción",
    en: "Product-minded Full Stack · I build and operate in production",
  },
  tagline: {
    es: "Ayudo a empresas y equipos a llevar productos web de la idea a producción — y a operarlos una vez ahí: interfaces rápidas y accesibles, backends escalables en AWS, CI/CD y soporte real cuando algo falla.",
    en: "I help companies and teams take web products from idea to production — and keep them running once they are there: fast, accessible interfaces, scalable backends on AWS, CI/CD and real support when something breaks.",
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
 * `years` se deriva de `careerStart`, pero con un suelo manual: hoy el único
 * puesto con fechas es Alegra, así que la derivación sola daría "0+ años". En
 * cuanto los puestos anteriores tengan `start`/`end`, la derivación supera al
 * suelo y toma el control sin que haya que tocar nada aquí.
 */
const YEARS_FLOOR = 3;
const derivedYears = careerStart
  ? Math.floor(monthsBetween(careerStart) / 12)
  : 0;
const years = Math.max(YEARS_FLOOR, derivedYears);

export const stats = [
  { value: `${years}+`, labelKey: "years" as const },
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
