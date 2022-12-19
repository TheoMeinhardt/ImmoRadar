<template>
  <div class="q-mx-md q-mt-xl">
    <div class="text-center">
      <span><q-img src="@/assets/0-3.svg"></q-img></span>
      <span class="text-h6 q-mt-md text-white" style="font-family: Quicksand; text-align: center">
        Create new real estate <q-icon name="fa-solid fa-house-chimney-medical"></q-icon
      ></span>
    </div>
    <q-input
      bg-color="white"
      label="Price"
      :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }"
      class="q-my-lg myInput"
    ></q-input>
    <q-input
      bg-color="white"
      label="Whats the address"
      style="font-family: Quicksand Book"
      :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }"
      class="q-my-lg myInput"
    ></q-input>
    <q-input
      bg-color="white"
      label="City and PLZ"
      style="font-family: Quicksand Book"
      :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }"
      class="q-my-lg myInput"
    ></q-input>
    <q-input
      bg-color="white"
      label="Name of the estate"
      style="font-family: Quicksand Book"
      :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }"
      class="q-my-lg myInput"
    ></q-input>
    <q-input
      bg-color="white"
      label="Description of the address"
      style="font-family: Quicksand Book"
      :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }"
      class="q-my-lg myInput"
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
}
</style>
