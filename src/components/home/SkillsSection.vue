<template>
  <section id="skills" class="section">
    <BaseContainer>
      <SectionHeading
        eyebrow="Skills"
        title="Mi enfoque desarrollando en Vue"
        subtitle="Cómo abordo el desarrollo de aplicaciones Vue: desde la arquitectura y el rendimiento hasta la calidad del código y el producto final."
      />

      <div class="skills-grid">
        <article
          v-for="group in skillGroups"
          :key="group.id"
          class="card card-hover skill-card"
        >
          <div class="skill-head">
            <div class="skill-icon">
              <component :is="iconFor(group.icon)" :size="22" />
            </div>
            <div>
              <h3 class="skill-title">{{ group.title }}</h3>
              <p class="skill-desc">{{ group.description }}</p>
            </div>
          </div>

          <ul class="skill-tags">
            <li v-for="item in group.items" :key="item" class="skill-tag">
              {{ item }}
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
import { skillGroups } from "@/data/skills";
import { Boxes, Layers, ShieldCheck, Zap } from "lucide-vue-next";
import type { Component } from "vue";

const icons: Record<string, Component> = { Layers, Zap, ShieldCheck, Boxes };
const iconFor = (name: string): Component => icons[name] ?? Boxes;
</script>

<style scoped lang="postcss">
.skills-grid {
  @apply mt-14 grid grid-cols-1 md:grid-cols-2 gap-6;
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
