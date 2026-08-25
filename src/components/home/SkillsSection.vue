<template>
  <section id="skills" class="section">
    <BaseContainer>
      <SectionHeading
        :eyebrow="t(ui.skills.eyebrow)"
        :title="t(ui.skills.title)"
        :subtitle="t(ui.skills.subtitle)"
      />

      <div class="skills-grid">
        <article
          v-for="(group, index) in skillGroups"
          :key="group.id"
          v-reveal="index * 90"
          class="card card-hover skill-card"
        >
          <div class="skill-head">
            <div class="skill-icon">
              <component :is="iconFor(group.icon)" :size="22" />
            </div>
            <div>
              <h3 class="skill-title">{{ t(group.title) }}</h3>
              <p class="skill-desc">{{ t(group.description) }}</p>
            </div>
          </div>

          <ul class="skill-tags">
            <li
              v-for="item in group.items"
              :key="itemLabel(item)"
              class="skill-tag"
            >
              {{ itemLabel(item) }}
            </li>
          </ul>
        </article>
      </div>
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
import BaseContainer from "@/components/ui/BaseContainer.vue";
import SectionHeading from "@/components/ui/SectionHeading.vue";
import { t } from "@/i18n";
import type { Localized } from "@/i18n";
import { ui } from "@/i18n/ui";
import { skillGroups } from "@/data/skills";
import { Boxes, Layout, Network, Server, ShieldCheck } from "lucide-vue-next";
import type { Component } from "vue";

const icons: Record<string, Component> = { Layout, Server, Network, ShieldCheck };
const iconFor = (name: string): Component => icons[name] ?? Boxes;

/**
 * Un item es o el nombre propio de una tecnología (se muestra tal cual) o una
 * etiqueta bilingüe que hay que resolver contra el idioma activo.
 */
const itemLabel = (item: string | Localized): string =>
  typeof item === "string" ? item : t(item);
</script>

<style scoped lang="postcss">
.skills-grid {
  @apply mt-10 grid grid-cols-1 md:grid-cols-2 gap-6;
}

.skill-card {
  @apply p-7;
}

.skill-head {
  @apply flex items-start gap-4;
}

.skill-icon {
  @apply grid place-items-center shrink-0 w-12 h-12 rounded-xl text-white
         bg-gradient-to-br from-primary-500 to-secondary-500
         shadow-lg shadow-primary-500/20;
}

.skill-title {
  @apply text-lg font-bold text-gray-900 dark:text-white;
}

.skill-desc {
  @apply mt-1 text-sm text-gray-500 dark:text-gray-400 leading-relaxed;
}

.skill-tags {
  @apply mt-5 pt-5 border-t border-gray-100 dark:border-gray-800
         flex flex-wrap gap-2;
}

.skill-tag {
  @apply inline-flex items-center px-3 py-1.5 rounded-lg
         text-xs font-medium
         bg-gray-100 text-gray-700
         dark:bg-gray-800 dark:text-gray-300
         ring-1 ring-inset ring-gray-200/60 dark:ring-gray-700/60
         transition-colors;
}

.skill-card:hover .skill-tag {
  @apply bg-primary-50 text-primary-700 ring-primary-200/60
         dark:bg-primary-500/10 dark:text-primary-300 dark:ring-primary-500/20;
}
</style>
