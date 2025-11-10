<template>
  <div class="page">
    <HeroSection
      :navigation-options="navigationOptions"
      @navigate="scrollToSection"
    />

    <section id="technologies" class="section section-alt">
      <div class="container-wide">
        <Tecnologies />
      </div>
    </section>

    <section id="experience" class="section">
      <div>
        <ExperienceWork />
      </div>
    </section>

    <section id="projects" class="section section-alt py-20 px-6  dark:bg-gray-900">
      <div class="container-wide">
        <SectionHeader
          title="Proyectos destacados"
          subtitle="Explora algunos de los proyectos en los que he trabajado, aplicando las mejores prácticas y tecnologías modernas"
        />

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProjectCard
            v-for="project in projects"
            :key="project.id"
            v-bind="project"
          />
        </div>
      </div>
    </section>

    <section id="about" class="section py-20 px-6">
      <div class="container-wide">
        <SectionHeader
          title="Sobre mí"
          subtitle="Conoce más sobre mi trayectoria, habilidades y pasión por el desarrollo"
        />

        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10"
        >
          <Section
            v-for="(item, key) in aboutCards"
            :key="key"
            :card="item"
            class="p-8 rounded-2xl bg-white/60 dark:bg-gray-800/50 shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700 leading-relaxed text-gray-700 dark:text-gray-300 tracking-wide transform hover:-translate-y-1 hover:scale-105 transition-all duration-300"
          />
        </div>
      </div>
    </section>

    <ContactSection />
  </div>
</template>

<script setup lang="ts">
import ProjectCard from "@/components/home/CardProyect.vue";
import ContactSection from "@/components/home/ContactSection.vue";
import ExperienceWork from "@/components/home/ExperienceWork.vue";
import HeroSection from "@/components/home/HeroSection.vue";
import Section from "@/components/home/Section.vue";
import SectionHeader from "@/components/home/SectionHeader.vue";
import Tecnologies from "@/components/shared/Tecnologies.vue";
import { CardItems } from "@/data/data";
import type { NavigationOption, Project } from "@/utils/types";

const navigationOptions: NavigationOption[] = [
  { id: "technologies", label: "Tecnologías" },
  { id: "experience", label: "Experiencia" },
  { id: "projects", label: "Proyectos" },
  { id: "about", label: "Sobre mí" },
];

const aboutCards = CardItems;

const projects: Project[] = [
  {
    id: "ml-japanese-characters",
    title: "Trabajo Final ML — Clasificación de caracteres japoneses",
    description:
      "Proyecto académico de **Machine Learning** centrado en la clasificación de caracteres japoneses (hiragana) a partir de imágenes 28x28 píxeles. El notebook principal desarrolla todo el flujo de análisis: desde la carga y limpieza de datos hasta la reducción de dimensionalidad con PCA y la evaluación de un modelo de Regresión Logística multinomial. El dataset contiene 10.000 registros de 10 clases distintas. El modelo final alcanza un accuracy aproximado del 63.5%, con visualización de resultados mediante gráficos de Plotly y seaborn.",
    images: [
      "/img/ml/caracteres_dataset.png",
      "/img/ml/matriz_confusion.png",
      "/img/ml/correlacion_pca.png",
    ],
    technologies: [
      "Python 3.12",
      "scikit-learn",
      "pandas",
      "numpy",
      "matplotlib",
      "seaborn",
      "plotly",
      "scipy",
      "Jupyter Notebook",
    ],
    link: "https://github.com/yeiler2111/classificationHiraganaCharacters",
    featured: true,
  },
  {
    id: "puc-app",
    title: "PUC App (Plan Único De Cuentas)",
    description:
      "Prueba de concepto (PUC) desarrollada con React y React Native, enfocada en validar la experiencia de usuario y la interfaz en plataformas web y móviles. El frontend web ha sido construido con React y la aplicación móvil con React Native, compartiendo lógica y estilos para mantener consistencia entre ambos entornos. La aplicación consume datos locales simulados, lo que permite probar funcionalidades clave sin necesidad de una conexión a servicios externos. La interfaz ha sido diseñada con Tailwind CSS, logrando un diseño moderno, limpio y adaptable.",
    images: [
      "/img/puc/pageWeb.png",
      "/img/puc/appMobil.jpg",
      "/img/puc/appMobil2.jpg",
    ],
    technologies: ["React", "React Native", "Tailwind CSS"],
    link: "https://puc-app-mobile.netlify.app/",
    featured: true,
  },
];

const scrollToSection = (id: string): void => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
</script>

<style scoped lang="postcss">
.page {
  @apply bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 transition-colors duration-300;
}

.section {
  @apply py-14 lg:py-10;
}

.section-alt {
  @apply bg-white dark:bg-gray-900;
}

.container-wide {
  @apply max-w-7xl mx-auto px-6;
}

.container-narrow {
  @apply max-w-7xl;
}

.container-custom {
  @apply max-w-6xl mx-auto px-6;
}
</style>
