<template>
  <q-layout>
    <p>{{ realEstateStore.wholeRealEstate.name }}</p>
    <q-page-sticky position="bottom" :offset="[18, 18]">
      <NavBar></NavBar>
    </q-page-sticky>
  </q-layout>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue';
import { useRealEstateStore } from '@/stores/realEstates.js';

const props = defineProps({
  reID: String,
});

const realEstateStore = useRealEstateStore();
realEstateStore.fetchWholeRealEstate(props.reID);
</script>
