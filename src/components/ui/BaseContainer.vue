<template>
  <component :is="as" :class="widthClass">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    as?: string;
    width?: "default" | "narrow";
  }>(),
  { as: "div", width: "default" }
);

const widthClass = computed(() =>
  props.width === "narrow" ? "container-narrow" : "container-page"
);
</script>
