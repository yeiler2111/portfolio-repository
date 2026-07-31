<script setup lang="ts">
import { t } from "@/i18n";
import { ui } from "@/i18n/ui";
import { navItems, profile, socials } from "@/data/site";
import { scrollToSection } from "@/utils/scroll";
import { Github, Linkedin, MapPin } from "lucide-vue-next";
import { nextTick } from "vue";
import type { Component } from "vue";
import { useRoute, useRouter } from "vue-router";

const year = new Date().getFullYear();
const router = useRouter();
const route = useRoute();

const icons: Record<string, Component> = { github: Github, linkedin: Linkedin };

/** Navega a una sección de la home (misma lógica que el Header). */
const goToSection = async (id: string): Promise<void> => {
  if (route.path !== "/") {
    await router.push("/");
    await nextTick();
  }
  scrollToSection(id);
};
</script>

<template>
  <footer class="footer">
    <div class="footer-glow" aria-hidden="true"></div>

    <div class="container-page">
      <!-- Cuerpo principal -->
      <div class="footer-top">
        <!-- Marca -->
        <div class="footer-brand">
          <p class="footer-name">{{ profile.name }}</p>
          <p class="footer-role">{{ t(profile.role) }} · {{ t(profile.focus) }}</p>
          <p class="footer-location">
            <MapPin :size="14" />
            {{ profile.location }}
          </p>
        </div>

        <!-- Navegación -->
        <nav class="footer-nav" aria-label="Secciones">
          <span class="footer-heading">{{ t(ui.footer.navHeading) }}</span>
          <button
            v-for="item in navItems"
            :key="item.id"
            type="button"
            class="footer-link"
            @click="goToSection(item.id)"
          >
            {{ t(item.label) }}
          </button>
        </nav>

        <!-- Redes -->
        <div class="footer-connect">
          <span class="footer-heading">{{ t(ui.footer.connectHeading) }}</span>
          <div class="footer-socials">
            <a
              v-for="social in socials"
              :key="social.id"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="social.name"
              class="footer-social"
            >
              <component :is="icons[social.icon]" :size="18" />
            </a>
          </div>
        </div>
      </div>

      <!-- Barra inferior -->
      <div class="footer-bottom">
        <p class="footer-copy">
          © {{ year }} {{ profile.name }}. {{ t(ui.footer.rights) }}
        </p>
      
      </div>
    </div>
  </footer>
</template>

<style scoped lang="postcss">
.footer {
  @apply relative mt-auto overflow-hidden
         border-t border-gray-200 dark:border-gray-800
         bg-gray-50 dark:bg-gray-950;
}
.footer-glow {
  @apply absolute inset-x-0 top-0 h-40 -z-0 pointer-events-none;
  background: radial-gradient(
    60% 100% at 50% 0%,
    rgb(var(--color-primary-500) / 0.08),
    transparent 70%
  );
}

.footer-top {
  @apply relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]
         gap-10 py-12;
}

.footer-brand {
  @apply flex flex-col gap-1.5;
}
.footer-name {
  @apply text-lg font-extrabold text-gray-900 dark:text-white;
}
.footer-role {
  @apply text-sm text-gray-500 dark:text-gray-400;
}
.footer-location {
  @apply inline-flex items-center gap-1.5 mt-1
         text-sm text-gray-500 dark:text-gray-400;
}

.footer-heading {
  @apply block mb-3 text-xs font-semibold uppercase tracking-wider
         text-gray-400 dark:text-gray-500;
}

.footer-nav {
  @apply flex flex-col gap-2.5;
}
.footer-link {
  @apply text-sm text-left text-gray-600 dark:text-gray-300 w-fit cursor-pointer
         hover:text-primary-600 dark:hover:text-primary-400 transition-colors;
}

.footer-connect {
  @apply flex flex-col;
}
.footer-socials {
  @apply flex items-center gap-2.5;
}
.footer-social {
  @apply grid place-items-center w-10 h-10 rounded-xl
         bg-white dark:bg-gray-900
         border border-gray-200 dark:border-gray-800
         text-gray-500 dark:text-gray-400
         hover:text-primary-600 dark:hover:text-primary-400
         hover:border-primary-300 dark:hover:border-primary-700
         hover:-translate-y-0.5 shadow-sm transition-all;
}

.footer-bottom {
  @apply relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3
         py-6 border-t border-gray-200 dark:border-gray-800;
}
.footer-copy {
  @apply text-sm text-gray-500 dark:text-gray-400 text-center;
}
.footer-made {
  @apply text-sm text-gray-500 dark:text-gray-400;
}
</style>
