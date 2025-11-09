<template>
  <div
    ref="cardRef"
    class="group relative w-full dark:bg-gray-900 bg-white border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
  >
    <div
      class="relative w-full h-80 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
    >
      <div
        v-if="isLoading"
        class="absolute inset-0 flex justify-center items-center bg-white/50 dark:bg-gray-900/60 z-10 backdrop-blur-sm"
      >
        <div class="loader"></div>
      </div>

      <transition name="fade" mode="out-in">
        <div
          :key="images[currentIndex]"
          class="w-full h-full p-4 flex items-center justify-center"
        >
          <img
            :src="images[currentIndex]"
            alt="Project image"
            loading="lazy"
            @load="handleImageLoad"
            class="max-w-full max-h-full object-contain rounded-lg transition-all duration-700 group-hover:scale-105"
            :class="{ 'opacity-0': isLoading, 'opacity-100': !isLoading }"
          />
        </div>
      </transition>

      <div
        class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      ></div>

      <div
        v-if="images.length > 1"
        class="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
      >
        <button
          @click.stop="prevImage"
          class="w-11 h-11 rounded-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 transition-all hover:scale-110"
          aria-label="Imagen anterior"
        >
          <svg
            class="w-6 h-6 text-gray-800 dark:text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          @click.stop="nextImage"
          class="w-11 h-11 rounded-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 transition-all hover:scale-110"
          aria-label="Imagen siguiente"
        >
          <svg
            class="w-6 h-6 text-gray-800 dark:text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div
        v-if="images.length > 1"
        class="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2.5 z-20"
      >
        <button
          v-for="(img, idx) in images"
          :key="idx"
          @click.stop="goToImage(idx)"
          class="transition-all duration-300 rounded-full"
          :class="
            idx === currentIndex
              ? 'w-8 h-2.5 bg-blue-600 dark:bg-blue-400'
              : 'w-2.5 h-2.5 bg-white/80 dark:bg-gray-400/80 hover:bg-white dark:hover:bg-gray-300'
          "
          :aria-label="`Ir a imagen ${idx + 1}`"
        />
      </div>
    </div>

    <div class="p-7 space-y-5 dark:bg-gray-900">
      <div class="space-y-3">
        <h3
          class="text-2xl font-bold text-gray-900 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight"
        >
          {{ title }}
        </h3>

        <div class="relative">
          <p
            class="text-gray-700 dark:text-gray-500 text-base leading-relaxed transition-all duration-300"
            :class="{ 'line-clamp-3': !isExpanded }"
          >
            {{ description }}
          </p>

          <button
            v-if="shouldShowReadMore"
            @click="toggleExpand"
            class="mt-2 text-sm font-medium text-blue-600 dark:text-blue-700 hover:text-blue-700 dark:hover:text-blue-300 transition-colors inline-flex items-center gap-1"
          >
            {{ isExpanded ? "Leer menos" : "Leer más" }}
            <svg
              class="w-4 h-4 transition-transform duration-300"
              :class="{ 'rotate-180': isExpanded }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      <div class="flex flex-wrap gap-2.5 pt-2">
        <span
          v-for="tech in technologies"
          :key="tech"
          class="px-3.5 py-2 text-xs font-medium bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-800 dark:to-indigo-800 text-blue-700 dark:text-blue-100 rounded-lg border border-blue-200 dark:border-blue-700 hover:shadow-md hover:scale-[1.02] transition-all duration-300"
        >
          {{ tech }}
        </span>
      </div>

      <div class="pt-3">
        <a
          :href="link"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-600 dark:to-indigo-600 dark:hover:from-blue-700 dark:hover:to-indigo-700 text-white text-sm font-semibold rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Ver proyecto
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  defineProps,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";

export interface ValueCardProject {
  title: string;
  description: string;
  images: string[];
  technologies: string[];
  link: string;
}

const props = defineProps<ValueCardProject>();

const currentIndex = ref(0);
const isLoading = ref(true);
const isExpanded = ref(false);
const cardRef = ref<HTMLElement | null>(null);
let intervalId: number | null = null;
let observer: IntersectionObserver | null = null;


const shouldShowReadMore = computed(() => {
  return props.description.length > 150; 
});

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length;
  resetInterval();
};

const prevImage = () => {
  currentIndex.value =
    (currentIndex.value - 1 + props.images.length) % props.images.length;
  resetInterval();
};

const goToImage = (idx: number) => {
  currentIndex.value = idx;
  resetInterval();
};

const resetInterval = () => {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = window.setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % props.images.length;
    }, 4000);
  }
};

watch(currentIndex, () => {
  isLoading.value = true;
});

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    const entry = entries[0];
    if (entry.isIntersecting && intervalId === null) {
      intervalId = window.setInterval(() => {
        currentIndex.value = (currentIndex.value + 1) % props.images.length;
      }, 4000);
    } else if (!entry.isIntersecting && intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  });
  if (cardRef.value) observer.observe(cardRef.value);
});

onBeforeUnmount(() => {
  if (intervalId !== null) clearInterval(intervalId);
  if (observer && cardRef.value) observer.unobserve(cardRef.value);
});

const handleImageLoad = () => {
  isLoading.value = false;
};
</script>

<style scoped lang="postcss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.loader {
  @apply w-12 h-12 rounded-full border-4 border-t-blue-600 border-gray-200 dark:border-gray-700 animate-spin;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
