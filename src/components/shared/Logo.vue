<script setup lang="ts">
import { t } from "@/i18n";
import { profile } from "@/data/site";

// isDarkMode se conserva por compatibilidad; el tema se resuelve con clases `dark:`.
defineProps<{ isDarkMode?: boolean }>();
</script>

<template>
  <span class="logo">
    <span class="logo-mark" aria-hidden="true">
      <span class="logo-mark-text">YS</span>
    </span>
    <span class="logo-text">
      <span class="logo-name">{{ profile.name }}</span>
      <span class="logo-role">{{ t(profile.role) }}</span>
    </span>
  </span>
</template>

<style scoped lang="postcss">
.logo {
  @apply inline-flex items-center gap-2.5;
}

.logo-mark {
  @apply relative grid place-items-center shrink-0 w-9 h-9 rounded-xl
         bg-gradient-to-br from-primary-500 to-secondary-500
         shadow-md shadow-primary-500/30;
}
.logo-mark::after {
  content: "";
  @apply absolute inset-0 rounded-xl ring-1 ring-inset ring-white/25;
}
.logo-mark-text {
  @apply text-sm font-extrabold tracking-tight text-white;
}

.logo-text {
  @apply flex flex-col leading-none;
}
.logo-name {
  @apply text-sm font-extrabold text-gray-900 dark:text-white;
}
.logo-role {
  @apply mt-0.5 text-[11px] font-medium text-gray-500 dark:text-gray-400;
}
</style>
