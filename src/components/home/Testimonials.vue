<template>
  <BaseContainer>
    <SectionHeading
      :eyebrow="t(ui.testimonials.eyebrow)"
      :title="t(ui.testimonials.title)"
    />

    <div class="testimonials">
      <figure
        v-for="(t, index) in testimonials"
        :key="t.id"
        v-reveal="index * 90"
        class="card testimonial"
      >
        <Quote :size="28" class="testimonial-mark" />
        <blockquote class="testimonial-quote">{{ t.quote }}</blockquote>
        <figcaption class="testimonial-author">
          <img
            v-if="t.avatar"
            :src="t.avatar"
            :alt="t.author"
            class="testimonial-avatar"
            loading="lazy"
          />
          <span v-else class="testimonial-initials">{{ initials(t.author) }}</span>
          <span class="testimonial-meta">
            <span class="testimonial-name">{{ t.author }}</span>
            <span class="testimonial-role">{{ t.role }} · {{ t.company }}</span>
          </span>
        </figcaption>
      </figure>
    </div>
  </BaseContainer>
</template>

<script setup lang="ts">
import BaseContainer from "@/components/ui/BaseContainer.vue";
import SectionHeading from "@/components/ui/SectionHeading.vue";
import { t } from "@/i18n";
import { ui } from "@/i18n/ui";
import { testimonials } from "@/data/testimonials";
import { Quote } from "lucide-vue-next";

const initials = (name: string): string =>
  name
    .split(" ")
    .slice(0, 2)
    .map((n) => n.charAt(0).toUpperCase())
    .join("");
</script>

<style scoped lang="postcss">
.testimonials {
  @apply mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
}
.testimonial {
  @apply relative p-7 flex flex-col;
}
.testimonial-mark {
  @apply text-primary-400/50 dark:text-primary-500/40;
}
.testimonial-quote {
  @apply mt-3 flex-1 text-sm leading-relaxed text-gray-700 dark:text-gray-200;
}
.testimonial-author {
  @apply mt-5 pt-5 border-t border-gray-100 dark:border-gray-800
         flex items-center gap-3;
}
.testimonial-avatar {
  @apply w-11 h-11 rounded-full object-cover;
}
.testimonial-initials {
  @apply grid place-items-center w-11 h-11 rounded-full text-sm font-bold text-white
         bg-gradient-to-br from-primary-500 to-secondary-500;
}
.testimonial-meta {
  @apply flex flex-col;
}
.testimonial-name {
  @apply text-sm font-semibold text-gray-900 dark:text-white;
}
.testimonial-role {
  @apply text-xs text-gray-500 dark:text-gray-400;
}
</style>
