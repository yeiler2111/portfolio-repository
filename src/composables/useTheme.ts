import { readonly, ref } from "vue";
import type { Theme } from "@/utils/types";

const STORAGE_KEY = "theme";

/**
 * Estado de tema compartido (singleton a nivel de módulo).
 * Cualquier componente que llame a `useTheme()` comparte la misma fuente
 * de verdad, evitando estados de tema desincronizados.
 */
const isDark = ref(false);
let initialized = false;

const applyToDocument = (dark: boolean): void => {
  document.documentElement.classList.toggle("dark", dark);
};

const persist = (theme: Theme): void => {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* almacenamiento no disponible (modo privado) — se ignora */
  }
};

/**
 * Resuelve el tema inicial siguiendo esta prioridad:
 * 1. Preferencia guardada del usuario.
 * 2. Preferencia del sistema operativo (prefers-color-scheme).
 */
const resolveInitialTheme = (): boolean => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored) return stored === "dark";
  } catch {
    /* noop */
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

export function useTheme() {
  if (!initialized) {
    initialized = true;
    isDark.value = resolveInitialTheme();
    applyToDocument(isDark.value);

    // Sincroniza con el sistema solo si el usuario no eligió manualmente.
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!localStorage.getItem(STORAGE_KEY)) {
          isDark.value = e.matches;
          applyToDocument(isDark.value);
        }
      });
  }

  const setTheme = (theme: Theme): void => {
    isDark.value = theme === "dark";
    applyToDocument(isDark.value);
    persist(theme);
  };

  const toggleTheme = (): void => {
    setTheme(isDark.value ? "light" : "dark");
  };

  return {
    isDark: readonly(isDark),
    toggleTheme,
    setTheme,
  };
}
