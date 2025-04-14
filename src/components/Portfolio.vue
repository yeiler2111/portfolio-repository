<script setup lang="ts">
import ProjectCard  from "@/components/shared/CardProyect.vue";
import { ValueCardProject } from "@/components/shared/CardProyect.vue";

const proyects: ValueCardProject[] = [
  {
    title: "Mi Marketplace en .NET 8",
    description:
      "Marketplace minimalista desarrollado con **.NET 8** y **C#** utilizando una arquitectura monolítica, donde el backend está dividido en dos aplicaciones: una para la autenticación y otra para la lógica del core del negocio. Ambas aplicaciones están desplegadas en **Azure App Services** y utilizan **SQL Server** como base de datos, lo que garantiza una gestión eficiente de los datos y un rendimiento robusto. El frontend está desarrollado en **Next.js** y desplegado en **Netlify**, ofreciendo una experiencia de usuario rápida y dinámica. La interfaz se ha estilizado con **Tailwind CSS** para lograr un diseño limpio y moderno.",
    images: [
      "/img/login.png", 
      "/img/dashboard.png", 
      "/img/products.png",
      "/img/car.png",
      "/img/order.png"
    ],
    technologies: [
      ".NET 8",
      "C#",
      "SQL Server",
      "Next.js",
      "Azure App Services",
      "Tailwind CSS"
    ],
    link: "https://marketplaceproject-net.netlify.app/auth/login",
  },
];
</script>

<template>
  <section class="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
    <div v-for="(pro, index) in proyects" :key="index">
      <ProjectCard
        :title="pro.title"
        :description="pro.description"
        :images="pro.images"
        :technologies="pro.technologies"
        :link="pro.link"
      />
    </div>
  </section>
</template>

