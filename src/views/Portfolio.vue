<script setup lang="ts">
import ProjectCard from "@/components/shared/CardProyect.vue";
import { ValueCardProject } from "@/components/shared/CardProyect.vue";

const proyects: ValueCardProject[] = [
  // {
  //   title: "Mi Marketplace en .NET 8",
  //   description:
  //     "Marketplace minimalista desarrollado con **.NET 8** y **C#** utilizando una arquitectura monolítica, donde el backend está dividido en dos aplicaciones: una para la autenticación y otra para la lógica del core del negocio. Ambas aplicaciones están desplegadas en **Azure App Services** y utilizan **SQL Server** como base de datos, lo que garantiza una gestión eficiente de los datos y un rendimiento robusto. El frontend está desarrollado en **Next.js** y desplegado en **Netlify**, ofreciendo una experiencia de usuario rápida y dinámica. La interfaz se ha estilizado con **Tailwind CSS** para lograr un diseño limpio y moderno.",
  //   images: [
  //     "/img/market/login.png",
  //     "/img/market/dashboard.png",
  //     "/img/market/products.png",
  //     "/img/market/car.png",
  //     "/img/market/order.png",
  //   ],
  //   technologies: [
  //     ".NET 8",
  //     "C#",
  //     "SQL Server",
  //     "Next.js",
  //     "Azure App Services",
  //     "Tailwind CSS",
  //   ],
  //   link: "https://marketplaceproject-net.netlify.app/auth/login",
  // },
  {
    title: "PUC App (Plan Unico De Cuentas)",
    description:
      "Prueba de concepto (PUC) desarrollada con React y React Native, enfocada en validar la experiencia de usuario y la interfaz en plataformas web y móviles. El frontend web ha sido construido con React y la aplicación móvil con React Native, compartiendo lógica y estilos para mantener consistencia entre ambos entornos. La aplicación consume datos locales simulados, lo que permite probar funcionalidades clave sin necesidad de una conexión a servicios externos. La interfaz ha sido diseñada con Tailwind CSS, logrando un diseño moderno, limpio y adaptable, ideal para evaluar la usabilidad y el flujo de navegación en distintas plataformas.",
    images: [
      "/img/puc/pageWeb.png",
      "/img/puc/appMobil.jpg",
      "/img/puc/appMobil2.jpg",
    ],
    technologies: ["React", "React native"],
    link: "https://puc-app-mobile.netlify.app/",
  },
  
];
</script>

<template>
  <section
    class="h-auto mt-10 mb-10 p-5 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300"
  >
    <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-8">
      Portafolio
    </h1>
    <h2 class="sr-only">Proyectos</h2>
    <div class="flex flex-wrap gap-5 justify-center">
      <div
        v-for="(pro, index) in proyects"
        :key="index"
        class="w-full md:w-[500px] max-w-[500px] min-h-[550px] flex"
      >
        <ProjectCard
          :title="pro.title"
          :description="pro.description"
          :images="pro.images"
          :technologies="pro.technologies"
          :link="pro.link"
        />
      </div>
    </div>
  </section>
</template>
