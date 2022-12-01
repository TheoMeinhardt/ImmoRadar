<template>
  <q-layout>
    <q-page-container>
      <q-input
        v-model="searchStr"
        bg-color="white"
        rounded
        outlined
        class="q-mt-xl q-mx-md"
        label="Search"
        :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }"
        style="font-family: Quicksand-Book"
      >
        <template v-slot:prepend>
          <q-icon name="fa-solid fa-magnifying-glass" style="color: #4b506e"></q-icon>
        </template>
      </q-input>
      <div class="q-pa-md row items-start q-gutter-md q-mt-md text-white">
        <q-card
          v-for="estate in realEstates"
          :key="estate.re_id"
          class="my-card q-pa-xs"
          style="font-family: Keep Calm"
          bordered
        >
          <img src="https://cdn.quasar.dev/img/mountains.jpg" />

          <q-card-section>
            <div class="text-subtitle1">{{ estate.name }}</div>
            <div class="text-caption text-weight-thin">{{ estate.address }}</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div>{{ estate.price }}€</div>
            <div style="">{{ estate.property_area }}m²</div>
            <div>{{ estate.rooms }} Rooms</div>
          </q-card-section>
        </q-card>
      </div>
    </q-page-container>
    <q-page-sticky position="bottom" :offset="[18, 18]">
      <NavBar></NavBar>
    </q-page-sticky>
  </q-layout>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue';
import { useRealEstatesStore } from '@/stores/realEstates.js';
import { ref } from 'vue';

const realEstatesStore = useRealEstatesStore();
const realEstates = realEstatesStore.realEstates;

const searchStr = ref('');
</script>

<style lang="sass" scoped>
.my-card
  width: 45%
  max-width: 250px
  background-color: #2F3245
  border-color: white
</style>
