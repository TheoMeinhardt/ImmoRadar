<template>
  <div class="bg-secondary">
    <main>
      <div class="relative px-6 lg:px-8">
        <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div class="text-center">
            <h1 class="text-4xl font-bold tracking-tight text-primary sm:text-6xl">
              Mehr, mit Immoradar Premium!
            </h1>
            <p class="mt-6 text-lg leading-8 text-white">
              Willkommen auf unserer Seite! Sie haben noch kein Premium-Konto. Als Premium-Mitglied
              genießen Sie Vorteile wie unbegrenztes Hochladen von Immobilien und keine Werbung.
              Upgraden Sie jetzt auf Premium und profitieren Sie von allen Vorteilen. Klicken Sie
              hier, um jetzt zu bezahlen.
            </p>
            <div class="mt-10 flex items-center justify-center gap-x-6">
              <button
                @click="createCheckout"
                class="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Jetzt upgraden
              </button>
              <a href="#" class="text-base font-semibold leading-7 text-white"
                >Zurück zur Karte <span aria-hidden="true">→</span></a
              >
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import axios from 'axios';

document.documentElement.style.overflow = 'hidden';
async function createCheckout() {
  console.log('test');
  const { data } = await axios.post('/realestate/create-checkout-session');
  console.log(data);
  window.location = data.url;
}
</script>
<style scoped>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>
