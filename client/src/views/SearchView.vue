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
        <template v-slot:append
          ><q-btn @click="icon = true" icon="fa-solid fa-filter" unelevated text-color="#4b506e">
          </q-btn
        ></template>
      </q-input>
      <div class="q-pa-md row items-start justify-center q-gutter-md q-mt-md q-mb-xl text-white">
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

      <q-dialog v-model="icon">
        <q-card>
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Search by</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section>
            <div class="q-gutter-sm">
              <q-option-group v-model="search" :options="options"></q-option-group>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
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
const icon = ref(false);
const search = ref('name');

const options = [
  {
    label: 'Name',
    value: 'name',
  },
  {
    label: 'PLZ',
    value: 'plz',
  },
  {
    label: 'Rooms',
    value: 'rooms',
  },
  {
    label: 'Street',
    value: 'street',
  },
];
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
  background-color: #2F3245
  border-color: white
</style>
