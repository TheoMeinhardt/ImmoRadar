<template>
  <div>
    <div class="flex items-center justify-center min-h-screen bg-white py-48">
      <div class="flex flex-col">
        <div class="flex flex-col items-center">
          <div class="text-indigo-500 font-bold text-7xl">404</div>

          <div
            class="font-bold text-3xl xl:text-7xl lg:text-6xl md:text-5xl mt-10"
          >
            Diese Seite existiert nicht
          </div>

          <div
            class="text-gray-400 font-medium text-sm md:text-xl lg:text-2xl mt-8"
          >
            Die von Ihnen gesuchte Seite konnte nicht gefunden werden.
          </div>

          <button
            class="text-white bg-indigo-500 rounded-full px-8 py-3 mt-10 font-medium"
            @click="$router.push('/')"
          >
            Gehe zur Startseite
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

@media (max-width: 640px) {
  .text-4xl {
    font-size: 3rem;
  }
}
</style>
