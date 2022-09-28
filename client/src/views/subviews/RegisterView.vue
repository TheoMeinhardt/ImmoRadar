<template>
  <div>
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
      rounded
      outlined
      v-model="email"
      label="Email"
    />
    <q-input
      bg-color="white"
      style="font-family: Keep Calm"
      class="q-my-lg"
      rounded
      outlined
      v-model="phone"
      label="Phone Nr."
    />
    <q-input
      bg-color="white"
      style="font-family: Keep Calm"
      class="q-my-lg"
      rounded
      outlined
      v-model="password"
      label="Password"
    />
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

<script setup></script>
