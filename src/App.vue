<script setup>
import Header from "./components/shared/Header.vue";
import Footer from "@/components/shared/Footer.vue";
import { useHead } from "@vueuse/head";

useHead({
  title: "Yeiler Simons Romero - Desarrollador de Software",
  meta: [
    {
      name: "description",
      content:
        "Portafolio de Yeiler Simons Romero, desarrollador de software especializado en frontend y backend.",
    },
    {
      name: "keywords",
      content:
        "Yeiler Simons Romero, desarrollador web, frontend, backend, JavaScript, Vue, React, Node.js",
    },
    { name: "author", content: "Yeiler Simons Romero" },
    { name: "robots", content: "index, follow" },
    { name: "google-site-verification", content: "google880cdd5af604488d" },
    {
      property: "og:title",
      content: "Yeiler Simons Romero - Desarrollador de Software",
    },
    {
      property: "og:description",
      content:
        "Explora el portafolio de Yeiler Simons Romero, desarrollador web especializado en tecnologías modernas.",
    },
    { property: "og:image", content: "https://portfolio-yeiler.netlify.app/" },
    { property: "og:url", content: "https://portfolio-yeiler.netlify.app/" },
    { property: "og:type", content: "website" },
  ],
  link: [
    { rel: "icon", href: "/favicon.ico" },
    {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css",
    },
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Yeiler Simons Romero",
        url: "https://tudominio.com",
        sameAs: [
          "https://github.com/yeiler2111",
          "https://linkedin.com/in/yeiler-simons-romero",
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
  <Header />
  <div class="content mt-20">
    <router-view class=""></router-view>
  </div>

  <Footer />
</template>
