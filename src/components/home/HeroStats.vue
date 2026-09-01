<template>
  <dl ref="rootRef" class="hero-stats">
    <template v-for="(stat, i) in stats" :key="stat.labelKey">
      <div v-if="i > 0" class="stat-divider" aria-hidden="true"></div>
      <div class="stat-item">
        <dt class="sr-only">{{ t(ui.hero.stats[stat.labelKey]) }}</dt>
        <!--
          El valor accesible es siempre el final: el conteo es decorativo y un
          lector de pantalla no debe recitar los pasos intermedios.
        -->
        <dd
          class="stat-number text-gradient"
          :aria-label="stat.value"
          :style="{ minWidth: `${stat.value.length}ch` }"
        >
          <span aria-hidden="true">{{ display[i] }}</span>
        </dd>
        <dd class="stat-label">{{ t(ui.hero.stats[stat.labelKey]) }}</dd>
      </div>
    </template>
  </dl>
</template>

<script setup lang="ts">
import { t } from "@/i18n";
import { ui } from "@/i18n/ui";
import { stats } from "@/data/site";
import { onBeforeUnmount, onMounted, ref } from "vue";

/**
 * Conteo ascendente de las cifras del hero, solo en escritorio.
 *
 * Los valores vienen formateados desde `site.ts` ("5+", "6", "150+"), así que
 * se separa el número de su sufijo y se recompone en cada paso: el "+" no
 * puede desaparecer durante la animación o el dato cambia de significado.
 */
const DURATION_MS = 1100;
const QUERY_DESKTOP = "(min-width: 1024px)";
const QUERY_MOTION = "(prefers-reduced-motion: reduce)";

const rootRef = ref<HTMLElement | null>(null);
/** Arranca con el valor final: si nada llega a animarse, ya está bien puesto. */
const display = ref<string[]>(stats.map((s) => s.value));

let observer: IntersectionObserver | null = null;
let frame = 0;

const parts = stats.map((s) => {
  const match = /^(\d+)(.*)$/.exec(s.value);
  return match
    ? { target: Number(match[1]), suffix: match[2] }
    : { target: null, suffix: "" };
});

/** Desacelera al final, para que la cifra se asiente en vez de frenar en seco. */
const easeOut = (t: number): number => 1 - Math.pow(1 - t, 3);

const run = (): void => {
  const start = performance.now();
  const step = (now: number): void => {
    const progress = Math.min((now - start) / DURATION_MS, 1);
    const eased = easeOut(progress);
    display.value = parts.map((p, i) =>
      p.target === null
        ? stats[i].value
        : `${Math.round(p.target * eased)}${p.suffix}`
    );
    if (progress < 1) frame = requestAnimationFrame(step);
  };
  frame = requestAnimationFrame(step);
};

onMounted(() => {
  if (
    typeof window === "undefined" ||
    typeof IntersectionObserver === "undefined" ||
    !window.matchMedia(QUERY_DESKTOP).matches ||
    window.matchMedia(QUERY_MOTION).matches
  ) {
    return;
  }

  // Se parte de cero solo cuando ya se sabe que va a animarse.
  display.value = parts.map((p, i) =>
    p.target === null ? stats[i].value : `0${p.suffix}`
  );

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer?.disconnect();
        run();
      }
    },
    { threshold: 0.4 }
  );
  if (rootRef.value) observer.observe(rootRef.value);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  if (frame) cancelAnimationFrame(frame);
});
</script>

<style scoped lang="postcss">
.hero-stats {
  @apply mt-8 flex items-center justify-center lg:justify-start gap-5 sm:gap-7;
}
.stat-item {
  @apply text-center lg:text-left;
}
.stat-number {
  @apply text-3xl sm:text-4xl font-extrabold leading-none;
  /*
   * Lo que impide que el conteo mueva el layout: todas las cifras ocupan lo
   * mismo (`tabular-nums`) y cada dato reserva de entrada el ancho de su valor
   * final, que se calcula en la plantilla. Sin esto, pasar de "0+" a "25+"
   * ensancha la columna y empuja la fila entera en cada paso, justo en la
   * primera pantalla y midiendo CLS.
   *
   * El ancho se reserva por dato y no con un valor único para todos: un mínimo
   * global obligaría a "6" a ocupar el hueco de "25+" y dejaría un vacío
   * visible entre la cifra y su separador.
   */
  font-variant-numeric: tabular-nums;
  display: inline-block;
}
.stat-label {
  @apply mt-1 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400;
}
.stat-divider {
  @apply w-px h-10 bg-gray-200 dark:bg-gray-800;
}
</style>
