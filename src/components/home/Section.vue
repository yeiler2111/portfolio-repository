<script setup lang="ts">
import type card from "@/utils/interface/componentsInterfaces";

defineProps<{ card: card }>();
</script>

<template>
  <article class="card card-hover h-full p-7">
    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
      {{ card.title }}
    </h3>
    <p class="text-[0.95rem] leading-relaxed text-gray-600 dark:text-gray-300">
      {{ card.textContent }}
    </p>
  </article>
</template>
