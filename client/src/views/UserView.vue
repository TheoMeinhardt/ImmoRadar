<template>
  <q-layout>
    <q-page-container>
      <div v-if="typeof userStore.jwt !== 'string'">
        <h4 class="text-center text-white text-h3" style="font-family: Keep Calm">You have to login first!</h4>
        <p @click="$router.push('/form')" class="text-subtitle1 text-center text-white cursor-pointer" style="font-family: Quicksand Book">Proceed to Login</p>
      </div>

      <div v-else>
        <div class="text-center text-white" style="font-family: Keep Calm">
          <q-img :src="userStore.user.profilePic" class="profilePic"></q-img>
          <span class="text-h4 block q-mt-md">{{ userStore.user.name }}</span>
          <span class="text-body1 block" style="color: #717171">{{ userStore.user.email }}</span>
        </div>
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

<style scoped>
body {
  background-color: #4b506e;
}

.profilePic {
  width: 25vw;
  margin-top: 15vh;
  border-radius: 999px;
}
</style>
