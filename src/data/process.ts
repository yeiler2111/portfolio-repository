import type { ProcessStep } from "@/utils/types";

/** Cómo es trabajar conmigo: Discovery → Build → Launch. */
export const processSteps: ProcessStep[] = [
  {
    id: "discovery",
    title: { es: "Discovery", en: "Discovery" },
    description: {
      es: "Entiendo el problema de negocio antes de escribir código: alcance, objetivos, restricciones y criterios de éxito.",
      en: "I understand the business problem before writing code: scope, goals, constraints and success criteria.",
    },
    deliverables: {
      es: [
        "Reunión de descubrimiento",
        "Definición de alcance",
        "Propuesta técnica",
        "Roadmap de entregas",
      ],
      en: [
        "Discovery meeting",
        "Scope definition",
        "Technical proposal",
        "Delivery roadmap",
      ],
    },
    icon: "Compass",
  },
  {
    id: "build",
    title: { es: "Build", en: "Build" },
    description: {
      es: "Desarrollo iterativo con entregas frecuentes, código tipado y probado, y visibilidad continua del avance.",
      en: "Iterative development with frequent deliveries, typed and tested code, and continuous visibility of progress.",
    },
    deliverables: {
      es: [
        "Diseño de arquitectura",
        "Desarrollo por iteraciones",
        "Testing (unit + E2E)",
        "Code reviews y buenas prácticas",
      ],
      en: [
        "Architecture design",
        "Iterative development",
        "Testing (unit + E2E)",
        "Code reviews and best practices",
      ],
    },
    icon: "Hammer",
  },
  {
    id: "launch",
    title: { es: "Launch & Support", en: "Launch & Support" },
    description: {
      es: "Despliegue a producción con CI/CD sobre AWS y acompañamiento posterior para asegurar estabilidad y evolución.",
      en: "Production deployment with CI/CD on AWS and ongoing support to ensure stability and evolution.",
    },
    deliverables: {
      es: [
        "Pipelines CI/CD",
        "Despliegue en AWS",
        "Monitoreo y ajustes",
        "Soporte y mejoras continuas",
      ],
      en: [
        "CI/CD pipelines",
        "AWS deployment",
        "Monitoring and tuning",
        "Support and continuous improvements",
      ],
    },
    icon: "Rocket",
  },
];
