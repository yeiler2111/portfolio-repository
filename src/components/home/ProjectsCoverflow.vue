<template>
  <div class="coverflow" :class="{ 'coverflow--compact': compact }">
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
        :class="{
          'slot--active': index === active,
          'slot--behind': compact && index !== active,
        }"
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
        :style="arrowStyle"
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
        :style="arrowStyle"
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
import { useTheme } from "@/composables/useTheme";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

/** Separación lateral entre tarjetas contiguas, en % del ancho de la tarjeta. */
const SPREAD = 52;
/** Cuánto se hunde cada tarjeta por cada posición de distancia. */
const DEPTH = 170;
/** Giro de las laterales para que miren hacia el centro. */
const ANGLE = 30;
/** Más allá de esta distancia la tarjeta ya no se dibuja. */
const VISIBLE = 3;
/** Cuantas tarjetas asoman detras de la activa en el mazo de movil. */
const DECK_DEPTH = 2;

const active = ref(0);
const stageRef = ref<HTMLElement | null>(null);

/**
 * Por debajo de 640 px no hay ancho para un coverflow: las tarjetas laterales
 * se encaraman sobre la central y el contenido no cabe en un alto fijo. Ahi se
 * muestra una sola tarjeta, a ancho completo y con la altura que pida su
 * contenido, manteniendo el swipe y los controles.
 */
const COMPACT_QUERY = "(max-width: 639px)";
const compact = ref(false);
let media: MediaQueryList | null = null;
const syncCompact = (event: MediaQueryListEvent | MediaQueryList) => {
  compact.value = event.matches;
};

onMounted(() => {
  media = window.matchMedia(COMPACT_QUERY);
  syncCompact(media);
  media.addEventListener("change", syncCompact);
});

onBeforeUnmount(() => {
  media?.removeEventListener("change", syncCompact);
});

const { isDark } = useTheme();

/**
 * Color de las flechas en linea, invertido respecto al tema.
 *
 * Se resuelve aqui y no en la hoja de estilos porque la utilidad `dark:` de
 * Tailwind compila a `.arrow[data-v]:is(.dark *)` y ganaba la cascada incluso
 * frente a selectores mas especificos y con !important: el boton salia blanco
 * sobre las tarjetas claras del tema claro y no se veia.
 */
const arrowStyle = computed(() =>
  isDark.value
    ? { backgroundColor: "#ffffff", borderColor: "#ffffff", color: "#111827" }
    : { backgroundColor: "#111827", borderColor: "#111827", color: "#ffffff" }
);

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
  // En movil las tarjetas se apilan como una baraja: la activa al frente y las
  // dos siguientes asomando por debajo. Solo cuenta la distancia hacia
  // adelante, para que el mazo crezca siempre en el mismo sentido.
  if (compact.value) {
    const ahead = (index - active.value + total) % total;
    if (ahead > DECK_DEPTH) return { display: "none" };
    if (ahead === 0) return { zIndex: "30" };

    // El desplazamiento vertical compensa lo que encoge la escala, para que el
    // borde inferior quede por debajo del de la tarjeta activa y se vea asomar.
    const scale = 1 - ahead * 0.05;
    const shift = ahead * 34 + 10;
    return {
      transform: `translateY(${shift}px) scale(${scale})`,
      opacity: String(0.7 - (ahead - 1) * 0.28),
      zIndex: String(30 - ahead),
    };
  }

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
  @apply mt-10;
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
/*
 * El cuerpo NO desplaza mientras la tarjeta esta plegada.
 *
 * Con `overflow-y: auto` permanente se convertia en un contenedor scrolleable
 * anidado dentro del scroll de la pagina: con el cursor sobre la tarjeta la
 * rueda se la comia el cuerpo y hacian falta ~8 clics para que la pagina
 * avanzara 5 px. El visitante quedaba atrapado en la seccion.
 *
 * Ahora solo desborda cuando la persona despliega el texto con "Leer mas",
 * que es el unico caso en que pidio ver mas contenido del que cabe. Plegada,
 * lo que se recorta son las tags (que ya vienen limitadas a MAX_VISIBLE_TECHS
 * y son lo prescindible); el CTA lleva `mt-auto` y queda siempre a la vista.
 */
.slot :deep(.body) {
  @apply min-h-0 overflow-hidden;
}
.slot :deep(.tech-tags) {
  @apply min-h-0 overflow-hidden;
}
.slot :deep(.tilt-root.is-expanded) .body {
  @apply overflow-y-auto;
}

/*
 * Colores en CSS plano y con selector largo a proposito.
 *
 * Las utilidades `dark:` compilan a `.arrow[data-v]:is(.dark *)`, que tiene la
 * misma especificidad que `.coverflow .arrow[data-v]` y va despues en la hoja,
 * asi que ganaba por orden y el boton salia blanco tambien en el tema claro.
 * Con `.controls` de por medio se sube la especificidad y deja de depender del
 * orden. `:global()` aqui no sirve: no llega a compilar.
 */
.controls {
  @apply mt-8 flex items-center justify-center gap-4;
}

/*
 * En tablet y escritorio las flechas se sacan a los lados del escenario, a la
 * altura de la tarjeta: cambiar de proyecto no obliga a bajar la vista hasta
 * el final. `top` se calcula a partir del alto del escenario, que es fijo.
 * En movil se quedan en la fila de abajo, junto a los puntos.
 */
@media (min-width: 640px) {
  .coverflow {
    @apply relative;
  }
  /*
   * Por encima de las tarjetas: llevan z-index en linea hasta 100, y con un
   * valor menor la tarjeta del fondo (aunque este borrosa y translucida)
   * interceptaba el clic y la flecha no respondia.
   */
  /*
   * Junto a la tarjeta activa, no en los extremos del contenedor: ahi quedaban
   * tan lejos del foco de lectura que pasaban desapercibidas.
   */
  .arrow {
    @apply absolute w-14 h-14;
    z-index: 200;
    top: 330px;
    transform: translateY(-50%);
  }
  .arrow:first-of-type {
    left: calc(50% - 300px);
  }
  .arrow:last-of-type {
    right: calc(50% - 300px);
  }
  .controls {
    @apply gap-0;
  }
}

/*
 * Contraste invertido respecto al tema: circulo oscuro sobre el fondo claro y
 * circulo claro sobre el oscuro. Las tarjetas del carrusel toman el color del
 * tema, asi que un boton del mismo tono se fundia con ellas y no se veia que
 * hubiera un control.
 */
.arrow {
  @apply grid place-items-center w-11 h-11 rounded-full
         bg-gray-900 text-white border border-gray-900 shadow-xl
         dark:bg-white dark:text-gray-900 dark:border-white
         transition-all duration-200
         hover:scale-110 hover:bg-primary-600 hover:border-primary-600
         dark:hover:bg-primary-500 dark:hover:text-white dark:hover:border-primary-500
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

/* El escenario se recorta lateralmente para que las tarjetas del fondo no
   generen scroll horizontal en la pagina. */
.coverflow {
  overflow-x: clip;
}

/* --- Tablet: misma idea, con menos profundidad --- */
@media (min-width: 640px) and (max-width: 1024px) {
  .stage {
    height: 660px;
    perspective: 1400px;
  }
  .slot {
    width: 360px;
    margin-left: -180px;
  }
  .arrow:first-of-type {
    left: calc(50% - 250px);
  }
  .arrow:last-of-type {
    right: calc(50% - 250px);
  }
}

/* --- Movil: una sola tarjeta, sin 3D, con la altura de su contenido --- */
.coverflow--compact .stage {
  height: auto;
  perspective: none;
  transform-style: flat;
}
.coverflow--compact .slot {
  @apply relative left-auto top-auto w-full cursor-default;
  margin-left: 0;
  height: auto;
  transform: none;
  filter: none;
  opacity: 1;
  transform-origin: 50% 50%;
  transition:
    transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.45s ease;
}

/*
 * Las de detras se calcan sobre la caja de la activa, que es la unica en flujo
 * y por tanto la que fija el alto del mazo. Se recorta su contenido: de ellas
 * solo interesa el borde que asoma.
 */
.coverflow--compact .slot--behind {
  @apply absolute inset-0 pointer-events-none overflow-hidden;
}
.coverflow--compact .slot--behind :deep(.tilt-inner) {
  @apply h-full;
}
.coverflow--compact .slot :deep(.tilt-root) {
  @apply h-auto;
  pointer-events: auto;
}
.coverflow--compact .slot :deep(.tilt-inner) {
  @apply h-auto;
}
/* Con altura libre el cuerpo ya no necesita desplazarse. */
.coverflow--compact .slot :deep(.body) {
  @apply overflow-visible;
}

@media (prefers-reduced-motion: reduce) {
  .slot {
    transition: none;
  }
}
</style>
