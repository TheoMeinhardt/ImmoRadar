<template>
  <section class="py-8 lg:py-16">
    <div class="max-w-2xl mx-auto px-4">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
          Discussion (20)
        </h2>
      </div>
      <form class="mb-6">
        <div
          class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
        >
          <label for="comment" class="sr-only">Your comment</label>
          <textarea
            id="comment"
            rows="6"
            class="px-0 w-full text-sm border-0 focus:ring-0 focus:outline-none"
            placeholder="Write a comment..."
            required
          ></textarea>
        </div>
        <button
          type="submit"
          class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
        >
          Post comment
        </button>
      </form>
      <article class="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
        <footer class="flex justify-between items-center mb-2">
          <div class="flex items-center">
            <p class="inline-flex items-center mr-3 text-sm">
              <img
                class="mr-2 w-6 h-6 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                alt="Michael Gough"
              />Michael Gough
            </p>
            <p class="text-sm dark:text-gray-400">
              <time pubdate datetime="2022-02-08" title="February 8th, 2022"
                >Feb. 8, 2022</time
              >
            </p>
          </div>
          <div>
            <i class="fa-sharp fa-solid fa-trash q-mx-md"></i>
            <i class="fa-solid fa-pen-to-square q-mx-md"></i>
          </div>
        </footer>
        <p class="">
          Very straight-to-point article. Really worth time reading. Thank you!
          But tools are just the instruments for the UX designers. The knowledge
          of the design tools are as important as the creation of the design
          strategy.
        </p>
        <div class="flex items-center mt-4 space-x-4">
          <button
            type="button"
            class="flex items-center text-sm hover:underline"
          >
            <i class="fa-solid fa-reply q-mr-sm"></i>
            Reply
          </button>
        </div>
      </article>
      <article
        class="p-6 mb-6 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900"
      >
        <footer class="flex justify-between items-center mb-2">
          <div class="flex items-center">
            <p class="inline-flex items-center mr-3 text-sm">
              <img
                class="mr-2 w-6 h-6 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="Jese Leos"
              />Jese Leos
            </p>
            <p class="text-sm dark:text-gray-400">
              <time pubdate datetime="2022-02-12" title="February 12th, 2022"
                >Feb. 12, 2022</time
              >
            </p>
          </div>
          <div>
            <i class="fa-sharp fa-solid fa-trash q-mx-md"></i>
            <i class="fa-solid fa-pen-to-square q-mx-md"></i>
          </div>
        </footer>
        <p class="">Much appreciated! Glad you liked it!</p>
      </article>
    </div>
  </section>
</template>
<style scoped>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>
