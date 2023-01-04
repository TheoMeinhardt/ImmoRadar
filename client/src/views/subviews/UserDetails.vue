<template>
  <form @submit.prevent="updateProfile">
    <q-input label="Whats your Email?" bg-color="white" :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }" class="profileInput" outlined v-model="email" />
    <q-input label="Phone Number" bg-color="white" :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }" class="profileInput" outlined v-model="phone" />
    <q-input label="Whats your Address?" bg-color="white" :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }" class="profileInput" outlined v-model="address" />

    <div class="twoInputsPerLine">
      <q-input label="ZIP-Code" bg-color="white" :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }" class="smallerProfileInput" outlined v-model="zip" />
      <q-input label="City" bg-color="white" :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }" class="smallerProfileInput" outlined v-model="city" />
    </div>

    <div class="twoInputsPerLine">
      <q-input label="State" bg-color="white" :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }" class="smallerProfileInput" outlined v-model="state" />
      <q-input label="Country" bg-color="white" :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }" class="smallerProfileInput" outlined v-model="country" />
    </div>

    <div class="twoInputsPerLine">
      <q-input label="Firstname" bg-color="white" :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }" class="smallerProfileInput" outlined v-model="fname" />
      <q-input label="Middlename" bg-color="white" :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }" class="smallerProfileInput" outlined v-model="mname" />
    </div>

    <q-input label="Lastname" bg-color="white" :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }" class="profileInput" outlined v-model="lname" />
    <q-input label="Company" bg-color="white" :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }" class="profileInput" outlined v-model="company" />

    <q-btn :disabled="submitInProgress" type="submit" color="primary" class="btn block updateButton" rounded>
      <div v-if="!submitInProgress" class="text-subtitle1">Update Profile</div>
      <div v-else>
        <q-spinner-tail size="1em" thickness="5" />
        <q-tooltip :offset="[0, 8]">QSpinnerTail</q-tooltip>
      </div>
    </q-btn>
  </form>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useUserStore } from '../../stores/user';

const router = useRouter();

const userStore = useUserStore();
const submitInProgress = ref(false);

const email = ref(userStore.user.email);
const phone = ref(userStore.user.phone);
const fname = ref(userStore.user.firstname);
const mname = ref(userStore.user.middlename);
const lname = ref(userStore.user.lastname);
const company = ref(userStore.user.company);
const address = ref(userStore.user.address ? userStore.user.address.address : undefined);
const zip = ref(userStore.user.address ? userStore.user.address.zip : undefined);
const city = ref(userStore.user.address ? userStore.user.address.city : undefined);
const state = ref(userStore.user.address ? userStore.user.address.state : undefined);
const country = ref(userStore.user.address ? userStore.user.address.country : undefined);

async function updateProfile() {
  submitInProgress.value = true;
  try {
    const res = await axios.patch(`/user/${userStore.user.userID}`, {
      email: email.value,
      phone: phone.value,
      firstname: fname.value,
      middlename: mname.value,
      lastname: lname.value,
      company: company.value,
      address: {
        addressID: userStore.user.address ? (userStore.user.address.addressID ? userStore.user.address.addressID : null) : null,
        address: address.value,
        zip: Number(zip.value),
        city: city.value,
        state: state.value,
        country: country.value,
      },
    });

    if (res.status === 200) {
      submitInProgress.value = false;
      router.push('/user/details');
    }
  } catch (err) {
    submitInProgress.value = false;
    console.log(err);
  }
}
</script>

<style scoped>
.profileInput {
  font-family: Quicksand Book;
  width: 80vw;
  margin: auto;
  margin-top: 2.5vh;

  border-radius: 5px 5px 0px 0px;
}

.twoInputsPerLine {
  display: flex;
  justify-content: space-between;

  width: 80vw;
  margin: 0vh auto 0vh auto;

  font-family: Quicksand Book;
}

.smallerProfileInput {
  margin-top: 2.5vh;
  width: 38vw;

  font-family: Quicksand Book;
}

.updateButton {
  width: 80vw;
  height: 5vh;
  margin-top: 2.5vh;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.q-field--outlined :deep(.q-field__control) {
  border-radius: 5px 5px 0px 0px !important;
}
</style>
