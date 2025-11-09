<template>
  <nav class="hero-nav" aria-label="Navegación principal">
    <p class="nav-label">Ir a:</p>
    <div class="nav-chips">
      <button
        v-for="option in options"
        :key="option.id"
        @click="$emit('navigate', option.id)"
        class="nav-chip"
      >
        {{ option.label }}
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import type { NavigationOption } from '@/utils/types';

defineProps<{
  options: NavigationOption[];
}>();

defineEmits<{
  navigate: [id: string];
}>();
</script>

<style scoped lang="postcss">
.hero-nav {
  @apply space-y-3;
}

.nav-label {
  @apply text-sm font-semibold text-gray-500 dark:text-gray-400
         uppercase tracking-wide;
}

.nav-chips {
  @apply flex flex-wrap items-center justify-center lg:justify-start gap-2;
}

.nav-chip {
  @apply px-4 py-2 rounded-full text-sm font-medium
         bg-white dark:bg-gray-800
         text-gray-700 dark:text-gray-300
         border border-gray-200 dark:border-gray-700
         hover:border-blue-500 dark:hover:border-blue-500
         hover:text-blue-600 dark:hover:text-blue-400
         hover:scale-105
         transition-all duration-300
         cursor-pointer;
}
</style>