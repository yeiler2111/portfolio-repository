<template>
  <article
    ref="cardRef"
    class="tilt-root"
    :class="{ 'is-expanded': isExpanded }"
    @pointermove="handleTilt"
    @pointerleave="resetTilt"
  >
    <div class="group card tilt-inner flex flex-col">
      <!-- Brillo que sigue al cursor -->
      <span class="glare" aria-hidden="true"></span>
    <!-- Carrusel de imágenes -->
    <div class="media">
      <!--
        Distintivo por rango. El icono cambia con el estado y el rango mas alto
        (`revenue`) recibe tratamiento de condecoracion: fondo dorado, anillo y
        un brillo que lo recorre. Los rangos bajos (`demo`, `academic`) van
        deliberadamente apagados, para que la jerarquia se lea de un vistazo.
      -->
      <span v-if="status" class="status-badge" :class="statusClass">
        <span v-if="isTopRank" class="status-shine" aria-hidden="true"></span>
        <component :is="statusIcon" :size="12" class="status-icon" />
        {{ statusLabel }}
      </span>

      <template v-if="images.length">
        <div v-if="isLoading" class="media-loader">
          <div class="loader"></div>
        </div>

        <transition name="fade" mode="out-in">
          <div :key="images[currentIndex]" class="media-slide">
            <img
              :src="images[currentIndex]"
              :alt="`${title} — ${t(ui.projects.screenshotAlt)} ${currentIndex + 1}`"
              loading="lazy"
              class="media-img"
              :class="{ 'opacity-0': isLoading }"
              @load="handleImageLoad"
            />
          </div>
        </transition>

        <template v-if="images.length > 1">
          <div class="media-nav">
            <button
              class="nav-btn"
              :aria-label="t(ui.projects.prevImage)"
              @click.stop="prevImage"
            >
              <ChevronLeft :size="20" />
            </button>
            <button
              class="nav-btn"
              :aria-label="t(ui.projects.nextImage)"
              @click.stop="nextImage"
            >
              <ChevronRight :size="20" />
            </button>
          </div>

          <div class="media-dots">
            <button
              v-for="(img, idx) in images"
              :key="idx"
              class="dot"
              :class="idx === currentIndex ? 'dot-active' : ''"
              :aria-label="`${t(ui.projects.goToImage)} ${idx + 1}`"
              @click.stop="goToImage(idx)"
            />
          </div>
        </template>
      </template>

      <!-- Sin capturas todavía: evita el spinner infinito de un src indefinido. -->
      <div v-else class="media-empty">
        <ImageOff :size="30" />
        <span>{{ t(ui.projects.noPreview) }}</span>
      </div>
    </div>

    <!-- Contenido -->
    <div class="body">
      <div>
        <h3 class="project-title">{{ title }}</h3>
        <p v-if="context" class="project-context">{{ context }}</p>
      </div>

      <div>
        <!--
          Con `highlights`, los hechos duros ocupan el espacio que antes tenia
          la prosa recortada: "rentado a un karaoke" o "264 pruebas" estaban
          sepultados en el parrafo y solo asomaban tras pulsar "Leer mas".
          La descripcion completa pasa a ser lo que revela el desplegable.
        -->
        <ul v-if="highlights?.length" class="highlights">
          <li v-for="(item, i) in highlights" :key="i">{{ item }}</li>
        </ul>

        <p
          v-if="!highlights?.length || isExpanded"
          class="project-desc"
          :class="{ 'line-clamp-3': !isExpanded && !highlights?.length }"
        >
          {{ description }}
        </p>

        <button v-if="shouldShowReadMore" class="read-more" @click="isExpanded = !isExpanded">
          {{ isExpanded ? t(ui.projects.readLess) : t(ui.projects.readMore) }}
          <ChevronDown
            :size="16"
            :class="['transition-transform', isExpanded && 'rotate-180']"
          />
        </button>
      </div>

      <p v-if="note" class="project-note">
        <Lock :size="13" class="shrink-0" />
        <span>{{ note }}</span>
      </p>

      <!-- Sin CTA, las tags se anclan abajo para que el grid no se descuadre. -->
      <div class="tech-tags" :class="{ 'mt-auto': !hasCta }">
        <span v-for="tech in visibleTechnologies" :key="String(tech)" class="chip">
          {{ tech }}
        </span>
        <span v-if="hiddenTechCount" class="chip chip-more" :title="technologies.join(' · ')">
          +{{ hiddenTechCount }}
        </span>
      </div>

      <!-- Varias entradas: el proyecto se recorre distinto según el rol. -->
      <div v-if="links?.length" class="role-links mt-auto">
        <div class="role-buttons">
          <a
            v-for="(entry, i) in links"
            :key="entry.url + i"
            :href="entry.url"
            target="_blank"
            rel="noopener noreferrer"
            :class="['btn-lg', 'role-btn', i === 0 ? 'btn-primary' : 'btn-outline']"
          >
            {{ entry.label }}
            <ArrowUpRight :size="18" />
          </a>
        </div>
        <p v-if="linkHints" class="role-hints">{{ linkHints }}</p>
      </div>

      <a
        v-else-if="link"
        :href="link"
        target="_blank"
        rel="noopener noreferrer"
        class="btn-primary btn-lg w-full mt-auto"
      >
        {{ t(ui.projects.view) }}
        <ArrowUpRight :size="18" />
      </a>
    </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { t } from "@/i18n";
import { ui } from "@/i18n/ui";
import type { ProjectStatus } from "@/utils/types";
import {
  ArrowUpRight,
  Award,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  FlaskConical,
  ImageOff,
  Lock,
  Rocket,
  Smartphone,
  UserCheck,
  Wrench,
} from "lucide-vue-next";
import type { Component } from "vue";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

export interface ValueCardProject {
  title: string;
  description: string;
  images: string[];
  technologies: string[];
  /** Hechos duros ya traducidos; sustituyen a la prosa en el estado plegado. */
  highlights?: string[];
  /** Ya traducido por el padre; no todos los proyectos tienen contexto. */
  context?: string;
  /** Aviso corto ya traducido, ej. repositorio privado. */
  note?: string;
  status?: ProjectStatus;
  /** Opcional: hay proyectos sin demo ni repo público. */
  link?: string;
  /** Varias entradas por rol, ya traducidas por el padre. */
  links?: { label: string; url: string; hint?: string }[];
}

const props = defineProps<ValueCardProject>();

const AUTOPLAY_MS = 4000;

/** Inclinacion maxima, en grados. Por encima de ~12 marea y estorba al leer. */
const TILT_MAX = 9;

const canTilt = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * El JS solo escribe cuatro variables CSS; la transformacion la resuelve el
 * compositor. Asi el movimiento no provoca recalculos de layout.
 */
const handleTilt = (event: PointerEvent) => {
  const el = cardRef.value;
  if (!el || !canTilt()) return;

  const rect = el.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width;
  const y = (event.clientY - rect.top) / rect.height;

  el.style.setProperty("--ry", `${(x - 0.5) * 2 * TILT_MAX}deg`);
  el.style.setProperty("--rx", `${(0.5 - y) * 2 * TILT_MAX}deg`);
  el.style.setProperty("--mx", `${x * 100}%`);
  el.style.setProperty("--my", `${y * 100}%`);
  el.style.setProperty("--tilt", "1");
};

const resetTilt = () => {
  const el = cardRef.value;
  if (!el) return;
  el.style.setProperty("--rx", "0deg");
  el.style.setProperty("--ry", "0deg");
  el.style.setProperty("--tilt", "0");
};

const currentIndex = ref(0);
const isLoading = ref(true);
const isExpanded = ref(false);
const cardRef = ref<HTMLElement | null>(null);
let intervalId: number | null = null;
let observer: IntersectionObserver | null = null;

const shouldShowReadMore = computed(() => props.description.length > 150);

/**
 * Tope de tags visibles.
 *
 * La tarjeta vive en un escenario de alto fijo (660 px). Proyectos como Tocata
 * declaran 11 tecnologias: tres filas de chips que desbordaban el cuerpo y lo
 * obligaban a desplazarse, atrapando la rueda del raton. Ocho caben en dos
 * filas y el resto se resume en un "+N" con el listado completo en el title.
 */
const MAX_VISIBLE_TECHS = 8;

const visibleTechnologies = computed(() =>
  props.technologies.slice(0, MAX_VISIBLE_TECHS)
);
const hiddenTechCount = computed(() =>
  Math.max(0, props.technologies.length - MAX_VISIBLE_TECHS)
);

const STATUS_LABELS = {
  revenue: ui.projects.status.revenue,
  production: ui.projects.status.production,
  client: ui.projects.status.client,
  store: ui.projects.status.store,
  demo: ui.projects.status.demo,
  academic: ui.projects.status.academic,
  "in-progress": ui.projects.status.inProgress,
  archived: ui.projects.status.archived,
} as const;

const STATUS_CLASSES = {
  revenue: "status-revenue",
  production: "status-production",
  client: "status-client",
  store: "status-store",
  demo: "status-demo",
  academic: "status-academic",
  "in-progress": "status-progress",
  archived: "status-archived",
} as const;

/** Un icono por rango: el distintivo se distingue tambien sin leerlo. */
const STATUS_ICONS: Record<ProjectStatus, Component> = {
  revenue: Award,
  production: Rocket,
  client: UserCheck,
  store: Smartphone,
  demo: CircleDot,
  academic: FlaskConical,
  "in-progress": Wrench,
  archived: CircleDot,
};

/** Solo el rango mas alto lleva el tratamiento de condecoracion. */
const TOP_RANK: ProjectStatus = "revenue";

const hasCta = computed(() => Boolean(props.link) || Boolean(props.links?.length));

/** Las credenciales van juntas en una línea, no repetidas bajo cada botón. */
const linkHints = computed(() =>
  (props.links ?? [])
    .filter((entry) => entry.hint)
    .map((entry) => entry.hint)
    .join(" · ")
);

const statusLabel = computed(() =>
  props.status ? t(STATUS_LABELS[props.status]) : ""
);
const statusClass = computed(() =>
  props.status ? STATUS_CLASSES[props.status] : ""
);
const statusIcon = computed(() =>
  props.status ? STATUS_ICONS[props.status] : CircleDot
);
const isTopRank = computed(() => props.status === TOP_RANK);

const advance = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length;
};

const startAutoplay = () => {
  if (intervalId === null && props.images.length > 1) {
    intervalId = window.setInterval(advance, AUTOPLAY_MS);
  }
};

const stopAutoplay = () => {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

/** Reinicia el temporizador tras interacción manual. */
const resetAutoplay = () => {
  if (intervalId !== null) {
    stopAutoplay();
    startAutoplay();
  }
};

const nextImage = () => {
  advance();
  resetAutoplay();
};

const prevImage = () => {
  currentIndex.value =
    (currentIndex.value - 1 + props.images.length) % props.images.length;
  resetAutoplay();
};

const goToImage = (idx: number) => {
  currentIndex.value = idx;
  resetAutoplay();
};

const handleImageLoad = () => {
  isLoading.value = false;
};

watch(currentIndex, () => {
  isLoading.value = true;
});

onMounted(() => {
  // Solo reproduce el carrusel cuando la tarjeta está visible.
  observer = new IntersectionObserver((entries) => {
    entries[0]?.isIntersecting ? startAutoplay() : stopAutoplay();
  });
  if (cardRef.value) observer.observe(cardRef.value);
});

onBeforeUnmount(() => {
  stopAutoplay();
  observer?.disconnect();
});
</script>

<style scoped lang="postcss">
.tilt-root {
  perspective: 1000px;
}

.tilt-inner {
  --rx: 0deg;
  --ry: 0deg;
  --mx: 50%;
  --my: 50%;
  --tilt: 0;
  position: relative;
  transform: rotateX(var(--rx)) rotateY(var(--ry))
    translateY(calc(var(--tilt) * -6px)) scale(calc(1 + var(--tilt) * 0.015));
  transform-style: preserve-3d;
  transition: transform 220ms ease-out, box-shadow 220ms ease-out,
    border-color 220ms ease-out;
  will-change: transform;
}
/* El <article> no recorta, asi que el borde redondeado lo pone cada capa. */
.tilt-root:hover .tilt-inner {
  @apply shadow-2xl border-primary-300 dark:border-primary-700/60;
}

/* Reflejo diagonal que nace donde esta el cursor. */
.glare {
  @apply pointer-events-none absolute inset-0 z-40 rounded-2xl opacity-0;
  background: radial-gradient(
    420px circle at var(--mx) var(--my),
    rgb(255 255 255 / 0.16),
    transparent 45%
  );
  transition: opacity 220ms ease-out;
}
.tilt-root:hover .glare {
  opacity: 1;
}

/* Profundidad: cada capa se separa un poco del plano de la card. */
.media,
.body {
  transform: translateZ(calc(var(--tilt) * 18px));
  transition: transform 220ms ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .tilt-inner,
  .media,
  .body {
    transform: none;
    transition: none;
  }
}

.media {
  @apply relative w-full aspect-[16/10] overflow-hidden rounded-t-2xl
         bg-gradient-to-br from-gray-50 to-gray-100
         dark:from-gray-800 dark:to-gray-900;
}

.status-badge {
  @apply absolute top-4 left-4 z-30 overflow-hidden
         inline-flex items-center gap-1.5
         px-2.5 py-1 rounded-full text-xs font-semibold
         bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm
         border shadow-sm;
}
.status-icon {
  @apply shrink-0;
}

/*
 * Colores semánticos de estado, deliberadamente fuera de los tokens de marca.
 *
 * El orden de abajo es el del rango: dorado para el producto que factura,
 * colores plenos para lo que está vivo, grises apagados para demos y trabajo
 * académico. Antes todos compartían el mismo verde y el distintivo no
 * distinguía nada.
 */

/* --- Condecoración: solo el rango más alto --- */
.status-revenue {
  @apply text-amber-900 dark:text-amber-950
         border-amber-300/80 dark:border-amber-300/60
         shadow-md shadow-amber-500/25;
  /* Fondo propio: el dorado tiene que ganarle al bg-white/90 de la base. */
  background-image: linear-gradient(135deg, #fde68a 0%, #fbbf24 45%, #f59e0b 100%);
}
/* Anillo interior: le da el relieve de medalla sin añadir otro elemento. */
.status-revenue::after {
  content: "";
  @apply absolute inset-0 rounded-full pointer-events-none
         ring-1 ring-inset ring-white/50;
}
/* Destello que recorre el distintivo cada pocos segundos. */
.status-shine {
  @apply absolute inset-y-0 -left-full w-1/2 pointer-events-none;
  background: linear-gradient(
    100deg,
    transparent 0%,
    rgb(255 255 255 / 0.65) 50%,
    transparent 100%
  );
  animation: status-sweep 4.5s ease-in-out infinite;
}
@keyframes status-sweep {
  0%,
  55% {
    transform: translateX(0);
  }
  85%,
  100% {
    transform: translateX(400%);
  }
}

/* --- Rangos vivos: color pleno, sin condecoración --- */
.status-production {
  @apply text-emerald-700 dark:text-emerald-400
         border-emerald-200 dark:border-emerald-800;
}
.status-client {
  @apply text-primary-700 dark:text-primary-400
         border-primary-200 dark:border-primary-800;
}
.status-store {
  @apply text-violet-700 dark:text-violet-400
         border-violet-200 dark:border-violet-800;
}

/* --- Rangos bajos: apagados a propósito --- */
.status-demo,
.status-academic,
.status-archived {
  @apply text-gray-500 dark:text-gray-400
         border-gray-200 dark:border-gray-700 shadow-none;
}
.status-progress {
  @apply text-amber-700 dark:text-amber-400
         border-amber-200 dark:border-amber-800;
}

@media (prefers-reduced-motion: reduce) {
  .status-shine {
    animation: none;
    @apply hidden;
  }
}

.media-empty {
  @apply absolute inset-0 grid place-content-center justify-items-center gap-2
         text-gray-400 dark:text-gray-600 text-xs font-medium;
}

.media-loader {
  @apply absolute inset-0 z-10 grid place-items-center
         bg-white/50 dark:bg-gray-900/60 backdrop-blur-sm;
}
.loader {
  @apply w-10 h-10 rounded-full border-4
         border-gray-200 dark:border-gray-700 border-t-primary-600 animate-spin;
}

.media-slide {
  @apply w-full h-full p-5 grid place-items-center;
}
.media-img {
  @apply max-w-full max-h-full object-contain rounded-lg
         transition-all duration-700 group-hover:scale-[1.03];
}

.media-nav {
  @apply absolute inset-x-0 top-1/2 -translate-y-1/2 z-20
         flex justify-between px-4
         opacity-0 group-hover:opacity-100 transition-opacity duration-300;
}
.nav-btn {
  @apply grid place-items-center w-10 h-10 rounded-full
         bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg
         text-gray-800 dark:text-white
         hover:bg-white dark:hover:bg-gray-700 hover:scale-110 transition-all;
}

.media-dots {
  @apply absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2;
}
.dot {
  @apply w-2 h-2 rounded-full bg-white/70 dark:bg-gray-400/70
         hover:bg-white transition-all duration-300;
}
.dot-active {
  @apply w-6 bg-primary-600 dark:bg-primary-400;
}

.body {
  @apply flex-1 flex flex-col gap-4 p-6;
}

.project-title {
  @apply text-xl font-bold leading-tight
         text-gray-900 dark:text-white
         group-hover:text-primary-600 dark:group-hover:text-primary-400
         transition-colors;
}

.project-context {
  @apply mt-1 text-xs font-medium text-gray-500 dark:text-gray-400;
}

.project-note {
  @apply inline-flex items-start gap-1.5 text-xs leading-relaxed
         text-gray-500 dark:text-gray-400;
}

.project-desc {
  @apply text-sm leading-relaxed text-gray-600 dark:text-gray-300;
}

.read-more {
  @apply inline-flex items-center gap-1 mt-2
         text-sm font-semibold text-primary-600 dark:text-primary-400
         hover:text-primary-700 dark:hover:text-primary-300 transition-colors;
}

.role-links {
  @apply flex flex-col gap-2;
}
.role-buttons {
  @apply grid grid-cols-1 sm:grid-cols-2 gap-2;
}
.role-btn {
  @apply w-full justify-center;
}
.role-hints {
  @apply text-center text-xs text-gray-500 dark:text-gray-400;
}

/*
 * Mismo lenguaje visual que los bullets de los casos de estudio: la sección de
 * arriba ya entrenó al lector con esa forma, y romperla aquí obligaba a
 * reaprender cómo se lee un proyecto.
 */
.highlights {
  @apply flex flex-col gap-1.5;
}
.highlights li {
  @apply relative pl-4 text-sm leading-snug text-gray-600 dark:text-gray-300;
}
.highlights li::before {
  content: "";
  @apply absolute left-0 top-[7px] w-1.5 h-1.5 rounded-full bg-primary-400;
}

.tech-tags {
  @apply flex flex-wrap gap-2;
}

/* El resumen "+N" se lee como contador, no como una tecnologia mas. */
.chip-more {
  @apply font-semibold text-gray-500 dark:text-gray-400 cursor-help;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
