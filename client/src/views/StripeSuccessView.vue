<template>
  <!-- component -->
  <div class="bg-gray-100 h-screen">
    <div class="dark:bg-gray-900 p-6 md:mx-auto">
      <svg viewBox="0 0 24 24" class="text-green-600 w-16 h-16 mx-auto my-6">
        <path
          fill="currentColor"
          d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
        ></path>
      </svg>
      <div class="text-center">
        <h3 class="text-gray-200 md:text-2xl text-base font-semibold text-center">
          Zahlung abgeschlossen!
        </h3>
        <p class="text-gray-300 my-2 font-medium">
          Vielen Dank, dass Sie Ihre sichere Online-Zahlung abgeschlossen haben.
        </p>
        <p class="text-gray-300">Einen schönen Tag noch!</p>
        <div class="py-10 text-center">
          <button
            onclick="window.location.href = '/';"
            class="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
          >
            Home
          </button>
        </div>
        <div class="py-10 text-center">
          <button
            @click="createPortal"
            class="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
          >
            Mangage Billing
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from 'axios';
import { useStore } from '../stores/counter.js';
import { onMounted, ref } from 'vue';
const store = useStore();

const sessionId = ref('');
const jsonSession = ref({});

onMounted(async () => {
  const searchParams = new URLSearchParams(new URL(window.location).search);
  sessionId.value = searchParams.get('session_id');
  console.log(sessionId.value);
});

async function createPortal() {
  const session = await axios.get(
    `'http://localhost:3000/realestate/checkout-session?sessionId=${sessionId.value}'`,
  );
  jsonSession.value = JSON.stringify(session, null, 2);
  const { data } = await axios.post('http://localhost:3000/realestate/create-portal-session');
  console.log(data);
  console.log(session);
  // window.location = data;
}
</script>
<style scoped>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>
