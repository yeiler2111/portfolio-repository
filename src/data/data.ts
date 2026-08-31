import { Tech } from "@/utils/types";
import { formatDateRange, formatDuration, monthsBetween } from "@/utils/duration";

export const CardItems = [
  {
    title: { es: "¿Quién soy?", en: "Who am I?" },
    textContent: {
      es: `Soy Ingeniero de Sistemas titulado por la Universidad del Magdalena y cuento con tarjeta profesional. Como desarrollador Fullstack disfruto gestionar proyectos complejos y resolver desafíos mediante soluciones algorítmicas bien estructuradas. Siempre busco nuevos retos que me permitan seguir creciendo profesionalmente.`,
      en: `I'm a Systems Engineer with a degree from Universidad del Magdalena and a professional license. As a Fullstack developer, I enjoy managing complex projects and solving challenges through well-structured algorithmic solutions. I'm always looking for new challenges that let me keep growing professionally.`,
    },
  },
  {
    title: { es: "Sobre mí", en: "About me" },
    textContent: {
      es: `La tecnología y el aprendizaje continuo me apasionan. Siempre estoy incorporando nuevas herramientas y conocimientos para mantenerme actualizado. Disfruto colaborar en equipo con profesionales de distintas áreas, ya que las mejores ideas surgen al combinar perspectivas. Enfrento cada desafío con análisis y creatividad, buscando soluciones que no solo resuelvan el problema, sino que también aporten valor al producto final y a los usuarios.`,
      en: `I'm passionate about technology and continuous learning. I'm always adopting new tools and knowledge to stay up to date. I enjoy collaborating in teams with professionals from different fields, since the best ideas emerge from combining perspectives. I approach every challenge with analysis and creativity, seeking solutions that not only solve the problem but also add value to the final product and its users.`,
    },
  },
  {
    title: { es: "Mi filosofía", en: "My philosophy" },
    textContent: {
      es: `El desarrollo de software no es solo mi profesión, sino un medio para generar un impacto positivo en la sociedad. Valoro la mejora continua y la humildad para seguir aprendiendo, y me comprometo con proyectos que aporten valor real. Estoy convencido de que la colaboración y la empatía son esenciales para construir soluciones que verdaderamente marquen la diferencia.`,
      en: `Software development isn't just my profession, but a means to create a positive impact on society. I value continuous improvement and the humility to keep learning, and I commit to projects that deliver real value. I'm convinced that collaboration and empathy are essential to build solutions that truly make a difference.`,
    },
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
  { name: ".NET", icon: "https://cdn.simpleicons.org/dotnet/512BD4" },
];

export const mobileTechs: Tech[] = [
  { name: "React Native", icon: "https://cdn.simpleicons.org/react/61DAFB" },
];

export const cloudTechs = [
  { name: "EC2", icon: "/img/EC2.svg" },
  { name: "Lambda", icon: "/img/Lambda.svg" },
  { name: "CloudFront", icon: "/img/CloudFront.svg" },
  { name: "S3 on Outposts", icon: "/img/S3 on Outposts.svg" },
  { name: "CodePipeline", icon: "/img/CodePipeline.svg" },
  { name: "CodeBuild", icon: "/img/CodeBuild.svg" },
  { name: "Lightsail", icon: "/img/Lightsail.svg" },
  { name: "Linux", icon: "https://cdn.simpleicons.org/linux/FCC624" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
];

export const databaseTechs: Tech[] = [
  { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169E1" },
  { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479A1" },
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

/**
 * Categorías de tecnologías para la sección Tech Stack.
 * `title` es bilingüe; `icon` referencia un componente de lucide-vue-next.
 */
export const techCategories = [
  { id: "frontend", title: { es: "Frontend", en: "Frontend" }, icon: "Layout", techs: frontendTechs },
  { id: "backend", title: { es: "Backend", en: "Backend" }, icon: "Server", techs: backendTechs },
  { id: "mobile", title: { es: "Mobile", en: "Mobile" }, icon: "Smartphone", techs: mobileTechs },
  { id: "cloud", title: { es: "Cloud & DevOps", en: "Cloud & DevOps" }, icon: "Cloud", techs: cloudTechs },
  { id: "database", title: { es: "Bases de Datos y Caché", en: "Databases & Cache" }, icon: "Database", techs: databaseTechs },
  { id: "tools", title: { es: "Tools & Otros", en: "Tools & Others" }, icon: "Wrench", techs: toolsTechs },
];

/**
 * Trayectoria profesional.
 *
 * `start` / `end` en formato "YYYY-MM" son la fuente de verdad: de ahí se
 * derivan tanto el rango visible como la duración, así que el puesto vigente
 * no vuelve a quedar desactualizado. Omitir `end` significa "actualidad".
 *
 * Las fechas salen de la hoja de vida (`assets-source/cv/cv_data.py`), que es
 * donde ya estaban: el portafolio se había quedado con duraciones sueltas y sin
 * ubicación en el tiempo. Con ellas se ven los solapamientos reales entre el
 * empleo y los encargos por proyecto, que es lo que evita leer seis puestos
 * cortos como seis salidas seguidas.
 *
 * Orden cronológico inverso por `start`: ahora que el rango es visible, un
 * timeline desordenado se lee como un error.
 */
const jobsData = [
  {
    title: { es: "Desarrollador Full Stack", en: "Full Stack Developer" },
    company: "Alegra",
    icon: "code",
    caseId: "alegra",
    start: "2025-12",
    description: {
      es: "Desarrollo y mantenimiento de microfrontends en Vue.js con arquitectura modular de alto rendimiento. Soy responsable de 2 microfrontends, y trabajo sobre los de otros equipos cuando un desarrollo se extiende más allá de los míos. Gestiono la arquitectura de dependencias, la compatibilidad de librerías y la integración entre módulos. Integro MCP servers (Model Context Protocol) y skills a medida en el flujo de desarrollo, y construí un MCP server propio para conectar el flujo con Google Chat. Aplico modelos de lenguaje (LLMs) para automatizar tareas repetitivas de desarrollo. Configuro infraestructura en AWS y pipelines CI/CD, con testing unitario (Jest, Vitest) y E2E (Playwright, Cypress) sobre escenarios críticos en producción.",
      en: "Development and maintenance of microfrontends in Vue.js with a high-performance modular architecture. I own 2 microfrontends, and work across other teams' when a piece of work reaches beyond my own. I manage dependency architecture, library compatibility and integration across modules. I integrate MCP servers (Model Context Protocol) and custom skills into the development workflow, and built an MCP server of my own to connect that workflow to Google Chat. I apply language models (LLMs) to automate repetitive development tasks. I set up AWS infrastructure and CI/CD pipelines, with unit testing (Jest, Vitest) and E2E (Playwright, Cypress) over critical production scenarios.",
    },
    link: "https://www.alegra.com",
  },
  {
    title: { es: "Desarrollador Full Stack", en: "Full Stack Developer" },
    company: "Fryends",
    icon: "work",
    start: "2025-05",
    end: "2025-09",
    description: {
      es: "Desarrollé soluciones fullstack para proyectos del sector público (UGPP), incluyendo backend en NestJS con arquitectura en capas y caché con Redis, que redujo en un 30% los tiempos de respuesta del sistema, y frontend en React/Remix con WebSockets para comunicación en tiempo real. Implementé notificaciones por correo y pruebas unitarias con Jest.",
      en: "I built fullstack solutions for public-sector projects (UGPP), including a NestJS backend with layered architecture and Redis caching that cut system response times by 30%, and a React/Remix frontend with WebSockets for real-time communication. I implemented email notifications and unit tests with Jest.",
    },
    link: "https://fryends.com.co/#",
  },
  {
    title: { es: "Desarrollador Frontend", en: "Frontend Developer" },
    company: "IkiTech Solutions",
    icon: "code",
    start: "2025-01",
    end: "2025-02",
    description: {
      es: "Desarrollo frontend en React (Next.js) para Monokera, del sector financiero, dentro de la línea de staffing especializado de IkiTech. Gestioné el estado asincrónico con TanStack Query y cubrí la lógica con pruebas unitarias en Jest, en un flujo colaborativo con Git y estrategia de branching.",
      en: "Frontend development in React (Next.js) for Monokera, in the financial sector, through IkiTech's specialised staffing line. I handled asynchronous state with TanStack Query and covered the logic with Jest unit tests, in a collaborative Git workflow and branching strategy.",
    },
    link: "https://ikitech.com.co/",
  },
  {
    title: { es: "Desarrollador Full Stack", en: "Full Stack Developer" },
    company: "M&T Consulting",
    icon: "engineering",
    caseId: "public-sector",
    start: "2024-07",
    end: "2025-02",
    description: {
      es: "Participé en varios proyectos para entidades públicas (Minsalud, ICFES). Desarrollé de forma integral la interfaz en Vue 3 + Pinia de una plataforma que centraliza a los prestadores de salud del país y su capacidad instalada (disponibilidad de camas y recursos), con liderazgo técnico de frontend dentro de un equipo de 3 desarrolladores. También construí backend en NestJS para generación masiva de PDFs. Aporté en el diseño de arquitecturas en capas y APIs REST, con entrega dentro de cronograma.",
      en: "I took part in several projects for public entities (Minsalud, ICFES). I developed the entire frontend in Vue 3 + Pinia of a platform that centralizes the country's healthcare providers and their installed capacity (bed availability and resources), leading the frontend technically within a team of 3 developers. I also built a NestJS backend for mass PDF generation. I contributed to designing layered architectures and REST APIs, delivering on schedule.",
    },
    link: "https://mitconsulting.com.co/",
  },
  {
    title: { es: "Desarrollador Backend", en: "Backend Developer" },
    company: "UnoYCero Digital",
    icon: "code",
    start: "2024-01",
    end: "2025-01",
    description: {
      es: "Diseñé e implementé un sistema de autenticación con Python, OAuth2 y JWT adoptado como estándar para nuevos proyectos. Desarrollé pruebas de concepto en Angular y apoyé el desarrollo backend con C# y Java Spring Boot, integrando buenas prácticas de seguridad y arquitectura escalable para distintos clientes.",
      en: "I designed and implemented an authentication system with Python, OAuth2 and JWT adopted as the standard for new projects. I built proofs of concept in Angular and supported backend development with C# and Java Spring Boot, integrating security best practices and scalable architecture for various clients.",
    },
    link: "https://www.unoycerodigital.com.co/",
  },
  {
    title: { es: "Desarrollador Frontend & Soporte", en: "Frontend Developer & Support" },
    company: "Global e-Health",
    icon: "medical_services",
    caseId: "global-ehealth",
    start: "2023-08",
    end: "2024-09",
    description: {
      es: "Desarrollé módulos de citas, teleapoyo y telemedicina con Vue 2 integrados a backend en C# .NET. Implementé infraestructura serverless en AWS (Lambda, API Gateway, Route 53, Nginx) y configuración de Jitsi y DCM4CHE para videollamadas y gestión de imágenes DICOM. Construí una infraestructura replicable con snapshots que redujo los tiempos de despliegue en un 40%, y aseguré continuidad del servicio mediante soporte niveles 1, 2 y 3.",
      en: "I built appointment, tele-support and telemedicine modules with Vue 2 integrated with a C# .NET backend. I implemented serverless AWS infrastructure (Lambda, API Gateway, Route 53, Nginx) and set up Jitsi and DCM4CHE for video calls and DICOM image management. I built a replicable snapshot-based infrastructure that cut deployment times by 40%, and ensured service continuity through tier 1, 2 and 3 support.",
    },
    link: "https://www.globale-health.com",
  },
];

/**
 * `start` más antiguo entre los puestos que ya tienen fechas. Es la fuente
 * del stat de años del hero: en cuanto se completen las fechas pendientes en
 * `jobsData`, la cifra se corrige sola sin tocar `site.ts`.
 */
export const careerStart = jobsData
  .map((job) => (job as { start?: string }).start)
  .filter((start): start is string => Boolean(start))
  .sort()[0];

/**
 * Deriva `dates` y `period` de start/end. Si un puesto todavía no tiene
 * fechas, cae en `periodFallback` para no romper la vista.
 *
 * `caseId` (cuando existe) viaja tal cual dentro de `rest`: apunta al caso de
 * estudio que ya narra ese puesto en detalle, y el timeline lo usa para
 * enlazar en vez de repetir la descripción completa.
 */
export const jobs = jobsData.map((job) => {
  const { start, end, periodFallback, ...rest } = job as typeof job & {
    start?: string;
    end?: string;
    periodFallback?: { es: string; en: string };
  };

  return {
    ...rest,
    dates: start ? formatDateRange(start, end) : { es: "", en: "" },
    period: start
      ? formatDuration(monthsBetween(start, end))
      : periodFallback ?? { es: "", en: "" },
    isCurrent: Boolean(start && !end),
  };
});
