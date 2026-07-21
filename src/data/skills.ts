import type { SkillGroup } from "@/utils/types";

/**
 * Competencias organizadas en pilares propios de un desarrollador
 * Frontend senior en el ecosistema Vue. El `icon` referencia un
 * componente de `lucide-vue-next` resuelto en la vista.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: "architecture",
    title: "Arquitectura & Composition API",
    icon: "Layers",
    description:
      "Diseño de aplicaciones Vue mantenibles y escalables por features.",
    items: [
      "Composition API",
      "script setup",
      "Composables",
      "Pinia",
      "Feature-based",
      "Provide / inject",
      "Headless",
    ],
  },
  {
    id: "performance",
    title: "Rendimiento & Reactividad",
    icon: "Zap",
    description:
      "Optimización del sistema de reactividad y del tiempo de carga.",
    items: [
      "computed / watchEffect",
      "shallowRef",
      "v-memo / v-once",
      "Lazy loading",
      "Suspense",
      "Code splitting",
      "Tree-shaking (Vite)",
    ],
  },
  {
    id: "quality",
    title: "Calidad & Tipado",
    icon: "ShieldCheck",
    description:
      "Código robusto respaldado por tipos y pruebas automatizadas.",
    items: [
      "TypeScript estricto",
      "Componentes genéricos",
      "Vitest",
      "Vue Test Utils",
      "Playwright / Cypress",
      "ESLint / Prettier",
    ],
  },
  {
    id: "ecosystem",
    title: "Ecosistema & Producto",
    icon: "Boxes",
    description:
      "Del framework al despliegue, con foco en experiencia y accesibilidad.",
    items: [
      "Nuxt 3 (SSR / SSG)",
      "Vue Router",
      "Tailwind CSS",
      "Accesibilidad (a11y)",
      "REST & WebSockets",
      "CI/CD",
    ],
  },
];
