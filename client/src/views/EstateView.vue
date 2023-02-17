<template>
  <q-layout v-if="finishedLoading">
    <div>
      <div class="returnbutton">
        <q-btn
          to="/"
          class="q-ma-md fa-arrow-left"
          round
          flat
          style="background-color: #00000080"
          icon="fa-solid fa-arrow-left"
        ></q-btn>
      </div>
      <q-img
        :src="images[0]"
        style="width: 100%; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px"
      >
        <div
          v-if="realEstateStore.wholeRealEstate.buyable == true"
          class="absolute-bottom-left text-subtitle2"
          style="border-top-right-radius: 20px"
        >
          <div class="row no-wrap items-center">
            <div class="col">
              <div class="text-caption">Buy for</div>
              <div class="text-h6">
                <b>{{ realEstateStore.wholeRealEstate.price }}€</b>
              </div>
            </div>
          </div>
        </div>
        <div
          v-else
          class="absolute-bottom-left text-subtitle2"
          style="border-top-right-radius: 20px"
        >
          <b>{{ realEstateStore.wholeRealEstate.price }}€ </b>/ Month | Rentable
        </div>
      </q-img>
    </div>
    <div class="q-pa-sm q-ma-sm text-white">
      <span class="text-h5 block"
        ><b>{{ realEstateStore.wholeRealEstate.name }}</b></span
      >
      <span class="block"
        >{{ realEstateStore.wholeRealEstate.address.address }} |
        {{ realEstateStore.wholeRealEstate.address.zip }}
        {{ realEstateStore.wholeRealEstate.address.city }}</span
      >

      <div v-for="i in images.slice(1)" :key="i" class="row inline">
        <q-img :src="i" class="q-ma-sm" style="width: 100px; height: 100px; border-radius: 20px">
        </q-img>
      </div>

      <span class="text-h5 block q-my-md"><b>Description</b></span>
      <p class="q-ml-md">{{ realEstateStore.wholeRealEstate.description }}</p>

      <span class="text-h5 block q-my-md"><b>Rooms</b></span>
      <div class="row inline text-center">
        <div class="text-h5 q-ma-md col">
          <i class="fa-solid fa-door-open q-mr-sm"></i>
          <span>{{ realEstateStore.wholeRealEstate.rooms }}</span>
          <div>
            <p class="text-body2">Rooms</p>
          </div>
        </div>
        <div class="text-h5 q-ma-md q-mr-md col">
          <i class="fa-solid fa-bed q-mr-sm"></i>
          <span>{{ realEstateStore.wholeRealEstate.bedrooms }}</span>
          <div>
            <p class="text-body2">Bedrooms</p>
          </div>
        </div>
        <div class="text-h5 q-ma-md col">
          <i class="fa-solid fa-bath q-mr-sm"></i>
          <span>{{ realEstateStore.wholeRealEstate.bathrooms }}</span>
          <div>
            <p class="text-body2">Bathrooms</p>
          </div>
        </div>
      </div>

      <span class="text-h5 block q-mb-md"><b>Assets</b></span>
      <div class="q-ma-md">
        <div
          v-for="asset in realEstateStore.wholeRealEstate.assets"
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
          <span>{{ realEstateStore.wholeRealEstate.propertyArea }}m²</span>
          <div>
            <p class="text-body2">Property</p>
          </div>
        </div>
        <div class="text-h6 q-ma-md col">
          <span>{{ realEstateStore.wholeRealEstate.usableArea }}m²</span>
          <div>
            <p class="text-body2">Usable</p>
          </div>
        </div>
        <div class="text-h6 q-ma-md col" v-if="realEstateStore.wholeRealEstate.outsideArea > 0">
          <span>{{ realEstateStore.wholeRealEstate.outsideArea }}m²</span>
          <div>
            <p class="text-body2">Outside</p>
          </div>
        </div>
      </div>

      <span class="text-h5 block q-mb-md"><b>Heating</b></span>
      <div class="row inline text-center">
        <div class="text-h6 q-ma-md q-mr-md col">
          <span>{{ realEstateStore.wholeRealEstate.propertyArea }}m²</span>
          <div>
            <p class="text-body2">Heating Cost</p>
          </div>
        </div>

        <div class="text-h6 q-ma-md col">
          <span>{{ realEstateStore.wholeRealEstate.usableArea }}m²</span>
          <div>
            <p class="text-body2">Heating Type</p>
          </div>
        </div>

        <div class="text-h6 q-ma-md col">
          <span>{{ realEstateStore.wholeRealEstate.heatingID }}</span>
          <div>
            <p class="text-body2">Combustible</p>
          </div>
        </div>
      </div>
    </div>

    <q-page-sticky position="bottom" :offset="[18, 18]">
      <NavBar></NavBar>
    </q-page-sticky>
    <div style="height: 150px"></div>
  </q-layout>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRealEstateStore } from '@/stores/realEstates.js';

const props = defineProps({
  reID: String,
});

const realEstateStore = useRealEstateStore();
const images = ref([]);
const finishedLoading = ref(false);

onMounted(async () => {
  await realEstateStore.fetchWholeRealEstate(props.reID);

  for await (let re of realEstateStore.wholeRealEstate.images) {
    try {
      const res = await axios.post('/image', {
        path: re,
      });
      images.value.push(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  finishedLoading.value = true;
});
</script>

<style scoped>
.fa-arrow-left {
  color: white;
}

.returnbutton {
  position: absolute;
  z-index: 999;

  top: 0px;
  left: 0px;
}
</style>
