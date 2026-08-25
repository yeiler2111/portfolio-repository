<template>
  <div class="coverflow">
    <div
      ref="stageRef"
      class="stage"
      role="group"
      :aria-label="t(ui.projects.title)"
      tabindex="0"
      @keydown.left.prevent="move(-1)"
      @keydown.right.prevent="move(1)"
      @pointerdown="onDragStart"
      @pointermove="onDragMove"
      @pointerup="onDragEnd"
      @pointercancel="onDragEnd"
    >
      <div
        v-for="(project, index) in projects"
        :key="project.id"
        class="slot"
        :class="{ 'slot--active': index === active }"
        :style="slotStyle(index)"
        :aria-hidden="index !== active"
        @click="index === active ? null : goTo(index)"
      >
        <ProjectCard
          :title="t(project.title)"
          :description="t(project.description)"
          :images="project.images"
          :technologies="project.technologies"
          :status="project.status"
          :context="project.context ? t(project.context) : undefined"
          :note="project.note ? t(project.note) : undefined"
          :link="project.link"
          :links="
            project.links?.map((entry) => ({
              label: t(entry.label),
              url: entry.url,
              hint: entry.hint ? t(entry.hint) : undefined,
            }))
          "
        />
      </div>
    </div>

    <div class="controls">
      <button
        class="arrow"
        :aria-label="t(ui.projects.prevProject)"
        @click="move(-1)"
      >
        <ChevronLeft :size="20" />
      </button>

      <div class="dots">
        <button
          v-for="(project, index) in projects"
          :key="project.id"
          class="dot"
          :class="{ 'dot--on': index === active }"
          :aria-label="t(project.title)"
          :aria-current="index === active"
          @click="goTo(index)"
        />
      </div>

      <button
        class="arrow"
        :aria-label="t(ui.projects.nextProject)"
        @click="move(1)"
      >
        <ChevronRight :size="20" />
      </button>
    </div>

    <p class="counter">{{ active + 1 }} / {{ projects.length }}</p>
  </div>
</template>

<script setup lang="ts">
import ProjectCard from "@/components/home/CardProyect.vue";
import { projects } from "@/data/projects";
import { t } from "@/i18n";
import { ui } from "@/i18n/ui";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import { ref } from "vue";

/** Separación lateral entre tarjetas contiguas, en % del ancho de la tarjeta. */
const SPREAD = 52;
/** Cuánto se hunde cada tarjeta por cada posición de distancia. */
const DEPTH = 170;
/** Giro de las laterales para que miren hacia el centro. */
const ANGLE = 30;
/** Más allá de esta distancia la tarjeta ya no se dibuja. */
const VISIBLE = 3;

const active = ref(0);
const stageRef = ref<HTMLElement | null>(null);

const total = projects.length;

/** El carrusel es circular: desde el ultimo se sigue al primero. */
const wrap = (index: number) => ((index % total) + total) % total;

const goTo = (index: number) => {
  active.value = wrap(index);
};
const move = (step: number) => goTo(active.value + step);

/**
 * Cada tarjeta se coloca según su distancia a la activa: se aparta, se hunde
 * en el eje Z y gira hacia el centro. El z-index invertido mantiene el orden
 * de apilado correcto sin depender del orden del DOM.
 */
const slotStyle = (index: number) => {
  // Distancia por el camino mas corto, para que las ultimas tarjetas aparezcan
  // a la izquierda de la primera en vez de quedar todas amontonadas a un lado.
  let offset = index - active.value;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;

  const distance = Math.abs(offset);
  const direction = Math.sign(offset);

  if (distance > VISIBLE) {
    return { opacity: 0, pointerEvents: "none" as const, visibility: "hidden" as const };
  }

  return {
    transform: [
      `translateX(${offset * SPREAD}%)`,
      `translateZ(${-distance * DEPTH}px)`,
      `rotateY(${-direction * Math.min(distance, 2) * ANGLE}deg)`,
      `scale(${1 - distance * 0.05})`,
    ].join(" "),
    opacity: distance === 0 ? 1 : Math.max(0.25, 0.62 - (distance - 1) * 0.18),
    zIndex: String(100 - distance),
    // Desenfoque progresivo: separa la tarjeta en foco del resto y evita que
    // los textos del fondo compitan con el que se esta leyendo.
    filter:
      distance === 0
        ? "none"
        : `saturate(${1 - distance * 0.18}) blur(${distance * 1.6}px)`,
  };
};

// ------------------------------------------------------------ arrastre
const dragX = ref<number | null>(null);
/** Umbral en píxeles: por debajo se considera un clic, no un arrastre. */
const DRAG_THRESHOLD = 60;

const onDragStart = (event: PointerEvent) => {
  dragX.value = event.clientX;
};

const onDragMove = (event: PointerEvent) => {
  if (dragX.value === null) return;
  const delta = event.clientX - dragX.value;
  if (Math.abs(delta) < DRAG_THRESHOLD) return;
  move(delta < 0 ? 1 : -1);
  dragX.value = null;
};

const onDragEnd = () => {
  dragX.value = null;
};

</script>

<style scoped lang="postcss">
.coverflow {
  @apply mt-14;
}

/*
 * El escenario aporta la perspectiva; las tarjetas se posicionan de forma
 * absoluta sobre el mismo centro y de ahí se separan.
 */
.stage {
  @apply relative mx-auto w-full outline-none;
  height: 660px;
  perspective: 1700px;
  perspective-origin: 50% 45%;
  transform-style: preserve-3d;
  touch-action: pan-y;
}

.slot {
  @apply absolute top-0 left-1/2 cursor-pointer;
  width: 430px;
  height: 100%;
  margin-left: -215px;
  transform-style: preserve-3d;
  transition:
    transform 0.55s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.55s ease,
    filter 0.55s ease;
  will-change: transform, opacity;
}

/* Solo la tarjeta central es interactiva: en las demás el clic la trae al frente. */
.slot :deep(.tilt-root) {
  @apply h-full;
  pointer-events: none;
}
.slot--active {
  @apply cursor-default;
}
.slot--active :deep(.tilt-root) {
  pointer-events: auto;
}
.slot :deep(.tilt-inner) {
  @apply h-full;
}
/* Con alto fijo, el cuerpo desplaza si el texto se despliega con "Leer más". */
.slot :deep(.body) {
  @apply min-h-0 overflow-y-auto;
}

.controls {
  @apply mt-8 flex items-center justify-center gap-4;
}

.arrow {
  @apply grid place-items-center w-11 h-11 rounded-full
         bg-white dark:bg-gray-900
         border border-gray-200 dark:border-gray-800
         text-gray-700 dark:text-gray-300 shadow-sm
         transition-all hover:border-primary-300 hover:text-primary-600
         dark:hover:border-primary-700/60 dark:hover:text-primary-400
         disabled:opacity-35 disabled:pointer-events-none;
}

.dots {
  @apply flex items-center gap-2;
}
.dot {
  @apply w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700
         transition-all duration-300 hover:bg-gray-400 dark:hover:bg-gray-600;
}
.dot--on {
  @apply w-7 bg-primary-600 dark:bg-primary-400;
}

.counter {
  @apply mt-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400;
}

/* --- Responsive: menos profundidad y menos vecinos en pantallas pequeñas --- */
@media (max-width: 1024px) {
  .stage {
    height: 640px;
    perspective: 1400px;
  }
  .slot {
    width: 380px;
    margin-left: -190px;
  }
}

@media (max-width: 640px) {
  .stage {
    height: 620px;
    perspective: 1100px;
  }
  .slot {
    width: 290px;
    margin-left: -145px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .slot {
    transition: none;
  }
}
</style>
