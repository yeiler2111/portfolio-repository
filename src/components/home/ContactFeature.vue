<template>
  <div
    class="flex items-start gap-4 p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300"
  >
    <div
      :class="[
        'flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center',
        colorClasses
      ]"
    >
      <component :is="icon" :size="24" />
    </div>
    <div>
      <h3 class="font-semibold text-gray-900 dark:text-white mb-1">
        {{ title }}
      </h3>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LucideIcon } from 'lucide-vue-next';
import { computed } from 'vue';

const props = defineProps<{
  icon: LucideIcon;
  title: string;
  description: string;
  color: 'blue' | 'green' | 'purple';
}>();

const colorClasses = computed(() => {
  const colors = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
  };
  return colors[props.color];
});
</script>