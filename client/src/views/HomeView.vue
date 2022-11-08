<template>
  <div class="xs">
    <NavBar></NavBar>
    <TheMap></TheMap>
  </div>
</template>

<script setup>
import TheMap from '../components/TheMap.vue';
import NavBar from '../components/NavBar.vue';
</script>

<style scoped>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>