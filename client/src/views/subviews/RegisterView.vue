<template>
  <form @submit.prevent="submitRegister" class="q-mx-md">
    <div v-if="registerErrors.length > 0" class="error-message-container">
      <p class="text-white">{{ registerErrors }}</p>
    </div>

    <q-input type="text" bg-color="white" style="font-family: Quicksand-Book" :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }" class="q-my-lg" rounded outlined v-model="username" label="Username" />
    <q-input type="email" bg-color="white" style="font-family: Quicksand-Book" :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }" rounded outlined v-model="email" label="Email" />
    <q-input v-model="password" type="password" bg-color="white" style="font-family: Quicksand-Book" :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }" class="q-my-lg" rounded outlined label="Password" />
    <q-input v-model="passwordConfirm" type="password" bg-color="white" style="font-family: Quicksand-Book" :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }" class="q-my-lg" rounded outlined label="Confirm Password" />

    <div style="text-align: center; background-color: #4b506e">
      <q-btn :disabled="submitInProgress" type="submit" rounded color="light-blue-3" style="font-family: Keep Calm; width: 300px" align="center" class="btn">
        <div v-if="!submitInProgress">Register</div>
        <div v-else>
          <q-spinner-tail size="1em" thickness="5" />
          <q-tooltip :offset="[0, 8]">QSpinnerTail</q-tooltip>
        </div>
      </q-btn>
    </div>
  </form>
</template>

<script setup>
import axios from 'axios';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const username = ref('');
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const registerErrors = ref('');
const submitInProgress = ref(false);

watch(password, () => {
  checkPasswordsMatch();
});

watch(passwordConfirm, () => {
  checkPasswordsMatch();
});

async function submitRegister() {
  try {
    submitInProgress.value = true;
    if (password.value !== passwordConfirm.value) {
      submitInProgress.value = false;
      registerErrors.value = 'Passwords do not match!';
    } else {
      const { data } = await axios.post('/api/user', {
        name: username.value,
        email: email.value,
        password: password.value,
      });

      console.log(data);
      router.push('/form');
    }
  } catch (err) {
    registerErrors.value = 'There was an Error!';
    submitInProgress.value = false;
  }
}

function checkPasswordsMatch() {
  if (password.value !== passwordConfirm.value) registerErrors.value = 'Passwords do not match!';
  else registerErrors.value = '';
}
</script>

<style>
.btn {
  margin: auto;
  width: 50%;
}
</style>
