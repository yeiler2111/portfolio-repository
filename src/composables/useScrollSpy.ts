import { onBeforeUnmount, onMounted, ref } from "vue";

/**
 * Observa un conjunto de secciones por id y expone la que está activa
 * en el viewport. Útil para resaltar el enlace correspondiente en la
 * navegación. Usa IntersectionObserver (sin listeners de scroll costosos).
 */
export function useScrollSpy(sectionIds: string[], rootMargin = "-45% 0px -50% 0px") {
  const activeId = ref<string>(sectionIds[0] ?? "");
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) activeId.value = visible[0].target.id;
      },
      { rootMargin, threshold: [0, 0.25, 0.5, 1] }
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
  });

  onBeforeUnmount(() => observer?.disconnect());

  return { activeId };
}

/** Desplazamiento suave a una sección por id, respetando el header fijo. */
export function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}
