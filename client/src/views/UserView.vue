<template>
  <q-layout>
    <q-page-container>
      <div v-if="!userStore.isLoggedIn">
        <h4 class="text-center text-white text-h3" style="font-family: Keep Calm">
          You have to login first!
        </h4>
        <p
          @click="$router.push('/form')"
          class="text-subtitle1 text-center text-white cursor-pointer"
          style="font-family: Quicksand Book"
        >
          Proceed to Login
        </p>
      </div>

      <div v-else style="font-family: Keep Calm">
        <RouterView></RouterView>
      </div>
    </q-page-container>
    <q-page-sticky position="bottom" :offset="[18, 18]">
      <NavBar></NavBar>
    </q-page-sticky>
  </q-layout>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue';

import { useUserStore } from '../stores/user';

const userStore = useUserStore();
</script>

<style scoped></style>
