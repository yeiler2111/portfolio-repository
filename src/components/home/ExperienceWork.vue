<template>
  <section class="dark:bg-gray-950">
    <div class="mx-auto">
      <q-card
        flat
        bordered
        class="q-pa-md shadow-sm dark:bg-gray-900 dark:border-gray-800"
      >
        <h2
          class="text-3xl font-bold text-gray-800 dark:text-white mb-12 text-center"
        >
          Mi Experiencia Laboral
        </h2>
        <q-card-section class="q-pa-lg">
          <q-timeline color="primary" layout="comfortable" side="right">
            <q-timeline-entry
              v-for="(job, index) in jobs"
              :key="index"
              :icon="job.icon"
              color="primary"
            >
              <template v-slot:title>
                <div class="text-h6 text-gray-900 dark:text-white q-mb-xs">
                  {{ job.title }}
                </div>
              </template>

              <template v-slot:subtitle>
                <div class="text-subtitle2 text-primary q-mb-xs">
                  {{ job.company }}
                </div>
                <div class="text-caption text-gray-500 dark:text-gray-400">
                  <q-icon name="schedule" size="14px" class="q-mr-xs" />
                  {{ job.period }}
                </div>
              </template>

              <div class="q-mt-md">
                <div class="row q-gutter-sm">
                  <q-btn
                    unelevated
                    rounded
                    size="sm"
                    color="primary"
                    :label="
                      expanded === index
                        ? 'Ocultar descripción'
                        : 'Ver descripción'
                    "
                    :icon="expanded === index ? 'expand_less' : 'expand_more'"
                    @click="toggleDetails(index)"
                  />
                  <q-btn
                    outline
                    rounded
                    size="sm"
                    color="primary"
                    label="Visitar sitio"
                    :href="job.link"
                    target="_blank"
                    icon-right="open_in_new"
                  />
                </div>

                <q-slide-transition>
                  <q-card
                    v-show="expanded === index"
                    flat
                    class="q-mt-md q-pa-md dark:bg-gray-900"
                  >
                    <div class="text-body2 line-height-relaxed">
                      {{ job.description }}
                    </div>
                  </q-card>
                </q-slide-transition>
              </div>
            </q-timeline-entry>
          </q-timeline>
        </q-card-section>
      </q-card>
    </div>
  </section>
</template>

<script setup>
import { jobs } from "@/data/data";
import { ref } from "vue";

const expanded = ref(null);

const toggleDetails = (index) => {
  expanded.value = expanded.value === index ? null : index;
};
</script>

<style scoped>
.line-height-relaxed {
  line-height: 1.7;
}

</style>
