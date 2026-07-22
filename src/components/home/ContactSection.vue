<template>
  <section id="contact" class="section section-alt relative overflow-hidden">
    <!-- Decoración de fondo -->
    <div class="contact-bg" aria-hidden="true">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
    </div>

    <BaseContainer width="narrow" class="relative z-10 text-center">
      <span class="eyebrow mb-5">{{ t(ui.contact.eyebrow) }}</span>
      <h2 class="heading-2">{{ t(ui.contact.title) }}</h2>
      <p class="contact-lead">{{ t(ui.contact.lead) }}</p>

      <div class="contact-actions">
        <BaseButton to="/contactme" size="lg">
          <template #icon-left><Mail :size="20" /></template>
          {{ t(ui.contact.send) }}
        </BaseButton>
        <BaseButton
          href="mailto:yeiler2209@gmail.com"
          variant="outline"
          size="lg"
        >
          <template #icon-left><Send :size="20" /></template>
          {{ t(ui.contact.directEmail) }}
        </BaseButton>
      </div>

      <div class="divider">
        <span>{{ t(ui.contact.connectVia) }}</span>
      </div>

      <Networking />

      <div class="features">
        <ContactFeature
          :icon="Clock"
          :title="t(ui.contact.features.fastTitle)"
          :description="t(ui.contact.features.fastDesc)"
          color="blue"
        />
        <ContactFeature
          :icon="CheckCircle2"
          :title="t(ui.contact.features.freeTitle)"
          :description="t(ui.contact.features.freeDesc)"
          color="green"
        />
        <ContactFeature
          :icon="Users"
          :title="t(ui.contact.features.flexTitle)"
          :description="t(ui.contact.features.flexDesc)"
          color="purple"
        />
      </div>
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
import Networking from "@/components/home/networkingContact.vue";
import BaseContainer from "@/components/ui/BaseContainer.vue";
import { t } from "@/i18n";
import { ui } from "@/i18n/ui";
import { CheckCircle2, Clock, Mail, Send, Users } from "lucide-vue-next";
import ContactFeature from "./ContactFeature.vue";
</script>

<style scoped lang="postcss">
.contact-bg {
  @apply absolute inset-0 overflow-hidden pointer-events-none;
}
.blob {
  @apply absolute w-80 h-80 rounded-full blur-3xl;
}
.blob-1 {
  @apply -top-40 -right-40 bg-primary-500/10 dark:bg-primary-500/[0.07];
}
.blob-2 {
  @apply -bottom-40 -left-40 bg-secondary-500/10 dark:bg-secondary-500/[0.07];
}

.contact-lead {
  @apply mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-400;
}

.contact-actions {
  @apply mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center;
}

.divider {
  @apply relative flex items-center justify-center my-12;
}
.divider::before {
  content: "";
  @apply absolute inset-x-0 top-1/2 h-px bg-gray-200 dark:bg-gray-800;
}
.divider span {
  @apply relative px-4 bg-white dark:bg-gray-900
         text-sm text-gray-500 dark:text-gray-400;
}

.features {
  @apply mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 text-left;
}
</style>
