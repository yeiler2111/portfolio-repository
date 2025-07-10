<script setup>
import { ref, onMounted } from "vue";
import Logo from "@/components/shared/Logo.vue";
import { MenuItem } from "@/data/data";
const isDarkMode = ref(false);
const isMenuOpen = ref(false);

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem("darkMode", isDarkMode.value);
  updateHtmlClass();
};

const updateHtmlClass = () => {
  const html = document.documentElement;
  if (isDarkMode.value) {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
};

onMounted(() => {
  const savedMode = localStorage.getItem("darkMode");
  isDarkMode.value = savedMode === "true";
  updateHtmlClass();
});
</script>

<template>
  <header
    class="fixed py-3 top-0 left-0 w-full z-50 bg-gray-50 bg-opacity-40 dark:bg-gray-900 dark:bg-opacity-40 text-gray-900 dark:text-gray-200 h-16 flex items-center justify-between flex-nowrap px-4 shadow-md backdrop-blur-md"
  >
    <div
      class="max-sm:w-40 flex items-center hover:cursor-pointer"
      @click="$router.push({ path: '/' })"
    >
      <Logo :isDarkMode="isDarkMode" />
    </div>
    <div>
      <nav class="flex items-center">
        <label
          class="inline-flex items-center cursor-pointer mr-4 max-md:w-1/2"
        >
          <span class="mr-1 text-sm">{{
            isDarkMode ? "Modo oscuro" : "Modo claro"
          }}</span>
          <input
            type="checkbox"
            :checked="isDarkMode"
            @click="toggleDarkMode"
            class="sr-only peer"
          />
          <div
            class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
          ></div>
        </label>

        <ul class="max-md:hidden md:flex space-x-5 align-baseline">
          <li
            v-for="(item, index) in MenuItem"
            :key="index"
            class="hover:bg-gray-300 rounded-xl px-4 py-2 hover:cursor-pointer dark:hover:bg-gray-600"
            @click="$router.push({ path: item.path })"
          >
            {{ item.name }}
          </li>
        </ul>

        <div class="sm:flex md:hidden lg:hidden xl:hidden">
          <button
            class="flex items-center px-3 py-2 border rounded text-gray-800 border-gray-400 dark:text-gray-300 dark:border-gray-600"
            @click="isMenuOpen = !isMenuOpen"
          >
            <i class="fas fa-bars"></i>
          </button>
          <transition name="fade">
            <ul
              v-if="isMenuOpen"
              class="absolute right-4 top-16 w-40 bg-white border border-gray-300 text-gray-900 dark:bg-gray-800 dark:text-gray-400 rounded shadow-lg"
            >
              <!-- <li
                  class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  @click="
                    () => {
                      $router.push({ path: '/portfolio' });
                      isMenuOpen = false;
                    }
                  "
                >
                  Portafolio
                </li> -->
            </ul>
          </transition>
        </div>
      </nav>
    </div>
  </header>
</template>

<style>
/* Animación del menú desplegable */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
