import { Tech } from "@/utils/types";

export const CardItems = [
  {
    title: "¿Quién soy?",
    textContent: `Soy desarrollador autodidacta y estudiante de Ingeniería de Sistemas en la Universidad del Magdalena, próximo a cursar mi último semestre. disfruto gestionar proyectos complejos y resolver desafíos mediante soluciones algorítmicas bien estructuradas. Siempre busco nuevos retos que me permitan seguir creciendo profesionalmente.`,
  },
  {
    title: "Sobre mí",
    textContent: `La tecnología y el aprendizaje continuo me apasionan. Siempre estoy incorporando nuevas herramientas y conocimientos para mantenerme actualizado. Disfruto colaborar en equipo con profesionales de distintas áreas, ya que las mejores ideas surgen al combinar perspectivas. Enfrento cada desafío con análisis y creatividad, buscando soluciones que no solo resuelvan el problema, sino que también aporten valor al producto final y a los usuarios.`,
  },
  {
    title: "Mi filosofía",
    textContent: `El desarrollo de software no es solo mi profesión, sino un medio para generar un impacto positivo en la sociedad. Valoro la mejora continua y la humildad para seguir aprendiendo, y me comprometo con proyectos que aporten valor real. Estoy convencido de que la colaboración y la empatía son esenciales para construir soluciones que verdaderamente marquen la diferencia.`,
  },
];

export const frontendTechs: Tech[] = [
  { name: "Vue.js", icon: "https://cdn.simpleicons.org/vue.js/41B883" },
  { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "Angular", icon: "https://cdn.simpleicons.org/angular/DD0031" },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/000000" },
  { name: "Remix", icon: "https://cdn.simpleicons.org/remix/000000" },
  { name: "Quasar", icon: "https://cdn.simpleicons.org/quasar/1976D2" },
];

export const backendTechs: Tech[] = [
  { name: "NestJS", icon: "https://cdn.simpleicons.org/nestjs/E0234E" },
  { name: "Express", icon: "https://cdn.simpleicons.org/express/000000" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/539E43" },
  { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" },
  { name: ".NET", icon: "https://cdn.simpleicons.org/.net/512BD4" },
];

export const mobileTechs: Tech[] = [
  { name: "React Native", icon: "https://cdn.simpleicons.org/react/61DAFB" },
];

export const cloudTechs = [
  { name: "CloudFront", icon: "/img/CloudFront.svg" },
  { name: "EC2", icon: "/img/EC2.svg" },
  { name: "Lambda", icon: "/img/Lambda.svg" },
  { name: "S3 on Outposts", icon: "/img/S3 on Outposts.svg" },
  { name: "Linux", icon: "https://cdn.simpleicons.org/linux/FCC624" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
];

export const databaseTechs: Tech[] = [
  { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169E1" },
  { name: "MySql", icon: "https://cdn.simpleicons.org/mysql/4479A1" },
  {
    name: "Redis",
    icon: "https://cdn.simpleicons.org/redis/FF4438",
  },

  { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/47A248" },
];

export const toolsTechs: Tech[] = [
  { name: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "Bootstrap", icon: "https://cdn.simpleicons.org/bootstrap/7952B3" },
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E" },
];

export const jobs = [
  {
    title: "Desarrollador Frontend & Soporte",
    company: "Global e-Health",
    icon: "medical_services",
    period: "1 año y 3 meses (actualmente apoyo como freelance)",
    description:
      "Brindé soporte técnico de nivel 1, 2 y 3, además de desarrollar interfaces con Vue 2 y Bootstrap-Vue. Implementé soluciones para servicios de telemedicina, mejorando la experiencia de usuario en plataformas críticas. Actualmente colaboro de forma puntual como freelance en tareas especializadas.",
    link: "https://www.globale-health.com",
  },
  {
    title: "Desarrollador Fullstack Freelance",
    company: "Unicero Digital",
    icon: "code",
    period: "1 año",
    description:
      "Realicé desarrollos como freelance, incluyendo sistemas de autenticación, landing pages y servicios backend. Trabajé con Python, Angular, Java y .NET.",
    link: "https://www.unoycerodigital.com.co/",
  },
  {
    title: "Desarrollador Fullstack",
    company: "M&T Consulting",
    icon: "engineering",
    period: "8 meses",
    description:
      "Desarrollé soluciones tanto en frontend como backend utilizando Vue 3, React y NestJS. Participé en el desarrollo de plataformas empresariales e integraciones.",
    link: "https://mitconsulting.com.co/",
  },
  {
    title: "Freelance Fullstack Developer",
    company: "Fryends",
    icon: "work",
    period: "4 meses",
    description:
      "Trabajo como freelance en una empresa de desarrollo de software. Desarrollo interfaces avanzadas con React y Remix, implemento backends con NestJS y realizo integraciones con servicios como Google Cloud Buckets.",
    link: "https://fryends.com.co/#",
  },
];