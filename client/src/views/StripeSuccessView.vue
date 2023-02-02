<template>
  <div class="isolate bg-white">
    <main>
      <div class="relative px-6 lg:px-8">
        <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div class="flex flex-row flex-nowrap items-center">
            <p class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Zahlung erfolgreich abgeschlossen!
            </p>
            <i class="fa-solid fa-check fa-5x" style="color: green"></i>
          </div>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            Herzlichen Glückwunsch! Sie sind nun Premium-Mitglied bei uns und können von nun an
            unbegrenzt Immobilien hochladen ohne Werbung. Vielen Dank für Ihre Unterstützung und
            genießen Sie Ihre verbesserte Erfahrung. Vielen Dank!
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              class="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >Zurück zur Karte</a
            >
          </div>
        </div>
      </div>
      <div class="p-6 md:mx-auto">
        <div
          v-if="alreadyBought"
          class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
          role="alert"
        >
          <span class="font-medium">Info:</span> Sieht so aus, als hätten Sie unsere Premium Version
          bereits gekauft - Dankeschön!
        </div>
      </div>
      <div class="p-6 md:mx-auto">
        <div
          v-if="noPayment"
          class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
          role="alert"
        >
          <span class="font-medium">Info:</span> Es ist gerade keine Zahlung getätigt worden!
        </div>
      </div>
      <div class="p-6 md:mx-auto">
        <div
          v-if="invalidSessionID"
          class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
          role="alert"
        >
          <span class="font-medium">Vorsicht:</span> Diese Session ID ist ungültig und kann nicht
          zur Bezahlung verwendet werden!
        </div>
      </div>
      <div class="p-6 md:mx-auto">
        <div
          v-if="triedToSteal"
          class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span class="font-medium">Warnung:</span> Sieht aus, als hätten Sie gerade versucht
          Premium zu ergaunern!
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useUserStore } from '../stores/user.js';

const session_id = ref('');

const userStore = useUserStore();

const alreadyBought = ref(false);
const invalidSessionID = ref(false);
const triedToSteal = ref(false);
const noPayment = ref(false);

const dbSessionID = ref();

onMounted(async () => {
  //Premium
  const id = 'bec5a04c-7bcf-42f5-8b6c-0765923ec6be';

  //Kein Premium
  // const id = '8153a1fc-e958-4658-9451-e55df5a4db45';

  // Eigentlicher User
  // const id = usterStore.user.id;

  try {
    var hash = location.hash;
    var sessionHash = hash.match(/session_id=([^&]+)/);
    const dbSession = await axios.get(`/user/stripe/user/${id}`);
    dbSessionID.value = dbSession.data.session_id;
    if (sessionHash == null) {
      console.log('Es wurde keine Bezahlung durchgeführt!');
      noPayment.value = true;
      if (dbSession.data.session_id != null) {
        console.log('Hat schon Premium!');
        noPayment.value = false;
        alreadyBought.value = true;
      } else {
        console.log('Hat noch kein Premium, aber auch keine Session ID angegeben!');
        alreadyBought.value = false;
      }
    } else {
      var sessionId = sessionHash[1];
      if (dbSessionID.value != null) {
        console.log('Hat schon Premium!');
        alreadyBought.value = true;
      } else {
        const { data } = await axios.get(`/realestate/checkout-session/${sessionId}`);
        console.log(data);
        const stripeSession = data;
        if (stripeSession.id == null || stripeSession.id == undefined) {
          console.log('Es gibt diese Session nicht!');
          invalidSessionID.value = true;
        } else {
          session_id.value = sessionId;

          const dbSessionID = await axios.get(`/user/stripe/user/${id}`);

          const userID = await axios.get(`/user/stripe/session/${session_id.value}`);
          // console.log(userID.data.user_id);

          if (stripeSession.id === dbSessionID.data.session_id) {
            console.log('Hat schon Premium!');
            alreadyBought.value = true;
          } else {
            if (userID.data.user_id != id && userID.data.user_id != null) {
              console.log('Nicht klauen!');
              triedToSteal.value = true;
            } else {
              console.log('Zahlung wird gepseichert!');
              await axios.patch(`/user/stripe/${id}`, {
                session_id: session_id.value,
              });
            }
          }
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
});
</script>
<style scoped>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>
