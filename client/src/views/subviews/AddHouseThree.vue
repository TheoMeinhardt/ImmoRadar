<script setup>
import { ref } from 'vue';

const propArea = ref('');
const useArea = ref('');
const outArea = ref('');
const estatePrice = ref('');
</script>

<template>
  <div class="q-mx-md q-mt-xl">
    <div class="text-center">
      <div><q-img src="@/assets/2-3.svg"></q-img></div>
      <div class="fontSize q-mt-md text-white" style="font-family: Quicksand; text-align: center">
        Create new real estate <q-icon name="fa-solid fa-house-chimney-medical"></q-icon>
      </div>
    </div>
    <p class="text-white q-mt-xl" style="font-family: Keep Calm">Area</p>
    <q-input
      v-model="propArea"
      bg-color="white"
      label="Property Area"
      :input-style="{ fontFamily: 'Keep Calm', color: '#717171', margin: '5px' }"
      class="q-my-md myInput"
      borderless
    ></q-input>
    <q-input
      v-model="useArea"
      bg-color="white"
      label="Usable Area"
      :input-style="{ fontFamily: 'Keep Calm', color: '#717171', margin: '5px' }"
      class="q-my-md myInput"
      borderless
    ></q-input>
    <q-input
      v-model="outArea"
      bg-color="white"
      label="Outside Area"
      :input-style="{ fontFamily: 'Keep Calm', color: '#717171', margin: '5px' }"
      class="q-my-md myInput"
      borderless
    ></q-input>
    <p class="text-white q-mt-xl" style="font-family: Keep Calm">Heating</p>
    <q-input
      v-model="estatePrice"
      bg-color="white"
      label="Price"
      :input-style="{ fontFamily: 'Keep Calm', color: '#717171', margin: '5px' }"
      class="q-my-md myInput"
      borderless
    ></q-input>
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
