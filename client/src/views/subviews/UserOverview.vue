<template>
  <div style="font-family: Keep Calm">
    <div class="row justify-center text-white q-mt-xl">
      <div class="userIcon row content-center justify-center">
        <q-icon class="q-m-lg" name="fa-regular fa-user" size="sm" />
      </div>
      <div class="column justify-evenly q-ml-md">
        <span class="block" style="font-size: 0.85rem">My Account</span>
        <span v-if="userStore.needProfileUpdate" class="block text-grey" style="font-size: 0.65rem">Make changes to your account</span>
        <span v-else class="block text-grey" style="font-size: 0.65rem">Your account setup is complete</span>
      </div>
      <div class="column justify-center align-center">
        <q-icon v-if="userStore.needProfileUpdate" name="fa-solid fa-triangle-exclamation" size="xs" color="red" class="q-ml-lg" />
        <q-icon v-else name="fa-solid fa-check" size="xs" color="green" class="q-ml-lg" />
      </div>
      <div class="column justify-center align-center">
        <q-btn to="/user/details" round unelevated color="secondary" text-color="grey" size="sm" icon="fa-solid fa-chevron-right" class="q-ml-md" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
</script>

<style scoped>
.userIcon {
  border-radius: 999px;
  background-color: #545975;
  height: 60px;
  width: 60px;
}
</style>
