<script setup lang="ts">
import Logo from "@/components/shared/Logo.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import { useTheme } from "@/composables/useTheme";
import { navItems } from "@/data/site";
import { Menu, Moon, Sun, X } from "lucide-vue-next";
import { nextTick, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const { isDark, toggleTheme } = useTheme();
const router = useRouter();
const route = useRoute();

const isMenuOpen = ref(false);

/**
 * Navega a una sección de la home. Si el usuario está en otra ruta,
 * primero regresa a la home y luego hace scroll a la sección.
 */
const goToSection = async (id: string): Promise<void> => {
  isMenuOpen.value = false;
  if (route.path !== "/") {
    await router.push("/");
    await nextTick();
  }
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};
</script>

<template>
  <header class="site-header">
    <div class="header-inner container-page">
      <button
        class="logo-btn"
        aria-label="Ir al inicio"
        @click="goToSection('top')"
      >
        <Logo :is-dark-mode="isDark" />
      </button>

      <!-- Navegación de escritorio -->
      <nav class="desktop-nav" aria-label="Navegación principal">
        <button
          v-for="item in navItems"
          :key="item.id"
          class="nav-link"
          @click="goToSection(item.id)"
        >
          {{ item.label }}
        </button>
      </nav>

      <div class="header-actions">
        <button
          class="theme-toggle"
          :aria-label="isDark ? 'Activar modo claro' : 'Activar modo oscuro'"
          @click="toggleTheme"
        >
          <Sun v-if="isDark" :size="18" />
          <Moon v-else :size="18" />
        </button>

        <BaseButton to="/contactme" size="sm" class="hidden sm:inline-flex">
          Contáctame
        </BaseButton>

        <button
          class="menu-toggle"
          :aria-expanded="isMenuOpen"
          aria-label="Abrir menú"
          @click="isMenuOpen = !isMenuOpen"
        >
          <X v-if="isMenuOpen" :size="22" />
          <Menu v-else :size="22" />
        </button>
      </div>
    </div>

    <!-- Menú móvil -->
    <transition name="slide-down">
      <nav v-if="isMenuOpen" class="mobile-nav" aria-label="Navegación móvil">
        <button
          v-for="item in navItems"
          :key="item.id"
          class="mobile-link"
          @click="goToSection(item.id)"
        >
          {{ item.label }}
        </button>
        <BaseButton to="/contactme" block class="mt-2" @click="isMenuOpen = false">
          Contáctame
        </BaseButton>
      </nav>
    </transition>
  </header>
</template>

<style scoped lang="postcss">
.site-header {
  @apply fixed top-0 inset-x-0 z-50
         bg-white/70 dark:bg-gray-950/70 bg-blur
         border-b border-gray-200/70 dark:border-gray-800/70;
}

.header-inner {
  @apply flex items-center justify-between h-16;
}

.logo-btn {
  @apply flex items-center w-36 sm:w-44 shrink-0 cursor-pointer;
}

.desktop-nav {
  @apply hidden lg:flex items-center gap-1;
}

.nav-link {
  @apply px-3 py-2 rounded-lg text-sm font-medium
         text-gray-600 dark:text-gray-300
         hover:text-primary-600 dark:hover:text-primary-400
         hover:bg-gray-100 dark:hover:bg-gray-800/60
         transition-colors cursor-pointer;
}

.header-actions {
  @apply flex items-center gap-2 sm:gap-3;
}

.theme-toggle {
  @apply grid place-items-center w-9 h-9 rounded-lg
         text-gray-600 dark:text-gray-300
         hover:bg-gray-100 dark:hover:bg-gray-800
         transition-colors;
}

.menu-toggle {
  @apply lg:hidden grid place-items-center w-9 h-9 rounded-lg
         text-gray-700 dark:text-gray-200
         hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors;
}

.mobile-nav {
  @apply lg:hidden flex flex-col gap-1 p-4
         bg-white dark:bg-gray-950
         border-b border-gray-200 dark:border-gray-800;
}

.mobile-link {
  @apply text-left px-4 py-3 rounded-xl text-base font-medium
         text-gray-700 dark:text-gray-200
         hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.25s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
