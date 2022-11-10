<template>
  <div class="bg-gray-50">
    <div>
      <p class="text-h3 block">Mehr Möglichekiten mit Immoradar Premium!</p>
      <div
        class="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8"
      >
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          <span class="block">Bereit einzutauchen?</span>
          <span class="block text-indigo-600">Starten Sie heute schon ihr Abonnement!</span>
        </h2>
        <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div class="inline-flex rounded-md shadow">
            <input type="hidden" id="basicPrice" name="priceId" />
            <a
              @click="createCheckout"
              href="#"
              class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700"
              >Premium 5€</a
            >
          </div>
          <!-- <div class="ml-3 inline-flex rounded-md shadow">
          <input type="hidden" id="proPrice" name="priceId" />
          <a
          @click="createCheckout"
          href="#"
          class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700"
          >Premium - 10€</a
          >
        </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from 'axios';

async function createCheckout() {
  // const daten = await axios.get('http://localhost:3000/realestate/config');
  // console.log(daten);
  const { data } = await axios.post('http://localhost:3000/realestate/create-checkout-session');
  console.log(data);
  window.location = data;
}
</script>
<style scoped>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>
