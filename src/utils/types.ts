

export interface Tech {
  name: string;
  icon: string;
}
export interface BaseComponent {
  id?: string;
  className?: string;
}


export interface Technology {
  name: string;
  icon?: string;
  color?: string;
}

export interface ProjectImage {
  url: string;
  alt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  images: (string | ProjectImage)[];
  technologies: (string | Technology)[];
  link: string;
  github?: string;
  featured?: boolean;
}


export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  icon: string;
  period: string;
  description: string;
  link: string;
  current?: boolean;
  technologies?: string[];
}


export interface AboutCard {
  id: string;
  title: string;
  textContent: string;
  icon?: string;
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
  label: string;
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

export interface ProjectCardProps extends BaseComponent {
  title: string;
  description: string;
  images: (string | ProjectImage)[];
  technologies: (string | Technology)[];
  link: string;
  github?: string;
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