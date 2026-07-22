<template>
  <BaseContainer>
    <SectionHeading
      :eyebrow="t(ui.cases.eyebrow)"
      :title="t(ui.cases.title)"
      :subtitle="t(ui.cases.subtitle)"
    />

    <p class="cases-note">
      <ShieldCheck :size="16" class="shrink-0" />
      {{ t(ui.cases.note) }}
    </p>

    <div class="cases">
      <article
        v-for="(cs, index) in caseStudies"
        :key="cs.id"
        v-reveal="index * 110"
        class="card card-hover case"
      >
        <!-- Encabezado -->
        <header class="case-head">
          <span class="case-icon">
            <component :is="iconFor(cs.icon)" :size="22" />
          </span>
          <div class="case-headings">
            <div class="case-client-row">
              <span class="case-client">{{ cs.client }}</span>
              <span v-if="cs.current" class="case-current">
                <span class="case-current-dot"></span>
                {{ t(ui.cases.current) }}
              </span>
            </div>
            <span class="case-tag">{{ t(cs.tag) }}</span>
          </div>
        </header>

        <h3 class="case-title">{{ t(cs.title) }}</h3>

        <!-- Problema -->
        <div class="case-block">
          <span class="case-label case-label-problem">
            <Target :size="15" /> {{ t(ui.cases.challenge) }}
          </span>
          <p class="case-problem">{{ t(cs.problem) }}</p>
        </div>

        <!-- Arquitectura + Resultado -->
        <div class="case-cols">
          <div class="case-block">
            <span class="case-label case-label-arch">
              <Layers :size="15" /> {{ t(ui.cases.architecture) }}
            </span>
            <ul class="case-list">
              <li v-for="(item, i) in t(cs.architecture)" :key="i">{{ item }}</li>
            </ul>
          </div>

          <div class="case-block">
            <span class="case-label case-label-outcome">
              <TrendingUp :size="15" /> {{ t(ui.cases.outcome) }}
            </span>
            <ul class="case-list case-list-outcome">
              <li v-for="(item, i) in t(cs.outcome)" :key="i">{{ item }}</li>
            </ul>
          </div>
        </div>

        <!-- Stack + enlace -->
        <footer class="case-foot">
          <div class="case-stack">
            <span v-for="tech in cs.stack" :key="tech" class="chip">{{ tech }}</span>
          </div>
          <a
            v-if="cs.link"
            :href="cs.link"
            target="_blank"
            rel="noopener noreferrer"
            class="case-link"
          >
            {{ cs.linkLabel ? t(cs.linkLabel) : t(ui.cases.viewMore) }}
            <ArrowUpRight :size="15" />
          </a>
        </footer>
      </article>
    </div>
  </BaseContainer>
</template>

<script setup lang="ts">
import BaseContainer from "@/components/ui/BaseContainer.vue";
import SectionHeading from "@/components/ui/SectionHeading.vue";
import { t } from "@/i18n";
import { ui } from "@/i18n/ui";
import { caseStudies } from "@/data/caseStudies";
import {
  ArrowUpRight,
  Boxes,
  Landmark,
  Layers,
  ShieldCheck,
  Stethoscope,
  Target,
  TrendingUp,
} from "lucide-vue-next";
import type { Component } from "vue";

const icons: Record<string, Component> = {
  Boxes,
  Stethoscope,
  Landmark,
};
const iconFor = (name: string): Component => icons[name] ?? Boxes;
</script>

<style scoped lang="postcss">
.cases-note {
  @apply mt-6 mx-auto w-fit max-w-2xl flex items-center gap-2
         px-4 py-2.5 rounded-xl
         text-xs sm:text-sm text-gray-500 dark:text-gray-400
         bg-gray-100/70 dark:bg-gray-800/50
         border border-gray-200/70 dark:border-gray-700/60;
}
.cases-note strong {
  @apply font-semibold text-gray-700 dark:text-gray-200;
}

.cases {
  @apply mt-10 flex flex-col gap-8 max-w-4xl mx-auto;
}

.case {
  @apply p-7 sm:p-8;
}

.case-head {
  @apply flex items-center gap-4;
}
.case-icon {
  @apply grid place-items-center shrink-0 w-12 h-12 rounded-xl text-white
         bg-gradient-to-br from-primary-500 to-secondary-500
         shadow-lg shadow-primary-500/20;
}
.case-headings {
  @apply flex flex-col gap-0.5;
}
.case-client-row {
  @apply flex items-center gap-2;
}
.case-client {
  @apply text-base font-bold text-gray-900 dark:text-white;
}
.case-current {
  @apply inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold
         bg-success/10 text-emerald-700 dark:text-emerald-400 border border-success/20;
}
.case-current-dot {
  @apply w-1.5 h-1.5 rounded-full bg-success;
}
.case-tag {
  @apply text-xs font-medium text-primary-600 dark:text-primary-400;
}

.case-title {
  @apply mt-5 text-xl sm:text-2xl font-bold leading-tight text-gray-900 dark:text-white;
}

.case-block {
  @apply mt-5;
}
.case-label {
  @apply inline-flex items-center gap-1.5 mb-2
         text-xs font-semibold uppercase tracking-wide;
}
.case-label-problem {
  @apply text-amber-600 dark:text-amber-400;
}
.case-label-arch {
  @apply text-primary-600 dark:text-primary-400;
}
.case-label-outcome {
  @apply text-emerald-600 dark:text-emerald-400;
}

.case-problem {
  @apply text-sm leading-relaxed text-gray-600 dark:text-gray-300;
}

.case-cols {
  @apply grid grid-cols-1 sm:grid-cols-2 gap-x-8;
}

.case-list {
  @apply flex flex-col gap-1.5 text-sm text-gray-600 dark:text-gray-300;
}
.case-list li {
  @apply relative pl-4 leading-snug;
}
.case-list li::before {
  content: "";
  @apply absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-primary-400;
}
.case-list-outcome li::before {
  @apply bg-emerald-500;
}

.case-foot {
  @apply mt-6 pt-5 border-t border-gray-100 dark:border-gray-800
         flex flex-wrap items-center justify-between gap-4;
}
.case-stack {
  @apply flex flex-wrap gap-2;
}
.case-link {
  @apply inline-flex items-center gap-1 shrink-0
         text-sm font-semibold text-primary-600 dark:text-primary-400
         hover:gap-1.5 transition-all;
}
</style>
