<template>
  <div class="tech">
    <SectionHeading
      :eyebrow="t(ui.tech.eyebrow)"
      :title="t(ui.tech.title)"
      :subtitle="t(ui.tech.subtitle)"
    />

    <div class="tech-categories">
      <section
        v-for="(category, index) in techCategories"
        :key="category.id"
        v-reveal="index * 70"
        class="tech-category"
      >
        <header class="category-header">
          <div class="category-icon">
            <component :is="iconFor(category.icon)" :size="18" />
          </div>
          <h3 class="category-title">{{ t(category.title) }}</h3>
          <span class="category-count">{{ category.techs.length }}</span>
        </header>

        <div class="tech-grid">
          <div v-for="tech in category.techs" :key="tech.name" class="tech-card">
            <img
              :src="tech.icon"
              :alt="tech.name"
              loading="lazy"
              class="tech-icon"
            />
            <span class="tech-name">{{ tech.name }}</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import SectionHeading from "@/components/ui/SectionHeading.vue";
import { t } from "@/i18n";
import { ui } from "@/i18n/ui";
import { techCategories } from "@/data/data";
import {
  Cloud,
  Database,
  Layout,
  Server,
  Smartphone,
  Wrench,
} from "lucide-vue-next";
import type { Component } from "vue";

const icons: Record<string, Component> = {
  Layout,
  Server,
  Smartphone,
  Cloud,
  Database,
  Wrench,
};
const iconFor = (name: string): Component => icons[name] ?? Wrench;
</script>

<style scoped lang="postcss">
.tech-categories {
  @apply mt-14 space-y-10;
}

.tech-category {
  @apply space-y-4;
}

.category-header {
  @apply flex items-center gap-3 pb-3
         border-b border-gray-200 dark:border-gray-800;
}

.category-icon {
  @apply grid place-items-center w-9 h-9 rounded-lg text-white
         bg-gradient-to-br from-primary-500 to-secondary-500 shadow-md;
}

.category-title {
  @apply flex-1 text-lg font-bold text-gray-900 dark:text-white;
}

.category-count {
  @apply px-2.5 py-0.5 rounded-full text-xs font-semibold
         bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400;
}

.tech-grid {
  @apply flex flex-wrap justify-center gap-3;
}

.tech-card {
  @apply w-[92px] sm:w-[104px] flex flex-col items-center justify-center gap-2.5
         py-4 px-2 rounded-xl
         bg-white dark:bg-gray-900
         border border-gray-200 dark:border-gray-800
         transition-all duration-300 cursor-default
         hover:-translate-y-1 hover:shadow-lg
         hover:border-primary-300 dark:hover:border-primary-700/60;
}

.tech-icon {
  @apply w-8 h-8 object-contain transition-transform duration-300;
}
.tech-card:hover .tech-icon {
  @apply scale-110;
}

.tech-name {
  @apply text-xs font-medium text-center text-gray-700 dark:text-gray-300;
}
</style>
