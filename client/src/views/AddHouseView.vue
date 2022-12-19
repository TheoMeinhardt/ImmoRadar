<template>
  <q-layout>
    <q-page-container>
      <RouterView></RouterView>
    </q-page-container>
    <q-page-sticky position="bottom" :offset="[18, 18]">
      <NavBar></NavBar>
    </q-page-sticky>
  </q-layout>
</template>

<script setup>
import { RouterView } from 'vue-router';
import NavBar from '@/components/NavBar.vue';
</script>
