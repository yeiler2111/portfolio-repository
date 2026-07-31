<template>
  <main id="main-content" class="page" tabindex="-1">
    <HeroSection />

    <!-- Prueba primero: casos de estudio justo después del hero -->
    <section id="cases" class="section section-alt">
      <CaseStudies />
    </section>

    <section id="technologies" class="section">
      <BaseContainer>
        <Tecnologies />
      </BaseContainer>
    </section>

    <section id="experience" class="section section-alt">
      <ExperienceWork />
    </section>

    <SkillsSection />

    <section id="process" class="section section-alt">
      <ProcessSection />
    </section>

    <section id="projects" class="section">
      <BaseContainer>
        <SectionHeading
          :eyebrow="t(ui.projects.eyebrow)"
          :title="t(ui.projects.title)"
          :subtitle="t(ui.projects.subtitle)"
        />
        <div class="projects-grid">
          <ProjectCard
            v-for="(project, index) in projects"
            :key="project.id"
            v-reveal="index * 110"
            :title="t(project.title)"
            :description="t(project.description)"
            :images="project.images"
            :technologies="project.technologies"
            :link="project.link"
          />
        </div>
      </BaseContainer>
    </section>

    <!-- Se oculta automáticamente hasta que haya testimonios reales -->
    <section v-if="testimonials.length" id="testimonials" class="section section-alt">
      <Testimonials />
    </section>

    <section id="about" class="section">
      <BaseContainer>
        <SectionHeading
          :eyebrow="t(ui.about.eyebrow)"
          :title="t(ui.about.title)"
          :subtitle="t(ui.about.subtitle)"
        />
        <div class="about-grid">
          <AboutCard
            v-for="(item, key) in aboutCards"
            :key="key"
            v-reveal="key * 90"
            :card="item"
          />
        </div>
      </BaseContainer>
    </section>

    <ContactSection />
  </main>
</template>

<script setup lang="ts">
import AboutCard from "@/components/home/Section.vue";
import CaseStudies from "@/components/home/CaseStudies.vue";
import ProjectCard from "@/components/home/CardProyect.vue";
import ContactSection from "@/components/home/ContactSection.vue";
import ExperienceWork from "@/components/home/ExperienceWork.vue";
import HeroSection from "@/components/home/HeroSection.vue";
import ProcessSection from "@/components/home/ProcessSection.vue";
import SkillsSection from "@/components/home/SkillsSection.vue";
import Testimonials from "@/components/home/Testimonials.vue";
import BaseContainer from "@/components/ui/BaseContainer.vue";
import SectionHeading from "@/components/ui/SectionHeading.vue";
import Tecnologies from "@/components/shared/Tecnologies.vue";
import { t } from "@/i18n";
import { ui } from "@/i18n/ui";
import { CardItems } from "@/data/data";
import { projects } from "@/data/projects";
import { testimonials } from "@/data/testimonials";

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
