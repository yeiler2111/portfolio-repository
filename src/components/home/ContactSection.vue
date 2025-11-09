<template>
  <section
    id="contact"
    class="section section-alt py-24 px-6 relative overflow-hidden"
  >
    
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl"
      ></div>
    </div>

    <div class="container-custom max-w-4xl mx-auto text-center relative z-10">
      
      <h2
        class="heading-2 text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
      >
        ¿Listo para dar vida a tu próximo proyecto?
      </h2>
      <p
        class="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
      >
        Si tienes una idea en mente o necesitas ayuda con tu proyecto, me
        encantaría escucharte. Trabajemos juntos para crear algo increíble.
      </p>

      
      <div
        class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
      >
        <button
          @click="$router.push('/contactme')"
          class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-600 dark:to-indigo-600 dark:hover:from-blue-700 dark:hover:to-indigo-700 text-white text-base font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <Mail :size="20" />
          Enviar mensaje
        </button>

        <a
          href="mailto:yeiler2209@gmail.com"
          class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-gray-500 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-500 text-gray-700 dark:text-dark-300 hover:text-blue-600 dark:hover:text-blue-400 text-base font-semibold rounded-xl transition-all transform hover:-translate-y-1"
        >
          <Send :size="20" />
          Email directo
        </a>
      </div>

      <div class="relative mb-12">
        <div class="absolute inset-0 flex items-center">
          <div
            class="w-full border-t border-gray-300 dark:border-gray-700"
          ></div>
        </div>
        <div class="relative flex justify-center">
          <span
            class="px-4   text-sm text-gray-500 dark:text-gray-400 dark:bg-gray-900"
          >
            O conéctate conmigo en
          </span>
        </div>
      </div>

      
      <div class="flex justify-center">
        <Networking />
      </div>

      
      <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        <ContactFeature
          :icon="Clock"
          title="Respuesta rápida"
          description="Respondo en menos de 24 horas"
          color="blue"
        />
        <ContactFeature
          :icon="CheckCircle2"
          title="Consulta gratuita"
          description="Primera reunión sin compromiso"
          color="green"
        />
        <ContactFeature
          :icon="Users"
          title="Colaboración flexible"
          description="Freelance o tiempo completo"
          color="purple"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Networking from "@/components/home/networkingContact.vue";
import { CheckCircle2, Clock, Mail, Send, Users } from "lucide-vue-next";
import ContactFeature from "./ContactFeature.vue";
</script>

<style scoped lang="postcss">
.section {
  @apply py-20 lg:py-24;
}

.section-alt {
  @apply bg-white dark:bg-gray-900;
}
</style>
