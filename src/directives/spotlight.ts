import type { Directive } from "vue";

/**
 * Directiva `v-spotlight`: publica la posición del cursor dentro del elemento
 * como dos variables CSS, `--mx` y `--my` (en porcentaje). El efecto visual lo
 * decide cada componente en su propio CSS; aquí solo se mide.
 *
 * El JS no toca estilos calculados ni lee layout salvo un `getBoundingClientRect`
 * por frame, y la escritura va a variables CSS: quien pinta es el compositor.
 *
 * Solo se activa en escritorio. El gate no es cosmético:
 *
 * - `(min-width: 1024px)` deja fuera móvil y tablet, que es lo pedido.
 * - `(hover: hover) and (pointer: fine)` deja fuera las pantallas táctiles
 *   grandes, donde un efecto que sigue al cursor no tiene cursor al que seguir
 *   y además se quedaría congelado en el último punto tocado.
 * - `prefers-reduced-motion` se respeta como en el resto del sitio.
 *
 * Las tres condiciones se reevalúan en cada `pointermove` a través de
 * `canRun()`, así que redimensionar la ventana o conectar un ratón no deja el
 * efecto en un estado incoherente.
 */
const QUERY_DESKTOP = "(min-width: 1024px) and (hover: hover) and (pointer: fine)";
const QUERY_MOTION = "(prefers-reduced-motion: reduce)";

const canRun = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia(QUERY_DESKTOP).matches &&
  !window.matchMedia(QUERY_MOTION).matches;

interface SpotlightEl extends HTMLElement {
  _spotlight?: {
    move: (event: PointerEvent) => void;
    leave: () => void;
  };
}

export const spotlight: Directive<SpotlightEl> = {
  mounted(el) {
    if (typeof window === "undefined") return;

    let frame = 0;

    const move = (event: PointerEvent): void => {
      if (!canRun()) return;
      // Un solo cálculo por frame: `pointermove` dispara muy por encima de la
      // frecuencia de refresco y sin esto se recalcula el rect decenas de
      // veces entre dos pinturas.
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = el.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        el.style.setProperty(
          "--mx",
          `${((event.clientX - rect.left) / rect.width) * 100}%`
        );
        el.style.setProperty(
          "--my",
          `${((event.clientY - rect.top) / rect.height) * 100}%`
        );
      });
    };

    /**
     * Al salir, el foco vuelve al centro en vez de quedarse clavado donde el
     * cursor abandonó la tarjeta: así el brillo se desvanece hacia el medio y
     * no deja un borde iluminado sin motivo.
     */
    const leave = (): void => {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      el.style.setProperty("--mx", "50%");
      el.style.setProperty("--my", "50%");
    };

    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", leave, { passive: true });
    el._spotlight = { move, leave };
  },

  unmounted(el) {
    if (!el._spotlight) return;
    el.removeEventListener("pointermove", el._spotlight.move);
    el.removeEventListener("pointerleave", el._spotlight.leave);
    delete el._spotlight;
  },
};
