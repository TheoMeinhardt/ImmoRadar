<template>
  <div class="q-mx-md">
    <q-input type="text" bg-color="white" style="font-family: Quicksand-Book" :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }" class="q-my-lg" rounded outlined v-model="username" label="Username" />
    <q-input type="email" bg-color="white" style="font-family: Quicksand-Book" :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }" rounded outlined v-model="email" label="Email" />
    <q-input type="text" bg-color="white" style="font-family: Quicksand-Book" :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }" class="q-my-lg" rounded outlined v-model="phone" label="Phone Nr." />
    <q-input type="password" bg-color="white" style="font-family: Quicksand-Book" :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }" class="q-my-lg" rounded outlined v-model="password" label="Password" />
    <div style="text-align: center">
      <q-btn type="submit" rounded color="light-blue-3" style="font-family: Keep Calm; width: 300px" align="center" label="Register" class="btn" to="/" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const username = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');
</script>

<style scoped>
.btn {
  margin: auto;
  width: 50%;
}
</style>
