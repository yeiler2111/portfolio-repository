<script setup>
const technologies = [
  { name: "React", icon: "fab fa-react" },
  { name: "Angular", icon: "fab fa-angular" },
  { name: "Vue", icon: "fab fa-vuejs" },
  { name: "NestJS", icon: "fas fa-server" },
  { name: "Next.js", icon: "fas fa-code" },
  { name: "Express", icon: "fas fa-network-wired" },
  { name: ".NET", icon: "fas fa-laptop-code" },
  { name: "C#", icon: "fas fa-code" },
  { name: "Git", icon: "fab fa-git-alt" },
  { name: "Bootstrap", icon: "fab fa-bootstrap" },
  { name: "Tailwind", icon: "fas fa-wind" },
  { name: "Quasar", icon: "fas fa-gem" },
  { name: "React Native", icon: "fab fa-react" },
];
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
          <i :class="tech.icon" class="text-4xl text-indigo-500 mb-3"></i>
          <span class="text-lg font-medium text-gray-700 dark:text-gray-200">
            {{ tech.name }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
