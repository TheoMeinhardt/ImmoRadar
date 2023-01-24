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
import { onMounted, ref } from 'vue';
import { useUserStore } from '../../stores/user';

const session_id = ref('');
const jsonSession = ref();
const returnSession = ref();

const userStore = useUserStore();

onMounted(async () => {
  var hash = location.hash;
  var sessionId = hash.match(/session_id=([^&]+)/)[1];
  console.log(sessionId);
  session_id.value = sessionId;

  // const searchParams = new URLSearchParams(new URL(window.location).search);
  // console.log(searchParams);
  // session_id.value = searchParams.get('session_id');
  // console.log(session_id.value);
  try {
    await axios.patch(`/users/stripe/${userStore.user.user_id}`, {
      session_id: session_id.value,
    });
  } catch (error) {
    console.log(error);
    console.log('No session_id found!');
  }

  // const session = await axios.get(`/realestate/checkout-session/${session_id.value}`);
  // returnSession.value = session.data;
  // jsonSession.value = JSON.stringify(session, null, 2);
});

async function createPortal() {
  const { data } = await axios.get(`/users/stripe/${userStore.user.user_id}`);
  console.log(data);

  const session = await axios.get(`/realestate/checkout-session/${data}`);
  console.log(session.data);
  returnSession.value = session.data;

  

  // const { data } = await axios.post('/realestate/create-portal-session', {
  //   session: returnSession.value,
  // });
  window.location = data;
}
</script>
<style scoped>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>
