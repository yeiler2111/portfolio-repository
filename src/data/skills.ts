import type { SkillGroup } from "@/utils/types";

/**
 * Competencias organizadas en pilares de un perfil full stack versátil:
 * frontend multi-framework, backend, arquitectura de microservicios y
 * calidad. `title` y `description` son bilingües. En `items`, los nombres
 * propios de tecnología van como string plano (no se traducen) y las etiquetas
 * descriptivas como objeto `{ es, en }`.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: {
      es: "Frontend multi-framework",
      en: "Multi-framework frontend",
    },
    icon: "Layout",
    description: {
      es: "Interfaces mantenibles con Angular, React o Vue según lo que pida el proyecto.",
      en: "Maintainable interfaces with Angular, React or Vue depending on what the project needs.",
    },
    items: [
      "Angular",
      "React",
      "Vue 3",
      "TypeScript",
      "Tailwind CSS",
      "SPA / SSR",
      { es: "Accesibilidad (a11y)", en: "Accessibility (a11y)" },
    ],
  },
  {
    id: "backend",
    title: { es: "Backend & APIs", en: "Backend & APIs" },
    icon: "Server",
    description: {
      es: "Servicios robustos y seguros con Node.js, Java o .NET.",
      en: "Robust, secure services with Node.js, Java or .NET.",
    },
    items: [
      "Node.js / NestJS",
      "Java / Spring Boot",
      ".NET",
      "REST",
      "WebSockets",
      "OAuth2 / JWT",
      { es: "Redis (caché)", en: "Redis (caching)" },
    ],
  },
  {
    id: "architecture",
    title: {
      es: "Arquitectura & Microservicios",
      en: "Architecture & Microservices",
    },
    icon: "Network",
    description: {
      es: "Sistemas distribuidos y escalables desplegados sobre AWS.",
      en: "Distributed, scalable systems deployed on AWS.",
    },
    items: [
      { es: "Microservicios", en: "Microservices" },
      "AWS (EC2, Lambda)",
      "CodePipeline / CodeBuild",
      "CI/CD",
      { es: "Arquitectura en capas", en: "Layered architecture" },
      { es: "Escalabilidad", en: "Scalability" },
    ],
  },
  {
    id: "quality",
    title: { es: "Calidad & Prácticas", en: "Quality & Practices" },
    icon: "ShieldCheck",
    description: {
      es: "Código tipado, probado y sostenible en el tiempo.",
      en: "Typed, tested and long-term maintainable code.",
    },
    items: [
      { es: "TypeScript estricto", en: "Strict TypeScript" },
      "Testing (Jest / Vitest)",
      "Playwright / Cypress",
      "Git & code reviews",
      "Clean Architecture",
      "ESLint / Prettier",
    ],
  },
];
