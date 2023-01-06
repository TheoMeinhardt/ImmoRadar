<template>
  <div v-show="true" class="header text-center text-white">
    <div class="headerProfilePic">
      <q-img v-if="userStore.user.profilePic" :src="userStore.user.profilePic" class="profilePic"></q-img>
      <div v-else class="userIconBigger">
        <q-icon name="fa-regular fa-user" size="xl" />
      </div>
    </div>

    <div class="headerText">
      <span class="headerName text-h4">{{ userStore.user.username }}</span>
      <span class="headerEmail text-body2 text-grey">{{ userStore.user.email }}</span>
    </div>
  </div>

  <form @submit.prevent="updateProfile" class="userDetailsForm">
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
.header {
  margin-top: 10vh;
  width: 100%;

  animation: showDetailsHeader 1s ease forwards;
}

@keyframes showDetailsHeader {
  0% {
    height: 20vh;
  }
  100% {
    margin-top: 1vh;
    height: 10vh;
  }
}

.headerText {
  display: inline-flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 15%;
  left: 17%;

  width: fit-content;
  height: 8vh;

  animation: showDetailsHeaderText 1s ease forwards;
}

@keyframes showDetailsHeaderText {
  0% {
    margin: 0px;
  }
  100% {
    transform: scale(0.6);

    left: 25%;
    top: 1.5%;

    margin: 0px;
    margin-top: 10px;
  }
}

.headerName {
  display: inline;
}

.headerEmail {
  display: inline;
}

.headerProfilePic {
  display: inline;
  width: fit-content;

  position: absolute;
  left: 39%;
  top: 0%;

  animation: showDetailsHeaderProfilePic 1s ease forwards;
}

@keyframes showDetailsHeaderProfilePic {
  0% {
    left: 39%;
    top: 0%;
  }
  100% {
    margin-right: -2rem;
    left: 12%;
    top: 0%;
  }
}

.profilePic {
  display: inline;
  width: 25vw;
  border-radius: 999px;

  animation: showDetailsProfilePic 1s ease forwards;
}

@keyframes showDetailsProfilePic {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.5);
  }
}

.userIconBigger {
  border-radius: 999px;
  background-color: #545975;
  height: 25vw;
  width: 25vw;
  margin-left: auto;
  margin-right: auto;

  display: inline-flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: center;

  animation: showDetailsProfilePic 1s ease forwards;
}

.userDetailsForm {
  animation: showDetailsForm 2s ease forwards;
}

@keyframes showDetailsForm {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

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
