# -*- coding: utf-8 -*-
"""
Fuente única de la hoja de vida de Yeiler.

Los dos PDFs publicados en `public/documents/` se generan de aquí con
`build_cv.py`. Antes no existía fuente: los PDFs estaban sueltos y no se podían
actualizar sin rehacerlos a mano.
"""

PORTFOLIO_URL = "https://portfolio-yeiler.netlify.app/"
PORTFOLIO_TXT = "portfolio-yeiler.netlify.app"

NAME = "YEILER ANDRÉS SIMÓN ROMERO"
NAME_SHORT = "YEILER SIMON ROMERO"
ROLE = "FULL STACK DEVELOPER"
SUBROLE = "Ingeniero de Sistemas"

CONTACT = {
    "email": "yeiler2209@gmail.com",
    "phone": "+57 300-519-9147",
    "location": "Santa Marta, Colombia",
    "github_txt": "github.com/yeiler2111",
    "github_url": "https://github.com/yeiler2111",
    "linkedin_txt": "linkedin.com/in/yeiler-andres-simons-romero-86b578261",
    "linkedin_url": "https://www.linkedin.com/in/yeiler-andres-simons-romero-86b578261/",
}

PROFILE = (
    "Ingeniero de Sistemas Full Stack (Universidad del Magdalena, 2026) con más de 3 años "
    "de experiencia desarrollando soluciones para entidades públicas y privadas de alto "
    "impacto (ICFES, Minsalud, UGPP, sector financiero). Sólida fortaleza en Frontend — "
    "Vue.js, React, Angular, microfrontends — complementada con dominio real de Backend: "
    "NestJS, Python, C# .NET, APIs RESTful y bases de datos relacionales y no relacionales. "
    "Visión completa del ciclo de vida del software: arquitectura, patrones de diseño, "
    "clean code, despliegue en AWS y pipelines CI/CD. Alta productividad con herramientas "
    "de IA y modelos de lenguaje, incluyendo creación de MCP servers y skills personalizados."
)

PROFILE_SHORT = (
    "Ingeniero de Sistemas Full Stack con más de 3 años de experiencia en proyectos de alto "
    "impacto para el sector público y privado (ICFES, Minsalud, UGPP, sector financiero). "
    "Fortaleza en Frontend —Vue.js, React, Angular, microfrontends— con dominio real de "
    "Backend (NestJS, Python, C# .NET) e infraestructura cloud en AWS. Alta productividad "
    "con IA y LLMs: MCP servers y skills personalizados."
)

EXPERIENCE = [
    {
        "role": "Full Stack Developer",
        "company": "Alegra",
        "period": "Dic. 2025 – Actualidad",
        "bullets": [
            "Desarrollo y mantenimiento de microfrontends en Vue.js siguiendo arquitectura modular de alto rendimiento.",
            "Gestión de arquitectura de dependencias, compatibilidad de librerías y estrategias de integración entre módulos.",
            "Creación de MCP servers (Model Context Protocol) y skills personalizados para potenciar flujos con IA.",
            "Uso avanzado de modelos de lenguaje (LLMs): integración, prompting estratégico y automatización de tareas de desarrollo.",
            "Gestión de infraestructura en AWS: configuración de servicios cloud, entornos y despliegues.",
            "Implementación y optimización de pipelines CI/CD para entrega continua y despliegues automatizados.",
            "Testing unitario (Jest, Vitest) y end-to-end (Playwright, Cypress) con cobertura de escenarios críticos en producción.",
            "Flujo avanzado con Git: branching strategies, PRs, code reviews y versionado semántico.",
        ],
    },
    {
        "role": "Full Stack Developer",
        "company": "Fryends",
        "period": "May. 2025 – Sep. 2025",
        "bullets": [
            "Proyecto UGPP: backend en NestJS con arquitectura en capas (controlador, servicio, repositorio).",
            "Implementación de Redis para caché, logrando reducción del 30% en tiempos de respuesta del sistema.",
            "Frontend en React con Remix: módulos con WebSockets para comunicación en tiempo real.",
            "Suite de pruebas unitarias con Jest y sistema de notificaciones por correo electrónico.",
        ],
    },
    {
        "role": "Consultor de Desarrollo Frontend",
        "company": "Ikitech Solutions SAS",
        "period": "Ene. 2025 – Feb. 2025",
        "bullets": [
            "Frontend en React (Next.js) para Monokera (sector financiero).",
            "Gestión de estado asincrónico con TanStack Query; pruebas unitarias con Jest.",
            "Gestión de flujos colaborativos con Git y estrategia de branching.",
        ],
    },
    {
        "role": "Full Stack Developer",
        "company": "M&T Consulting SAS",
        "period": "Jul. 2024 – Feb. 2025",
        "bullets": [
            "Proyecto ICFES: backend NestJS para generación masiva de PDFs de resultados académicos.",
            "Proyecto Minsalud: frontend Vue 3 + Pinia con gestión de roles y módulos públicos.",
            "Liderazgo técnico en frontend dentro de equipo de 3 desarrolladores; entrega dentro de cronograma.",
        ],
    },
    {
        "role": "Backend Developer Freelance",
        "company": "UnoYCeroDigital SAS",
        "period": "Ene. 2024 – Ene. 2025",
        "bullets": [
            "Sistema de autenticación en Python con OAuth2 y JWT adoptado como estándar en proyectos futuros.",
            "Prueba de concepto en Angular; colaboración en proyectos con C# y Java Spring Boot.",
        ],
    },
    {
        "role": "Software Developer",
        "company": "Global e-Health",
        "period": "Ago. 2023 – Sep. 2024",
        "bullets": [
            "Módulos de citas y teleapoyo: frontend Vue 2 + backend C# .NET.",
            "Infraestructura serverless en AWS: Lambda, API Gateway, Route 53, Nginx; snapshots replicables.",
            "Configuración de Jitsi (videollamadas) y DCM4CHE (imágenes DICOM para telemedicina).",
            "Logro: infraestructura replicable redujo tiempos de despliegue en un 40%.",
        ],
    },
]

SKILLS = [
    (
        "Frontend",
        "Vue.js 2/3 (Pinia, VueBootstrap, NuxtUI) · Nuxt.js · Microfrontends · React (Next.js, Remix) · "
        "React Native · Angular (Material) · TypeScript / JavaScript · HTML5 · CSS3 · Tailwind CSS · "
        "Testing Library · Electron · Capacitor (APKs)",
    ),
    (
        "Backend",
        "NestJS · Node.js (Express) · Python (Flask, FastAPI, scripts batch) · OCR / imagen a texto · "
        "Speech-to-text · Librerías ML/AI open source · C# .NET · Java Spring Boot · APIs RESTful · "
        "Microservicios · Generación de PDFs",
    ),
    (
        "Cloud & DevOps",
        "AWS (S3, Lambda, Lightsail, CloudFront, API Gateway, Route 53) · Pipelines CI/CD · Docker · "
        "Nginx · Ubuntu Server · Certbot / SSL · Arquitectura Serverless",
    ),
    (
        "Bases de Datos",
        "PostgreSQL · MySQL · SQL Server · MongoDB · Redis · Optimización de Consultas · Modelado de Datos",
    ),
    (
        "Testing & QA",
        "Jest · Vitest (Unit Testing) · Playwright · Cypress (E2E Testing) · Postman · Swagger",
    ),
    (
        "IA & LLMs",
        "Uso avanzado de modelos de lenguaje · Creación de MCP servers · Desarrollo de Skills "
        "personalizados · Integración y prompting estratégico",
    ),
    (
        "Herramientas",
        "Git (branching, PRs, code review) · WebSockets · JWT · OAuth2 / OpenID · WhatsApp Business API · "
        "Mirth Connect · Jitsi · DCM4CHE",
    ),
]

# Versión compacta para la columna estrecha del CV visual.
SKILLS_SIDEBAR = [
    "Vue.js 2/3 (Pinia, Nuxt) y microfrontends",
    "React (Next.js, Remix), React Native",
    "Angular (Material), TypeScript",
    "NestJS, Node.js (Express), Python",
    "C# .NET, Java Spring Boot",
    "AWS (Lambda, S3, CloudFront), Docker",
    "Pipelines CI/CD, Nginx, Ubuntu Server",
    "PostgreSQL, MongoDB, Redis, SQL Server",
    "Jest, Vitest, Playwright, Cypress",
    "MCP servers y skills para flujos con IA",
]

EDUCATION = {
    "degree": "INGENIERÍA DE SISTEMAS",
    "school": "Universidad del Magdalena",
    "place": "Santa Marta, Colombia",
    "extra": "Tarjeta Profesional en trámite ante el COPNIA",
    "date": "Grado: 16 de mayo de 2026",
}

LANGUAGES = [("Español", "Nativo"), ("Inglés", "Lectura técnica básica")]

REFERENCES = [
    ("Guillermo Cala", "Ingeniero de Sistemas", "+57 300-204-7995"),
    ("Fabio Palmieri", "Ingeniero de Sistemas, Unimagdalena", "+57 301-370-9222"),
]
