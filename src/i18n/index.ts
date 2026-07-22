import { ref } from "vue";

export type Locale = "es" | "en";

/** Objeto de texto bilingüe. */
export type Localized<T = string> = Record<Locale, T>;

const STORAGE_KEY = "lang";

const detect = (): Locale => {
  if (typeof window === "undefined") return "es";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "es" || saved === "en") return saved;
  const nav = (navigator.language || "es").toLowerCase();
  return nav.startsWith("en") ? "en" : "es";
};

/** Idioma activo (reactivo). */
export const locale = ref<Locale>(detect());

if (typeof document !== "undefined") {
  document.documentElement.lang = locale.value;
}

export const setLocale = (l: Locale): void => {
  locale.value = l;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, l);
    document.documentElement.lang = l;
  }
};

export const toggleLocale = (): void => setLocale(locale.value === "es" ? "en" : "es");

/**
 * Devuelve el texto del idioma activo desde un objeto `{ es, en }`.
 * Reactivo: leer `locale.value` hace que las plantillas se re-rendericen
 * al cambiar de idioma.
 */
export const t = <T>(obj: Localized<T>): T => obj[locale.value];

export const useI18n = () => ({ locale, setLocale, toggleLocale, t });
