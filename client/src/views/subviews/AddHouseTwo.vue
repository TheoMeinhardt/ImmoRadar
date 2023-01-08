<script setup>
import { ref } from 'vue';

const propArea = ref('');
const usableArea = ref('');
const outsideArea = ref('');
</script>

<template>
  <div class="q-mx-md q-mt-xl">
    <div class="text-center">
      <div><q-img src="@/assets/1-3.svg"></q-img></div>
      <div class="text-h6 q-mt-md text-white" style="font-family: Quicksand; text-align: center">
        Create new real estate <q-icon name="fa-solid fa-house-chimney-medical"></q-icon>
      </div>
    </div>
    <q-input
      v-model="propArea"
      bg-color="white"
      label="Property area"
      :input-style="{ fontFamily: 'Keep Calm', color: '#717171', margin: '5px' }"
      class="q-my-md myInput"
      borderless
    ></q-input>
    <q-input
      v-model="usableArea"
      bg-color="white"
      label="Usable area"
      style="font-family: Quicksand Book"
      :input-style="{ fontFamily: 'Keep Calm', color: '#717171', margin: '5px' }"
      class="q-my-md myInput"
      borderless
    ></q-input>
    <q-input
      v-model="outsideArea"
      bg-color="white"
      label="Outside area"
      style="font-family: Quicksand Book"
      :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }"
      class="q-my-md myInput"
      borderless
    ></q-input>
    <q-input
      bg-color="white"
      label="Name of the estate"
      style="font-family: Quicksand Book"
      :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }"
      class="q-my-md myInput"
      borderless
    ></q-input>
    <q-input
      bg-color="white"
      label="Name of the estate"
      style="font-family: Quicksand Book"
      :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }"
      class="q-my-md myInput"
      borderless
    ></q-input>
    <q-input
      bg-color="white"
      label="Name of the estate"
      style="font-family: Quicksand Book"
      :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }"
      class="q-my-md myInput"
      borderless
    ></q-input>
    <q-input
      bg-color="white"
      label="Name of the estate"
      style="font-family: Quicksand Book"
      :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }"
      class="q-my-md myInput"
      borderless
    ></q-input>
    <div style="font-family: Keep Calm; text-align: center">
      <q-btn rounded color="light-blue-3" style="width: 300px" to="/addhouse/addhousethree"
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
</style>
