<template>
  <section v-spotlight class="hero" aria-label="Presentación">
    <!-- Fondo decorativo sutil -->
    <div class="hero-glow" aria-hidden="true"></div>

    <div class="hero-inner container-page">
      <!--
        Contenido. Nada por encima de la línea de flotación lleva `v-reveal`:
        esa directiva arranca en opacity 0 y anima al entrar en viewport, y
        aplicada al <h1> retrasaba el propio elemento LCP (120 ms de delay más
        600 ms de transición). El texto del hero ya está visible al pintar; la
        animación de entrada se reserva para lo que está más abajo.
      -->
      <div class="hero-content">
        <span v-if="profile.available" class="status-badge">
          <span class="status-dot"></span>
          {{ t(ui.hero.available) }}
        </span>

        <p class="hero-greeting">{{ t(ui.hero.greeting) }}</p>

        <h1 class="hero-title">
          <span class="hero-name">{{ profile.name }}</span>
          <span class="hero-role text-gradient">{{ t(profile.role) }}</span>
        </h1>

        <p class="hero-focus">{{ t(profile.focus) }}</p>

        <p class="hero-tagline">{{ t(profile.tagline) }}</p>

        <HeroStats />

        <div class="hero-actions">
          <BaseButton to="/contactme" size="lg">
            <template #icon-left><Mail :size="20" /></template>
            {{ t(ui.hero.contact) }}
          </BaseButton>

          <div ref="cvRef" class="relative">
            <BaseButton variant="outline" size="lg" @click="cvMenuOpen = !cvMenuOpen">
              <template #icon-left><Download :size="20" /></template>
              {{ t(ui.hero.downloadCV) }}
              <template #icon-right>
                <ChevronDown
                  :size="16"
                  :class="['transition-transform', cvMenuOpen && 'rotate-180']"
                />
              </template>
            </BaseButton>

            <!--
              Es una lista de enlaces de descarga, no un menú de aplicación.
              Llevaba role="menu"/role="menuitem", que le promete al lector de
              pantalla navegación con flechas y foco atrapado: nada de eso
              estaba implementado. Una <ul> de enlaces se anuncia bien y
              funciona con Tab sin código extra.
            -->
            <transition name="fade-down">
              <ul v-if="cvMenuOpen" class="cv-dropdown">
                <li v-for="cv in resumes" :key="cv.href">
                <a
                  :href="cv.href"
                  :download="cv.filename"
                  class="cv-item"
                  @click="cvMenuOpen = false"
                >
                  <span class="cv-item-icon"><FileText :size="18" /></span>
                  <span class="cv-item-body">
                    <span class="cv-item-label">{{ cv.label }}</span>
                    <span class="cv-item-desc">{{ t(cv.description) }}</span>
                  </span>
                  <Download :size="16" class="cv-item-arrow" />
                </a>
                </li>
              </ul>
            </transition>
          </div>

          <button type="button" class="hero-cases" @click="scrollToCases">
            {{ t(ui.hero.viewCases) }}
            <ArrowRight :size="18" />
          </button>
        </div>
      </div>

      <!-- Imagen -->
      <div class="hero-media">
        <div class="media-frame">
          <picture>
            <source
              v-for="src in profile.image.sources"
              :key="src.srcset"
              :srcset="src.srcset"
              :media="src.media"
              :type="src.type"
            />
            <img
              :src="profile.image.src"
              :alt="profile.image.alt"
              width="768"
              height="960"
              loading="eager"
              decoding="async"
              fetchpriority="high"
              class="media-img"
              :class="{ 'is-loaded': !loading }"
              @load="loading = false"
            />
          </picture>

          <div v-if="loading" class="media-loader">
            <div class="spinner"></div>
          </div>
        </div>

        <div class="media-halo" aria-hidden="true"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseButton from "@/components/ui/BaseButton.vue";
import { t } from "@/i18n";
import { ui } from "@/i18n/ui";
import { profile, resumes } from "@/data/site";
import { scrollToSection } from "@/utils/scroll";
import { ArrowRight, ChevronDown, Download, FileText, Mail } from "lucide-vue-next";
import { onBeforeUnmount, onMounted, ref } from "vue";
import HeroStats from "./HeroStats.vue";

const loading = ref(true);
const cvMenuOpen = ref(false);
const cvRef = ref<HTMLElement | null>(null);

/** Scroll suave a la sección de casos. */
const scrollToCases = (): void => {
  scrollToSection("cases");
};

/** Cierra el dropdown al hacer click fuera. */
const handleClickOutside = (e: MouseEvent) => {
  if (cvRef.value && !cvRef.value.contains(e.target as Node)) {
    cvMenuOpen.value = false;
  }
};

onMounted(() => document.addEventListener("click", handleClickOutside));
onBeforeUnmount(() => document.removeEventListener("click", handleClickOutside));
</script>

<style scoped lang="postcss">
.hero {
  @apply relative flex items-center min-h-screen overflow-x-clip pt-28 sm:pt-32 pb-16;
}

.hero-glow {
  @apply absolute inset-0 -z-10 pointer-events-none;
  background:
    radial-gradient(60% 50% at 15% 20%, rgb(var(--color-primary-500) / 0.1), transparent 70%),
    radial-gradient(50% 50% at 85% 30%, rgb(var(--color-secondary-500) / 0.1), transparent 70%);
}

/* ============================================================
   Escritorio: el fondo del hero reacciona
   ============================================================ */
@media (min-width: 1024px) and (hover: hover) and (pointer: fine) {
  @media (prefers-reduced-motion: no-preference) {
    /*
     * Los dos halos derivan con el cursor. El desplazamiento se queda en un
     * 12 % del recorrido a proposito: lo justo para que el fondo respire y
     * acompane al raton sin convertirse en el protagonista de una zona que
     * tiene que leerse, no mirarse.
     *
     * `--mx`/`--my` las publica `v-spotlight` en la seccion; el 50 % de
     * respaldo mantiene los halos en su sitio original mientras el cursor no
     * ha entrado, asi que no hay salto en el primer movimiento.
     *
     * Se usa la propiedad `translate` y no `transform`, y no es un capricho:
     * el parallax de mas abajo anima `transform`, y una animacion gana siempre
     * a una declaracion. Escritas las dos en la misma propiedad, el efecto de
     * cursor no llegaria a verse nunca. `translate` se compone aparte, asi que
     * los dos movimientos conviven.
     */
    .hero-glow {
      translate: calc((var(--mx, 50%) - 50%) * 0.12)
        calc((var(--my, 50%) - 50%) * 0.12);
      transition: translate 600ms cubic-bezier(0.16, 1, 0.3, 1);
    }
  }
}

/*
 * Parallax al bajar: el fondo sube mas despacio que el contenido. Va con
 * `scroll()` y no con `view()` porque el hero ocupa el viewport entero y su
 * propio recorrido de entrada no existe: lo que interesa es el scroll de la
 * pagina.
 */
@media (min-width: 1024px) {
  @supports (animation-timeline: scroll()) {
    @media (prefers-reduced-motion: no-preference) {
      .hero-glow {
        animation: hero-parallax linear both;
        animation-timeline: scroll(root block);
        animation-range: 0 90vh;
      }
    }
  }
}

@keyframes hero-parallax {
  to {
    transform: translate3d(0, 14%, 0) scale(1.06);
    opacity: 0.55;
  }
}
.dark .hero-glow {
  background:
    radial-gradient(60% 50% at 15% 20%, rgb(var(--color-primary-500) / 0.16), transparent 70%),
    radial-gradient(50% 50% at 85% 30%, rgb(var(--color-secondary-500) / 0.14), transparent 70%);
}

.hero-inner {
  @apply grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16;
}

/* --- Contenido --- */
.hero-content {
  /*
    El texto va primero también en móvil. Antes era `order-2`, así que la
    primera pantalla completa en un teléfono era solo la foto: el nombre, el
    pitch y los CTA empezaban ~650 px más abajo. La mayoría del tráfico que
    llega desde LinkedIn es móvil.
  */
  @apply order-1 text-center lg:text-left;
}

.status-badge {
  @apply inline-flex items-center gap-2 mb-6
         px-3.5 py-1.5 rounded-full
         bg-success/10 border border-success/20
         text-sm font-medium text-emerald-700 dark:text-emerald-400;
}
.status-dot {
  @apply w-2 h-2 rounded-full bg-success;
  box-shadow: 0 0 0 3px rgb(var(--color-success) / 0.2);
}

.hero-greeting {
  @apply text-lg font-medium text-gray-500 dark:text-gray-400 mb-2;
}

.hero-title {
  @apply flex flex-col gap-1;
}
.hero-name {
  @apply text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-none
         text-gray-900 dark:text-white;
}
.hero-role {
  @apply text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight;
}

.hero-focus {
  @apply mt-3 inline-flex items-center gap-2
         text-sm font-semibold uppercase tracking-wide
         text-gray-500 dark:text-gray-400;
}

.hero-tagline {
  @apply mt-4 max-w-xl mx-auto lg:mx-0
         text-lg leading-relaxed text-gray-600 dark:text-gray-400;
}

.hero-actions {
  @apply mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4;
}

.hero-cases {
  @apply inline-flex items-center gap-1.5 px-2 py-1
         text-base font-semibold text-primary-600 dark:text-primary-400
         hover:gap-2.5 transition-all cursor-pointer;
}

/* --- Dropdown CV --- */
.cv-dropdown {
  @apply absolute left-0 mt-2 w-[19rem] max-w-[calc(100vw-2rem)] p-1.5
         card shadow-xl z-20 list-none;
}
.cv-item {
  @apply no-underline;
  @apply flex items-center gap-3 w-full px-3 py-2.5 rounded-xl
         text-left text-gray-700 dark:text-gray-200
         hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors;
}
.cv-item-icon {
  @apply grid place-items-center shrink-0 w-9 h-9 rounded-lg
         bg-primary-500/10 text-primary-600 dark:text-primary-400;
}
.cv-item-body {
  @apply flex-1 min-w-0 flex flex-col;
}
.cv-item-label {
  @apply text-sm font-semibold leading-tight;
}
.cv-item-desc {
  @apply text-xs text-gray-500 dark:text-gray-400 leading-snug;
}
.cv-item-arrow {
  @apply shrink-0 text-gray-400 dark:text-gray-500;
}

.fade-down-enter-active,
.fade-down-leave-active {
  transition: all 0.18s ease;
}
.fade-down-enter-from,
.fade-down-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* --- Imagen --- */
.hero-media {
  @apply order-2 relative flex justify-center lg:justify-end;
}
.media-frame {
  @apply relative w-full max-w-sm lg:max-w-md
         aspect-[4/5] rounded-3xl overflow-hidden
         ring-1 ring-gray-200 dark:ring-gray-800 shadow-2xl;
}
.media-img {
  @apply w-full h-full object-cover
         opacity-0 scale-95 transition-all duration-700 ease-out;
}
.media-img.is-loaded {
  @apply opacity-100 scale-100;
}
.media-loader {
  @apply absolute inset-0 grid place-items-center bg-gray-100 dark:bg-gray-800;
}
.spinner {
  @apply w-10 h-10 rounded-full border-4
         border-gray-300 dark:border-gray-600 border-t-primary-500 animate-spin;
}
.media-halo {
  @apply absolute -inset-4 -z-10 rounded-[2rem] blur-3xl
         bg-gradient-to-br from-primary-500/20 to-secondary-500/20;
}

@media (max-width: 640px) {
  .hero-name {
    @apply text-4xl;
  }
  .hero-role {
    @apply text-2xl;
  }
}
</style>
