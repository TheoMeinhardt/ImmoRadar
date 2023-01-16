<script setup>
import { ref } from 'vue';
import NavBar from '@/components/NavBar.vue';

const step = ref(1);
const constructionYear = ref('');
const address = ref('');
const city = ref('');
const estate = ref('');
const description = ref('Description');
const estatePrice = ref('');
const heatingPrice = ref('');
const propArea = ref('');
const useArea = ref('');
const outArea = ref('');
const rooms = ref(null);
const bathrooms = ref(null);
const bedrooms = ref(null);
const energyCertificate = ref(null); //ein File Object
const files = ref(null); //ein Array aus File Objects

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
</script>

<template>
  <q-layout>
    <q-page-container>
      <q-stepper
        v-model="step"
        ref="stepper"
        style="background-color: #4b506e"
        animated
        flat
        header-nav="true"
      >
        <q-step
          :name="1"
          title=""
          icon="img:./src/assets/1.svg"
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
              bg-color="white"
              label="Whats the address"
              style="font-family: Quicksand Book"
              :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }"
              class="q-my-md myInput"
              borderless
            ></q-input>
            <q-input
              v-model="city"
              bg-color="white"
              label="City and PLZ"
              style="font-family: Quicksand Book"
              :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }"
              class="q-my-md myInput"
              borderless
            ></q-input>
            <q-input
              v-model="constructionYear"
              bg-color="white"
              label="Construction Year"
              style="font-family: Quicksand Book"
              :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }"
              class="q-my-md myInput"
              borderless
            ></q-input>
            <q-editor
              v-model="description"
              bg-color="white"
              label="Description of the address"
              style="font-family: Quicksand Book"
              :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }"
              class="q-my-md myInput"
              borderless
              type="textarea"
            ></q-editor>
            <q-chip text-color="grey-6" style="font-family: Keep Calm">Buyable</q-chip>
            <q-chip text-color="grey-6" style="font-family: Keep Calm">Rentable</q-chip>
            <p class="text-white q-mt-md" style="font-family: Keep Calm">Assets</p>
            <q-chip>Rentable</q-chip>
            <q-chip>Rentable</q-chip>
            <q-chip>Rentable</q-chip>
            <q-chip>Rentable</q-chip>
            <q-chip>Rentable</q-chip>
            <q-chip>Rentable</q-chip>
            <q-chip>Rentable</q-chip>
            <q-chip>Rentable</q-chip>
            <q-chip>Rentable</q-chip>
          </div></q-step
        >
        <q-step
          :name="2"
          title=""
          icon="img:./src/assets/2.svg"
          active-color="primary"
          active-icon="none"
        >
          <div class="q-mx-md">
            <p class="text-white" style="font-family: Keep Calm">Expenses</p>
            <q-input
              v-model="estatePrice"
              bg-color="white"
              label="Price"
              :input-style="{ fontFamily: 'Keep Calm', color: '#717171', margin: '5px' }"
              class="q-my-md myInput"
              borderless
            ></q-input>
            <q-input
              v-model="heatingPrice"
              bg-color="white"
              label="Heating"
              :input-style="{ fontFamily: 'Keep Calm', color: '#717171', margin: '5px' }"
              class="q-my-md myInput"
              borderless
            ></q-input>
            <p class="text-white q-mt-xl" style="font-family: Keep Calm">Area</p>
            <q-input
              v-model="propArea"
              bg-color="white"
              label="Property area"
              :input-style="{ fontFamily: 'Keep Calm', color: '#717171', margin: '5px' }"
              class="q-my-md myInput"
              borderless
            ></q-input>
            <q-input
              v-model="useArea"
              bg-color="white"
              label="Useable area"
              :input-style="{ fontFamily: 'Keep Calm', color: '#717171', margin: '5px' }"
              class="q-my-md myInput"
              borderless
            ></q-input>
            <q-input
              v-model="outArea"
              bg-color="white"
              label="Outside area"
              :input-style="{ fontFamily: 'Keep Calm', color: '#717171', margin: '5px' }"
              class="q-my-md myInput"
              borderless
            ></q-input>
          </div>
        </q-step>
        <q-step
          :name="3"
          title=""
          icon="img:./src/assets/3.svg"
          active-color="primary"
          active-icon="none"
        >
          <div class="q-mx-md">
            <p class="text-white" style="font-family: Keep Calm">Rooms</p>
            <div class="q-gutter-md row items-start">
              <div class="q-gutter-none row items-start">
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
                  bg-color="white"
                  label="Rooms"
                  :input-style="{ fontFamily: 'Keep Calm', color: '#717171', margin: '5px' }"
                  class="mySpecialInput"
                  borderless
                  style="width: 30%"
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
              <div class="q-gutter-none row items-start">
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
                  bg-color="white"
                  label="Bathroom"
                  :input-style="{ fontFamily: 'Keep Calm', color: '#717171', margin: '5px' }"
                  class="mySpecialInput"
                  borderless
                  style="width: 30%"
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
              <div class="q-gutter-none row items-start">
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
                  bg-color="white"
                  label="Bedrooms"
                  :input-style="{ fontFamily: 'Keep Calm', color: '#717171', margin: '5px' }"
                  class="mySpecialInput"
                  borderless
                  style="width: 30%"
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
            <q-btn-dropdown class="myInput" label="Type" no-caps style="height: 54px; width: 100%">
              <q-list>
                <q-item clickable v-close-popup @click="onItemClick">
                  <q-item-section>
                    <q-item-label>Photos</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="onItemClick">
                  <q-item-section>
                    <q-item-label>Videos</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="onItemClick">
                  <q-item-section>
                    <q-item-label>Articles</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
            <q-btn-dropdown
              class="q-my-md myInput"
              label="Combustible"
              no-caps
              style="height: 54px; width: 100%"
            >
              <q-list>
                <q-item clickable v-close-popup @click="onItemClick">
                  <q-item-section>
                    <q-item-label>Photos</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="onItemClick">
                  <q-item-section>
                    <q-item-label>Videos</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="onItemClick">
                  <q-item-section>
                    <q-item-label>Articles</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
            <div class="q-gutter-md row items-start">
              <q-input
                v-model="outArea"
                bg-color="white"
                label="fGEE"
                :input-style="{ fontFamily: 'Keep Calm', color: '#717171', margin: '5px' }"
                class="q-my-md myInput"
                borderless
                style="width: 45%"
              ></q-input>
              <q-input
                v-model="outArea"
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
          icon="img:./src/assets/4.svg"
          active-color="primary"
          active-icon="none"
          ><div class="q-mx-md">
            <p class="text-white" style="font-family: Keep Calm">Images</p>
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
                @click="$refs.stepper.next()"
                color="primary"
                :label="step === 5 ? 'Finish' : 'Next'"
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
