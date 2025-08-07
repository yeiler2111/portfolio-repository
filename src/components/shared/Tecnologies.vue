<script setup>
const technologies = [
  { name: 'React', icon: ['fab', 'react'] },
  { name: 'Angular', icon: ['fab', 'angular'] },
  { name: 'Vue', icon: ['fab', 'vuejs'] },
  { name: 'NestJS', icon: ['fas', 'server'] },
  { name: 'Next.js', icon: ['fas', 'code'] },
  { name: 'Express', icon: ['fas', 'network-wired'] },
  { name: '.NET', icon: ['fas', 'laptop-code'] },
  { name: 'C#', icon: ['fas', 'code'] },
  { name: 'Git', icon: ['fab', 'git-alt'] },
  { name: 'Bootstrap', icon: ['fab', 'bootstrap'] },
  { name: 'Tailwind', icon: ['fas', 'wind'] },
  { name: 'Quasar', icon: ['fas', 'gem'] },
  { name: 'React Native', icon: ['fab', 'react'] }
]
</script>

<template>
  <section class=" dark:bg-gray-950 py-14 px-6">
    <div class="max-w-2xl mx-auto text-center">
      <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-10">
        Tecnologías que uso
      </h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        <div
          v-for="tech in technologies"
          :key="tech.name"
          class="bg-gray-100 dark:bg-gray-800 rounded-2xl shadow p-3 flex flex-col items-center justify-center hover:scale-105 transition-transform"
        >
          <font-awesome-icon :icon="tech.icon" class="text-4xl bg-gradient-to-r from-blue-500 to-teal-500 dark:from-blue-600 dark:to-teal-700 inline-block text-transparent bg-clip-text" />
          <span class="text-lg font-medium text-gray-700 dark:text-gray-200">
            {{ tech.name }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
