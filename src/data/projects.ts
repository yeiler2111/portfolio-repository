import type { Project } from "@/utils/types";

export const projects: Project[] = [
  {
    id: "ml-japanese-characters",
    title: "Trabajo Final ML — Clasificación de caracteres japoneses",
    description:
      "Proyecto académico de Machine Learning centrado en la clasificación de caracteres japoneses (hiragana) a partir de imágenes 28x28 píxeles. El notebook principal desarrolla todo el flujo de análisis: desde la carga y limpieza de datos hasta la reducción de dimensionalidad con PCA y la evaluación de un modelo de Regresión Logística multinomial. El dataset contiene 10.000 registros de 10 clases distintas. El modelo final alcanza un accuracy aproximado del 63.5%, con visualización de resultados mediante gráficos de Plotly y seaborn.",
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
    link: "https://github.com/yeiler2111/classificationHiraganaCharacters",
    featured: true,
  },
  {
    id: "puc-app",
    title: "PUC App (Plan Único De Cuentas)",
    description:
      "Prueba de concepto (PUC) desarrollada con React y React Native, enfocada en validar la experiencia de usuario y la interfaz en plataformas web y móviles. El frontend web ha sido construido con React y la aplicación móvil con React Native, compartiendo lógica y estilos para mantener consistencia entre ambos entornos. La aplicación consume datos locales simulados, lo que permite probar funcionalidades clave sin necesidad de una conexión a servicios externos. La interfaz ha sido diseñada con Tailwind CSS, logrando un diseño moderno, limpio y adaptable.",
    images: [
      "/img/puc/pageWeb.png",
      "/img/puc/appMobil.jpg",
      "/img/puc/appMobil2.jpg",
    ],
    technologies: ["React", "React Native", "Tailwind CSS"],
    link: "https://puc-app-mobile.netlify.app/",
    featured: true,
  },
];
