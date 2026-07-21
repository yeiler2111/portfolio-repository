<template>
  <dl class="hero-stats">
    <template v-for="(stat, i) in stats" :key="stat.label">
      <div v-if="i > 0" class="stat-divider" aria-hidden="true"></div>
      <div class="stat-item">
        <dt class="sr-only">{{ stat.label }}</dt>
        <dd class="stat-number text-gradient">{{ stat.value }}</dd>
        <dd class="stat-label">{{ stat.label }}</dd>
      </div>
    </template>
  </dl>
</template>

<script setup lang="ts">
import { stats } from "@/data/site";
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
}
.stat-label {
  @apply mt-1 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400;
}
.stat-divider {
  @apply w-px h-10 bg-gray-200 dark:bg-gray-800;
}
</style>
