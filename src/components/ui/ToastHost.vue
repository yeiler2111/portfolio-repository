<template>
  <!--
    Se monta una sola vez en App.vue. `aria-live="polite"` hace que los
    lectores de pantalla anuncien el aviso sin robar el foco: importante en el
    formulario de contacto, donde el resultado del envío solo se comunicaba
    visualmente.
  -->
  <div class="toast-host" role="status" aria-live="polite" aria-atomic="false">
    <transition-group name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="['toast', `toast-${toast.type}`]"
      >
        <component :is="icons[toast.type]" :size="18" class="shrink-0" />
        <p class="toast-message">{{ toast.message }}</p>
        <button
          type="button"
          class="toast-close"
          :aria-label="t(ui.toast.dismiss)"
          @click="dismiss(toast.id)"
        >
          <X :size="16" />
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "@/composables/useToast";
import { t } from "@/i18n";
import { ui } from "@/i18n/ui";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-vue-next";

const { toasts, dismiss } = useToast();

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};
</script>

<style scoped lang="postcss">
.toast-host {
  @apply fixed top-20 inset-x-0 z-[100] flex flex-col items-center gap-3 px-4
         pointer-events-none;
}

.toast {
  @apply pointer-events-auto flex items-start gap-3 w-full max-w-md
         rounded-xl border px-4 py-3 shadow-lg
         bg-white dark:bg-gray-900
         border-gray-200 dark:border-gray-700;
}

.toast-message {
  @apply flex-1 text-sm leading-relaxed text-gray-700 dark:text-gray-200;
}

.toast-success {
  @apply border-emerald-300 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400;
}
.toast-error {
  @apply border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400;
}
.toast-info {
  @apply border-primary-300 dark:border-primary-800 text-primary-600 dark:text-primary-400;
}

.toast-close {
  @apply shrink-0 rounded-md p-0.5 text-gray-400
         hover:text-gray-700 dark:hover:text-gray-200 transition-colors;
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (prefers-reduced-motion: reduce) {
  .toast-enter-active,
  .toast-leave-active {
    transition: none;
  }
}
</style>
