<template>
  <q-btn @click="getRealEstates" label="get realestates"></q-btn>
  <RouterView />
</template>

<script setup>
import axios from 'axios';
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';

import { useRealEstateStore } from './stores/realEstates';

const realEstateStore = useRealEstateStore();

async function getRealEstates() {
  console.log(await axios.get('/api/realestate'));
  const { data } = await axios.get('/api/realestate/short');
  console.log(await axios.get('/api/realestate'));
  realEstateStore.realEstatesShort = data;
}

onMounted(async () => {
  // const { data } = await axios.get('/api/realestate/short');
  // realEstateStore.realEstatesShort = data;
});
</script>

<style>
@font-face {
  font-family: 'Keep Calm';
  src: url('/fonts/keep_calm/KeepCalm-Medium.ttf') format('truetype');
}

@font-face {
  font-family: 'Quicksand';
  src: url('/fonts/quicksand/Quicksand_Light.otf') format('truetype');
}

:root {
  --q-primary: #71d1ec !important;
  --q-secondary: #4b506e !important;
}
</style>
