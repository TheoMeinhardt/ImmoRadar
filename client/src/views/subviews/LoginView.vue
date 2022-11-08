<template>
  <div class="q-mx-md">
    <q-input
      bg-color="white"
      style="font-family: Keep Calm"
      class="q-my-lg"
      rounded
      outlined
      v-model="username"
      label="Username"
    />
    <q-input
      bg-color="white"
      style="font-family: Keep Calm"
      class=""
      rounded
      outlined
      v-model="password"
      label="Password"
    />

    <div class="q-pa-md">
      <q-checkbox class="text-white" v-model="rememberMe" label="Remember me" style="font-family: Keep Calm;" />
    </div>

    <div style="text-align: center">
      <q-btn
        unelevated
        rounded
        color="light-blue-3"
        style="font-family: Keep Calm; width: 300px"
        align="center"
        label="Login"
        to="/"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const rememberMe = ref(false);
</script>
