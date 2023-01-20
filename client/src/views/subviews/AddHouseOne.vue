<script setup>
import { ref } from 'vue';

const constructionYear = ref('');
const address = ref('');
const city = ref('');
const estate = ref('');
const description = ref('');
</script>

<template>
  <div class="q-mx-md q-mt-xl">
    <div class="text-center">
      <div><q-img width="300px" src="@/assets/0-3.svg"></q-img></div>
      <div class="fontSize q-mt-md text-white" style="font-family: Quicksand; text-align: center">
        Create new real estate
        <q-icon class="q-ml-sm" name="fa-solid fa-house-chimney-medical"></q-icon>
      </div>
    </div>
    <p class="text-white q-mt-xl" style="font-family: Keep Calm">Basic information</p>
    <q-input
      v-model="estate"
      bg-color="white"
      label="Name of the estate"
      :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }"
      class="q-my-md myInput"
      borderless
    ></q-input>
    <q-input
      v-model="address"
      bg-color="white"
      label="Whats the address"
      style="font-family: Quicksand Book"
      :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }"
      class="q-my-md myInput"
      borderless
    ></q-input>
    <q-input
      v-model="city"
      bg-color="white"
      label="City and PLZ"
      style="font-family: Quicksand Book"
      :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }"
      class="q-my-md myInput"
      borderless
    ></q-input>
    <q-input
      v-model="constructionYear"
      bg-color="white"
      label="Construction Year"
      style="font-family: Quicksand Book"
      :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }"
      class="q-my-md myInput"
      borderless
    ></q-input>
    <q-input
      v-model="description"
      bg-color="white"
      label="Description of the address"
      style="font-family: Quicksand Book"
      :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }"
      class="q-my-md myInput"
      borderless
      type="textarea"
    ></q-input>
    <div style="font-family: Keep Calm; text-align: center">
      <q-btn rounded color="light-blue-3" style="width: 300px" to="/addhouse/addhousetwo"
        >Next</q-btn
      >
    </div>
  </div>
</template>

<style scoped>
.myInput {
  font-family: 'Quicksand Book';
  border: 1px white solid;
  border-radius: 5px 5px 0px 0px;
  background-color: white;
  padding: 5px;
}

.fontSize {
  font-size: 17px;
}
</style>
