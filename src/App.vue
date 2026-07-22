<script setup>
import Header from "./components/shared/Header.vue";
import Footer from "@/components/shared/Footer.vue";
import { locale, t } from "@/i18n";
import { useHead } from "@vueuse/head";
import { computed } from "vue";

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
    es: "Explora el portafolio de Yeiler Simons Romero, desarrollador web especializado en tecnologías modernas.",
    en: "Explore the portfolio of Yeiler Simons Romero, a web developer specialized in modern technologies.",
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
    {
      property: "og:image",
      content: "https://portfolio-yeiler.netlify.app/og-image.jpg",
    },
    { property: "og:url", content: "https://portfolio-yeiler.netlify.app/" },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Yeiler Simons Romero - Portafolio" },
    {
      property: "og:locale",
      content: computed(() => (locale.value === "es" ? "es_ES" : "en_US")),
    },
  ],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Yeiler Simons Romero",
        url: "https://portfolio-yeiler.netlify.app",
        sameAs: [
          "https://github.com/yeiler2111",
          "https://www.linkedin.com/in/yeiler-andres-simons-romero-86b578261/",
        ],
        jobTitle: "Desarrollador de Software",
        worksFor: {
          "@type": "Organization",
          name: "Independiente",
        },
      }),
    },
  ],
});
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>
