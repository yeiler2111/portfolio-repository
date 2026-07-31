<template>
  <component :is="tag" :class="classes" v-bind="tagAttrs">
    <slot name="icon-left" />
    <slot />
    <slot name="icon-right" />
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";

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
  if (props.to) return RouterLink;
  if (props.href) return "a";
  return "button";
});

/**
 * Los atributos se construyen como objeto en vez de enlazarse uno a uno.
 *
 * Con `:href="href"` en el template, el atributo se envía siempre —también
 * cuando vale `undefined`—, y al renderizar un RouterLink caía como
 * fallthrough sobre el <a> interno y borraba el href que el propio router
 * había calculado. El enlace seguía navegando con click, pero no se podía
 * abrir en pestaña nueva ni copiar la dirección, los lectores de pantalla lo
 * anunciaban sin destino y los buscadores no lo veían como enlace interno.
 *
 * Omitiendo la clave por completo, RouterLink conserva su href.
 */
const tagAttrs = computed<Record<string, unknown>>(() => {
  if (props.to) return { to: props.to };

  if (props.href) {
    return {
      href: props.href,
      ...(props.external && { target: "_blank", rel: "noopener noreferrer" }),
    };
  }

  return { type: props.type };
});

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
