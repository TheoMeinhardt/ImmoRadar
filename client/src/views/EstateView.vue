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
        <q-btn
          to="/"
          class="q-ma-md fa-arrow-left"
          round
          flat
          style="background-color: #00000080"
          icon="fa-solid fa-arrow-left"
        ></q-btn>
      </div>
      <div class="mapbutton">
        <q-btn
          @click="setlonglat()"
          to="/"
          class="q-ma-md"
          round
          flat
          style="background-color: #00000080; color: white"
          icon="fa-solid fa-location-dot"
        ></q-btn>
        <q-btn
          @click="setlonglat()"
          to="/"
          class="q-ma-md"
          round
          flat
          style="background-color: #00000080; color: white"
          icon="fa-solid fa-location-dot"
        ></q-btn>
      </div>
      <q-img
        :src="images[0]"
        style="
          width: 100%;
          border-bottom-left-radius: 20px;
          border-bottom-right-radius: 20px;
        "
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
          <div
            class="absolute-bottom-left text-subtitle2"
            style="border-top-right-radius: 20px"
          >
            <b>{{ realEstateStore.wholeRealEstate.price }}€ </b>/ Month |
            Rentable
          </div>
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
        <q-img
          :src="i"
          class="q-ma-sm"
          style="width: 100px; height: 100px; border-radius: 20px"
          @click="carousel = true"
        >
        </q-img>
        <q-img
          :src="i"
          class="q-ma-sm"
          style="width: 100px; height: 100px; border-radius: 20px"
          @click="carousel = true"
        >
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
          <q-chip
            size="15px"
            color="white"
            text-color="grey"
            class="text-capitalize"
          >
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
        <div
          class="text-h6 q-ma-md col"
          v-if="realEstateStore.wholeRealEstate.outsideArea > 0"
        >
          <span>{{ realEstateStore.wholeRealEstate.outsideArea }}m²</span>
          <div>
            <p class="text-body2">Outside</p>
          </div>
        </div>
      </div>

      <span class="text-h5 block q-mb-md"><b>Heating</b></span>
      <div class="row text-center">
        <div class="text-h6 q-ma-md q-mr-md col">
          <span
            >{{
              realEstateStore.wholeRealEstate.heating.heatingRequirement
            }}€</span
          >
          <div>
            <p class="text-body2">Heating Cost</p>
          </div>
        </div>

        <div class="text-h6 q-ma-md col text-capitalize">
          <span>{{ realEstateStore.wholeRealEstate.heating.type }}</span>
          <div>
            <p class="text-body2">Heating Type</p>
          </div>
        </div>

        <div class="text-h6 q-ma-md col text-capitalize">
          <span>{{ realEstateStore.wholeRealEstate.heating.combustible }}</span>
          <div>
            <p class="text-body2">Combustible</p>
          </div>
        </div>
      </div>

      <span class="text-h5 block q-mb-md"><b>Contact Info</b></span>
      <q-card class="my-card q-ma-md" flat>
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img :src="estateUserStore.estateUser.profilePic" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-black" style="font-size: large">{{
              estateUserStore.estateUser.username
            }}</q-item-label>
            <q-item-label caption style="font-size: medium">
              <i class="fa-solid fa-phone"></i>
              {{ estateUserStore.estateUser.phone }}
            </q-item-label>
            <q-item-label caption style="font-size: medium">
              <i class="fa-solid fa-envelope"></i>
              {{ estateUserStore.estateUser.email }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card>
    </div>
    <CommentView></CommentView>
    <q-dialog v-model="carousel">
      <div>
        <q-carousel
          swipeable
          animated
          v-model="slide"
          thumbnails
          infinite
          style="width: 300px"
        >
          <q-carousel-slide
            v-for="i in images"
            :key="i"
            :name="i"
            :img-src="i"
          />
        </q-carousel>
      </div>
    </q-dialog>

    <q-page-sticky position="bottom" :offset="[18, 18]">
      <NavBar></NavBar>
    </q-page-sticky>
    <div style="height: 150px"></div>
  </q-layout>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue';
import CommentView from './CommentView.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRealEstateStore } from '@/stores/realEstates.js';
import { useEstateMapStore } from '../stores/estate-map.js';
import { useEstateUserStore } from '../stores/estateUser.js';

const props = defineProps({
  reID: String,
});

const realEstateStore = useRealEstateStore();
const estateUserStore = useEstateUserStore();
const estateMapStore = useEstateMapStore();
const images = ref([]);
const finishedLoading = ref(false);
const carousel = ref(false);
const slide = ref(1);

function setlonglat() {
  estateMapStore.long = realEstateStore.wholeRealEstate.long;
  estateMapStore.lat = realEstateStore.wholeRealEstate.lat;

  console.log(estateMapStore.long);
  console.log(estateMapStore.lat);
}

onMounted(async () => {
  await realEstateStore.fetchWholeRealEstate(props.reID);
  await estateUserStore.fetchEstateUser(realEstateStore.wholeRealEstate.userID);

  // console.log(estateUserStore.estateUser.username);

  for await (const re of realEstateStore.wholeRealEstate.images) {
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

.fa-location-dot {
  color: white;
}
.returnbutton {
  position: absolute;
  z-index: 999;

  top: 0px;
  left: 0px;
}
.mapbutton {
  position: absolute;
  z-index: 999;

  top: 55px;
  left: 0px;
}
:deep(.q-carousel) {
  z-index: 999;
}
</style>
