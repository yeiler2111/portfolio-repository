<template>
  <section class="hero-modern">
    <div class="hero-container">
      <div class="hero-image-section">
        <div class="image-wrapper">
          <picture class="hero-picture">
            <source
              srcset="/img/imagen_mia_768.webp"
              media="(min-width: 1024px)"
              type="image/webp"
            />
            <source
              srcset="/img/imagen_mia_480.webp"
              media="(min-width: 641px)"
              type="image/webp"
            />
            <img
              src="/img/imagen_mia_240.webp"
              alt="Retrato de Yeiler Simons"
              loading="eager"
              decoding="async"
              fetchpriority="high"
              @load="onImageLoad"
              :class="['hero-image', { 'image-loaded': !loading }]"
            />
          </picture>

          <div class="image-decoration decoration-1"></div>
          <div class="image-decoration decoration-2"></div>

          <div v-if="loading" class="image-loader">
            <div class="spinner"></div>
          </div>
        </div>
      </div>

      <div class="hero-content-section">
        <div class="greeting-badge">
          <span class="greeting-text wave-emoji">¡Hola! Soy</span>
        </div>

        <h1 class="hero-title">
          <span class="title-name">Yeiler Simons</span>
          <span class="title-role">Desarrollador Fullstack</span>
        </h1>

        <p class="hero-description">
          Apasionado por crear experiencias digitales excepcionales y
          soluciones innovadoras con tecnologías modernas.
        </p>

        <HeroStats />

        <div class="hero-actions">
          <button
            @click="$router.push('/contactMe')"
            class="btn-primary btn-large"
          >
            <Mail :size="20" />
            <span>Contáctame</span>
          </button>
          <button class="btn-outline btn-large">
            <Download :size="20" />
            <span>Ver CV</span>
          </button>
        </div>

        <HeroNavigation :options="navigationOptions" @navigate="scrollToSection" />
      </div>
    </div>

    <div class="hero-bg-decoration"></div>
  </section>
</template>

<script setup lang="ts">
import type { NavigationOption } from '@/utils/types';
import { Download, Mail } from 'lucide-vue-next';
import { onBeforeMount, ref } from 'vue';
import HeroNavigation from './HeroNavigation.vue';
import HeroStats from './HeroStats.vue';

defineProps<{
  navigationOptions: NavigationOption[];
}>();

const emit = defineEmits<{
  navigate: [id: string];
}>();

const loading = ref(true);

const onImageLoad = () => {
  loading.value = false;
};

const scrollToSection = (id: string) => {
  emit('navigate', id);
};

onBeforeMount(() => {
  const preload = (href: string, media?: string) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = href;
    link.fetchPriority = 'high';
    if (media) link.media = media;
    document.head.appendChild(link);
  };
  preload('/img/imagen_mia_240.webp');
});
</script>

<style scoped lang="postcss">
.hero-modern {
  @apply relative min-h-screen flex items-center justify-center
         overflow-hidden py-20 px-6;
  background: linear-gradient(
    135deg,
    rgb(249 250 251) 0%,
    rgb(255 255 255) 50%,
    rgba(37 99 235 / 0.05) 100%
  );
}

.dark .hero-modern {
  background: linear-gradient(
    135deg,
    rgb(3 7 18) 0%,
    rgb(17 24 39) 50%,
    rgba(37 99 235 / 0.1) 100%
  );
}

.hero-container {
  @apply max-w-7xl mx-auto w-full
         grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16
         items-center relative z-10;
}

.hero-image-section {
  @apply relative flex justify-center lg:justify-end
         order-1 lg:order-none;
}

.image-wrapper {
  @apply relative w-full max-w-md lg:max-w-lg;
}

.hero-picture {
  @apply relative block w-full aspect-[3/4] rounded-3xl overflow-hidden
         shadow-2xl;
}

.hero-image {
  @apply w-full h-full object-cover
         transition-all duration-700 ease-out;
}

.hero-image.image-loaded {
  @apply opacity-100 scale-100;
}

.hero-image:not(.image-loaded) {
  @apply opacity-0 scale-95;
}

.image-decoration {
  @apply absolute rounded-3xl pointer-events-none;
  z-index: -1;
}

.decoration-1 {
  @apply -top-6 -left-6 w-full h-full
         bg-gradient-to-br from-blue-500/20 to-indigo-500/20
         dark:from-blue-500/30 dark:to-indigo-500/30
         blur-2xl;
}

.decoration-2 {
  @apply -bottom-6 -right-6 w-3/4 h-3/4
         bg-gradient-to-tl from-purple-500/20 to-blue-500/20
         dark:from-purple-500/30 dark:to-blue-500/30
         blur-3xl;
}

.image-loader {
  @apply absolute inset-0 flex items-center justify-center
         bg-gray-100 dark:bg-gray-800 rounded-3xl;
}

.spinner {
  @apply w-12 h-12 rounded-full
         border-4 border-gray-300 dark:border-gray-600
         border-t-blue-600 dark:border-t-blue-500 animate-spin;
}

.hero-content-section {
  @apply space-y-8 order-2 lg:order-none
         text-center lg:text-left;
}

.greeting-badge {
  @apply inline-flex items-center gap-3
         bg-blue-50 dark:bg-blue-900/30
         px-5 py-2 rounded-full
         text-blue-700 dark:text-blue-300
         font-medium text-sm
         animate-fade-in;
}

.wave-emoji {
  @apply text-2xl;
}

.hero-title {
  @apply space-y-2;
}

.title-name {
  @apply block text-5xl md:text-6xl lg:text-7xl
         font-extrabold 
         bg-gradient-to-r from-gray-900 to-gray-700
         dark:from-white dark:to-gray-300
         bg-clip-text text-transparent
         leading-tight;
}

.title-role {
  @apply block text-2xl md:text-3xl lg:text-4xl
         font-semibold text-gray-700 dark:text-gray-300
         leading-tight;
}

.hero-description {
  @apply text-lg md:text-xl text-gray-600 dark:text-gray-400
         leading-relaxed max-w-xl
         mx-auto lg:mx-0;
}

.hero-actions {
  @apply flex flex-wrap items-center justify-center lg:justify-start gap-4;
}

.btn-large {
  @apply px-8 py-4 text-base gap-2;
}

.hero-bg-decoration {
  @apply absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none;
  background-image: radial-gradient(
      circle at 20% 20%,
      rgba(59, 130, 246, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 80%,
      rgba(99, 102, 241, 0.1) 0%,
      transparent 50%
    );
}

@media (max-width: 1024px) {
  .hero-container {
    @apply gap-8;
  }

  .image-wrapper {
    @apply max-w-sm;
  }

  .title-name {
    @apply text-4xl md:text-5xl;
  }

  .title-role {
    @apply text-xl md:text-2xl;
  }
}

@media (max-width: 640px) {
  .hero-modern {
    @apply py-12;
  }
}
</style>