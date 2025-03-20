<script setup>
import networking from "@/components/shared/networkingContact.vue";
import Section from "@/components/shared/Section.vue";
import {CardItems} from "@/data/data"
console.log(CardItems)
</script>

<template>
  <div class="bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100">
    <section
      class="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 dark:from-blue-600 dark:to-teal-700 shadow-md dark:shadow-lg w-full"
    >
      <div class="text-center px-4">
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
          class="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-400 py-2 px-5 rounded-full text-lg font-semibold hover:bg-gray-200 transition-all duration-300"
        >
          Conoce más sobre mí
        </a>
      </div>
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
          ¿Quieres trabajar conmigo?
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
