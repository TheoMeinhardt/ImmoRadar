<template>
  <div style="font-family: Keep Calm">
    <div class="block text-center text-white">
      <q-img
        v-if="userStore.user.profilePic"
        :src="userStore.user.profilePic"
        class="profilePic"
      ></q-img>
      <div v-else class="userIconBigger row content-center justify-center">
        <q-icon name="fa-regular fa-user" size="xl" />
      </div>

      <span class="text-h4 block q-mt-md">{{ userStore.user.username }}</span>
      <span class="text-body2 block text-grey">{{ userStore.user.email }}</span>
    </div>

    <div class="row justify-center text-white q-mt-xl">
      <div class="userIcon row content-center justify-center">
        <q-icon class="q-m-lg" name="fa-regular fa-user" size="sm" />
      </div>
      <div class="column justify-evenly q-ml-md">
        <span class="block" style="font-size: 0.85rem">My Account</span>
        <span v-if="userStore.needProfileUpdate" class="block text-grey" style="font-size: 0.65rem"
          >Make changes to your account</span
        >
        <span v-else class="block text-grey" style="font-size: 0.65rem"
          >Your account setup is complete</span
        >
      </div>
      <div class="column justify-center align-center">
        <q-icon
          v-if="userStore.needProfileUpdate"
          name="fa-solid fa-triangle-exclamation"
          size="xs"
          color="red"
          class="q-ml-lg"
        />
        <q-icon v-else name="fa-solid fa-check" size="xs" color="green" class="q-ml-lg" />
      </div>
      <div class="column justify-center align-center">
        <q-btn
          to="/user/details"
          round
          unelevated
          color="secondary"
          text-color="grey"
          size="sm"
          icon="fa-solid fa-chevron-right"
          class="q-ml-md"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';

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
  margin-top: 10vh;
  margin-left: auto;
  margin-right: auto;
}

.userIcon {
  border-radius: 999px;
  background-color: #545975;
  height: 60px;
  width: 60px;
}
</style>
