/**
 * Helpers de scroll que respetan `prefers-reduced-motion`.
 *
 * El CSS ya neutraliza `scroll-behavior: smooth` cuando esa preferencia está
 * activa, pero un `scrollIntoView({ behavior: "smooth" })` desde JavaScript la
 * ignora por completo: el desplazamiento animado se ejecuta igual. Para quien
 * tiene trastornos vestibulares eso puede provocar mareo, así que la decisión
 * hay que tomarla también en código.
 */

const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;

const behavior = (): ScrollBehavior =>
  prefersReducedMotion() ? "auto" : "smooth";

/** Lleva el scroll al inicio de la página. */
export const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: behavior() });
};

/** Lleva el scroll a la sección indicada. Ignora ids inexistentes. */
export const scrollToSection = (id: string): void => {
  if (id === "top") {
    scrollToTop();
    return;
  }
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: behavior(), block: "start" });
};
