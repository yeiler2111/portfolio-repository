<template>
  <article
    ref="cardRef"
    class="group card card-hover overflow-hidden flex flex-col"
  >
    <!-- Carrusel de imágenes -->
    <div class="media">
      <div v-if="isLoading" class="media-loader">
        <div class="loader"></div>
      </div>

      <transition name="fade" mode="out-in">
        <div :key="images[currentIndex]" class="media-slide">
          <img
            :src="images[currentIndex]"
            :alt="`${title} — captura ${currentIndex + 1}`"
            loading="lazy"
            class="media-img"
            :class="{ 'opacity-0': isLoading }"
            @load="handleImageLoad"
          />
        </div>
      </transition>

      <template v-if="images.length > 1">
        <div class="media-nav">
          <button class="nav-btn" aria-label="Imagen anterior" @click.stop="prevImage">
            <ChevronLeft :size="20" />
          </button>
          <button class="nav-btn" aria-label="Imagen siguiente" @click.stop="nextImage">
            <ChevronRight :size="20" />
          </button>
        </div>

        <div class="media-dots">
          <button
            v-for="(img, idx) in images"
            :key="idx"
            class="dot"
            :class="idx === currentIndex ? 'dot-active' : ''"
            :aria-label="`Ir a imagen ${idx + 1}`"
            @click.stop="goToImage(idx)"
          />
        </div>
      </template>
    </div>

    <!-- Contenido -->
    <div class="body">
      <h3 class="project-title">{{ title }}</h3>

      <div>
        <p class="project-desc" :class="{ 'line-clamp-3': !isExpanded }">
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

      <div class="tech-tags">
        <span v-for="tech in technologies" :key="String(tech)" class="chip">
          {{ tech }}
        </span>
      </div>

      <a
        :href="link"
        target="_blank"
        rel="noopener noreferrer"
        class="btn-primary btn-lg w-full mt-auto"
      >
        {{ t(ui.projects.view) }}
        <ArrowUpRight :size="18" />
      </a>
    </div>
  </article>
</template>

<script setup lang="ts">
import { t } from "@/i18n";
import { ui } from "@/i18n/ui";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-vue-next";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

export interface ValueCardProject {
  title: string;
  description: string;
  images: string[];
  technologies: string[];
  link: string;
}

const props = defineProps<ValueCardProject>();

const AUTOPLAY_MS = 4000;

const currentIndex = ref(0);
const isLoading = ref(true);
const isExpanded = ref(false);
const cardRef = ref<HTMLElement | null>(null);
let intervalId: number | null = null;
let observer: IntersectionObserver | null = null;

const shouldShowReadMore = computed(() => props.description.length > 150);

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
.media {
  @apply relative w-full aspect-[16/10] overflow-hidden
         bg-gradient-to-br from-gray-50 to-gray-100
         dark:from-gray-800 dark:to-gray-900;
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

.project-desc {
  @apply text-sm leading-relaxed text-gray-600 dark:text-gray-300;
}

.read-more {
  @apply inline-flex items-center gap-1 mt-2
         text-sm font-semibold text-primary-600 dark:text-primary-400
         hover:text-primary-700 dark:hover:text-primary-300 transition-colors;
}

.tech-tags {
  @apply flex flex-wrap gap-2;
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
