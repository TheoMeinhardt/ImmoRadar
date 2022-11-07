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
      class="q-mx-sm"
      bg-color="white"
      style="font-family: Keep Calm"
      rounded
      outlined
      v-model="email"
      label="Email"
      type="email"
      error="true"
      error-message="Please enter a valid email address"
    />
    <q-input
      bg-color="white"
      style="font-family: Keep Calm"
      class="q-my-lg q-mx-sm"
      rounded
      outlined
      v-model="phone"
      label="Phone Nr."
      mask="### #### ####"
      prefix="+43"
      type="tel"
    />
    <q-input
      bg-color="white"
      style="font-family: Keep Calm"
      class="q-my-lg q-mx-sm"
      rounded
      outlined
      v-model="password"
      label="Password"
      type="password"
    />
    <q-btn
      unelevated
      rounded
      color="light-blue-3"
      style="font-family: Keep Calm; width: 300px; content-align: center"
      label="Login"
    />
  </div>
</template>

<script setup></script>
