<template>
  <RouterView />
</template>

<script setup>
import axios from 'axios';
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';

import { useRealEstateStore } from './stores/realEstates';

const realEstateStore = useRealEstateStore();

axios.defaults.baseURL = import.meta.env.DEV ? 'http://localhost:3000' : 'https://immoradar-server.onrender.com';
console.log(`${import.meta.env.MODE} mode`);

onMounted(async () => {
  const { data } = await axios.get('/realestate/short');
  realEstateStore.realEstatesShort = data;
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
