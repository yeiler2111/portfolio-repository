<script setup lang="ts">
const props = defineProps<{ isDarkMode: boolean }>();
</script>
<template>
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 300 100"
    class="w-full h-auto"
  >
    <rect width="250" height="80" fill="transparent" />

    <g v-if="!props.isDarkMode">
      <text x="10" y="60" class="font-mono text-3xl font-bold fill-gray-900">
        &lt;/&gt;
      </text>
      <text x="60" y="50" class="font-sans text-2xl font-bold fill-gray-900">
        Yeiler Simons
      </text>
      <text x="60" y="70" class="font-sans text-lg fill-gray-900">
        Software Developer
      </text>
    </g>

    <g v-if="props.isDarkMode">
      <text x="10" y="60" class="font-mono text-3xl font-bold fill-white">
        &lt;/&gt;
      </text>
      <text x="60" y="50" class="font-sans text-2xl font-bold fill-white">
        Yeiler Simons
      </text>
      <text x="60" y="70" class="font-sans text-lg fill-white">
        Software Developer
      </text>
    </g>
  </svg>
</template>
