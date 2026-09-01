<template>
  <!--
    Timeline compacto, ya no una seccion propia.

    Antes cada puesto repetia, casi palabra por palabra, el caso de estudio que
    aparece justo encima: Alegra, Global e-Health y M&T se contaban dos veces
    entre `cases` (2.276 px) y `experience` (1.959 px). Ahora los que tienen
    `caseId` se reducen a una linea con enlace al caso, y solo conservan
    descripcion los que no estan cubiertos arriba (Unicero, Fryends), que si no
    se quedarian sin explicar en ninguna parte.
  -->
  <div id="experience" class="career">
    <header class="career-head">
      <h3 class="career-title">{{ t(ui.experience.timelineTitle) }}</h3>
      <p class="career-note">{{ t(ui.experience.timelineNote) }}</p>
    </header>

    <ol class="timeline">
      <li v-for="(job, index) in jobs" :key="index" class="timeline-item">
        <div class="timeline-marker">
          <span class="marker-dot">
            <component :is="iconFor(job.icon)" :size="14" />
          </span>
          <span
            v-if="index < jobs.length - 1"
            class="marker-line"
            aria-hidden="true"
          ></span>
        </div>

        <article class="job">
          <div class="job-header">
            <div class="job-headings">
              <h4 class="job-title">{{ t(job.title) }}</h4>
              <p class="job-company">{{ job.company }}</p>
            </div>
            <span v-if="job.isCurrent" class="job-current">
              <span class="job-current-dot"></span>
              {{ t(ui.experience.current) }}
            </span>
          </div>

          <div class="job-meta">
            <span v-if="t(job.dates)" class="job-dates">
              <Calendar :size="13" />
              {{ t(job.dates) }}
            </span>
            <span class="job-period">
              <Clock :size="13" />
              {{ t(job.period) }}
            </span>
          </div>

          <!--
            Sin caso arriba: esta es la unica descripcion del puesto en el
            sitio, asi que se conserva completa.
          -->
          <p v-if="!job.caseId" class="job-desc">{{ t(job.description) }}</p>

          <div class="job-links">
            <!-- Con caso arriba: se enlaza en vez de repetir el parrafo. -->
            <a
              v-if="job.caseId"
              :href="`#case-${job.caseId}`"
              class="job-link job-link-case"
              @click="goToCase(job.caseId, $event)"
            >
              <ArrowUp :size="14" />
              {{ t(ui.experience.seeCase) }}
            </a>

            <!--
              `link` es opcional: sin `v-if`, un puesto sin sitio renderizaba
              un ancla con href="undefined" que se veía normal y no llevaba
              a ninguna parte.
            -->
            <a
              v-if="job.link"
              :href="job.link"
              target="_blank"
              rel="noopener noreferrer"
              class="job-link"
            >
              {{ t(ui.experience.visit) }}
              <ArrowUpRight :size="14" />
            </a>
          </div>
        </article>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import { t } from "@/i18n";
import { ui } from "@/i18n/ui";
import { jobs } from "@/data/data";
import { scrollToSection } from "@/utils/scroll";
import {
  ArrowUp,
  ArrowUpRight,
  Briefcase,
  Calendar,
  Clock,
  Code2,
  Settings,
  Stethoscope,
} from "lucide-vue-next";
import type { Component } from "vue";

const icons: Record<string, Component> = {
  medical_services: Stethoscope,
  code: Code2,
  engineering: Settings,
  work: Briefcase,
};
const iconFor = (name: string): Component => icons[name] ?? Briefcase;

/**
 * El enlace tiene `href` real para que se pueda copiar y abrir en otra
 * pestaña, pero el clic normal se intercepta: el caso está en esta misma
 * página y un salto brusco haría perder el hilo de lectura.
 *
 * Reutiliza `scrollToSection`, el mismo helper del menú: ya respeta
 * `prefers-reduced-motion` (un `scrollIntoView` suave desde JS ignora esa
 * preferencia) y el hueco del header fijo lo resuelve el `scroll-mt-24` de la
 * tarjeta, sin offsets a mano que se desincronicen si cambia el header.
 */
const goToCase = (caseId: string, event: MouseEvent): void => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.button !== 0) {
    return;
  }
  event.preventDefault();
  scrollToSection(`case-${caseId}`);
};
</script>

<style scoped lang="postcss">
.career {
  @apply mt-16 max-w-4xl mx-auto scroll-mt-24;
}

.career-head {
  @apply pb-4 mb-8 border-b border-gray-200 dark:border-gray-800;
}
.career-title {
  @apply text-lg font-bold text-gray-900 dark:text-white;
}
.career-note {
  @apply mt-1 text-sm text-gray-500 dark:text-gray-400;
}

.timeline {
  @apply flex flex-col;
}

.timeline-item {
  @apply relative flex gap-4 pb-6 last:pb-0;
}

.timeline-marker {
  @apply relative flex flex-col items-center shrink-0;
}

/* Marcador mas pequeño que el de la version larga: aqui acompaña una fila,
   no encabeza una tarjeta. */
.marker-dot {
  @apply grid place-items-center w-8 h-8 rounded-full text-white
         bg-gradient-to-br from-primary-500 to-secondary-500
         shadow-md shadow-primary-500/25
         ring-4 ring-gray-50 dark:ring-gray-950;
}

.marker-line {
  @apply flex-1 w-px mt-1.5 rounded-full
         bg-gradient-to-b from-primary-300 to-primary-100
         dark:from-primary-700 dark:to-primary-900/40;
}

/*
 * La linea se dibuja de arriba abajo conforme el puesto sube por la pantalla.
 *
 * Va con `animation-timeline`, no con JS: el navegador la resuelve en el
 * compositor, fuera del hilo principal, que en movil es el recurso escaso.
 * Donde no hay soporte la linea aparece completa, igual que hasta ahora.
 *
 * El rango se mide en `cover` y no en `entry` a proposito: `cover` va de "el
 * elemento empieza a entrar" a "termina de salir", asi que se comporta igual
 * en un movil corto que en un monitor alto. Con `entry` los puestos altos no
 * llegaban a completar el trazo en pantallas pequenas.
 */
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .marker-line {
      transform-origin: top;
      animation: draw-line linear both;
      animation-timeline: view();
      animation-range: cover 5% cover 45%;
    }
  }
}

@keyframes draw-line {
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
}

/* ============================================================
   Escritorio: el timeline se compone al bajar
   ============================================================ */
@media (min-width: 1024px) {
  @supports (animation-timeline: view()) {
    @media (prefers-reduced-motion: no-preference) {
      /*
       * Cada puesto llega desde la derecha, en la misma direccion en la que
       * avanza la linea. El rango arranca antes que el de `draw-line` para
       * que la tarjeta ya este colocada cuando el trazo la alcanza.
       */
      .job {
        animation: job-in linear both;
        animation-timeline: view();
        animation-range: cover 2% cover 26%;
      }

      /* El punto crece justo cuando el trazo llega a su altura. */
      .marker-dot {
        animation: dot-in linear both;
        animation-timeline: view();
        animation-range: cover 4% cover 24%;
      }
    }
  }

  /*
   * El unico bucle infinito del sitio, y por eso va acotado: son 6 px de punto
   * en el puesto actual. Comunica "sigo aqui" y su area es tan pequena que el
   * repintado no se nota, pero no se replica en ningun otro sitio.
   */
  @media (prefers-reduced-motion: no-preference) {
    .job-current-dot {
      animation: live-pulse 2.4s ease-in-out infinite;
    }
  }
}

@keyframes job-in {
  from {
    opacity: 0.3;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes dot-in {
  from {
    opacity: 0.45;
    transform: scale(0.6);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes live-pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.4);
    opacity: 0.55;
  }
}

/* Sin tarjeta: el timeline es una lista, no una pila de cajas. */
.job {
  @apply flex-1 pb-1;
}

.job-header {
  @apply flex items-start justify-between gap-3;
}
.job-headings {
  @apply flex flex-col;
}
.job-title {
  @apply text-base font-bold leading-tight text-gray-900 dark:text-white;
}
.job-company {
  @apply text-sm font-semibold text-primary-600 dark:text-primary-400;
}

.job-current {
  @apply inline-flex items-center gap-1.5 shrink-0 px-2 py-0.5 rounded-full
         text-[11px] font-semibold
         bg-success/10 text-emerald-700 dark:text-emerald-400
         border border-success/20;
}
.job-current-dot {
  @apply w-1.5 h-1.5 rounded-full bg-success;
}

.job-meta {
  @apply flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5;
}
.job-dates {
  @apply inline-flex items-center gap-1
         text-xs font-semibold text-primary-600 dark:text-primary-400;
}
.job-period {
  @apply inline-flex items-center gap-1
         text-xs font-medium text-gray-500 dark:text-gray-400;
}

.job-desc {
  @apply mt-2.5 text-sm leading-relaxed text-gray-600 dark:text-gray-300;
}

.job-links {
  @apply flex flex-wrap items-center gap-x-4 gap-y-1 mt-2;
}
.job-link {
  @apply inline-flex items-center gap-1
         text-xs font-semibold text-gray-500 dark:text-gray-400
         hover:text-primary-600 dark:hover:text-primary-400 transition-colors;
}
.job-link-case {
  @apply text-primary-600 dark:text-primary-400
         hover:text-primary-700 dark:hover:text-primary-300;
}
</style>
