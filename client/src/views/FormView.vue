<template>
  <div class="xs bg-blue-grey-7">
    <h4 style="font-family: Quicksand" class="text-white text-center">ImmoRadar</h4>
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
