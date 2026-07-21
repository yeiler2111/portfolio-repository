<script setup lang="ts">
import { contact } from "@/data/site";
import { Github, Linkedin, Mail, MessageCircle } from "lucide-vue-next";
import type { Component } from "vue";

interface SocialItem {
  label: string;
  href: string;
  icon: Component;
  accent: string;
}

const whatsappHref = `https://wa.me/${contact.phone}?text=${encodeURIComponent(
  contact.whatsappText
)}`;

const items: SocialItem[] = [
  {
    label: "WhatsApp",
    href: whatsappHref,
    icon: MessageCircle,
    accent: "hover:text-emerald-600 dark:hover:text-emerald-400",
  },
  {
    label: "LinkedIn",
    href: contact.linkedin,
    icon: Linkedin,
    accent: "hover:text-primary-600 dark:hover:text-primary-400",
  },
  {
    label: "GitHub",
    href: contact.github,
    icon: Github,
    accent: "hover:text-gray-900 dark:hover:text-white",
  },
  {
    label: "Email",
    href: `mailto:${contact.email}`,
    icon: Mail,
    accent: "hover:text-rose-600 dark:hover:text-rose-400",
  },
];
</script>

<template>
  <div class="flex justify-center gap-3">
    <a
      v-for="item in items"
      :key="item.label"
      :href="item.href"
      target="_blank"
      rel="noopener noreferrer"
      :aria-label="item.label"
      class="social-link"
      :class="item.accent"
    >
      <component :is="item.icon" :size="22" />
    </a>
  </div>
</template>

<style scoped lang="postcss">
.social-link {
  @apply grid place-items-center w-12 h-12 rounded-2xl
         bg-white dark:bg-gray-800
         border border-gray-200 dark:border-gray-700
         text-gray-500 dark:text-gray-400
         shadow-sm hover:shadow-md hover:-translate-y-0.5
         transition-all duration-300;
}
</style>
