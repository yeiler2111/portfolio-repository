<script setup lang="ts">
import Logo from "@/components/shared/Logo.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import { useTheme } from "@/composables/useTheme";
import { locale, setLocale, t } from "@/i18n";
import { ui } from "@/i18n/ui";
import { navItems } from "@/data/site";
import { scrollToSection } from "@/utils/scroll";
import { Menu, Moon, Sun, X } from "lucide-vue-next";
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const { isDark, toggleTheme } = useTheme();
const router = useRouter();
const route = useRoute();

const isMenuOpen = ref(false);
/** Sección visible actualmente, para marcar el enlace con aria-current. */
const activeSection = ref<string>("");

/**
 * Navega a una sección de la home. Si el usuario está en otra ruta,
 * primero regresa a la home y luego hace scroll a la sección.
 *
 * Recibe el evento porque los enlaces tienen un href real: hay que evitar el
 * salto brusco del navegador, pero solo cuando es un click normal. Si la
 * persona usa ctrl/cmd/shift o el botón central, se deja pasar para que
 * funcione "abrir en pestaña nueva".
 */
const goToSection = async (id: string, event?: MouseEvent): Promise<void> => {
  if (
    event &&
    (event.ctrlKey || event.metaKey || event.shiftKey || event.button !== 0)
  ) {
    return;
  }
  event?.preventDefault();

  isMenuOpen.value = false;
  if (route.path !== "/") {
    await router.push("/");
    await nextTick();
  }
  scrollToSection(id);
};

/**
 * Scroll spy. Marca como activa la última sección cuyo inicio quedó por
 * encima del borde inferior del header.
 */
let observer: IntersectionObserver | null = null;

onMounted(() => {
  if (typeof IntersectionObserver === "undefined") return;

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) activeSection.value = entry.target.id;
      }
    },
    // El margen superior descuenta el header fijo; el inferior evita que se
    // active una sección que apenas asoma por abajo.
    { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
  );

  for (const item of navItems) {
    const el = document.getElementById(item.id);
    if (el) observer.observe(el);
  }
});

onBeforeUnmount(() => observer?.disconnect());
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

      <!--
        Navegación de escritorio. Son <a href="#seccion"> y no <button>: así se
        pueden abrir en otra pestaña, copiar el enlace y compartir, y los
        buscadores los leen como enlaces internos reales. El click sigue
        interceptado para conservar el scroll suave y cerrar el menú.
      -->
      <nav class="desktop-nav" aria-label="Navegación principal">
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="`/#${item.id}`"
          class="nav-link"
          :class="{ 'nav-link-active': activeSection === item.id }"
          :aria-current="activeSection === item.id ? 'true' : undefined"
          @click="goToSection(item.id, $event)"
        >
          {{ t(item.label) }}
        </a>
      </nav>

      <div class="header-actions">
        <div class="lang-toggle" role="group" :aria-label="t(ui.language)">
          <button
            type="button"
            :class="['lang-btn', locale === 'es' && 'lang-active']"
            @click="setLocale('es')"
          >
            ES
          </button>
          <button
            type="button"
            :class="['lang-btn', locale === 'en' && 'lang-active']"
            @click="setLocale('en')"
          >
            EN
          </button>
        </div>

        <button
          class="theme-toggle"
          :aria-label="isDark ? t(ui.theme.toLight) : t(ui.theme.toDark)"
          @click="toggleTheme"
        >
          <Sun v-if="isDark" :size="18" />
          <Moon v-else :size="18" />
        </button>

        <BaseButton to="/contactme" size="sm" class="hidden sm:inline-flex">
          {{ t(ui.hero.contact) }}
        </BaseButton>

        <button
          class="menu-toggle"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-nav"
          :aria-label="isMenuOpen ? t(ui.menu.close) : t(ui.menu.open)"
          @click="isMenuOpen = !isMenuOpen"
        >
          <X v-if="isMenuOpen" :size="22" />
          <Menu v-else :size="22" />
        </button>
      </div>
    </div>

    <!-- Menú móvil -->
    <transition name="slide-down">
      <nav
        v-if="isMenuOpen"
        id="mobile-nav"
        class="mobile-nav"
        aria-label="Navegación móvil"
      >
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="`/#${item.id}`"
          class="mobile-link"
          :aria-current="activeSection === item.id ? 'true' : undefined"
          @click="goToSection(item.id, $event)"
        >
          {{ t(item.label) }}
        </a>
        <BaseButton to="/contactme" block class="mt-2" @click="isMenuOpen = false">
          {{ t(ui.hero.contact) }}
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
  @apply flex items-center shrink-0 cursor-pointer;
}

.desktop-nav {
  @apply hidden lg:flex items-center gap-1;
}

.nav-link {
  @apply px-3 py-2 rounded-lg text-sm font-medium no-underline
         text-gray-600 dark:text-gray-300
         hover:text-primary-600 dark:hover:text-primary-400
         hover:bg-gray-100 dark:hover:bg-gray-800/60
         transition-colors cursor-pointer;
}

.nav-link-active {
  @apply text-primary-600 dark:text-primary-400 bg-gray-100 dark:bg-gray-800/60;
}

.header-actions {
  @apply flex items-center gap-2 sm:gap-3;
}

.lang-toggle {
  @apply flex items-center p-0.5 rounded-lg
         bg-gray-100 dark:bg-gray-800/80;
}
.lang-btn {
  @apply px-2 py-1 rounded-md text-xs font-bold
         text-gray-500 dark:text-gray-400 transition-colors cursor-pointer;
}
.lang-btn:hover {
  @apply text-gray-700 dark:text-gray-200;
}
.lang-active {
  @apply bg-white dark:bg-gray-950 shadow-sm
         text-primary-600 dark:text-primary-400;
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
  @apply block text-left px-4 py-3 rounded-xl text-base font-medium no-underline
         text-gray-700 dark:text-gray-200
         hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors;
}
.mobile-link[aria-current] {
  @apply text-primary-600 dark:text-primary-400 bg-gray-100 dark:bg-gray-800;
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
