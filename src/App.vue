<script setup>
import Header from "./components/shared/Header.vue";
import Footer from "@/components/shared/Footer.vue"
</script>
<template>
  <Header />
  <div class="content	mt-20">
    <router-view class=""></router-view>
  </div>
  
  <Footer/>
</template>
