<template>
  <q-layout>
    <q-page-container>
      <div v-if="typeof userStore.jwt !== 'string'">
        <h4 class="text-center text-white text-h3">You have to login first!</h4>
        <p @click="$router.push('/form')" class="text-subtitle1 text-center text-white cursor-pointer">Proceed to Login</p>
      </div>

      <div v-else>
        <underConstruction></underConstruction>
      </div>
    </q-page-container>
    <q-page-sticky position="bottom" :offset="[18, 18]">
      <NavBar></NavBar>
    </q-page-sticky>
  </q-layout>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue';
import underConstruction from '../components/UnderConstruction.vue';

import { useUserStore } from '../stores/user';

const userStore = useUserStore();
</script>

<style>
body {
  background-color: #4b506e;
}
</style>
