<template>
  <section class="tech-section">
    <div class="tech-container">
      <div class="section-header">
        <div class="header-badge">
          <svg viewBox="0 0 24 24" fill="none" class="badge-icon">
            <path
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
              fill="currentColor"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
          <span>Tech Stack</span>
        </div>
        <h2 class="heading-2">Tecnologías & Herramientas</h2>
        <p class="section-description">
          Stack completo con el que desarrollo soluciones modernas y escalables
        </p>
      </div>

      <div class="tech-category">
        <div class="category-header">
          <div class="category-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" class="category-icon">
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="2"
                stroke="currentColor"
                stroke-width="2"
              />
              <path d="M9 9h6v6H9z" stroke="currentColor" stroke-width="2" />
            </svg>
          </div>
          <h3 class="category-title">Frontend</h3>
          <span class="category-count">{{ frontendTechs.length }}</span>
        </div>
        <div class="tech-grid">
          <div
            v-for="tech in frontendTechs"
            :key="tech.name"
            class="tech-card flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 shadow-sm hover:scale-105 transition-transform"
          >
            <img
              class="tech-icon-container w-8 h-8 mb-3"
              :src="tech.icon"
              :alt="tech.name"
              loading="lazy"
            />
            <span
              class="tech-name text-sm font-semibold text-gray-700 dark:text-gray-200"
            >
              {{ tech.name }}
            </span>
          </div>
        </div>
      </div>

      <div class="tech-category">
        <div class="category-header">
          <div class="category-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" class="category-icon">
              <rect
                x="2"
                y="6"
                width="20"
                height="12"
                rx="2"
                stroke="currentColor"
                stroke-width="2"
              />
              <circle cx="6" cy="12" r="1" fill="currentColor" />
              <circle cx="10" cy="12" r="1" fill="currentColor" />
            </svg>
          </div>
          <h3 class="category-title">Backend</h3>
          <span class="category-count">{{ backendTechs.length }}</span>
        </div>
        <div class="tech-grid">
          <div
            v-for="tech in backendTechs"
            :key="tech.name"
            class="tech-card flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 shadow-sm hover:scale-105 transition-transform"
          >
            <img
              class="tech-icon-container w-8 h-8 mb-3"
              :src="tech.icon"
              :alt="tech.name"
              loading="lazy"
            />
            <span
              class="tech-name text-sm font-semibold text-gray-700 dark:text-gray-200"
            >
              {{ tech.name }}
            </span>
          </div>
        </div>
      </div>

      <div class="tech-category">
        <div class="category-header">
          <div class="category-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" class="category-icon">
              <rect
                x="6"
                y="2"
                width="12"
                height="20"
                rx="2"
                stroke="currentColor"
                stroke-width="2"
              />
              <path
                d="M10 19h4"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <h3 class="category-title">Mobile</h3>
          <span class="category-count">{{ mobileTechs.length }}</span>
        </div>

        <div class="tech-grid">
          <div
            v-for="tech in mobileTechs"
            :key="tech.name"
            class="tech-card group"
          >
            <img
              class="tech-icon-container w-8 h-8 mb-3"
              :src="tech.icon"
              :alt="tech.name"
              loading="lazy"
            />
            <span class="tech-name">{{ tech.name }}</span>
          </div>
        </div>
      </div>

      <div class="tech-category">
        <div class="category-header">
          <div class="category-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" class="category-icon">
              <path
                d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <h3 class="category-title">Cloud & DevOps</h3>
          <span class="category-count">{{ cloudTechs.length }}</span>
        </div>

        <div class="tech-grid">
          <div
            v-for="tech in cloudTechs"
            :key="tech.name"
            class="tech-card group"
          >
            <img
              class="tech-icon-container w-8 h-8 mb-3"
              :src="tech.icon"
              :alt="tech.name"
              loading="lazy"
            />
            <span class="tech-name">{{ tech.name }}</span>
          </div>
        </div>
      </div>

      <div class="tech-category">
        <div class="category-header">
          <div class="category-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" class="category-icon">
              <ellipse
                cx="12"
                cy="5"
                rx="9"
                ry="3"
                stroke="currentColor"
                stroke-width="2"
              />
              <path
                d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"
                stroke="currentColor"
                stroke-width="2"
              />
              <path
                d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"
                stroke="currentColor"
                stroke-width="2"
              />
            </svg>
          </div>
          <h3 class="category-title">Bases de Datos y Caché</h3>
          <span class="category-count">{{ databaseTechs.length }}</span>
        </div>

        <div class="tech-grid">
          <div
            v-for="tech in databaseTechs"
            :key="tech.name"
            class="tech-card group"
          >
            <img
              class="tech-icon-container w-8 h-8 mb-3"
              :src="tech.icon"
              :alt="tech.name"
              loading="lazy"
            />
            <span class="tech-name">{{ tech.name }}</span>
          </div>
        </div>
      </div>

      <div class="tech-category">
        <div class="category-header">
          <div class="category-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" class="category-icon">
              <path
                d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <h3 class="category-title">Tools & Others</h3>
          <span class="category-count">{{ toolsTechs.length }}</span>
        </div>

        <div class="tech-grid">
          <div
            v-for="tech in toolsTechs"
            :key="tech.name"
            class="tech-card group"
          >
            <img
              class="tech-icon-container w-8 h-8 mb-3"
              :src="tech.icon"
              :alt="tech.name"
              loading="lazy"
            />
            <span class="tech-name">{{ tech.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  backendTechs,
  cloudTechs,
  databaseTechs,
  frontendTechs,
  mobileTechs,
  toolsTechs,
} from "@/data/data";
</script>

<style scoped>
.tech-section {
  @apply py-20 bg-gradient-to-b from-white to-gray-50
         dark:from-gray-950 dark:to-gray-900
         transition-colors duration-300;
}

.tech-container {
  @apply max-w-7xl mx-auto px-6 space-y-16;
}

.section-header {
  @apply text-center space-y-4;
}

.header-badge {
  @apply inline-flex items-center gap-2
         bg-primary-50 dark:bg-primary-900/30
         border border-primary-200 dark:border-primary-800
         px-5 py-2.5 rounded-full
         text-primary-700 dark:text-primary-300
         font-semibold text-sm
         animate-fade-in;
}

.badge-icon {
  @apply w-4 h-4;
}

.section-description {
  @apply text-lg text-gray-600 dark:text-gray-400
         max-w-3xl mx-auto leading-relaxed;
}

.tech-category {
  @apply space-y-3;
}

.category-header {
  @apply flex items-center gap-3
         pb-4 border-b-2 border-gray-200 dark:border-gray-800;
}

.category-icon-wrapper {
  @apply w-10 h-10 rounded-xl
         bg-gradient-to-br from-primary-500 to-secondary-500
         flex items-center justify-center
         shadow-lg;
}

.category-icon {
  @apply w-5 h-5 text-white;
}

.category-title {
  @apply text-xl font-bold text-gray-900 dark:text-white
         flex-1;
}

.category-count {
  @apply px-3 py-1 rounded-full text-sm font-semibold
         bg-gray-100 dark:bg-gray-800
         text-gray-600 dark:text-gray-400;
}

.tech-grid {
  @apply grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5
         gap-4;
}

.tech-card {
  @apply relative
         bg-white dark:bg-gray-900
         border-2 border-gray-200 dark:border-gray-800
         rounded-2xl p-6
         flex flex-col items-center justify-center gap-3
         transition-all duration-300
         cursor-default
         hover:-translate-y-2 hover:shadow-xl
         hover:border-primary-400 dark:hover:border-primary-600;
}

.tech-icon-container {
  @apply w-16 h-16 flex items-center justify-center
         transition-transform duration-300;
}

.tech-icon-container :deep(svg) {
  @apply w-full h-full;
}

.group:hover .tech-icon-container {
  @apply scale-110;
}

.tech-name {
  @apply text-sm font-semibold text-center
         text-gray-700 dark:text-gray-300
         transition-colors duration-300;
}

.group:hover .tech-name {
  @apply text-gray-900 dark:text-white;
}

@media (max-width: 640px) {
  .tech-grid {
    @apply grid-cols-2 gap-3;
  }

  .tech-card {
    @apply p-4;
  }

  .tech-icon-container {
    @apply w-12 h-12;
  }

  .tech-name {
    @apply text-xs;
  }

  .category-title {
    @apply text-lg;
  }
}

.tech-card {
  animation: fadeInUp 0.5s ease-out forwards;
  opacity: 0;
}

.tech-card:nth-child(1) {
  animation-delay: 0.05s;
}
.tech-card:nth-child(2) {
  animation-delay: 0.1s;
}
.tech-card:nth-child(3) {
  animation-delay: 0.15s;
}
.tech-card:nth-child(4) {
  animation-delay: 0.2s;
}
.tech-card:nth-child(5) {
  animation-delay: 0.25s;
}
.tech-card:nth-child(6) {
  animation-delay: 0.3s;
}
.tech-card:nth-child(7) {
  animation-delay: 0.35s;
}
.tech-card:nth-child(8) {
  animation-delay: 0.4s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
