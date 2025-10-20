<script setup lang="ts">
import ProjectCard from "@/components/shared/CardProyect.vue";
import { ValueCardProject } from "@/components/shared/CardProyect.vue";

const proyects: ValueCardProject[] = [
  {
    title: "Trabajo Final ML — Clasificación de caracteres japoneses",
    description:
      "Proyecto académico de **Machine Learning** centrado en la clasificación de caracteres japoneses (hiragana) a partir de imágenes 28x28 píxeles. El notebook principal (`TrabajoFinalML.ipynb`) desarrolla todo el flujo de análisis: desde la carga y limpieza de datos hasta la reducción de dimensionalidad con PCA y la evaluación de un modelo de Regresión Logística multinomial. El dataset contiene 10.000 registros de 10 clases distintas y permite estudiar la varianza explicada por los componentes principales. El modelo final alcanza un accuracy aproximado del 63.5%, con visualización de resultados mediante gráficos de Plotly y seaborn. El proyecto fue desarrollado en un entorno virtual de Python 3.12 sobre Linux, empleando bibliotecas como scikit-learn, pandas, numpy, matplotlib y scipy.",
    images: [
      "/img/ml/caracteres_dataset.png",
      "/img/ml/matriz_confusion.png",
      "/img/ml/correlacion_pca.png",
    ],
    technologies: [
      "Python 3.12",
      "scikit-learn",
      "pandas",
      "numpy",
      "matplotlib",
      "seaborn",
      "plotly",
      "scipy",
      "Jupyter Notebook",
    ],
    link: "https://github.com/yeiler2111/TrabajoFinalML",
  },
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
