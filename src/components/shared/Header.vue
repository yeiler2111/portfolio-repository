<script setup lang="ts">
import Logo from "@/components/shared/Logo.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import { useTheme } from "@/composables/useTheme";
import { locale, setLocale, t } from "@/i18n";
import { ui } from "@/i18n/ui";
import { navItems } from "@/data/site";
import { scrollToSection } from "@/utils/scroll";
import { Menu, Moon, Sun, X } from "lucide-vue-next";
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
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
 * Indicador deslizante del nav de escritorio. Reutiliza `activeSection`, así
 * que no añade ningún observador nuevo: solo mide y mueve un <span>.
 *
 * Solo tiene sentido en `lg+`. Por debajo `.desktop-nav` es `hidden` y los
 * enlaces viven dentro del menú hamburguesa, así que `offsetLeft`/`offsetWidth`
 * devolverían 0 y la píldora quedaría encallada en la esquina.
 */
const navRef = ref<HTMLElement | null>(null);
const pillLeft = ref(0);
const pillWidth = ref(0);
const pillVisible = ref(false);

const isDesktopNav = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(min-width: 1024px)").matches;

const updatePill = async (): Promise<void> => {
  // El `.nav-link-active` lo pinta Vue en el siguiente tick: sin esperarlo se
  // mide el enlace que estaba activo antes.
  await nextTick();
  const nav = navRef.value;
  const active = nav?.querySelector<HTMLElement>(".nav-link-active");
  if (!nav || !active || !isDesktopNav()) {
    pillVisible.value = false;
    return;
  }
  pillLeft.value = active.offsetLeft;
  pillWidth.value = active.offsetWidth;
  pillVisible.value = true;
};

watch(activeSection, updatePill);
// Al cambiar de idioma cambian los textos y por tanto el ancho de cada enlace.
watch(locale, updatePill);

/**
 * Header compacto al bajar. Un sentinel de 80 px al inicio del documento
 * sustituye al listener de `scroll`: el navegador avisa una sola vez al
 * cruzarlo en lugar de ejecutar código en cada frame, que es justo lo que
 * castiga en móvil.
 */
const isCompact = ref(false);
let sentinel: HTMLElement | null = null;
let compactObserver: IntersectionObserver | null = null;
let navResize: ResizeObserver | null = null;

/**
 * Scroll spy. Marca como activa la última sección cuyo inicio quedó por
 * encima del borde inferior del header.
 */
let observer: IntersectionObserver | null = null;

const observeSections = (): void => {
  if (typeof IntersectionObserver === "undefined") return;

  // Al volver a la home las secciones son nodos nuevos: hay que soltar los
  // anteriores o el observador se queda mirando elementos ya desmontados.
  observer?.disconnect();
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
};

/**
 * Fuera de la home no hay secciones que observar, así que se limpia el estado:
 * si no, el enlace de la última sección visitada seguiría resaltado mientras
 * el usuario está en /contactme.
 */
watch(
  () => route.path,
  async (path) => {
    activeSection.value = "";
    await nextTick();
    if (path === "/") observeSections();
    else observer?.disconnect();
  }
);

onMounted(async () => {
  sentinel = document.createElement("div");
  sentinel.setAttribute("aria-hidden", "true");
  // `pointer-events:none` es obligatorio: si no, este bloque invisible se
  // queda por encima del hero y se come los clicks de los primeros 80 px.
  sentinel.style.cssText =
    "position:absolute;top:0;left:0;width:1px;height:80px;pointer-events:none;";
  document.body.prepend(sentinel);

  compactObserver = new IntersectionObserver(
    ([entry]) => {
      isCompact.value = !entry.isIntersecting;
    },
    { threshold: 0 }
  );
  compactObserver.observe(sentinel);

  // Cubre el resize de ventana y el cambio de idioma en una sola suscripción.
  if (navRef.value && typeof ResizeObserver !== "undefined") {
    navResize = new ResizeObserver(() => void updatePill());
    navResize.observe(navRef.value);
  }

  /*
   * `router.isReady()` no es opcional. El Header monta junto con App, pero la
   * navegación inicial de vue-router es asíncrona: en ese instante
   * <router-view> todavía no ha pintado la home, así que `getElementById`
   * devolvía null para las seis secciones y el observador se quedaba sin nada
   * que vigilar. Por eso `aria-current` no llegaba a aplicarse nunca.
   */
  await router.isReady();
  await nextTick();
  if (route.path === "/") observeSections();
  void updatePill();
});

onBeforeUnmount(() => {
  observer?.disconnect();
  compactObserver?.disconnect();
  navResize?.disconnect();
  sentinel?.remove();
});
</script>

<template>
  <header
    class="site-header"
    :class="{ 'is-compact': isCompact && !isMenuOpen }"
  >
    <div class="header-inner container-page">
      <button
        class="logo-btn"
        :aria-label="t(ui.nav.home)"
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
      <nav ref="navRef" class="desktop-nav" :aria-label="t(ui.nav.main)">
        <!--
          Fondo del enlace activo, extraído a un solo elemento para que pueda
          deslizarse entre secciones. Es decorativo: el estado accesible sigue
          siendo `aria-current` en cada enlace.
        -->
        <span
          class="nav-pill"
          aria-hidden="true"
          :style="{
            transform: `translateX(${pillLeft}px)`,
            width: `${pillWidth}px`,
            opacity: pillVisible ? 1 : 0,
          }"
        ></span>

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

        <!--
          Visible tambien en movil. Estaba en `hidden sm:inline-flex`, asi que
          por debajo de 640 px la unica conversion del sitio quedaba enterrada
          dentro del menu hamburguesa. El hueco lo ceden el selector de idioma
          y el de tema, que ahi se mueven al panel desplegable.
        -->
        <BaseButton to="/contactme" size="sm">
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
        :aria-label="t(ui.nav.mobile)"
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
        <div class="mobile-prefs">
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
        </div>
      </nav>
    </transition>

    <!--
      Progreso de lectura. Es la contraparte móvil de la píldora: ahí el nav
      vive dentro del hamburguesa, así que esta barra es lo único que indica
      en qué punto de la página estás.
    -->
    <div class="read-progress" aria-hidden="true"></div>
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
  transition: height var(--transition-normal, 300ms) ease;
}

/*
 * Al bajar, el header cede 8 px de alto y gana una sombra. Encoger `height`
 * aquí es barato: el header es `fixed`, así que el cambio no reflowa el
 * documento, solo relayouta su propia barra.
 *
 * No se anima la aparición del desenfoque: `backdrop-filter` ya está siempre
 * puesto en `.site-header` y animarlo es de lo más caro en GPU móvil.
 */
.site-header.is-compact .header-inner {
  @apply h-14;
}
.site-header.is-compact {
  @apply shadow-sm;
}

/*
 * La barra solo existe donde hay animaciones ligadas al scroll: así se dibuja
 * en el compositor, sin un solo listener de `scroll`. Donde no hay soporte no
 * se muestra, en vez de degradar a una barra siempre llena.
 */
.read-progress {
  @apply hidden absolute inset-x-0 bottom-0 h-0.5 origin-left
         bg-gradient-to-r from-primary-500 to-secondary-500;
}

@supports (animation-timeline: scroll()) {
  .read-progress {
    @apply block;
    transform: scaleX(0);
    animation: read-progress linear;
    animation-timeline: scroll(root block);
  }
}

@keyframes read-progress {
  to {
    transform: scaleX(1);
  }
}

.logo-btn {
  @apply flex items-center shrink-0 cursor-pointer;
}

.desktop-nav {
  @apply relative hidden lg:flex items-center gap-1;
}

.nav-pill {
  @apply absolute left-0 h-9 rounded-lg pointer-events-none
         bg-gray-100 dark:bg-gray-800/60;
  /* `top:50%` + margen negativo en vez de `-translate-y-1/2`: el transform
     está reservado para el desplazamiento horizontal que escribe el script. */
  top: 50%;
  margin-top: -1.125rem;
  transition:
    transform 320ms cubic-bezier(0.4, 0, 0.2, 1),
    width 320ms cubic-bezier(0.4, 0, 0.2, 1),
    opacity 200ms ease;
}

.nav-link {
  @apply relative z-10 px-3 py-2 rounded-lg text-sm font-medium no-underline
         text-gray-600 dark:text-gray-300
         hover:text-primary-600 dark:hover:text-primary-400
         hover:bg-gray-100 dark:hover:bg-gray-800/60
         transition-colors cursor-pointer;
}

/* Sin fondo propio: lo aporta `.nav-pill`, que se desliza entre secciones. */
.nav-link-active {
  @apply text-primary-600 dark:text-primary-400;
}

.header-actions {
  @apply flex items-center gap-2 sm:gap-3;
}

/*
 * En la barra, idioma y tema solo aparecen a partir de `sm`: por debajo el
 * ancho se reserva para el CTA y ambos controles se repiten dentro del menu.
 * El `sm:` va aqui dentro y no como clase suelta en la plantilla porque
 * `.lang-toggle[data-v-x]` (0,2,0) le gana a `.hidden` (0,1,0) y el elemento
 * seguiria visible.
 */
.header-actions > .lang-toggle {
  @apply hidden sm:flex;
}
.header-actions > .theme-toggle {
  @apply hidden sm:grid;
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
/* Duplicado de idioma/tema para el tramo en que la barra no los muestra. */
.mobile-prefs {
  @apply flex sm:hidden items-center justify-between gap-3 mt-2 pt-3
         border-t border-gray-200 dark:border-gray-800;
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

@media (prefers-reduced-motion: reduce) {
  .header-inner,
  .nav-pill {
    transition: none;
  }
}
</style>
