<template>
  <div>
    <q-input
      bg-color="white"
      style="font-family: Keep Calm"
      class="q-my-lg q-mx-sm"
      rounded
      outlined
      v-model="username"
      label="Username"
    />
    <q-input
      bg-color="white"
      style="font-family: Keep Calm"
      class="q-mx-sm"
      rounded
      outlined
      v-model="password"
      label="Password"
      type="password"
    />

    <div class="q-pa-md">
      <q-checkbox class="text-white" v-model="rememberMe" label="Remember me" />
    </div>

    <q-btn
      unelevated
      rounded
      color="light-blue-3"
      style="font-family: Keep Calm; width: 300px"
      align="center"
      label="Login"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const rememberMe = ref(false);
</script>
