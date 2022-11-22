<template>
  <q-layout id="underConstruction">
    <q-page-container>
      <UnderConstruction></UnderConstruction>
    </q-page-container>
    <q-page-sticky position="bottom" :offset="[18, 18]">
      <NavBar></NavBar>
    </q-page-sticky>
  </q-layout>
</template>

<script setup>
import UnderConstruction from '@/components/UnderConstruction.vue';
import NavBar from '@/components/NavBar.vue';
</script>

<style>
#underConstruction {
  height: 100vh;
  background-color: #4b506e;
}

body {
  background-color: #4b506e;
}
</style>
