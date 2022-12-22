<template>
  <q-layout>
    <q-page-container>
      <div v-if="typeof userStore.jwt !== 'string'">
        <h4 class="text-center text-white text-h3" style="font-family: Keep Calm">You have to login first!</h4>
        <p @click="$router.push('/form')" class="text-subtitle1 text-center text-white cursor-pointer" style="font-family: Quicksand Book">Proceed to Login</p>
      </div>

      <div v-else style="font-family: Keep Calm">
        <div class="text-center text-white">
          <q-img v-if="userStore.user.profilePic" :src="userStore.user.profilePic" class="profilePic"></q-img>
          <div v-else class="userIconBigger row content-center justify-center">
            <q-icon name="fa-regular fa-user" size="xl" />
          </div>

          <span class="text-h4 block q-mt-md">{{ userStore.user.username }}</span>
          <span class="text-body2 block text-grey">{{ userStore.user.email }}</span>
        </div>

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

<style scoped>
.profilePic {
  width: 25vw;
  margin-top: 10vh;
  border-radius: 999px;
}

.userIconBigger {
  border-radius: 999px;
  background-color: #545975;
  height: 25vw;
  width: 25vw;
  margin: auto;
  margin-top: 10vh;
}
</style>
