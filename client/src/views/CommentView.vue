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
const showReply = ref(false);
const currentEsate = ref(null);

const currentPost = ref(null);
const currentComment = ref(null);
const comment = ref('');

onMounted(async () => {
  const { data } = await axios.get('http://localhost:3000/realestate/2f7bfacf-d7f4-4ea2-a95e-5caaedbb88ef/posts');
  posts.value = data;
  console.log(sortPostsByDate(data));
});

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

const sortPostsByDate = (posts) => {
  posts.sort(function (a, b) {
    var c = new Date(a.createdAt);
    var d = new Date(b.createdAt);
    var erg = c - d;
    console.log(erg);
    return erg;
  });
};

// -------------- POSTS --------------

const postPost = async () => {
  try {
    if (postTitle.value == '' || postContent.value == '') {
      $q.notify({
        message: 'Bitte alle Felder ausfüllen!',
        color: 'red',
      });
    } else {
      await axios.post('http://localhost:3000/realestate/2f7bfacf-d7f4-4ea2-a95e-5caaedbb88ef/posts', {
        title: postTitle.value,
        content: postContent.value,
        user_id: currentUser.value,
      });
      $q.notify({
        message: 'Sie haben den Post gesendet!',
        color: 'green',
      });
    }
  } catch (error) {
    $q.notify({
      message: 'Fehler beim Sende des Posts!',
      color: 'red',
    });
    console.error(error);
  }
};

const deletePost = async (postID) => {
  try {
    await axios.delete(`http://localhost:3000/realestate/posts/${postID}`, { data: { user_id: currentUser.value } });
    $q.notify({
      message: 'Sie haben den Post gelöscht!',
      color: 'green',
    });
  } catch (error) {
    console.error(error);
    $q.notify({
      message: 'Fehler beim Löschen!',
      color: 'red',
    });
  }
};

const sendComment = async (postID) => {
  try {
    await axios.post(`http://localhost:3000/realestate/posts/${postID}/comments`, {
      user_id: currentUser.value,
      content: comment.value,
    });
    $q.notify({
      message: 'Sie haben den Kommentar gesendet!',
      color: 'green',
    });
  } catch (error) {
    console.error(error);
    $q.notify({
      message: 'Fehler beim Senden des Kommentars!',
      color: 'red',
    });
  }
};

const likePost = async (postID) => {
  try {
    const { data } = await axios.post(`http://localhost:3000/realestate/posts/${postID}/like`, {
      user_id: currentUser.value,
    });
    if (data.error === 'Like already exists') {
      $q.notify({
        message: 'Sie haben den Post schon geliked!',
        color: 'green',
      });
    } else {
      $q.notify({
        message: 'Sie haben den Post geliked!',
        color: 'green',
      });
    }
  } catch (error) {
    console.error(error);
    $q.notify({
      message: 'Fehler beim Liken des Posts!',
      color: 'red',
    });
  }
};

const unlikePost = async (postID) => {
  try {
    const { data } = await axios.delete(`http://localhost:3000/realestate/posts/${postID}/unlike`, { data: { user_id: currentUser.value } });
    if (data.error === 'Like does not exist') {
      $q.notify({
        message: 'Sie haben den Post nicht geliked!',
        color: 'red',
      });
    } else {
      $q.notify({
        message: 'Sie haben den Post entliked!',
        color: 'green',
      });
    }
  } catch (error) {
    console.error(error);
    $q.notify({
      message: 'Fehler beim Liken des Posts!',
      color: 'red',
    });
  }
};

const editPost = async (post) => {
  try {
    const postID = post.postID;
    await axios.patch(`http://localhost:3000/realestate/posts/${postID}`, {
      title: post.title,
      content: post.content,
      user_id: currentUser.value,
    });
    $q.notify({
      message: 'Sie haben den Post geändert!',
      color: 'green',
    });
  } catch (error) {
    console.error(error);
    $q.notify({
      message: 'Fehler beim Ändern!',
      color: 'red',
    });
  }
};

// -------------- COMMENTS --------------

const deleteComment = async (commentID) => {
  try {
    await axios.delete(`http://localhost:3000/realestate/posts/comments/${commentID}`, { data: { user_id: currentUser.value } });
    $q.notify({
      message: 'Sie haben den Kommentar gelöscht!',
      color: 'green',
    });
  } catch (error) {
    console.error(error);
    $q.notify({
      message: 'Fehler beim Löschen!',
      color: 'red',
    });
  }
};

const editComment = async (comment) => {
  try {
    const commentID = comment.commentID;
    await axios.patch(`http://localhost:3000/realestate/posts/comments/${commentID}`, {
      content: comment.content,
      user_id: currentUser.value,
    });
    $q.notify({
      message: 'Sie haben den Kommentar geändert!',
      color: 'green',
    });
  } catch (error) {
    console.error(error);
    $q.notify({
      message: 'Fehler beim Ändern!',
      color: 'red',
    });
  }
};

const likeComment = async (commentID) => {
  try {
    const { data } = await axios.post(`http://localhost:3000/realestate/posts/comments/${commentID}/like`, {
      user_id: currentUser.value,
    });

    if (data.error === 'Like already exists') {
      $q.notify({
        message: 'Sie haben den Kommentar schon geliked!',
        color: 'green',
      });
    } else {
      $q.notify({
        message: 'Sie haben den Kommentar geliked!',
        color: 'green',
      });
    }
  } catch (error) {
    console.error(error);
    $q.notify({
      message: 'Fehler beim Liken des Kommentars!',
      color: 'red',
    });
  }
};

const unlikeComment = async (commentID) => {
  try {
    const { data } = await axios.delete(`http://localhost:3000/realestate/posts/comments/${commentID}/unlike`, { data: { user_id: currentUser.value } });
    if (data.error === 'Like does not exist') {
      $q.notify({
        message: 'Sie haben den Post nicht geliked!',
        color: 'red',
      });
    } else {
      $q.notify({
        message: 'Sie haben den Post entliked!',
        color: 'green',
      });
    }
  } catch (error) {
    console.error(error);
    $q.notify({
      message: 'Fehler beim Liken des Posts!',
      color: 'red',
    });
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
            <div class="gt-xs">
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
            <p class="text-subtitle1 q-py-sm">Editier deinen Post</p>
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
                @click="(showEditPost = false), editPost(p)"
                type="submit"
                class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 ml-4"
              >
                Save
              </button>
            </div>
          </div>

          <div class="flex items-center mt-4">
            <button type="button" @click="likePost(p.postID)" class="flex items-center text-sm">
              <i class="fa-solid fa-heart q-mr-sm text-primary"></i>
            </button>
            <p class="q-pr-sm">{{ p.likes.count }}</p>
            <button v-if="p.likes.count > 0" @click="unlikePost(p.postID)" type="button" class="flex items-center text-sm">
              <i class="fa-regular fa-heart q-mr-sm text-primary"></i>
            </button>
            <button @click="(currentPost = p), (showReply = true)" type="button" class="flex items-center text-sm mx-4">
              <i class="fa-solid fa-reply q-mx-sm text-primary"></i>
              <p>Reply</p>
            </button>
            <div class="lt-sm">
              <button>
                <i v-if="p.userID == currentUser" @click="(currentPost = p), (showDeletePost = !showDeletePost)" class="fa-sharp fa-solid fa-trash q-mx-md text-red"></i>
              </button>
              <button>
                <i v-if="p.userID == currentUser" class="fa-solid fa-pen-to-square q-mx-md text-primary" @click="(currentPost = p), (showEditPost = true)"></i>
              </button>
            </div>
          </div>
          <div class="q-my-md py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700" v-if="showReply && currentPost === p">
            <p class="text-subtitle1 q-py-sm">Schreibe einen Kommentar</p>
            <q-input required v-model="comment" type="text" label="Content" class="q-mb-md" />
            <div class="flex justify-end">
              <button
                @click="(showReply = false), (comment = '')"
                type="submit"
                class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-accent rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 ml-4"
              >
                Cancel
              </button>
              <button
                @click="(showReply = false), sendComment(p.postID)"
                type="submit"
                class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 ml-4"
              >
                Send
              </button>
            </div>
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
            <div class="gt-xs">
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
            <q-input required v-model="c.content" type="text" label="Content" class="q-mb-md" />
            <div class="flex justify-end">
              <button
                @click="showEditComment = false"
                type="submit"
                class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-accent rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 ml-4"
              >
                Cancel
              </button>
              <button
                @click="(showEditComment = false), editComment(c)"
                type="submit"
                class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 ml-4"
              >
                Save
              </button>
            </div>
          </div>
          <div class="flex items-center mt-4">
            <button @click="likeComment(c.commentID)" type="button" class="flex items-center text-sm">
              <i class="fa-solid fa-heart q-mr-sm text-primary"></i>
            </button>
            <p class="q-pr-sm">{{ c.likes.count }}</p>
            <button @click="unlikeComment(c.commentID)" type="button" v-if="c.likes.count > 0">
              <i class="fa-regular fa-heart q-mr-sm text-primary"></i>
            </button>
            <div class="lt-sm">
              <button>
                <i v-if="c.userID == currentUser" @click="(currentComment = c), (showDeleteComment = !showDeleteComment)" class="fa-sharp fa-solid fa-trash q-mx-md text-red"></i>
              </button>
              <button>
                <i v-if="c.userID == currentUser" class="fa-solid fa-pen-to-square q-mx-md text-primary" @click="(currentComment = c), (showEditComment = true)"></i>
              </button>
            </div>
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
              @click="deleteComment(currentComment.commentID)"
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
