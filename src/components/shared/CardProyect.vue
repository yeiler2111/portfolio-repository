<template>
  <div
    ref="cardRef"
    class="group relative max-w-md w-full dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300 overflow-hidden"
  >
    
    <div class="relative w-full h-64 overflow-hidden bg-gray-50 dark:bg-gray-800">
      
      <div
        v-if="isLoading"
        class="absolute inset-0 flex justify-center items-center bg-white/50 dark:bg-gray-900/60 z-10"
      >
        <div class="loader"></div>
      </div>

      <transition name="fade" mode="out-in">
        <img
          :key="images[currentIndex]"
          :src="images[currentIndex]"
          alt="Project image"
          loading="lazy"
          @load="handleImageLoad"
          class="w-full h-full object-contain object-center transition-opacity duration-700"
          :class="{ 'opacity-0': isLoading, 'opacity-100': !isLoading }"
        />
      </transition>

      
      <div class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        <span
          v-for="(img, idx) in images"
          :key="idx"
          class="w-3 h-3 rounded-full transition-colors duration-300"
          :class="idx === currentIndex ? 'bg-blue-600 dark:bg-blue-400' : 'bg-gray-400/70 dark:bg-gray-600/50'"
        />
      </div>
    </div>

    
    <div class="p-6 space-y-4">
      <h3 class="text-2xl font-semibold text-gray-800 dark:text-white">
        {{ title }}
      </h3>
      <p class="text-gray-600 dark:text-gray-400 text-base">
        {{ description }}
      </p>

      <div class="flex flex-wrap gap-3">
        <span
          v-for="tech in technologies"
          :key="tech"
          class="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full"
        >
          {{ tech }}
        </span>
      </div>

      <a
        :href="link"
        target="_blank"
        class="inline-block w-full text-center py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition"
      >
        Ver proyecto
      </a>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, defineProps, watch } from 'vue';

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
const cardRef = ref<HTMLElement | null>(null);
let intervalId: number | null = null;
let observer: IntersectionObserver | null = null;

watch(currentIndex, () => {
  isLoading.value = true;
});

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    const entry = entries[0];
    if (entry.isIntersecting && intervalId === null) {
      intervalId = window.setInterval(() => {
        currentIndex.value = (currentIndex.value + 1) % props.images.length;
      }, 3000);
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
  transition: opacity 0.7s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.loader {
  @apply w-10 h-10 rounded-full border-4 border-t-blue-600 border-gray-200 dark:border-gray-700 animate-spin;
}
</style>
