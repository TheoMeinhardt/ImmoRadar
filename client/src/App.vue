<template>
  <RouterView />
</template>

<script setup>
import axios from 'axios';
import { onMounted } from 'vue';
import { RouterView, useRouter } from 'vue-router';

import { useRealEstateStore } from './stores/realEstates';
import { useUserStore } from './stores/user';

const realEstateStore = useRealEstateStore();
const userStore = useUserStore();
const router = useRouter();

axios.defaults.baseURL = import.meta.env.DEV ? 'http://localhost:3000' : 'https://immoradar-server.onrender.com';
console.log(`${import.meta.env.MODE} mode`);

onMounted(async () => {
  realEstateStore.fetchAllRealEstateShort();
  if (typeof userStore.jwt !== 'string') router.push('/form');
});
</script>

<style>
@font-face {
  font-family: 'Keep Calm';
  src: url('/fonts/keep_calm/KeepCalm-Medium.ttf') format('truetype');
  font-display: swap;
}

@font-face {
  font-family: 'Quicksand';
  src: url('/fonts/quicksand/Quicksand_Light.otf') format('truetype');
  font-display: swap;
}

@font-face {
  font-family: 'Quicksand Book';
  src: url('/fonts/quicksand/Quicksand_Book.otf') format('truetype');
  font-display: swap;
}

body {
  background-color: #4b506e;
}
</style>
