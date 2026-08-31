import type { CaseStudy } from "@/utils/types";

/**
 * Casos de estudio construidos a partir de experiencia profesional real.
 * Estructura: Problema de negocio → Arquitectura/Solución → Resultado.
 *
 * Los campos traducibles son objetos { es, en }.
 *
 * Las métricas de `outcome` salen de fuentes verificables, no de estimaciones:
 * el −40% de despliegue y el equipo de 3 estaban en la hoja de vida
 * (`assets-source/cv/cv_data.py`) y nunca se habían traído aquí; la escala del
 * REPS sale de la API de datos abiertos. Si un dato no se puede sostener, se
 * borra la línea en vez de rellenarla.
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
        "MCP servers (Model Context Protocol) y skills a medida integrados al flujo de desarrollo",
        "Uso de LLMs para automatizar tareas repetitivas de desarrollo",
        "Infraestructura en AWS y pipelines CI/CD (CodePipeline / CodeBuild)",
        "Testing unitario (Jest, Vitest) y E2E (Playwright, Cypress)",
      ],
      en: [
        "Microfrontend architecture in Vue.js with decoupled modules",
        "Dependency management and integration strategies across modules",
        "MCP servers (Model Context Protocol) and custom skills wired into the development workflow",
        "Use of LLMs to automate repetitive development tasks",
        "AWS infrastructure and CI/CD pipelines (CodePipeline / CodeBuild)",
        "Unit testing (Jest, Vitest) and E2E (Playwright, Cypress)",
      ],
    },
    outcome: {
      es: [
        "2 microfrontends bajo mi responsabilidad, más trabajo transversal en los de otros equipos",
        "MCP server propio para conectar el flujo de desarrollo con Google Chat",
        "Cobertura de escenarios críticos en producción con testing E2E",
      ],
      en: [
        "2 microfrontends under my ownership, plus cross-team work on other teams'",
        "An MCP server of my own connecting the development workflow to Google Chat",
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
        "Infraestructura replicable con snapshots: −40% en tiempos de despliegue",
        "Continuidad del servicio asegurada con soporte N1–N3",
        "Videoconsulta y visor de imágenes médicas en producción",
      ],
      en: [
        "Replicable snapshot-based infrastructure: −40% deployment time",
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
    /*
     * La escala sale del REPS público, no de una estimación: consulta a la API
     * de datos abiertos del dataset c36g-9fc2 (datos.gov.co), corte del 12 de
     * marzo de 2026 — 61.073 prestadores y 76.821 sedes distintos. Se redondea
     * a la baja para que el número no envejezca mal.
     *
     * PENDIENTE: el volumen de PDFs por corrida del backend de ICFES, que es
     * el único dato de los tres que no es público.
     */
    outcome: {
      es: [
        "Interfaz sobre el registro nacional de salud: 61.000+ prestadores y 76.000+ sedes",
        "Visibilidad de capacidad instalada y disponibilidad de camas en tiempo real",
        "Backend de generación masiva de PDFs para ICFES, en producción",
      ],
      en: [
        "Frontend over the national health registry: 61,000+ providers and 76,000+ sites",
        "Real-time visibility of installed capacity and bed availability",
        "Mass PDF generation backend for ICFES, live in production",
      ],
    },
    stack: ["Vue 3", "Pinia", "NestJS", "REST", "PostgreSQL"],
    icon: "Landmark",
    link: "https://mitconsulting.com.co/",
    linkLabel: { es: "Ver M&T Consulting", en: "View M&T Consulting" },
  },
];
