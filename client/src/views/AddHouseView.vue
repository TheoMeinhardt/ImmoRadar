<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import NavBar from '@/components/NavBar.vue';
import { useRealEstateStore } from '@/stores/realEstates.js';
import { useUserStore } from '@/stores/user.js';

const realEstateStore = useRealEstateStore();

const userStore = useUserStore();
const user = userStore.user;

onMounted(async () => {
  await realEstateStore.fetchAssetLabels();
  assets.value = JSON.parse(JSON.stringify(realEstateStore.allAssets));

  for (const asset of assets.value) {
    asset.selected = false;
  }
});

let finishedEstate = {};

const step = ref(1);
const stepperRef = ref(null);
const addressRef = ref(null);
const cityRef = ref(null);
const zipRef = ref(null);
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
const stateRef = ref(null);
const countryRef = ref(null);
const provisionRef = ref(null);

const estate = ref('');
const address = ref('');
const city = ref('');
const zip = ref(null);
const state = ref('');
const country = ref('');
const constructionYear = ref(null);
const description = ref('');
const status = ref('buyable');
const assets = ref([]);
const estatePrice = ref(null);
const heatingPrice = ref(null);
const provision = ref(null);
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
const images = ref(null);
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

const filterAssetsArray = (assets) => {
  const filteredAssets = assets.filter((asset) => asset.selected === true);
  const newAssetArray = [];
  for (const asset of filteredAssets) {
    newAssetArray.push({ assetID: asset.assetID, name: asset.name, icon: asset.icon });
  }
  return newAssetArray;
};

const postEstate = async (estate) => {
  await axios.post('http://localhost:3000/realEstate', estate);
};

function onContinueStep() {
  switch (step.value) {
    case 1:
      addressRef.value.validate();
      cityRef.value.validate();
      zipRef.value.validate();
      stateRef.value.validate();
      countryRef.value.validate();
      if (
        !addressRef.value.hasError &&
        !cityRef.value.hasError &&
        !zipRef.value.hasError &&
        !stateRef.value.hasError &&
        !countryRef.value.hasError
      ) {
        stepperRef.value.next();
      }
      break;
    case 2:
      estatePriceRef.value.validate();
      heatingPriceRef.value.validate();
      provisionRef.value.validate();
      propAreaRef.value.validate();
      useAreaRef.value.validate();
      if (
        !estatePriceRef.value.hasError &&
        !heatingPriceRef.value.hasError &&
        !propAreaRef.value.hasError &&
        !useAreaRef.value.hasError &&
        !provisionRef.value.hasError
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
    case 4:
      stepperRef.value.next();
      break;
    case 5:
      finishedEstate = {
        name: estate.value,
        description: description.value,
        address: {
          address: address.value,
          city: city.value,
          zip: zip.value,
          state: state.value,
          country: country.value,
        },
        propertyArea: propArea.value,
        usableArea: useArea.value,
        outsideArea: outArea.value,
        rooms: rooms.value,
        bathrooms: bathrooms.value,
        bedrooms: bedrooms.value,
        buyable: status.value === 'buyable' ? true : false,
        price: estatePrice.value,
        provision: provision.value,
        userID: user.userID,
        heating: {
          type: heatingType.value,
          combustible: heatingCombustible.value,
          heatingRequirement: hwb.value,
          fgee: fgee.value,
          heatingCert: 'true',
        },
        constructionYear: constructionYear.value,
        assets: filterAssetsArray(assets.value),
      };
      console.log(finishedEstate);
      postEstate(finishedEstate);
      break;
    default:
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
          <div class="q-mx-sm">
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
            <div class="q-gutter-md row items-start q-mb-none">
              <q-input
                v-model="city"
                ref="cityRef"
                bg-color="white"
                label="City*"
                style="font-family: Quicksand Book; width: 45%"
                :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }"
                class="q-my-md myInput"
                borderless
                :rules="[(val) => val.length > 0 || 'Please enter a valid city']"
              ></q-input>
              <q-input
                v-model.number="zip"
                ref="zipRef"
                bg-color="white"
                type="number"
                label="Zip code*"
                style="font-family: Quicksand Book; width: 45%"
                :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }"
                class="q-my-md myInput"
                borderless
                :rules="[(val) => val > 0 || 'Please enter a valid city']"
              ></q-input>
            </div>
            <q-input
              v-model="state"
              ref="stateRef"
              bg-color="white"
              label="State*"
              style="font-family: Quicksand Book"
              :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }"
              class="q-mb-md myInput"
              borderless
              :rules="[(val) => val.length > 0 || 'Please enter a state']"
            ></q-input>
            <q-input
              v-model="country"
              ref="countryRef"
              bg-color="white"
              label="Country*"
              style="font-family: Quicksand Book"
              :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }"
              class="q-my-md myInput"
              borderless
              :rules="[(val) => val.length > 0 || 'Please enter a country']"
            ></q-input>
            <q-input
              v-model.number="constructionYear"
              ref="constructionYearRef"
              bg-color="white"
              type="number"
              label="Construction Year"
              style="font-family: Quicksand Book"
              :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }"
              class="q-my-md myInput"
              borderless
              :rules="[(val) => 1800 <= val <= 2023 || 'Please enter a valid year']"
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
            <div class="">
              <p class="text-white q-mt-md" style="font-family: Keep Calm">Status</p>
              <q-chip
                v-if="status == 'rentable'"
                class="col-1 cursor-pointer q-pa-lg"
                style="width: fit-content; font-family: Keep Calm"
                outline
                color="primary"
                text-color="white"
                clickable
                @click="status = 'buyable'"
                >Buyable</q-chip
              >
              <q-chip
                v-if="status == 'buyable'"
                class="q-pa-lg"
                color="primary"
                text-color="black"
                style="font-family: Keep Calm"
                >Buyable</q-chip
              >
              <q-chip
                v-if="status == 'buyable'"
                class="col-1 cursor-pointer q-pa-lg"
                style="width: fit-content; font-family: Keep Calm"
                outline
                color="primary"
                text-color="white"
                clickable
                @click="status = 'rentable'"
                >Rentable</q-chip
              >
              <q-chip
                v-if="status == 'rentable'"
                class="q-pa-lg"
                color="primary"
                text-color="black"
                style="font-family: Keep Calm"
                >Rentable</q-chip
              >
            </div>
            <p class="text-white q-mt-md" style="font-family: Keep Calm">Assets*</p>
            <div class="">
              <q-chip
                v-for="asset of assets"
                v-model:selected="
                  assets[assets.findIndex((a) => a.assetID === asset.assetID)].selected
                "
                class="col-1 cursor-pointer"
                style="width: fit-content; font-family: Keep Calm"
                outline
                color="primary"
                text-color="white"
                :key="asset.assetID"
                >{{ asset.name }}</q-chip
              >
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
          <div class="q-mx-sm">
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
            <q-input
              v-model.number="provision"
              ref="provisionRef"
              bg-color="white"
              label="Provision"
              type="number"
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
          <div class="q-mx-sm">
            <p class="text-white" style="font-family: Keep Calm">Rooms</p>
            <div class="q-gutter-md row items-start">
              <div class="q-gutter-none row items-start" style="width: 150px">
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
                  label-slot
                  label="Rooms*"
                  :input-style="{ fontFamily: 'Keep Calm', color: '#717171', margin: '5px' }"
                  class="mySpecialInput"
                  borderless
                  style="width: 30%"
                  :rules="[(val) => !!val || 'Please enter a number']"
                >
                  <template v-slot:label>
                    <q-icon class="text-center" name="fa-solid fa-door-open"></q-icon
                  ></template>
                </q-input>
                <q-btn
                  @click="removeRoom"
                  class="mySpecialInput rightBtn"
                  unelevated
                  size="189%"
                  style="width: 20%"
                  >-</q-btn
                >
              </div>
              <div class="q-gutter-none row items-start" style="width: 150px">
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
                  label-slot
                  :input-style="{ fontFamily: 'Keep Calm', color: '#717171', margin: '5px' }"
                  class="mySpecialInput"
                  borderless
                  style="width: 30%"
                  :rules="[(val) => !!val || 'Please enter a number']"
                >
                  <template v-slot:label><q-icon name="fa-solid fa-bath"></q-icon></template>
                </q-input>
                <q-btn
                  @click="removeBathroom"
                  class="mySpecialInput rightBtn"
                  unelevated
                  size="189%"
                  style="width: 20%"
                  >-</q-btn
                >
              </div>
              <div class="q-gutter-none row items-start" style="width: 150px">
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
                  label-slot
                  :input-style="{ fontFamily: 'Keep Calm', color: '#717171', margin: '5px' }"
                  class="mySpecialInput"
                  borderless
                  style="width: 30%"
                  :rules="[(val) => !!val || 'Please enter a number']"
                >
                  <template v-slot:label><q-icon name="fa-solid fa-bed"></q-icon></template>
                </q-input>
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
                v-model.number="fgee"
                ref="fgeeRef"
                type="number"
                bg-color="white"
                label="fGEE"
                :input-style="{ fontFamily: 'Keep Calm', color: '#717171', margin: '5px' }"
                class="q-my-md myInput"
                borderless
                style="width: 45%"
              ></q-input>
              <q-input
                v-model.number="hwb"
                ref="hwbRef"
                type="number"
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
              class="myFileInput text-center"
              label-color="white"
              use-chips
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
          ><div class="q-mx-sm">
            <p class="text-white" style="font-family: Keep Calm">Images</p>
            <q-file
              v-model="images"
              label="+ Add"
              class="myFileInput q-mb-md"
              unelevated
              borderless
              multiple
              use-chips
              label-color="white"
            ></q-file>
            <p class="text-white" style="font-family: Keep Calm">Other Documents/Files</p>
            <q-file
              v-model="files"
              bg-color="primary"
              class="myFileInput"
              borderless
              multiple
              use-chips
              label-color="white"
              label="+ Add"
              :input-style="{ fontFamily: 'Keep Calm', color: '#717171', margin: '5px' }"
            ></q-file></div
        ></q-step>
        <q-step
          :name="5"
          title=""
          icon="img:/images/4.svg"
          active-color="primary"
          active-icon="none"
        >
          <div
            style="width: 100%; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px"
          ></div>
          <div class="q-pa-sm q-ma-sm text-white">
            <span class="text-h5 block"
              ><b>{{ estate }}</b></span
            >
            <span class="block"
              >{{ address }} |
              {{ zip }}
              {{ city }}</span
            >

            <!-- <div v-for="i in images.slice(1)" :key="i" class="row inline">
              <q-img
                :src="i"
                class="q-ma-sm"
                style="width: 100px; height: 100px; border-radius: 20px"
                @click="carousel = true"
              >
              </q-img>
            </div> -->

            <span class="text-h5 block q-my-md"><b>Description</b></span>
            <p class="q-ml-md">{{ description }}</p>

            <span class="text-h5 block q-my-md"><b>Rooms</b></span>
            <div class="row inline text-center">
              <div class="text-h5 q-ma-md col">
                <i class="fa-solid fa-door-open q-mr-sm"></i>
                <span>{{ rooms }}</span>
                <div>
                  <p class="text-body2">Rooms</p>
                </div>
              </div>
              <div class="text-h5 q-ma-md q-mr-md col">
                <i class="fa-solid fa-bed q-mr-sm"></i>
                <span>{{ bedrooms }}</span>
                <div>
                  <p class="text-body2">Bedrooms</p>
                </div>
              </div>
              <div class="text-h5 q-ma-md col">
                <i class="fa-solid fa-bath q-mr-sm"></i>
                <span>{{ bathrooms }}</span>
                <div>
                  <p class="text-body2">Bathrooms</p>
                </div>
              </div>
            </div>

            <span class="text-h5 block q-mb-md"><b>Assets</b></span>
            <div class="q-ma-md">
              <div
                v-for="asset in assets.filter((a) => a.selected == true)"
                :key="asset.assetID"
                class="row inline"
              >
                <q-chip size="15px" color="white" text-color="grey" class="text-capitalize">
                  {{ asset.name }}
                </q-chip>
              </div>
            </div>

            <span class="text-h5 block q-my-md"><b>Area</b></span>
            <div class="row inline text-center">
              <div class="text-h6 q-ma-md q-mr-md col">
                <span>{{ propArea }}m²</span>
                <div>
                  <p class="text-body2">Property</p>
                </div>
              </div>
              <div class="text-h6 q-ma-md col">
                <span>{{ useArea }}m²</span>
                <div>
                  <p class="text-body2">Usable</p>
                </div>
              </div>
              <div class="text-h6 q-ma-md col" v-if="outArea > 0">
                <span>{{ outArea }}m²</span>
                <div>
                  <p class="text-body2">Outside</p>
                </div>
              </div>
            </div>

            <span class="text-h5 block q-mb-md"><b>Heating</b></span>
            <div class="row text-center">
              <div class="text-h6 q-ma-md q-mr-md col">
                <span>{{ hwb }}€</span>
                <div>
                  <p class="text-body2">Heating Cost</p>
                </div>
              </div>

              <div class="text-h6 q-ma-md col text-capitalize">
                <span>{{ heatingType }}</span>
                <div>
                  <p class="text-body2">Heating Type</p>
                </div>
              </div>

              <div class="text-h6 q-ma-md col text-capitalize">
                <span>{{ heatingCombustible }}</span>
                <div>
                  <p class="text-body2">Combustible</p>
                </div>
              </div>
            </div>
            <span class="text-h5 block q-mb-md"><b>Price</b></span>
            <div class="row text-center">
              <div v-if="status == 'buyable'" class="text-h6 q-ma-md q-mr-md col">
                <span>{{ estatePrice }}€</span>
                <div>
                  <p class="text-body2">For sale</p>
                </div>
              </div>
              <div v-else class="text-h6 q-ma-md q-mr-md col">
                <span>{{ estatePrice }}€</span>
                <div>
                  <p class="text-body2">/ Month | Rentable</p>
                </div>
              </div>
            </div>
          </div>
        </q-step>
        <template v-slot:navigation>
          <q-stepper-navigation>
            <div class="q-mb-xl" style="font-family: Keep Calm; text-align: center">
              <q-btn
                rounded
                style="width: 300px"
                type="submit"
                @click="onContinueStep"
                color="primary"
                :label="step === 4 ? 'Check' : step === 5 ? 'Publish' : 'Next'"
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
