import type { Directive } from "vue";

/**
 * Directiva `v-reveal`: revela el elemento con un fade + subida suave
 * cuando entra en el viewport. El valor opcional es el retardo en ms
 * (útil para stagger): `v-reveal="index * 90"`.
 *
 * Respeta `prefers-reduced-motion`: si el usuario lo pide, no anima
 * (el elemento permanece visible).
 */
const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

let observer: IntersectionObserver | null = null;

const getObserver = (): IntersectionObserver => {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add("reveal-visible");
            // Limpia el delay inline tras animar para no afectar el hover.
            el.addEventListener(
              "transitionend",
              () => {
                el.style.transitionDelay = "";
                el.style.willChange = "auto";
              },
              { once: true }
            );
            observer?.unobserve(el);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
  }
  return observer;
};

export const reveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    // Sin soporte o con motion reducido: mostrar sin animar.
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      return;
    }
    const delay = binding.value ?? 0;
    if (delay) el.style.transitionDelay = `${delay}ms`;
    el.classList.add("reveal");
    getObserver().observe(el);
  },
  unmounted(el) {
    observer?.unobserve(el);
  },
};
