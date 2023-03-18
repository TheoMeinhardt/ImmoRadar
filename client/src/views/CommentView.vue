<script setup>
import axios from 'axios';
import { useQuasar } from 'quasar';
import { onMounted, ref } from 'vue';
const $q = useQuasar();
const posts = ref([]);
const currentUser = ref('32ab02c0-91a7-4865-8d7c-122c410614dc'); //John Smith
// const currentUser = ref('b3557569-9e06-4e17-b44c-fa71dd628670'); // Jane Doe

const postTitle = ref('');
const postContent = ref('');
const showEditPost = ref(false);
const showEditComment = ref(false);
const showDeletePost = ref(false);
const showDeleteComment = ref(false);

const currentPost = ref(null);
const currentComment = ref(null);

onMounted(async () => {
  const { data } = await axios.get('http://localhost:3000/realestate/2f7bfacf-d7f4-4ea2-a95e-5caaedbb88ef/posts');
  console.log(data);
  posts.value = data;
});

function PostLikeNoti(bool) {
  if (bool === true) {
    $q.notify({
      message: 'Sie haben den Post geliked!',
      color: 'green',
    });
  } else {
    $q.notify({
      message: 'Sie haben den Post entliked!',
      color: 'red',
    });
  }
}

// const checkLikedPost = async (postID, userID) => {
//   const { data } = await axios.get(
//     `http://localhost:3000/realestate/2f7bfacf-d7f4-4ea2-a95e-5caaedbb88ef/posts/${userID}/${postID}`,
//   );
//   console.log(data.exists);
//   return data.exists;
// };

const formatDate = (date) => {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Date(date).toLocaleString('de-DE', options);
};

const postPost = async () => {
  try {
    if (postTitle.value == '' || postContent.value == '') {
      $q.notify({
        message: 'Bitte alle Felder asufüllen!',
        color: 'red',
      });
    } else {
      const { data } = await axios.post('http://localhost:3000/realestate/2f7bfacf-d7f4-4ea2-a95e-5caaedbb88ef/posts', {
        title: postTitle.value,
        content: postContent.value,
        user_id: currentUser.value,
      });
      console.log(data);
    }
  } catch (error) {
    console.error(error);
  }
};

const deletePost = async (postID) => {
  try {
    console.log(currentUser.value);
    const { data } = await axios.delete(`http://localhost:3000/realestate/2f7bfacf-d7f4-4ea2-a95e-5caaedbb88ef/posts/${postID}`, { data: { user_id: currentUser.value } });
    $q.notify({
      message: 'Sie haben den Post geliked!',
      color: 'green',
    });
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
</script>
<template>
  <section class="py-8 lg:py-16">
    <div class="max-w-2xl mx-auto px-4">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Meinungen ({{ posts.length }})</h2>
      </div>
      <form class="mb-6">
        <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <textarea v-model="postTitle" id="postTitle" rows="1" class="px-0 w-full text-lg border-0 focus:ring-0 focus:outline-none" placeholder="Title..." required></textarea>
          <textarea v-model="postContent" id="postContent" rows="5" class="px-0 w-full text-sm border-0 focus:ring-0 focus:outline-none" placeholder="Content..." required></textarea>
        </div>
        <button
          @click="postPost"
          class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
        >
          Post comment
        </button>
      </form>
      <div v-for="p in posts" :key="p.id">
        <article class="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
          <footer class="flex justify-between items-center mb-2">
            <div class="flex items-center">
              <p class="inline-flex items-center mr-3 text-sm">
                <img class="mr-2 w-6 h-6 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Michael Gough" />{{ p.userName }}
              </p>
              <p class="text-sm dark:text-gray-400">
                {{ formatDate(p.createdAt) }}
              </p>
            </div>
            <div>
              <button>
                <i v-if="p.userID == currentUser" @click="(currentPost = p), (showDeletePost = !showDeletePost)" class="fa-sharp fa-solid fa-trash q-mx-md text-red"></i>
              </button>
              <button>
                <i v-if="p.userID == currentUser" class="fa-solid fa-pen-to-square q-mx-md text-primary" @click="(currentPost = p), (showEditPost = true)"></i>
              </button>
            </div>
          </footer>
          <p class="text-h5 q-pb-sm">{{ p.title }}</p>
          <p class="">
            {{ p.content }}
          </p>
          <div class="q-my-md py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700" v-if="showEditPost && currentPost === p">
            <q-input required v-model="p.title" type="text" label="Title" />
            <q-input required v-model="p.content" type="text" label="Content" class="q-mb-md" />
            <div class="flex justify-end">
              <button
                @click="showEditPost = false"
                type="submit"
                class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-accent rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 ml-4"
              >
                Cancel
              </button>
              <button
                @click="showEditPost = false"
                type="submit"
                class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 ml-4"
              >
                Save
              </button>
            </div>
          </div>

          <div class="flex items-center mt-4">
            <button type="button" @click="PostLikeNoti(true)" class="flex items-center text-sm">
              <i class="fa-solid fa-heart q-mr-sm text-primary"></i>
            </button>
            <p class="q-pr-sm">{{ p.likes.count }}</p>
            <button v-if="p.likes.count > 0" @click="PostLikeNoti(false)" type="button" class="flex items-center text-sm">
              <i class="fa-regular fa-heart q-mr-sm text-primary"></i>
            </button>
            <button type="button" class="flex items-center text-sm mx-4">
              <i class="fa-solid fa-reply q-mx-sm text-primary"></i>
              <p>Reply</p>
            </button>
          </div>
        </article>
        <article class="p-6 mb-6 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900" v-for="(c, i) in p.comments" :key="i">
          <footer class="flex justify-between items-center mb-2">
            <div class="flex items-center">
              <p class="inline-flex items-center mr-3 text-sm">
                <img class="mr-2 w-6 h-6 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Jese Leos" />{{ c.userName }}
              </p>
              <p class="text-sm dark:text-gray-400">
                <time pubdate datetime="2022-02-12" title="February 12th, 2022">{{ formatDate(c.createdAt) }}</time>
              </p>
            </div>
            <div>
              <button>
                <i v-if="c.userID == currentUser" @click="(currentComment = c), (showDeleteComment = !showDeleteComment)" class="fa-sharp fa-solid fa-trash q-mx-md text-red"></i>
              </button>
              <button>
                <i v-if="c.userID == currentUser" class="fa-solid fa-pen-to-square q-mx-md text-primary" @click="(currentComment = c), (showEditComment = true)"></i>
              </button>
            </div>
          </footer>
          <p class="">{{ c.content }}</p>
          <div class="q-my-md py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700" v-if="showEditComment && currentComment === c">
            <q-input required v-model="p.title" type="text" label="Title" />
            <q-input required v-model="p.content" type="text" label="Content" class="q-mb-md" />
            <div class="flex justify-end">
              <button
                @click="showEditComment = false"
                type="submit"
                class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-accent rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 ml-4"
              >
                Cancel
              </button>
              <button
                @click="showEditComment = false"
                type="submit"
                class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 ml-4"
              >
                Save
              </button>
            </div>
          </div>
          <div class="flex items-center mt-4">
            <button type="button" class="flex items-center text-sm">
              <i class="fa-solid fa-heart q-mr-sm text-primary"></i>
            </button>
            <p class="q-pr-sm">{{ c.likes.count }}</p>
            <button v-if="c.likes.count > 0">
              <i class="fa-regular fa-heart q-mr-sm text-primary"></i>
            </button>
          </div>
        </article>
      </div>
    </div>
    <q-dialog v-model="showDeletePost">
      <div class="relative w-full h-full max-w-md md:h-auto">
        <div class="relative bg-white rounded-lg shadow">
          <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="popup-modal">
            <i v-close-popup class="fa-solid fa-x"></i>
            <span v-close-popup class="sr-only">Close modal</span>
          </button>
          <div class="p-6 text-center">
            <i class="fa-solid fa-circle-exclamation fa-5x text-red q-mb-sm"></i>
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this post?</h3>
            <div class="q-mb-md">
              <p class="text-subtitle1">"{{ currentPost.title }}"</p>
              <p>"{{ currentPost.content }}"</p>
            </div>
            <button
              v-close-popup
              type="button"
              @click="deletePost(currentPost.postID)"
              class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              Yes, I'm sure
            </button>
            <button
              v-close-popup
              type="button"
              class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </q-dialog>
    <q-dialog v-model="showDeleteComment">
      <div class="relative w-full h-full max-w-md md:h-auto">
        <div class="relative bg-white rounded-lg shadow">
          <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="popup-modal">
            <i v-close-popup class="fa-solid fa-x"></i>
            <span v-close-popup class="sr-only">Close modal</span>
          </button>
          <div class="p-6 text-center">
            <i class="fa-solid fa-circle-exclamation fa-5x text-red q-mb-sm"></i>
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this comment?</h3>
            <div class="q-mb-md">
              <p>"{{ currentComment.content }}"</p>
            </div>
            <button
              v-close-popup
              type="button"
              class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              Yes, I'm sure
            </button>
            <button
              v-close-popup
              type="button"
              class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </q-dialog>
  </section>
</template>
<style scoped>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>
