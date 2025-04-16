<template>
  <div
    class="h-3/4 group relative w-3/4 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl hover:shadow-2xl transition-transform hover:scale-105 duration-300 max-w-xl mx-auto"
  >
    <!-- Carrusel -->
     <div class="relative w-full h-64 overflow-hidden"> <!-- Ajustamos la altura al contenedor -->
      <transition name="fade" mode="out-in">
        <img
          :key="images[currentIndex]"
          :src="images[currentIndex]"
          alt="Project image"
          class="w-full h-full object-contain object-center transition-opacity duration-700"
        />
      </transition>

      <!-- Indicadores -->
      <div class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
        <span
          v-for="(img, index) in images"
          :key="index"
          class="w-2 h-2 rounded-full transition-colors duration-300"
          :class="index === currentIndex ? 'bg-white' : 'bg-gray-400 opacity-70'"
        ></span>
      </div>
    </div>

    <!-- Contenido -->
    <div class="p-5">
      <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">
        {{ title }}
      </h3>

      <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
        {{ description }}
      </p>

      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="tech in technologies"
          :key="tech"
          class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full"
        >
          {{ tech }}
        </span>
      </div>

      <a
        :href="link"
        target="_blank"
        class="inline-block px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition"
      >
        Ver proyecto
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, defineProps } from "vue";

export interface ValueCardProject {
  title: string;
  description: string;
  images: string[];
  technologies: string[];
  link: string;
}

const props = defineProps<ValueCardProject>();

const currentIndex = ref(0);
let intervalId: number | null = null;

onMounted(() => {
  intervalId = window.setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % props.images.length;
  }, 3000);
});

onBeforeUnmount(() => {
  if (intervalId !== null) clearInterval(intervalId);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
