<template>
  <component
    :is="tag"
    :class="classes"
    :href="href"
    :to="to"
    :type="isNativeButton ? type : undefined"
    :target="href && external ? '_blank' : undefined"
    :rel="href && external ? 'noopener noreferrer' : undefined"
  >
    <slot name="icon-left" />
    <slot />
    <slot name="icon-right" />
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    /** Estilo visual */
    variant?: "primary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    /** Renderiza como <a> con este href */
    href?: string;
    /** Renderiza como <router-link> con este destino */
    to?: string;
    /** Abre el enlace en una pestaña nueva (solo con href) */
    external?: boolean;
    type?: "button" | "submit" | "reset";
    block?: boolean;
  }>(),
  { variant: "primary", size: "md", type: "button", external: false, block: false }
);

const tag = computed(() => {
  if (props.to) return "router-link";
  if (props.href) return "a";
  return "button";
});

const isNativeButton = computed(() => tag.value === "button");

const classes = computed(() => [
  {
    primary: "btn-primary",
    outline: "btn-outline",
    ghost: "btn-ghost",
  }[props.variant],
  { sm: "btn-sm", md: "", lg: "btn-lg" }[props.size],
  props.block && "w-full",
]);
</script>
