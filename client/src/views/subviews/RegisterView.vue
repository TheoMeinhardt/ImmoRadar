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
    <div style="text-align: center">
      <q-btn
        unelevated
        rounded
        color="light-blue-3"
        style="font-family: Keep Calm; width: 300px"
        align="center"
        label="Register"
        class="btn"
        to="/"
      />
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.btn {
  margin: auto;
  width: 50%;
}
</style>
