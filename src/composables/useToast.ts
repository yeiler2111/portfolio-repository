import { readonly, ref } from "vue";

export type ToastType = "success" | "error" | "info";

export interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

const items = ref<Toast[]>([]);
let nextId = 0;

/**
 * Cola de notificaciones mínima, en reemplazo de `$q.notify` de Quasar.
 *
 * Quasar entraba al bundle solo por esta función: arrastraba quasar.css
 * (~250 KB), Font Awesome v6 (~96 KB, sin una sola clase usada) y Material
 * Icons. Un portafolio estático no justifica ese costo por tres avisos.
 *
 * El estado vive a nivel de módulo, así que `ToastHost` se monta una vez en
 * App.vue y cualquier componente puede empujar avisos sin prop drilling.
 */
export function useToast() {
  const dismiss = (id: number): void => {
    items.value = items.value.filter((t) => t.id !== id);
  };

  const push = (type: ToastType, message: string, timeout = 4000): number => {
    const id = nextId++;
    items.value = [...items.value, { id, type, message }];
    if (timeout > 0) window.setTimeout(() => dismiss(id), timeout);
    return id;
  };

  return {
    toasts: readonly(items),
    dismiss,
    success: (message: string, timeout?: number) =>
      push("success", message, timeout),
    error: (message: string, timeout?: number) => push("error", message, timeout),
    info: (message: string, timeout?: number) => push("info", message, timeout),
  };
}
