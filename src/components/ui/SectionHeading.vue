<template>
  <div v-reveal :class="['max-w-2xl', align === 'center' && 'mx-auto text-center']">
    <span v-if="eyebrow" class="eyebrow mb-5">
      <slot name="eyebrow-icon" />
      {{ eyebrow }}
    </span>
    <h2 class="heading-2">{{ title }}</h2>
    <p
      v-if="subtitle"
      class="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-400"
    >
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string;
    subtitle?: string;
    eyebrow?: string;
    align?: "center" | "left";
  }>(),
  { align: "center" }
);
</script>
