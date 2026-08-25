<template>
  <main id="main-content" class="page" tabindex="-1">
    <HeroSection />

    <!--
      Casos y trayectoria, en un solo bloque.

      Eran dos secciones seguidas contando lo mismo: Alegra, Global e-Health y
      M&T aparecían con narrativa completa en `cases` y otra vez, casi con el
      mismo texto, en `experience`. Ahora el caso de estudio se queda con la
      historia y el timeline pasa a una línea por puesto que enlaza hacia él.

      El `id="experience"` vive dentro de ExperienceWork para que el enlace del
      menú y el scroll spy sigan funcionando sin cambios.
    -->
    <section id="cases" class="section section-alt">
      <CaseStudies />
      <BaseContainer>
        <ExperienceWork />
      </BaseContainer>
    </section>

    <!--
      Tech Stack retirado del recorrido (el componente y sus datos siguen ahí:
      para recuperarlo basta descomentar este bloque y su import).

      Duplicaba la sección Skills — las mismas tecnologías contadas dos veces —
      a cambio de ~1.600 px de scroll y 36 peticiones a cdn.simpleicons.org, un
      tercero del que dependía que la sección se viera completa. Skills dice lo
      mismo agrupado por competencia, que es lo que se contrata.
    -->
    <!-- <section id="technologies" class="section">
      <BaseContainer>
        <Tecnologies />
      </BaseContainer>
    </section> -->

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
        <ProjectsCoverflow />
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
import ProjectsCoverflow from "@/components/home/ProjectsCoverflow.vue";
import ContactSection from "@/components/home/ContactSection.vue";
import ExperienceWork from "@/components/home/ExperienceWork.vue";
import HeroSection from "@/components/home/HeroSection.vue";
import ProcessSection from "@/components/home/ProcessSection.vue";
import SkillsSection from "@/components/home/SkillsSection.vue";
import Testimonials from "@/components/home/Testimonials.vue";
import BaseContainer from "@/components/ui/BaseContainer.vue";
import SectionHeading from "@/components/ui/SectionHeading.vue";
// import Tecnologies from "@/components/shared/Tecnologies.vue";
import { t } from "@/i18n";
import { ui } from "@/i18n/ui";
import { CardItems } from "@/data/data";
import { testimonials } from "@/data/testimonials";

const aboutCards = CardItems;
</script>

<style scoped lang="postcss">
.page {
  @apply bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100;
}


.about-grid {
  @apply mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
}
</style>
