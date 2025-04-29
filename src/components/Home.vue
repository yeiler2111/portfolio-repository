<script setup>
import networking from "@/components/shared/networkingContact.vue";
import Section from "@/components/shared/Section.vue";
import { CardItems } from "@/data/data";
import TechStackSection from "@/components/shared/Tecnologies.vue";
import { ref } from "vue";

const loading = ref(true);

const onImageLoad = () => {
  loading.value = false;
};
</script>

<template>
  <div class="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
    <section
      class="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 dark:from-blue-600 dark:to-teal-700 shadow-md dark:shadow-lg w-full"
    >
      <div
        class="text-center px-4 flex flex-col md:flex-col justify-center items-center"
      >
        <div v-if="loading" class="loader"></div>

        <!-- Imagen (siempre renderizada, pero invisible hasta que cargue) -->
        <img
          :src="'/img/imagen_mia.jpg'"
          alt="Yeiler Simons"
          @load="onImageLoad"
          :class="[
            'rounded-lg w-60 h-65 object-cover border-4 border-white shadow-lg transition-opacity duration-500',
            loading ? 'opacity-0' : 'opacity-100',
          ]"
        />
        <div class="md:ml-0">
          <h1
            class="text-4xl md:text-5xl font-bold text-white mb-4 animate__animated animate__fadeIn"
          >
            Hola, soy Yeiler Simons
          </h1>
          <p
            class="text-lg md:text-xl text-gray-100 dark:text-gray-300 mb-8 animate__animated animate__fadeIn animate__delay-1s"
          >
            Desarrollador web | Apasionado por la tecnología y el diseño
          </p>
          <a
            href="#about"
            class="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-900 py-2 px-5 rounded-full text-lg font-semibold hover:bg-gray-200 transition-all duration-300"
          >
            Conoce más sobre mí
          </a>
        </div>
      </div>
    </section>

    <section class="bg-gray-100 dark:bg-gray-900">
      <TechStackSection />
    </section>

    <section id="about" class="py-20 bg-gray-100 dark:bg-gray-900">
      <div class="max-w-6xl mx-auto px-6">
        <div
          v-for="(item, index) in CardItems"
          :key="index"
          class="flex justify-center text-center mb-12"
        >
          <Section :card="item" />
        </div>
      </div>
    </section>

    <section class="py-20 bg-gray-50 dark:bg-gray-950">
      <div class="max-w-6xl mx-auto px-6 text-center">
        <h2
          class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6"
        >
          ¿Te gustaría trabajar conmigo?
        </h2>
        <p class="text-lg text-gray-700 dark:text-gray-400 mb-8">
          Si tienes alguna pregunta o quieres discutir un proyecto, ¡no dudes en
          ponerte en contacto!
        </p>
        <a
          @click="$router.push({ path: '/contactMe' })"
          class="bg-blue-500 text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-blue-600 dark:hover:bg-blue-400 transition-all duration-300 cursor-pointer"
        >
          Contáctame
        </a>
      </div>
      <networking />
    </section>
  </div>
</template>

<style lang="css" scoped>
.loader {
  width: 50px;
  padding: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #09322c;
  --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: l3 1s infinite linear;
}
@keyframes l3 {
  to {
    transform: rotate(1turn);
  }
}
</style>
>
