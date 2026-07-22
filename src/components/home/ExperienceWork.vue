<template>
  <BaseContainer>
    <SectionHeading
      :eyebrow="t(ui.experience.eyebrow)"
      :title="t(ui.experience.title)"
      :subtitle="t(ui.experience.subtitle)"
    />

    <ol class="timeline">
      <li v-for="(job, index) in jobs" :key="index" class="timeline-item">
        <div class="timeline-marker">
          <span class="marker-step">{{ jobs.length - index }}</span>
          <span class="marker-dot">
            <component :is="iconFor(job.icon)" :size="16" />
          </span>
          <span v-if="index < jobs.length - 1" class="marker-line" aria-hidden="true"></span>
        </div>

        <article class="card card-hover job-card">
          <div class="job-header">
            <div>
              <h3 class="job-title">{{ t(job.title) }}</h3>
              <p class="job-company">{{ job.company }}</p>
            </div>
            <span v-if="isCurrent(job)" class="job-current">
              <span class="job-current-dot"></span>
              {{ t(ui.experience.current) }}
            </span>
          </div>

          <div class="job-meta">
            <span v-if="t(job.dates)" class="job-dates">
              <Calendar :size="14" />
              {{ t(job.dates) }}
            </span>
            <span class="job-period">
              <Clock :size="14" />
              {{ t(job.period) }}
            </span>
          </div>

          <p class="job-desc">{{ t(job.description) }}</p>

          <a
            :href="job.link"
            target="_blank"
            rel="noopener noreferrer"
            class="job-link"
          >
            {{ t(ui.experience.visit) }}
            <ArrowUpRight :size="15" />
          </a>
        </article>
      </li>
    </ol>
  </BaseContainer>
</template>

<script setup lang="ts">
import BaseContainer from "@/components/ui/BaseContainer.vue";
import SectionHeading from "@/components/ui/SectionHeading.vue";
import { t, type Localized } from "@/i18n";
import { ui } from "@/i18n/ui";
import { jobs } from "@/data/data";
import {
  ArrowUpRight,
  Briefcase,
  Calendar,
  Clock,
  Code2,
  Settings,
  Stethoscope,
} from "lucide-vue-next";
import type { Component } from "vue";

const icons: Record<string, Component> = {
  medical_services: Stethoscope,
  code: Code2,
  engineering: Settings,
  work: Briefcase,
};
const iconFor = (name: string): Component => icons[name] ?? Briefcase;

const isCurrent = (job: { dates: Localized; period: Localized }): boolean =>
  /actual|present/i.test(`${t(job.dates)} ${t(job.period)}`);
</script>

<style scoped lang="postcss">
.timeline {
  @apply mt-14 max-w-3xl mx-auto;
}

.timeline-item {
  @apply relative flex gap-5 pb-8 last:pb-0;
}

.timeline-marker {
  @apply relative flex flex-col items-center shrink-0;
}

.marker-step {
  @apply absolute -top-1 -left-1 z-10 grid place-items-center
         w-5 h-5 rounded-full text-[10px] font-bold
         bg-white dark:bg-gray-900 text-primary-600 dark:text-primary-400
         ring-1 ring-primary-200 dark:ring-primary-800 shadow-sm;
}

.marker-dot {
  @apply grid place-items-center w-11 h-11 rounded-full text-white
         bg-gradient-to-br from-primary-500 to-secondary-500
         shadow-lg shadow-primary-500/25 ring-4 ring-white dark:ring-gray-950;
}

.marker-line {
  @apply flex-1 w-0.5 mt-2 rounded-full bg-gradient-to-b from-primary-300 to-primary-100
         dark:from-primary-700 dark:to-primary-900/40;
}

.job-card {
  @apply flex-1 p-6 mb-2;
}

.job-header {
  @apply flex items-start justify-between gap-3;
}

.job-title {
  @apply text-lg font-bold text-gray-900 dark:text-white;
}

.job-company {
  @apply text-sm font-semibold text-primary-600 dark:text-primary-400;
}

.job-current {
  @apply inline-flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold
         bg-success/10 text-emerald-700 dark:text-emerald-400
         border border-success/20;
}
.job-current-dot {
  @apply w-1.5 h-1.5 rounded-full bg-success;
  box-shadow: 0 0 0 3px rgb(var(--color-success) / 0.2);
}

.job-meta {
  @apply flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3;
}
.job-dates {
  @apply inline-flex items-center gap-1.5
         text-xs font-semibold text-primary-600 dark:text-primary-400;
}
.job-period {
  @apply inline-flex items-center gap-1.5
         text-xs font-medium text-gray-500 dark:text-gray-400;
}

.job-desc {
  @apply mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300;
}

.job-link {
  @apply inline-flex items-center gap-1 mt-4
         text-sm font-semibold text-primary-600 dark:text-primary-400
         hover:gap-1.5 transition-all;
}
</style>
