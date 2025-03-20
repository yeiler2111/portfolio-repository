<script setup lang='ts'>
const linkedin = process.env.VUE_APP_LOCATION_LINKEDINK;
const numberPhone = process.env.VUE_APP_NUMBER_PHONE;
const urlGit =process.env.VUE_APP_LOCATION_GIT;
const gmail = process.env.VUE_APP_LOCATION_GMAIL;
</script>


<template>
  <div class="mt-8 text-center">
    <h3 class="text-xl text-gray-800 dark:text-white mb-4">Conéctame en</h3>
    <div class="flex justify-center space-x-6">
      <!-- WhatsApp -->
      <a
        :href="`https://wa.me/+${numberPhone}`"
        target="_blank"
        rel="noopener noreferrer"
        class="text-2xl text-green-500 hover:text-green-600"
      >
        <i class="fab fa-whatsapp"></i>
      </a>

      <a
        :href="linkedin"
        target="_blank"
        rel="noopener noreferrer"
        class="text-2xl text-blue-600 hover:text-blue-700"
      >
        <i class="fab fa-linkedin"></i>
      </a>

      <a
        :href="urlGit"
        target="_blank"
        rel="noopener noreferrer"
        class="text-2xl text-gray-800 hover:text-gray-900"
      >
        <i class="fab fa-github"></i>
      </a>
      <a
        :href="`maito:${gmail}`"
        target="_blank"
        class="text-2xl text-red-600 hover:text-red-700"
      >
        <i class="fas fa-envelope"></i>
      </a>
    </div>
  </div>
</template>
