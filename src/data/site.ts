import type { NavigationOption, SocialLink } from "@/utils/types";

/** Identidad / hero */
export const profile = {
  name: "Yeiler Simons",
  role: "Ingeniero de Sistemas",
  focus: "Desarrollo de software · Vue.js",
  tagline:
    "Construyo interfaces rápidas, accesibles y mantenibles. Especializado en Vue 3, TypeScript y arquitecturas front escalables.",
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

/** Métricas del hero */
export const stats = [
  { value: "3+", label: "Años de experiencia" },
  { value: "20+", label: "Proyectos" },
  { value: "10+", label: "Tecnologías" },
];

/** Navegación in-page (secciones de la home) */
export const navItems: NavigationOption[] = [
  { id: "skills", label: "Skills" },
  { id: "technologies", label: "Tecnologías" },
  { id: "experience", label: "Experiencia" },
  { id: "projects", label: "Proyectos" },
  { id: "about", label: "Sobre mí" },
];

/** CVs descargables */
export const resumes = [
  {
    label: "CV · ATS",
    description: "Formato simple, optimizado para filtros automáticos",
    href: "/documents/HvAts.pdf",
    filename: "Yeiler-Simons-CV-ATS.pdf",
  },
  {
    label: "CV · Harvard",
    description: "Formato visual, ideal para leer directamente",
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
