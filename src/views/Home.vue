<template>
  <div class="page">
    <section class="hero">
      <div class="hero__inner">
        <picture class="hero__picture">
          <source
            srcset="/img/imagen_mia_768.webp"
            media="(min-width: 1024px)"
            type="image/webp"
          />
          <source
            srcset="/img/imagen_mia_480.webp"
            media="(min-width: 641px)"
            type="image/webp"
          />
          <img
            src="/img/imagen_mia_240.webp"
            alt="Retrato de Yeiler Simons"
            loading="eager"
            decoding="async"
            fetchpriority="high"
            @load="onImageLoad"
            :class="imgClasses"
          />
        </picture>

        <div v-if="loading" class="loader mt-4"></div>

        <div class="hero__text">
          <h1 class="hero__title animate__animated animate__fadeIn">
            Hola, soy Yeiler Simons
          </h1>
          <p
            class="hero__subtitle animate__animated animate__fadeIn animate__delay-1s"
          >
            Desarrollador Fullstack<br />
            Apasionado por la informática y brindar soluciones digitales
          </p>
          <div class="flex justify-center space-x-4">
            <div class="flex flex-wrap justify-center gap-2 py-4">
              <q-chip
                v-for="option in options"
                :key="option.id"
                clickable
                @click="scrollToSection(option.id)"
                :label="option.label"
                :color="'gray-3'"
                class="text-sm rounded-full px-4 py-2 cursor-pointer transition dark:bg-gray-800 dark:text-white dark:hover:bg-blue-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="technologies" class="section--tech">
      <div class="container text-center">
        <TechStackSection />
      </div>
    </section>

    <section id="experience" class="section--experience">
      <div class="w-full">
        <ExperienceWork />
      </div>
    </section>

    <section id="projects" class="section--projects">
      <div class="container">
        <h2 class="section__heading mb-8 text-center">Proyectos destacados</h2>
        <div class="projects-grid">
          <div
            v-for="(pro, index) in proyects"
            :key="index"
            class="project-wrapper"
          >
            <ProjectCard
              :title="pro.title"
              :description="pro.description"
              :images="pro.images"
              :technologies="pro.technologies"
              :link="pro.link"
            />
          </div>
        </div>
      </div>
    </section>

    <section id="about" class="section--about">
      <div class="container">
        <h2 class="section__heading text-center mb-12">Sobre mí</h2>
        <div
          v-for="(item, index) in CardItems"
          :key="index"
          class="card-wrapper"
        >
          <Section :card="item" />
        </div>
      </div>
    </section>

    <section id="contact" class="section--contact">
      <div class="text-center">
        <h2 class="section__heading">¿Te gustaría trabajar conmigo?</h2>
        <p class="section__text">
          Si tienes alguna pregunta o quieres discutir un proyecto, ¡no dudes en
          ponerte en contacto!
        </p>
        <a
          @click="$router.push('/contactMe')"
          class="btn-contact mx-auto cursor-pointer"
          >Contáctame</a
        >
      </div>
      <networking />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount } from "vue";
import networking from "@/components/shared/networkingContact.vue";
import Section from "@/components/shared/Section.vue";
import TechStackSection from "@/components/shared/Tecnologies.vue";
import ExperienceWork from "@/components/shared/ExperienceWork.vue";
import { CardItems } from "@/data/data";
import ProjectCard, {
  ValueCardProject,
} from "@/components/shared/CardProyect.vue";

const options = [
  { label: "Tecnologias", id: "technologies" },
  { label: "Experiencia", id: "experience" },
  { label: "Proyectos", id: "projects" },
  { label: "Sobre mi", id: "about" },
  { label: "Contactame", id: "contact" },
];

const loading = ref(true);
const onImageLoad = () => {
  loading.value = false;
};

const imgClasses = computed(() => [
  "hero__image",
  loading.value ? "opacity-0" : "opacity-100",
]);

onBeforeMount(() => {
  const preload = (href: string, media?: string) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = href;
    link.fetchPriority = "high";
    if (media) link.media = media;
    document.head.appendChild(link);
  };
  preload("/img/imagen_mia_240.webp");
});

const proyects: ValueCardProject[] = [
  {
    title: "Mi Marketplace en .NET 8",
    description:
      "Marketplace minimalista desarrollado con .NET 8 y C# utilizando una arquitectura monolítica, donde el backend está dividido en dos aplicaciones: una para la autenticación y otra para la lógica del core del negocio. Ambas aplicaciones están desplegadas en Azure App Services y utilizan SQL Server como base de datos, lo que garantiza una gestión eficiente de los datos y un rendimiento robusto. El frontend está desarrollado en Next.js y desplegado en Netlify, ofreciendo una experiencia de usuario rápida y dinámica. La interfaz se ha estilizado con Tailwind CSS para lograr un diseño limpio y moderno.",
    images: [
      "/img/market/login.png",
      "/img/market/dashboard.png",
      "/img/market/products.png",
      "/img/market/car.png",
      "/img/market/order.png",
    ],
    technologies: [
      ".NET 8",
      "C#",
      "SQL Server",
      "Next.js",
      "Azure App Services",
      "Tailwind CSS",
    ],
    link: "https://marketplaceproject-net.netlify.app/auth/login",
  },
  {
    title: "PUC App (Plan Unico De Cuentas)",
    description:
      "Prueba de concepto (PUC) desarrollada con React y React Native, enfocada en validar la experiencia de usuario y la interfaz en plataformas web y móviles. El frontend web ha sido construido con React y la aplicación móvil con React Native, compartiendo lógica y estilos para mantener consistencia entre ambos entornos. La aplicación consume datos locales simulados, lo que permite probar funcionalidades clave sin necesidad de una conexión a servicios externos. La interfaz ha sido diseñada con Tailwind CSS, logrando un diseño moderno, limpio y adaptable, ideal para evaluar la usabilidad y el flujo de navegación en distintas plataformas.",
    images: [
      "/img/puc/pageWeb.png",
      "/img/puc/appMobil.jpg",
      "/img/puc/appMobil2.jpg",
    ],
    technologies: ["React", "React native"],
    link: "https://puc-app-mobile.netlify.app/",
  },
];

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
</script>

<style scoped lang="postcss">
.page {
  @apply bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100;
}
  .hero {
    @apply flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-700 to-teal-700 dark:from-blue-800 dark:to-teal-900 shadow-md dark:shadow-lg w-full px-4;
  }
.hero__inner {
  @apply w-full py-2 max-w-4xl mx-auto text-center flex flex-col justify-center items-center;
}
.hero__picture {
  @apply w-[350px] sm:w-[180px] md:w-[220px] lg:w-[260px] xl:w-[300px] 2xl:w-[340px] aspect-[12/13];
}
.hero__image {
  @apply rounded-xl w-full h-full object-cover border-4 border-white shadow-lg transition-opacity duration-500;
}
.hero__text {
  @apply mt-8 space-y-4;
}
.hero__title {
  @apply text-5xl md:text-6xl font-extrabold text-white drop-shadow-md;
}
  .hero__subtitle {
    @apply text-lg md:text-xl text-white dark:text-gray-200;
  }
  .btn-contact {
    @apply bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-full text-lg font-semibold transition duration-300;
  }
.section--tech {
  @apply py-12 bg-white dark:bg-gray-950 flex justify-center flex-row;
}
.section--experience {
  @apply py-2 bg-white dark:bg-gray-800 flex justify-center flex-row;
}
.section--projects {
  @apply py-20 bg-white dark:bg-gray-800 flex justify-center;
}
.section--about {
  @apply py-20 bg-gray-50 dark:bg-gray-900 flex justify-center;
}
.section--contact {
  @apply py-20 bg-gray-100 dark:bg-gray-900 flex flex-col justify-center;
}
.container {
  @apply max-w-6xl px-6 m-0;
}
.card-wrapper {
  @apply flex justify-center text-center mb-12;
}
.projects-grid {
  @apply flex flex-wrap gap-8 justify-center;
}
.project-wrapper {
  @apply w-full md:w-[500px] max-w-[500px] min-h-[550px];
}
.section__heading {
  @apply text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6;
}
.section__text {
  @apply text-lg text-gray-700 dark:text-gray-400 mb-8;
}
.loader {
  @apply w-12 h-12 rounded-full border-4 border-t-blue-500 border-gray-200 dark:border-gray-700 animate-spin;
}
</style>

<style lang="postcss">
html {
  scroll-behavior: smooth;
}
</style>
