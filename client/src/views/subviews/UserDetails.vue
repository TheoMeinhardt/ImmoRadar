<template>
  <div v-show="true" class="header text-center text-white">
    <div class="headerProfilePic">
      <div v-if="userStore.user.profilePic" class="userIconBigger"><q-img :src="userStore.user.profilePic" class="profilePic"></q-img></div>
      <div v-else class="userIconBigger">
        <q-icon name="fa-regular fa-user" size="xl" />
      </div>
    </div>

    <div class="headerText">
      <span class="headerName text-h4">{{ userStore.user.username }}</span>
    </div>
  </div>

  <q-form @submit="updateProfile" class="userDetailsForm">
    <q-list class="text-white bg-secondary q-mt-lg">
      <q-expansion-item :default-opened="true" :expand-icon-toggle="true" expand-icon-class="text-white" dense label="Personal Information">
        <q-card class="bg-secondary">
          <q-card-section class="q-pt-sm">
            <q-input label="Email *" :rules="emailRules" bg-color="white" :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }" class="profileInput" outlined v-model="email" />
            <q-input label="Phone Number" :rules="phoneRules" bg-color="white" :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }" class="profileInput q-mt-sm" outlined v-model="phone" />
            <q-input label="Company" bg-color="white" :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }" class="profileInput q-mt-sm" outlined v-model="company" />
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item :default-opened="true" :expand-icon-toggle="true" expand-icon-class="text-white" dense label="Name">
        <q-card class="bg-secondary">
          <q-card-section>
            <div class="twoInputsPerLine">
              <q-input label="Firstname *" :rules="fnameRules" bg-color="white" :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }" class="smallerProfileInput" outlined v-model="fname" />
              <q-input label="Middlename" :rules="mnameRules" bg-color="white" :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }" class="smallerProfileInput" outlined v-model="mname" />
            </div>

            <q-input label="Lastname *" :rules="lnameRules" bg-color="white" :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }" class="profileInput q-mt-sm" outlined v-model="lname" />
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item :default-opened="true" :expand-icon-toggle="true" expand-icon-class="text-white" dense label="Address">
        <q-card class="bg-secondary">
          <q-card-section>
            <q-input label="Whats your Address?" :rules="addressRules" bg-color="white" :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }" class="profileInput" outlined v-model="address" />

            <div class="twoInputsPerLine">
              <q-input label="ZIP-Code" :rules="zipRules" bg-color="white" :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }" class="smallerProfileInput q-mt-sm" outlined v-model="zip" />
              <q-input label="City" :rules="cityRules" bg-color="white" :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }" class="smallerProfileInput q-mt-sm" outlined v-model="city" />
            </div>

            <div class="twoInputsPerLine">
              <q-input label="State" :rules="stateRules" bg-color="white" :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }" class="smallerProfileInput q-mt-sm" outlined v-model="state" />
              <q-input label="Country" :rules="countryRules" bg-color="white" :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }" class="smallerProfileInput q-mt-sm" outlined v-model="country" />
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>

    <q-btn :disabled="submitInProgress" type="submit" color="primary" class="btn block q-mt-lg updateButton" rounded>
      <div v-if="!submitInProgress" class="text-subtitle1">Update Profile</div>
      <div v-else>
        <q-spinner-tail size="1em" thickness="5" />
        <q-tooltip :offset="[0, 8]">QSpinnerTail</q-tooltip>
      </div>
    </q-btn>
  </q-form>

  <div style="height: 150px"></div>
</template>

<script setup>
import axios from 'axios';
import { ref, watch } from 'vue';
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

//
// Form validation
//

const emailRules = [(val) => val.length > 0 || 'You need to provide an Email!', (val) => validateEmail(val) || 'Provided email is not valid'];
const phoneRules = [
  (val) => {
    if (val.length >= 1) validatePhoneNumber(val) || 'Provided phone number is not valid';
  },
];

const fnameRules = [(val) => val.length > 0 || 'Provide a Firstname', (val) => validateJustLetters(val) || 'Invalid name'];
const mnameRules = [(val) => validateJustLetters(val) || 'Invalid name'];
const lnameRules = [(val) => val.length > 0 || 'Provide a Surname', (val) => validateJustLetters(val) || 'Invalid name'];

let partialAddress = false;

// Checks if one of the address input's is filled with data. If one is, you have to fill out every other input.
// Should prevent just submitting a zip for exapmple.
watch([address, zip, city, state, country], ([newAdrs, newZip, newCity, newState, newCountry]) => {
  partialAddress = newAdrs.length > 0 || newZip.length > 0 || newCity.length > 0 || newState.length > 0 || newCountry.length > 0 ? true : false;
});

const addressRules = [
  (val) => {
    if (partialAddress) {
      if (!val.length > 0) return 'You need to provide an address!';
      else if (!validateAddress(val)) return 'Provided address is not valid!';
      else return true;
    } else return true;
  },
];
const zipRules = [
  (val) => {
    if (partialAddress) {
      if (!val.length > 0) return 'Provide a ZIP-Code';
      else if (isNaN(val) || Number(val) > 99950 || Number(val) < 501) return 'Invalid ZIP-Code';
      else return true;
    } else return true;
  },
];

const cityRules = [
  (val) => {
    if (partialAddress) {
      if (!val.length > 0) return 'Provide a City';
      else return true;
    } else return true;
  },
];
const stateRules = [
  (val) => {
    if (partialAddress) {
      if (!val.length > 0) return 'Provide a State';
      else return true;
    } else return true;
  },
];
const countryRules = [
  (val) => {
    if (partialAddress) {
      if (!val.length > 0) return 'Provide a Country';
      else return true;
    } else return true;
  },
];

function validateJustLetters(value) {
  const re = /^[A-Za-z]+$/;
  return re.test(String(value));
}

function validateEmail(value) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(value).toLowerCase());
}

function validatePhoneNumber(value) {
  const re = /^(\+|00)[1-9][0-9 \-().]{7,32}$/;
  return re.test(String(value));
}

function validateAddress(value) {
  const re = /^[A-Za-z0-9ßäöü/'.\-\s,]*$/;
  return re.test(String(value));
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

  float: left;

  position: absolute;
  top: 15%;
  right: 17%;

  height: 8vh;
  width: 15rem;

  animation: showDetailsHeaderText 1s ease forwards;
}

@keyframes showDetailsHeaderText {
  0% {
    margin: 0px;
  }
  100% {
    transform: scale(0.6);

    right: 10%;
    top: 1.5%;

    margin: 0px;
    margin-top: 10px;
  }
}

.headerName .headerEmail {
  display: inline-block;
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
    left: 12%;
    top: 0%;
  }
}

.profilePic {
  display: block;
  width: 100%;
  border-radius: 999px;
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
  height: 7rem;
  width: 7rem;
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
  margin-left: auto;
  margin-right: auto;

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
  width: 38vw;

  font-family: Quicksand Book;
}

.updateButton {
  width: 80vw;
  height: 5vh;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.q-field--outlined :deep(.q-field__control) {
  border-radius: 5px 5px 0px 0px !important;
}

.q-field--error :deep(.q-field__bottom) {
  font-weight: bolder;
  color: #dfdf36;
}
</style>
