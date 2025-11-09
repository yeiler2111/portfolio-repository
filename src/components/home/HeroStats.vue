<template>
  <div class="hero-stats">
    <div class="stat-item">
      <div class="stat-number">3+</div>
      <div class="stat-label">Años</div>
    </div>
    <div class="stat-divider"></div>
    <div class="stat-item">
      <div class="stat-number">20+</div>
      <div class="stat-label">Proyectos</div>
    </div>
    <div class="stat-divider"></div>
    <div class="stat-item">
      <div class="stat-number">10+</div>
      <div class="stat-label">Tecnologías</div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.hero-stats {
  @apply flex items-center justify-center lg:justify-start gap-6;
}

.stat-item {
  @apply text-center;
}

.stat-number {
  @apply text-3xl md:text-4xl font-bold
         bg-gradient-to-r from-blue-600 to-indigo-600
         dark:from-blue-400 dark:to-indigo-400
         bg-clip-text text-transparent;
}

.stat-label {
  @apply text-sm text-gray-600 dark:text-gray-400
         font-medium uppercase tracking-wide;
}

.stat-divider {
  @apply w-px h-12 bg-gray-300 dark:bg-gray-700;
}

@media (max-width: 640px) {
  .hero-stats {
    @apply gap-4;
  }

  .stat-number {
    @apply text-2xl;
  }

  .stat-divider {
    @apply h-8;
  }
}
</style>
