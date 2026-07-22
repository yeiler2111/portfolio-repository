/** Proyectos secundarios (personales/académicos). Campos de texto bilingües. */
export const projects = [
  {
    id: "ml-japanese-characters",
    title: {
      es: "Trabajo Final ML — Clasificación de caracteres japoneses",
      en: "Final ML Project — Japanese character classification",
    },
    description: {
      es: "Proyecto académico de Machine Learning centrado en la clasificación de caracteres japoneses (hiragana) a partir de imágenes 28x28 píxeles. El notebook principal desarrolla todo el flujo de análisis: desde la carga y limpieza de datos hasta la reducción de dimensionalidad con PCA y la evaluación de un modelo de Regresión Logística multinomial. El dataset contiene 10.000 registros de 10 clases distintas, con visualización de resultados mediante Plotly y seaborn.",
      en: "Academic Machine Learning project focused on classifying Japanese (hiragana) characters from 28x28 pixel images. The main notebook covers the full analysis pipeline: from data loading and cleaning to dimensionality reduction with PCA and evaluation of a multinomial Logistic Regression model. The dataset contains 10,000 records across 10 distinct classes, with results visualized using Plotly and seaborn.",
    },
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
    title: {
      es: "PUC App (Plan Único De Cuentas)",
      en: "PUC App (Chart of Accounts)",
    },
    description: {
      es: "Aplicación publicada en Google Play para consultar el Plan Único de Cuentas. Desarrollada con React (web) y React Native (móvil), compartiendo lógica y estilos para mantener consistencia entre ambos entornos. La interfaz, diseñada con Tailwind CSS, ofrece una experiencia moderna, limpia y adaptable en dispositivos móviles.",
      en: "App published on Google Play to browse Colombia's Chart of Accounts (PUC). Built with React (web) and React Native (mobile), sharing logic and styles to keep consistency across both environments. The interface, designed with Tailwind CSS, offers a modern, clean and adaptable experience on mobile devices.",
    },
    images: [
      "/img/puc/pageWeb.png",
      "/img/puc/appMobil.jpg",
      "/img/puc/appMobil2.jpg",
    ],
    technologies: ["React", "React Native", "Tailwind CSS", "Google Play"],
    link: "https://play.google.com/store/apps/details?id=com.yeiler2209.puc&hl=es_CO",
    featured: true,
  },
];
