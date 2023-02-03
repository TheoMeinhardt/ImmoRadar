<script setup>
import { ref } from 'vue';
import NavBar from '@/components/NavBar.vue';

const step = ref(1);
const stepperRef = ref(null);
const addressRef = ref(null);
const cityRef = ref(null);
const constructionYearRef = ref(null);
const estatePriceRef = ref(null);
const heatingPriceRef = ref(null);
const propAreaRef = ref(null);
const useAreaRef = ref(null);
const roomsRef = ref(null);
const bathroomsRef = ref(null);
const bedroomsRef = ref(null);
const heatingTypeRef = ref(null);
const heatingCombustibleRef = ref(null);
const fgeeRef = ref(null);
const hwbRef = ref(null);

const estate = ref('');
const address = ref('');
const city = ref('');
const constructionYear = ref('');
const description = ref('');
const state = ref('buyable');
const estatePrice = ref(null);
const heatingPrice = ref(null);
const propArea = ref(null);
const useArea = ref(null);
const outArea = ref(null);
const rooms = ref(null);
const bathrooms = ref(null);
const bedrooms = ref(null);
const fgee = ref(null);
const hwb = ref(null);
const energyCertificate = ref(null); //ein File Object
const heatingType = ref(null);
const heatingCombustible = ref(null);
const files = ref(null); //ein Array aus File Objects

const heatingTypes = [
  'Central Heating',
  'Floor Heating',
  'Electric Heating',
  'Gas Heating',
  'Wood Heating',
  'Solar Heating',
  'Heat Pump',
  'Other',
];

const heatingCombustibles = ['Gas', 'Oil', 'Wood', 'Electricity', 'Solar', 'Heat Pump', 'Other'];

const addRoom = () => {
  rooms.value++;
};

const removeRoom = () => {
  if (rooms.value > 0) {
    rooms.value--;
  }
};

const addBathroom = () => {
  bathrooms.value++;
};

const removeBathroom = () => {
  if (bathrooms.value > 0) {
    bathrooms.value--;
  }
};

const addBedroom = () => {
  bedrooms.value++;
};

const removeBedroom = () => {
  if (bedrooms.value > 0) {
    bedrooms.value--;
  }
};

const sum = (num1, num2) => {
  const res = num1 + num2;
  return res;
};

function onContinueStep() {
  switch (step.value) {
    case 1:
      addressRef.value.validate();
      cityRef.value.validate();
      if (!addressRef.value.hasError && !cityRef.value.hasError) {
        stepperRef.value.next();
      }
      break;
    case 2:
      estatePriceRef.value.validate();
      heatingPriceRef.value.validate();
      propAreaRef.value.validate();
      useAreaRef.value.validate();
      if (
        !estatePriceRef.value.hasError &&
        !heatingPriceRef.value.hasError &&
        !propAreaRef.value.hasError &&
        !useAreaRef.value.hasError
      ) {
        stepperRef.value.next();
      }
      break;
    case 3:
      roomsRef.value.validate();
      bathroomsRef.value.validate();
      bedroomsRef.value.validate();
      if (!roomsRef.value.hasError && !bathroomsRef.value.hasError && !bedroomsRef.value.hasError) {
        stepperRef.value.next();
      }
      break;
    default:
      alert('Form submitted');
      break;
  }
}
</script>

<template>
  <q-layout>
    <q-page-container>
      <q-stepper
        v-model="step"
        ref="stepperRef"
        style="background-color: #4b506e"
        animated
        flat
        header-nav="true"
      >
        <div class="text-center">
          <div
            class="fontSize q-mt-md text-white"
            style="font-family: Quicksand; text-align: center"
          >
            Create new real estate
            <q-icon class="q-ml-sm" name="fa-solid fa-house-chimney-medical"></q-icon>
          </div>
        </div>
        <q-step
          :name="1"
          title=""
          icon="img:/images/1.svg"
          active-color="primary"
          active-icon="none"
        >
          <div class="q-mx-md">
            <p class="text-white" style="font-family: Keep Calm">Basic information</p>
            <q-input
              v-model="estate"
              bg-color="white"
              label="Name of the estate"
              :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }"
              class="q-my-md myInput"
              borderless
            ></q-input>
            <q-input
              v-model="address"
              ref="addressRef"
              bg-color="white"
              label="Whats the address*"
              style="font-family: Quicksand Book"
              :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }"
              class="q-my-md myInput"
              borderless
              :rules="[(val) => val.length > 0 || 'Please enter a valid address']"
            ></q-input>
            <q-input
              v-model="city"
              ref="cityRef"
              bg-color="white"
              label="City and PLZ*"
              style="font-family: Quicksand Book"
              :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }"
              class="q-my-md myInput"
              borderless
              :rules="[(val) => val.length > 0 || 'Please enter a valid city']"
            ></q-input>
            <q-input
              v-model="constructionYear"
              ref="constructionYearRef"
              bg-color="white"
              label="Construction Year"
              style="font-family: Quicksand Book"
              :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }"
              class="q-my-md myInput"
              borderless
              :rules="[
                (val) => val.length === 4 || 'Please enter a valid year',
                (val) => 1800 <= val <= 2023 || 'Please enter a valid year',
              ]"
            ></q-input>
            <q-editor
              v-model="description"
              placeholder="Description"
              bg-color="white"
              label="Description of the address"
              style="font-family: Quicksand Book"
              :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }"
              class="q-my-md myInput"
              borderless
              type="textarea"
            ></q-editor>
            <div class="text-center">
              <q-chip
                v-if="state == 'rentable'"
                text-color="grey-6"
                style="font-family: Keep Calm"
                clickable
                @click="state = 'buyable'"
                >Buyable</q-chip
              >
              <q-chip
                v-if="state == 'buyable'"
                color="primary"
                text-color="black"
                style="font-family: Keep Calm"
                >Buyable</q-chip
              >
              <q-chip
                v-if="state == 'buyable'"
                text-color="grey-6"
                style="font-family: Keep Calm"
                clickable
                @click="state = 'rentable'"
                >Rentable</q-chip
              >
              <q-chip
                v-if="state == 'rentable'"
                color="primary"
                text-color="black"
                style="font-family: Keep Calm"
                >Rentable</q-chip
              >
            </div>
            <p class="text-white q-mt-md" style="font-family: Keep Calm">Assets*</p>
            <div class="text-center">
              <!-- TODO assets vom server holen -->
              <q-chip>Rentable</q-chip>
              <q-chip>Rentable</q-chip>
              <q-chip>Rentable</q-chip>
              <q-chip>Rentable</q-chip>
              <q-chip>Rentable</q-chip>
              <q-chip>Rentable</q-chip>
              <q-chip>Rentable</q-chip>
              <q-chip>Rentable</q-chip>
              <q-chip>Rentable</q-chip>
            </div>
          </div></q-step
        >
        <q-step
          :name="2"
          title=""
          icon="img:/images/2.svg"
          active-color="primary"
          active-icon="none"
        >
          <div class="q-mx-md">
            <p class="text-white" style="font-family: Keep Calm">Expenses</p>
            <q-input
              v-model="estatePrice"
              ref="estatePriceRef"
              bg-color="white"
              label="Price*"
              :input-style="{ fontFamily: 'Keep Calm', color: '#717171', margin: '5px' }"
              class="q-my-md myInput"
              borderless
              :rules="[(val) => !!val || 'Please enter a price']"
            ></q-input>
            <q-input
              v-model="heatingPrice"
              ref="heatingPriceRef"
              bg-color="white"
              label="Heating*"
              :input-style="{ fontFamily: 'Keep Calm', color: '#717171', margin: '5px' }"
              class="q-my-md myInput"
              borderless
              :rules="[(val) => !!val || 'Please enter a price']"
            ></q-input>
            <p class="text-white q-mt-xl" style="font-family: Keep Calm">Area</p>
            <q-input
              v-model="propArea"
              ref="propAreaRef"
              bg-color="white"
              label="Property area*"
              :input-style="{ fontFamily: 'Keep Calm', color: '#717171', margin: '5px' }"
              class="q-my-md myInput"
              borderless
              :rules="[
                (val) =>
                  val <= sum(Number(this.useArea), Number(this.outArea)) ||
                  'Please enter a valid area',
                (val) => val > 0 || 'Please enter a valid area',
              ]"
            ></q-input>
            <q-input
              v-model="useArea"
              ref="useAreaRef"
              bg-color="white"
              label="Useable area*"
              :input-style="{ fontFamily: 'Keep Calm', color: '#717171', margin: '5px' }"
              class="q-my-md myInput"
              borderless
              :rules="[(val) => (val) => val > 0 || 'Please enter a valid area']"
            ></q-input>
            <q-input
              v-model="outArea"
              bg-color="white"
              label="Outside area*"
              :input-style="{ fontFamily: 'Keep Calm', color: '#717171', margin: '5px' }"
              class="q-my-md myInput"
              borderless
            ></q-input>
          </div>
        </q-step>
        <q-step
          :name="3"
          title=""
          icon="img:/images/3.svg"
          active-color="primary"
          active-icon="none"
        >
          <div class="q-mx-md">
            <p class="text-white" style="font-family: Keep Calm">Rooms</p>
            <div class="q-gutter-md row items-start">
              <!-- TODO styling von Room Inputs -->
              <div class="q-gutter-none row items-start" style="width: 200px">
                <q-btn
                  @click="addRoom"
                  class="mySpecialInput leftBtn"
                  unelevated
                  size="189%"
                  style="width: 20%"
                  >+</q-btn
                >
                <q-input
                  v-model="rooms"
                  ref="roomsRef"
                  bg-color="white"
                  label="Rooms*"
                  :input-style="{ fontFamily: 'Keep Calm', color: '#717171', margin: '5px' }"
                  class="mySpecialInput"
                  borderless
                  style="width: 30%"
                  :rules="[(val) => !!val || 'Please enter a number']"
                ></q-input>
                <q-btn
                  @click="removeRoom"
                  class="mySpecialInput rightBtn"
                  unelevated
                  size="189%"
                  style="width: 20%"
                  >-</q-btn
                >
              </div>
              <div class="q-gutter-none row items-start" style="width: 200px">
                <q-btn
                  @click="addBathroom"
                  class="mySpecialInput leftBtn"
                  unelevated
                  size="189%"
                  style="width: 20%"
                  >+</q-btn
                >
                <q-input
                  v-model="bathrooms"
                  ref="bathroomsRef"
                  bg-color="white"
                  label="Bathroom*"
                  :input-style="{ fontFamily: 'Keep Calm', color: '#717171', margin: '5px' }"
                  class="mySpecialInput"
                  borderless
                  style="width: 30%"
                  :rules="[(val) => !!val || 'Please enter a number']"
                ></q-input>
                <q-btn
                  @click="removeBathroom"
                  class="mySpecialInput rightBtn"
                  unelevated
                  size="189%"
                  style="width: 20%"
                  >-</q-btn
                >
              </div>
              <div class="q-gutter-none row items-start" style="width: 200px">
                <q-btn
                  @click="addBedroom"
                  class="mySpecialInput leftBtn"
                  unelevated
                  size="189%"
                  style="width: 20%"
                  >+</q-btn
                >
                <q-input
                  v-model="bedrooms"
                  ref="bedroomsRef"
                  bg-color="white"
                  label="Bedrooms*"
                  :input-style="{ fontFamily: 'Keep Calm', color: '#717171', margin: '5px' }"
                  class="mySpecialInput"
                  borderless
                  style="width: 30%"
                  :rules="[(val) => !!val || 'Please enter a number']"
                ></q-input>
                <q-btn
                  @click="removeBedroom"
                  class="mySpecialInput rightBtn"
                  unelevated
                  size="189%"
                  style="width: 20%"
                  >-</q-btn
                >
              </div>
            </div>
            <p class="text-white q-mt-xl" style="font-family: Keep Calm">Heating</p>
            <q-select
              v-model="heatingType"
              ref="heatingTypeRef"
              :options="heatingTypes"
              class="myInput"
              label="Type"
              borderless
            >
            </q-select>
            <q-select
              v-model="heatingCombustible"
              ref="heatingCombustibleRef"
              :options="heatingCombustibles"
              class="q-my-md myInput"
              label="Combustible"
              borderless
            >
            </q-select>
            <div class="q-gutter-md row items-start">
              <q-input
                v-model="fgee"
                ref="fgeeRef"
                bg-color="white"
                label="fGEE"
                :input-style="{ fontFamily: 'Keep Calm', color: '#717171', margin: '5px' }"
                class="q-my-md myInput"
                borderless
                style="width: 45%"
              ></q-input>
              <q-input
                v-model="hwb"
                ref="hwbRef"
                bg-color="white"
                label="HWB"
                :input-style="{ fontFamily: 'Keep Calm', color: '#717171', margin: '5px' }"
                class="q-my-md myInput"
                borderless
                style="width: 45%"
              ></q-input>
            </div>
            <q-file
              v-model="energyCertificate"
              bg-color="primary"
              class="myFileInput"
              borderless
              label="+ Add Energy Certificate"
              :input-style="{ fontFamily: 'Keep Calm', color: '#717171', margin: '5px' }"
            ></q-file>
          </div>
        </q-step>
        <q-step
          :name="4"
          title=""
          icon="img:/images/4.svg"
          active-color="primary"
          active-icon="none"
          ><div class="q-mx-md">
            <!-- TODO Image selector -->
            <p class="text-white" style="font-family: Keep Calm">Images</p>
            <q-file label="+" class="myFileInput" unelevated borderless></q-file>
            <p class="text-white" style="font-family: Keep Calm">Other Documents/Files</p>
            <q-file
              v-model="files"
              bg-color="primary"
              class="myFileInput"
              borderless
              multiple
              label="+ Add"
              :input-style="{ fontFamily: 'Keep Calm', color: '#717171', margin: '5px' }"
            ></q-file></div
        ></q-step>
        <template v-slot:navigation>
          <q-stepper-navigation>
            <div class="q-mb-xl" style="font-family: Keep Calm; text-align: center">
              <q-btn
                rounded
                style="width: 300px"
                type="submit"
                @click="onContinueStep"
                color="primary"
                :label="step === 4 ? 'Finish' : 'Next'"
              />
            </div>
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </q-page-container>
    <q-page-sticky position="bottom" :offset="[18, 18]">
      <NavBar></NavBar>
    </q-page-sticky>
  </q-layout>
</template>

<style scoped>
.myInput {
  font-family: 'Quicksand Book';
  border: 1px white solid;
  border-radius: 5px 5px 0px 0px;
  background-color: white;
  padding: 5px;
}

.myFileInput {
  font-family: 'Quicksand Book';
  border: 1px #71d1ec solid;
  border-radius: 5px 5px 0px 0px;
  background-color: #71d1ec;
  padding: 5px;
}

.leftBtn {
  border-radius: 5px 0px 0px 0px;
}

.rightBtn {
  border-radius: 0px 5px 0px 0px;
}

.mySpecialInput {
  font-family: 'Quicksand Book';
  border: 1px white solid;
  background-color: white;
  padding: 5px;
}

.fontSize {
  font-size: 17px;
}
</style>
