<template>
  <div class="xs container" style="background-color: #4b506e">
    <div style="text-align: center"><img class="q-my-md" src="/images/Logo_Horizontal.svg" alt="" width="250" /></div>
    <q-tabs style="font-family: Keep Calm" class="text-white">
      <q-route-tab to="/form">Login</q-route-tab>
      <q-route-tab to="/form/register">Register</q-route-tab>
    </q-tabs>
    <RouterView class="q-mt-xl"></RouterView>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
</script>

<style scoped>
.container {
  height: 100vh;
}
</style>

<style scoped>
#body {
  height: 100vh;
  background-color: #4b506e;
}
</style>
