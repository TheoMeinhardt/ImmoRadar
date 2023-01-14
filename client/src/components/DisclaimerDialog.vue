<template>
  <q-dialog v-model="showDisclaimer">
    <q-card class="bg-secondary text-white">
      <q-card-section>
        <div class="text-h6">Please read before continuing!</div>
      </q-card-section>

      <q-card-section class="q-pt-none">ImmoRadar is still in a very early stage of development! Because of this, some features may not work as expected or do not work at all. Futhermore, ImmoRadar receives weekly updates, which fix issues or implement new features. Those may or may not result in different unexpected behaviour as before. Please keep this in mind while using our Application!</q-card-section>
      <q-card-section class="q-pt-none">Feel free to check out our <a href="https://linktr.ee/ImmoRadar" class="text-primary">Linktree</a> for development updates!</q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue';

const showDisclaimer = ref(true);
</script>
