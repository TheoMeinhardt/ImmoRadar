<template>
  <div class="text-center">
    <q-btn
      to="/search"
      icon="fa-solid fa-magnifying-glass fa-xl"
      unelevated
      text-color="btnColor"
    ></q-btn>
    <q-btn to="/" icon="fa-solid fa-house fa-xl" unelevated text-color="btnColor"></q-btn>
    <q-btn to="/user" icon="fa-solid fa-user fa-xl" unelevated text-color="btnColor"></q-btn>
  </div>
</template>

<style scoped>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

div {
  background-color: #71d1ec;
  width: 55vw;
  height: 4.5vh;
  border-radius: 25px;
}

.text-btnColor {
  color: #4b506e !important;
}
</style>
