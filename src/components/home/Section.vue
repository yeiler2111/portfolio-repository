<script setup lang="ts">
import card from "@/utils/interface/componentsInterfaces";

const props = defineProps<{ card: card }>();
</script>

<template>
  <div
    class="w-full sm:w-full md:w-5/6 lg:w-5/5 xl:w-3/5 p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-lg"
  >
    <h3 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
      {{ props?.card.title }}
    </h3>
    <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
      {{ props?.card.textContent }}
    </p>
  </div>
</template>

<style scoped></style>
