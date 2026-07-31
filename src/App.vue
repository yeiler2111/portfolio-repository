<script setup>
import Header from "./components/shared/Header.vue";
import Footer from "@/components/shared/Footer.vue";
import ToastHost from "@/components/ui/ToastHost.vue";
import { locale, t } from "@/i18n";
import { ui } from "@/i18n/ui";
import { SITE_URL, contact, socials } from "@/data/site";
import { useHead } from "@vueuse/head";
import { computed } from "vue";

const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const meta = {
  title: {
    es: "Yeiler Simons Romero - Desarrollador de Software",
    en: "Yeiler Simons Romero - Software Developer",
  },
  description: {
    es: "Portafolio de Yeiler Simons Romero, desarrollador de software especializado en frontend, backend y arquitectura de microservicios.",
    en: "Portfolio of Yeiler Simons Romero, a software developer specialized in frontend, backend and microservice architecture.",
  },
  ogDescription: {
    es: "De la idea a producción: interfaces rápidas y accesibles, backends escalables y arquitecturas de microservicios en AWS.",
    en: "From idea to production: fast, accessible interfaces, scalable backends and microservice architectures on AWS.",
  },
};

useHead({
  htmlAttrs: { lang: computed(() => locale.value) },
  title: computed(() => t(meta.title)),
  meta: [
    { name: "description", content: computed(() => t(meta.description)) },
    {
      name: "keywords",
      content:
        "Yeiler Simons Romero, desarrollador web, web developer, frontend, backend, JavaScript, Vue, React, Node.js, portafolio, portfolio",
    },
    { name: "author", content: "Yeiler Simons Romero" },
    { name: "robots", content: "index, follow" },
    { name: "google-site-verification", content: "google880cdd5af604488d" },
    { property: "og:title", content: computed(() => t(meta.title)) },
    { property: "og:description", content: computed(() => t(meta.ogDescription)) },
    { property: "og:image", content: OG_IMAGE },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:url", content: `${SITE_URL}/` },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Yeiler Simons Romero - Portafolio" },
    {
      property: "og:locale",
      content: computed(() => (locale.value === "es" ? "es_ES" : "en_US")),
    },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: computed(() => t(meta.title)) },
    {
      name: "twitter:description",
      content: computed(() => t(meta.ogDescription)),
    },
    { name: "twitter:image", content: OG_IMAGE },
  ],
  link: [
    { rel: "icon", href: "/favicon.ico" },
    { rel: "canonical", href: `${SITE_URL}/` },
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Yeiler Simons Romero",
        url: SITE_URL,
        image: OG_IMAGE,
        sameAs: socials.map((s) => s.url),
        jobTitle: "Ingeniero de Sistemas · Desarrollador Full Stack",
        email: `mailto:${contact.email}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Santa Marta",
          addressCountry: "CO",
        },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Universidad del Magdalena",
        },
        knowsAbout: [
          "Vue.js",
          "React",
          "Angular",
          "NestJS",
          "Node.js",
          "TypeScript",
          "AWS",
          "Arquitectura de microservicios",
          "Microfrontends",
        ],
      }),
    },
  ],
});
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <a href="#main-content" class="skip-link">{{ t(ui.skipToContent) }}</a>
    <Header />
    <router-view />
    <Footer />
    <ToastHost />
  </div>
</template>
