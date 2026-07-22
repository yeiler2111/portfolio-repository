<template>
  <BaseContainer>
    <SectionHeading
      :eyebrow="t(ui.process.eyebrow)"
      :title="t(ui.process.title)"
      :subtitle="t(ui.process.subtitle)"
    />

    <ol class="steps">
      <li
        v-for="(step, index) in processSteps"
        :key="step.id"
        v-reveal="index * 100"
        class="step card card-hover"
      >
        <span class="step-ghost" aria-hidden="true">{{ index + 1 }}</span>

        <div class="step-head">
          <span class="step-icon">
            <component :is="iconFor(step.icon)" :size="22" />
          </span>
          <span class="step-num">{{ t(ui.process.step) }} {{ index + 1 }}</span>
        </div>

        <h3 class="step-title">{{ t(step.title) }}</h3>
        <p class="step-desc">{{ t(step.description) }}</p>

        <ul class="step-deliverables">
          <li v-for="d in t(step.deliverables)" :key="d">
            <Check :size="14" class="shrink-0" />
            {{ d }}
          </li>
        </ul>
      </li>
    </ol>
  </BaseContainer>
</template>

<script setup lang="ts">
import BaseContainer from "@/components/ui/BaseContainer.vue";
import SectionHeading from "@/components/ui/SectionHeading.vue";
import { t } from "@/i18n";
import { ui } from "@/i18n/ui";
import { processSteps } from "@/data/process";
import { Check, Compass, Hammer, Rocket } from "lucide-vue-next";
import type { Component } from "vue";

const icons: Record<string, Component> = { Compass, Hammer, Rocket };
const iconFor = (name: string): Component => icons[name] ?? Compass;
</script>

<style scoped lang="postcss">
.steps {
  @apply mt-14 grid grid-cols-1 md:grid-cols-3 gap-6;
}

.step {
  @apply relative overflow-hidden p-7;
}

/* Número grande y tenue de fondo */
.step-ghost {
  @apply pointer-events-none select-none absolute -top-4 right-3
         text-8xl font-black leading-none
         text-primary-500/[0.06] dark:text-primary-400/[0.08];
}

.step-head {
  @apply relative flex items-center gap-3 mb-4;
}
.step-icon {
  @apply grid place-items-center shrink-0 w-12 h-12 rounded-2xl text-white
         bg-gradient-to-br from-primary-500 to-secondary-500
         shadow-lg shadow-primary-500/25;
}
.step-num {
  @apply text-xs font-semibold uppercase tracking-wider
         text-primary-600 dark:text-primary-400;
}

.step-title {
  @apply relative text-lg font-bold text-gray-900 dark:text-white;
}
.step-desc {
  @apply relative mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300;
}
.step-deliverables {
  @apply relative mt-5 pt-5 border-t border-gray-100 dark:border-gray-800
         flex flex-col gap-2;
}
.step-deliverables li {
  @apply flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300;
}
.step-deliverables li :deep(svg) {
  @apply text-emerald-500;
}
</style>
