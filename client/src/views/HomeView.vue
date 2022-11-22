<template>
  <q-layout class="xs">
    <q-page-container>
      <TheMap></TheMap>
    </q-page-container>
    <q-page-sticky position="bottom" :offset="[18, 18]">
      <NavBar class="q-mb-md"></NavBar>
    </q-page-sticky>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        class="q-mb-xl"
        fab
        icon="fa-solid fa-house-chimney-medical"
        color="btnColor"
        to="/addhouse"
      ></q-btn>
    </q-page-sticky>
  </q-layout>
</template>

<script setup>
import TheMap from '../components/TheMap.vue';
import NavBar from '../components/NavBar.vue';
</script>

<style scoped>
.bg-btnColor {
  background-color: #71d1ec !important;
}
</style>
