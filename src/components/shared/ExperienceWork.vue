<template>
  <section class="dark:bg-gray-950 py-14 px-6">
    <div class="max-w-2xl mx-auto text-center">
      <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-10">
        Mi Experiencia Laboral
      </h2>

      <q-card class="q-pa-lg shadow-3 dark:bg-gray-950 text-gray-800 dark:text-gray-100">
        <q-card-section>
          <q-timeline color="primary" layout="dense">
            <q-timeline-entry
              v-for="(job, index) in jobs"
              :key="index"
              :title="job.title"
              :subtitle="job.company"
              :icon="job.icon"
            >
              <div class="text-caption text-gray-600 dark:text-gray-400">
                {{ job.period }}
              </div>

              <div class="q-mt-sm row q-col-gutter-sm flex justify-center">
                <q-btn
                  size="sm"
                  color="primary"
                  flat
                  :label="expanded === index ? 'Ocultar descripción' : 'Ver descripción'"
                  @click="toggleDetails(index)"
                />
                <q-btn
                  size="sm"
                  color="secondary"
                  flat
                  label="Visitar sitio"
                  :href="job.link"
                  target="_blank"
                  icon="language"
                />
              </div>

              <q-slide-transition>
                <div v-show="expanded === index" class="q-mt-sm text-gray-700 dark:text-gray-300">
                  {{ job.description }}
                </div>
              </q-slide-transition>
            </q-timeline-entry>
          </q-timeline>
        </q-card-section>
      </q-card>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const expanded = ref(null);

const toggleDetails = (index) => {
  expanded.value = expanded.value === index ? null : index;
};

const jobs = [
  {
    title: "Desarrollador Frontend & Soporte",
    company: "Global e-Health",
    icon: "medical_services",
    period: "1 año y 3 meses (actualmente apoyo como freelance)",
    description:
      "Brindé soporte técnico de nivel 1, 2 y 3, además de desarrollar interfaces con Vue 2 y Bootstrap-Vue. Implementé soluciones para servicios de telemedicina, mejorando la experiencia de usuario en plataformas críticas. Actualmente colaboro de forma puntual como freelance en tareas especializadas.",
    link: "https://www.globale-health.com",
  },
  {
    title: "Desarrollador Fullstack Freelance",
    company: "Unicero Digital",
    icon: "code",
    period: "3 a 4 meses",
    description:
      "Realicé desarrollos como freelance sin contrato formal, incluyendo sistemas de autenticación, landing pages y servicios backend. Trabajé con Python, Angular, Java y .NET. También gestioné versiones y despliegues usando Git.",
    link: "https://www.unoycerodigital.com.co/",
  },
  {
    title: "Desarrollador Fullstack",
    company: "M&T Consulting",
    icon: "engineering",
    period: "6 a 7 meses",
    description:
      "Desarrollé soluciones tanto en frontend como backend utilizando Vue 3, React y NestJS. Participé en el desarrollo de plataformas empresariales e integraciones con APIs externas.",
    link: "https://mitconsulting.com.co/",
  },
  {
    title: "Freelance Fullstack Developer",
    company: "Fryends",
    icon: "work",
    period: "3 meses (actual)",
    description:
      "Trabajo como freelance en una empresa de desarrollo de software. Desarrollo interfaces avanzadas con React y Remix, implemento backends con NestJS y realizo integraciones con servicios como Google Cloud Buckets.",
    link: "https://fryends.com.co/#",
  },
];
</script>
