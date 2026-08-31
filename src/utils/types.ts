

export interface Tech {
  name: string;
  icon: string;
}
export interface BaseComponent {
  id?: string;
  className?: string;
}

import type { Localized } from "@/i18n";

export interface Technology {
  name: string;
  icon?: string;
  color?: string;
}

/**
 * Estado real del proyecto. Determina el badge que pinta la card:
 * `production` (verde) para producto desplegado, `in-progress` (ámbar) para
 * trabajo en curso, `archived` para lo que ya no se mantiene.
 *
 * Rangos, de mayor a menor. Antes solo existía `production` y lo llevaban 6 de
 * 7 proyectos: un producto que un cliente paga lucía igual que una invitación
 * personal desplegada en Netlify. El distintivo que debía diferenciar era el
 * que aplanaba. Cada rango tiene ahora peso visual propio (ver STATUS_RANK).
 */
export type ProjectStatus =
  /** Producto propio con cliente pagando. El rango más alto. */
  | "revenue"
  /** En producción con usuarios reales, sin ingreso directo. */
  | "production"
  /** Entregado a un cliente real y vivo en su dominio. */
  | "client"
  /** Publicado en una tienda de aplicaciones. */
  | "store"
  /** Proyecto personal con demo navegable. No es producción. */
  | "demo"
  /** Trabajo académico o exploratorio. */
  | "academic"
  /** Todavía en construcción. */
  | "in-progress"
  /** Ya no se mantiene. */
  | "archived";

/** Una forma de entrar al proyecto, ej. "Ver como invitado" / "Ver el panel". */
export interface ProjectLink {
  label: Localized;
  url: string;
  /** Credencial o aclaración corta, ej. "PIN 0000". */
  hint?: Localized;
}

export interface Project {
  id: string;
  title: Localized;
  description: Localized;
  images: string[];
  technologies: string[];
  status?: ProjectStatus;
  /**
   * Dos o tres hechos duros, visibles sin desplegar la descripción.
   *
   * La prosa vive recortada a tres líneas por `line-clamp`, así que lo que más
   * pesa ("rentado a un karaoke", "264 pruebas automatizadas") quedaba oculto
   * tras un "Leer más" que casi nadie pulsa. Estos bullets ocupan ese hueco y
   * la descripción completa pasa a ser lo que revela el desplegable.
   */
  highlights?: Localized<string[]>;
  /** Contexto corto para el badge, ej. "Producto propio · en producción". */
  context?: Localized;
  /** Aviso corto bajo la descripción, ej. repositorio privado + contacto. */
  note?: Localized;
  /** Opcional: hay proyectos sin demo ni repo público. */
  link?: string;
  /**
   * Varias entradas al mismo proyecto (por rol). Si está, sustituye a `link`:
   * una demo con panel de administración se recorre distinto según quién entre.
   */
  links?: ProjectLink[];
}


export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  icon: string;
  period: string;
  description: string;
  /** Opcional: no todos los puestos tienen un sitio público al que enlazar. */
  link?: string;
  current?: boolean;
  technologies?: string[];
}


export interface AboutCard {
  id: string;
  title: string;
  textContent: string;
  icon?: string;
}


/** Caso de estudio: Problema → Arquitectura → Resultado. */
export interface CaseStudy {
  id: string;
  /** Empresa / contexto del proyecto. */
  client: string;
  /** Etiqueta corta de sector o tipo (ej. "Fintech", "Salud"). */
  tag: Localized;
  title: Localized;
  /** Reto de negocio que se debía resolver. */
  problem: Localized;
  /** Enfoque / arquitectura técnica (bullets). */
  architecture: Localized<string[]>;
  /** Resultado o impacto (bullets, idealmente con métricas). */
  outcome: Localized<string[]>;
  /** Stack principal usado. */
  stack: string[];
  /** Nombre de un icono de lucide-vue-next (resuelto en la vista). */
  icon: string;
  /** Enlace opcional (demo, sitio, repo). */
  link?: string;
  linkLabel?: Localized;
  current?: boolean;
}


/** Paso del proceso de trabajo (Discovery → Build → Launch). */
export interface ProcessStep {
  id: string;
  title: Localized;
  description: Localized;
  /** Entregables / actividades del paso. */
  deliverables: Localized<string[]>;
  /** Nombre de un icono de lucide-vue-next. */
  icon: string;
}


/** Testimonio / prueba social. */
export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  /** URL opcional de avatar. */
  avatar?: string;
}


export interface ContactForm {
  name: string;
  email: string;
  affair: string;
  message: string;
}

export interface ValidationErrors {
  [key: string]: string;
}

export interface FormValidation {
  validated: boolean;
  errors: ValidationErrors;
}


export interface NavigationOption {
  id: string;
  label: Localized;
  href?: string;
}


export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
  color?: string;
}


export interface TechStack {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'mobile' | 'tools' | 'database';
}


export interface SkillGroup {
  id: string;
  title: Localized;
  /** Nombre de un icono de lucide-vue-next (resuelto en la vista). */
  icon: string;
  description: Localized;
  /**
   * Nombre propio de una tecnología (`"NestJS"`, que no se traduce) o etiqueta
   * bilingüe (`{ es: "Escalabilidad", en: "Scalability" }`).
   *
   * La lista era `string[]` y las etiquetas descriptivas quedaban congeladas en
   * español: en inglés se leían "Microservicios", "Escalabilidad" o
   * "TypeScript estricto" dentro de la tarjeta que presume de calidad.
   */
  items: (string | Localized)[];
}


export interface HeroData {
  name: string;
  title: string;
  subtitle: string;
  image: {
    src: string;
    alt: string;
    sources?: {
      srcset: string;
      media: string;
      type: string;
    }[];
  };
}


export interface EmailData {
  to_name: string;
  reply_to: string;
  from_name: string;
  message: string;
}

export interface EmailResponse {
  status: number;
  message: string;
}


export type Theme = 'light' | 'dark';

export interface ThemeConfig {
  isDarkMode: boolean;
  toggleTheme: () => void;
}


export interface CardProps extends BaseComponent {
  card: AboutCard;
}

export interface HeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export interface LogoProps {
  isDarkMode: boolean;
}


export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}


export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export interface Contact{
    name: string;
    email: string
    affair : string;
    message:string
}