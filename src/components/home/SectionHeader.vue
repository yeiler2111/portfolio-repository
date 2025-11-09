<template>
  <div class="text-center mb-16">
    <h2
      class="heading-2 text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
    >
      {{ title }}
    </h2>
    <p
      v-if="subtitle"
      class="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto"
    >
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
}>();
</script>