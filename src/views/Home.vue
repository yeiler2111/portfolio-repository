<template>
  <main class="page">
    <HeroSection />

    <SkillsSection />

    <section id="technologies" class="section section-alt">
      <BaseContainer>
        <Tecnologies />
      </BaseContainer>
    </section>

    <section id="experience" class="section">
      <ExperienceWork />
    </section>

    <section id="projects" class="section section-alt">
      <BaseContainer>
        <SectionHeading
          eyebrow="Portafolio"
          title="Proyectos destacados"
          subtitle="Una selección de proyectos donde aplico buenas prácticas y tecnologías modernas."
        />
        <div class="projects-grid">
          <ProjectCard
            v-for="project in projects"
            :key="project.id"
            :title="project.title"
            :description="project.description"
            :images="project.images"
            :technologies="project.technologies"
            :link="project.link"
          />
        </div>
      </BaseContainer>
    </section>

    <section id="about" class="section">
      <BaseContainer>
        <SectionHeading
          eyebrow="Sobre mí"
          title="Un poco más sobre mi trayectoria"
          subtitle="Conoce mi enfoque, mi filosofía y lo que me impulsa como desarrollador."
        />
        <div class="about-grid">
          <AboutCard v-for="(item, key) in aboutCards" :key="key" :card="item" />
        </div>
      </BaseContainer>
    </section>

    <ContactSection />
  </main>
</template>

<script setup lang="ts">
import AboutCard from "@/components/home/Section.vue";
import ProjectCard from "@/components/home/CardProyect.vue";
import ContactSection from "@/components/home/ContactSection.vue";
import ExperienceWork from "@/components/home/ExperienceWork.vue";
import HeroSection from "@/components/home/HeroSection.vue";
import SkillsSection from "@/components/home/SkillsSection.vue";
import BaseContainer from "@/components/ui/BaseContainer.vue";
import SectionHeading from "@/components/ui/SectionHeading.vue";
import Tecnologies from "@/components/shared/Tecnologies.vue";
import { CardItems } from "@/data/data";
import { projects } from "@/data/projects";

const aboutCards = CardItems;
</script>

<style scoped lang="postcss">
.page {
  @apply bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100;
}

.projects-grid {
  @apply mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8;
}

.about-grid {
  @apply mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
}
</style>
