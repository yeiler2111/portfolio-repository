import type { CaseStudy } from "@/utils/types";

/**
 * Casos de estudio construidos a partir de experiencia profesional real.
 * Estructura: Problema de negocio → Arquitectura/Solución → Resultado.
 *
 * NOTA: en `outcome`, reemplaza los resultados cualitativos por MÉTRICAS
 * reales cuando las tengas (ej. "-40% tiempo de despliegue", "+15 módulos").
 * Los campos traducibles son objetos { es, en }.
 */
export const caseStudies: CaseStudy[] = [
  {
    id: "alegra",
    client: "Alegra",
    tag: { es: "Fintech · Contabilidad", en: "Fintech · Accounting" },
    title: {
      es: "Escalar el frontend con microfrontends y automatización con IA",
      en: "Scaling the frontend with microfrontends and AI automation",
    },
    problem: {
      es: "Una plataforma contable usada por miles de pymes en Latinoamérica necesitaba escalar su frontend manteniendo módulos independientes, de alto rendimiento y desarrollados por varios equipos en paralelo, sin acoplarse entre sí.",
      en: "An accounting platform used by thousands of SMBs across Latin America needed to scale its frontend while keeping modules independent, high-performing and built by several teams in parallel, without coupling them together.",
    },
    architecture: {
      es: [
        "Arquitectura de microfrontends en Vue.js con módulos desacoplados",
        "Gestión de dependencias y estrategias de integración entre módulos",
        "MCP servers (Model Context Protocol) y skills a medida para potenciar flujos con IA",
        "Uso de LLMs para automatizar tareas repetitivas de desarrollo",
        "Infraestructura en AWS y pipelines CI/CD (CodePipeline / CodeBuild)",
        "Testing unitario (Jest, Vitest) y E2E (Playwright, Cypress)",
      ],
      en: [
        "Microfrontend architecture in Vue.js with decoupled modules",
        "Dependency management and integration strategies across modules",
        "MCP servers (Model Context Protocol) and custom skills to boost AI-powered workflows",
        "Use of LLMs to automate repetitive development tasks",
        "AWS infrastructure and CI/CD pipelines (CodePipeline / CodeBuild)",
        "Unit testing (Jest, Vitest) and E2E (Playwright, Cypress)",
      ],
    },
    outcome: {
      es: [
        "Equipos entregando en paralelo sobre módulos independientes",
        "Tareas de desarrollo automatizadas mediante flujos con IA",
        "Cobertura de escenarios críticos en producción con testing E2E",
      ],
      en: [
        "Teams shipping in parallel on independent modules",
        "Development tasks automated through AI-powered workflows",
        "Critical production scenarios covered with E2E testing",
      ],
    },
    stack: ["Vue.js", "TypeScript", "AWS", "CI/CD", "Jest", "Playwright"],
    icon: "Boxes",
    link: "https://www.alegra.com",
    linkLabel: { es: "Ver Alegra", en: "View Alegra" },
    current: true,
  },
  {
    id: "global-ehealth",
    client: "Global e-Health",
    tag: { es: "Salud · Telemedicina", en: "Health · Telemedicine" },
    title: {
      es: "Telemedicina confiable con videollamada e imágenes DICOM",
      en: "Reliable telemedicine with video calls and DICOM imaging",
    },
    problem: {
      es: "Un proveedor de salud necesitaba habilitar teleconsulta y gestión de imágenes médicas con una infraestructura confiable, replicable y con continuidad de servicio garantizada.",
      en: "A healthcare provider needed to enable teleconsultation and medical imaging management with reliable, replicable infrastructure and guaranteed service continuity.",
    },
    architecture: {
      es: [
        "Módulos de citas, teleapoyo y telemedicina en Vue 2",
        "Backend en C# / .NET integrado a los módulos clínicos",
        "Infraestructura en AWS (Lambda, API Gateway, Route 53, Nginx)",
        "Jitsi para videollamadas y DCM4CHE para gestión de imágenes DICOM",
        "Soporte de niveles 1, 2 y 3 para continuidad del servicio",
      ],
      en: [
        "Appointment, tele-support and telemedicine modules in Vue 2",
        "C# / .NET backend integrated with the clinical modules",
        "AWS infrastructure (Lambda, API Gateway, Route 53, Nginx)",
        "Jitsi for video calls and DCM4CHE for DICOM image management",
        "Tier 1, 2 and 3 support for service continuity",
      ],
    },
    outcome: {
      es: [
        "Infraestructura replicable que redujo los tiempos de despliegue",
        "Continuidad del servicio asegurada con soporte N1–N3",
        "Videoconsulta y visor de imágenes médicas en producción",
      ],
      en: [
        "Replicable infrastructure that reduced deployment times",
        "Service continuity ensured with tier 1–3 support",
        "Video consultation and medical image viewer in production",
      ],
    },
    stack: ["Vue 2", "C# / .NET", "AWS", "Jitsi", "DICOM"],
    icon: "Stethoscope",
    link: "https://www.globale-health.com",
    linkLabel: { es: "Ver Global e-Health", en: "View Global e-Health" },
  },
  {
    id: "public-sector",
    client: "Minsalud · ICFES (vía M&T)",
    tag: { es: "Sector público · Salud", en: "Public sector · Health" },
    title: {
      es: "Capacidad instalada en salud a escala nacional",
      en: "Nationwide healthcare installed-capacity platform",
    },
    problem: {
      es: "El sector salud necesitaba centralizar en una sola plataforma a todos los prestadores de salud del país y conocer su capacidad instalada —disponibilidad de camas y recursos— para la toma de decisiones a nivel nacional.",
      en: "The health sector needed to centralize every healthcare provider in the country on a single platform and know their installed capacity —bed availability and resources— for nationwide decision-making.",
    },
    architecture: {
      es: [
        "Desarrollo integral de la interfaz (frontend) en Vue 3 + Pinia",
        "Módulos para consulta de prestadores, capacidad instalada y disponibilidad de camas",
        "Gestión de roles y módulos públicos con APIs REST",
        "Arquitectura en capas alineada a requerimientos de entidades públicas",
        "Además: backend en NestJS para generación masiva de PDFs (proyecto ICFES)",
      ],
      en: [
        "End-to-end frontend development in Vue 3 + Pinia",
        "Modules to query providers, installed capacity and bed availability",
        "Role management and public modules with REST APIs",
        "Layered architecture aligned with public-entity requirements",
        "Also: NestJS backend for mass PDF generation (ICFES project)",
      ],
    },
    outcome: {
      es: [
        "Interfaz que centraliza a los prestadores de salud del país",
        "Visibilidad de capacidad instalada y disponibilidad de camas en tiempo real",
        "Entregas estables y mantenibles a escala institucional",
      ],
      en: [
        "Interface centralizing the country's healthcare providers",
        "Real-time visibility of installed capacity and bed availability",
        "Stable, maintainable delivery at institutional scale",
      ],
    },
    stack: ["Vue 3", "Pinia", "NestJS", "REST", "PostgreSQL"],
    icon: "Landmark",
    link: "https://mitconsulting.com.co/",
    linkLabel: { es: "Ver M&T Consulting", en: "View M&T Consulting" },
  },
];
