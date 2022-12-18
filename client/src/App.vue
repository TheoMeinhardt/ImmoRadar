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

axios.defaults.baseURL = import.meta.env.DEV ? 'http://192.168.1.52:3000' : 'https://immoradar-server.onrender.com';
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
}

@font-face {
  font-family: 'Quicksand';
  src: url('/fonts/quicksand/Quicksand_Light.otf') format('truetype');
}

@font-face {
  font-family: 'Quicksand Book';
  src: url('/fonts/quicksand/Quicksand_Book.otf') format('truetype');
}

:root {
  --q-primary: #71d1ec !important;
  --q-secondary: #4b506e !important;
  --q-accent: #264653 !important;
  --q-dark: #2f3245 !important;
}
</style>
