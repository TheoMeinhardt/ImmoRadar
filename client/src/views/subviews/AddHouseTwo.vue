<script setup>
import { ref } from 'vue';

const estatePrice = ref('');
const heatingPrice = ref('');
</script>

<template>
  <div class="q-mx-md q-mt-xl">
    <div class="text-center">
      <div><q-img width="300px" src="@/assets/1-3.svg"></q-img></div>
      <div class="fontSize q-mt-md text-white" style="font-family: Quicksand; text-align: center">
        Create new real estate <q-icon name="fa-solid fa-house-chimney-medical"></q-icon>
      </div>
    </div>
    <p class="text-white q-mt-xl" style="font-family: Keep Calm">Expenses</p>
    <q-input
      v-model="estatePrice"
      bg-color="white"
      label="Price"
      :input-style="{ fontFamily: 'Keep Calm', color: '#717171', margin: '5px' }"
      class="q-my-md myInput"
      borderless
    ></q-input>
    <q-input
      v-model="heatingPrice"
      bg-color="white"
      label="Heating"
      style="font-family: Quicksand Book"
      :input-style="{ fontFamily: 'Keep Calm', color: '#717171', margin: '5px' }"
      class="q-my-md myInput"
      borderless
    ></q-input>
    <p class="text-white q-mt-xl" style="font-family: Keep Calm">Rooms</p>
    <q-btn>+</q-btn>
    <q-input class="myInput" label="test"></q-input>
    <q-btn>-</q-btn>
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

.fontSize {
  font-size: 17px;
}
</style>
