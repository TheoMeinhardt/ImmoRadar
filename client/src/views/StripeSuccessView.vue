<template>
  <div>
    <div class="dark:bg-gray-900 p-6 md:mx-auto" v-if="premium">
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
      </div>
    </div>
    <div class="dark:bg-gray-900 p-6 md:mx-auto p-12" v-if="!premium">
      <div class="text-center">
        <h3 class="text-gray-200 md:text-2xl text-base font-semibold text-center">
          Es wurde keine Zahlung durchgeführt!
        </h3>
        <p class="text-gray-300 my-2 font-medium">Wir sehen uns hoffentlich bald wieder!</p>
        <p class="text-gray-300">Einen schönen Tag noch!</p>
        <div class="py-10 text-center bi-align-bottom">
          <button
            onclick="window.location.href = '/';"
            class="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
          >
            Home
          </button>
        </div>
      </div>
    </div>
    <div class="dark:bg-gray-900 p-6 md:mx-auto">
      <div
        v-if="alreadyBought"
        class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
        role="alert"
      >
        <span class="font-medium"></span> Sieht so aus als hätten Sie unsere Premium Version bereits
        gekauft!
      </div>
    </div>
  </div>
</template>



<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useUserStore } from '../stores/user.js';

const session_id = ref('');

const userStore = useUserStore();

const alreadyBought = ref(false);
const premium = ref(false);

onMounted(async () => {
  var hash = location.hash;
  var sessionId = hash.match(/session_id=([^&]+)/)[1];
  if (sessionId == '') {
    console.log('Es wurde keine Bezahlung durchgeführt!');
  } else {
    premium.value = true;
    console.log(sessionId);
    session_id.value = sessionId;
  }

  // const searchParams = new URLSearchParams(new URL(window.location).search);
  // console.log(searchParams);
  // session_id.value = searchParams.get('session_id');
  // console.log(session_id.value);
  // const id = userStore.user.user_id;
  const id = '59f42a75-cb2a-4238-ad36-13edc598224d';

  const sessionID = await axios.get(`/user/stripe/${id}`);
  console.log(sessionID.data);

  if (sessionID.data === null) {
    try {
      await axios.patch(`/user/stripe/${id}`, {
        session_id: session_id.value,
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('You already paid for Premium!');
    alreadyBought.value = true;
  }
});

// async function createPortal() {
//   const { data } = await axios.get(`/users/stripe/${userStore.user.user_id}`);
//   console.log(data);

//   const session = await axios.get(`/realestate/checkout-session/${data}`);
//   console.log(session.data);
//   returnSession.value = session.data;

//   const portalResponse = await axios.post('/realestate/create-portal-session', {
//     session: returnSession.value,
//   });
//   window.location = portalResponse.data;
// }
</script>
<style scoped>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>
