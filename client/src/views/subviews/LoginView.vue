<template>
  <form @submit.prevent="submitLogin" class="q-mx-md">
    <div v-if="loginErrors.length > 0" class="error-message-container">
      <p class="text-white">{{ loginErrors }}</p>
    </div>
    <q-input type="email" bg-color="white" style="font-family: Quicksand Book" :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }" class="q-my-lg" rounded outlined v-model="email" label="Email" required />
    <q-input type="password" bg-color="white" style="font-family: Quicksand Book" :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }" rounded outlined v-model="password" label="Password" required />

    <div class="q-pa-md">
      <q-checkbox dark class="text-white" v-model="rememberMe" label="Remember me" style="font-family: Keep Calm" />
    </div>

    <div style="font-family: Keep Calm; text-align: center">
      <q-btn :disabled="submitInProgress" type="submit" rounded color="light-blue-3" style="width: 300px" align="center" class="btn block">
        <div v-if="!submitInProgress">Login</div>
        <div v-else>
          <q-spinner-tail size="1em" thickness="5" />
          <q-tooltip :offset="[0, 8]">QSpinnerTail</q-tooltip>
        </div>
      </q-btn>

      <div>
        <span class="text-white text-caption q-my-sm block">or</span>
        <span @click="$router.push('/')" class="text-white cursor-pointer block">proceed without logging in</span>
      </div>
    </div>
  </form>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../stores/user';

const router = useRouter();
const userStore = useUserStore();

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const loginErrors = ref('');
const submitInProgress = ref(false);

async function submitLogin() {
  try {
    submitInProgress.value = true;
    const res = await axios.post('/user/login', {
      email: email.value,
      password: password.value,
    });

    if (res.status === 200 && res.data !== false) {
      const { jwt, user } = res.data;
      userStore.jwt = jwt;
      userStore.user = user;
      userStore.user.password = 'Fantasier nicht';
      axios.defaults.headers.common['authorization'] = userStore.jwt;

      router.push('/');
    } else if (res.status === 200 && res.data === false) {
      loginErrors.value = 'Invalid Email or Password!';
      submitInProgress.value = false;
    }
  } catch (err) {
    if (err.request.status === 400) loginErrors.value = 'Invalid Email or Password!';
    submitInProgress.value = false;
  }
}
</script>

<style>
.error-message-container {
  border: 2px #ec5864 solid;
  border-radius: 99px;
  padding-left: 15px;
  height: 2.5rem;
  line-height: 2.31rem;

  background-color: #ec58646a;
}

body {
  background-color: #4b506e;
}
</style>
