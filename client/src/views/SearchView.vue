<template>
  <q-layout>
    <q-page-container>
      <div class="flex justify-center" style="width: 100vw">
        <div class="column justify-center items-center">
          <q-input v-model="searchString" filled input-class="text-dark" type="search" bg-color="white" color="grey" placeholder="Vienna" class="searchBar block row">
            <template v-slot:append>
              <q-icon @click="search" name="fa-solid fa-search" class="cursor-pointer" color="dark" />
              <q-icon @click="resetSearch" name="fa-regular fa-circle-xmark" color="dark" class="q-ml-sm cursor-pointer" size="1rem" />
            </template>
          </q-input>

          <q-slide-transition>
            <div v-show="filtersOpened" class="filtersContainer text-white">
              <div class="seperator q-my-sm"></div>

              <!-- Price Filter -->
              <div class="row justify-between q-mt-md">
                <div class="col-3 text-left text-subtitle1 text-weight-bolder" style="font-family: 'Keep Calm'">Price</div>
                <div class="col-9 text-right text-caption">{{ formatCurrency(priceRange.min) }} - {{ formatCurrency(priceRange.max) }}</div>
              </div>
              <div class="text-center">
                <q-range v-model="priceRange" :min="0" :max="realEstateStore.maxPrice" :step="5" style="width: 95%" color="primary" label switch-label-side :left-label-value="leftPriceMarkerDisplay" :right-label-value="rightPriceMarkerDisplay" />
              </div>

              <!-- Area Filter -->
              <div class="row justify-between q-mt-md">
                <div class="col-5 text-left text-subtitle1 text-weight-bolder" style="font-family: 'Keep Calm'">Usable Area</div>
                <div class="col-7 text-right text-caption">{{ usableAreaRange.min }}m² - {{ usableAreaRange.max }}m²</div>
              </div>
              <div class="text-center">
                <q-range v-model="usableAreaRange" :min="0.0" :max="realEstateStore.maxUsableArea + 1" :step="1" style="width: 95%" color="primary" label switch-label-side :left-label-value="leftUsableAreaMarkerDisplay" :right-label-value="rightUsableAreaMarkerDisplay" />
              </div>

              <!-- Assets Filter -->
              <div class="row just-between q-mt-md">
                <div class="col-3 text-left text-subtitle1 text-weight-bolder" style="font-family: 'Keep Calm'">Assets</div>
              </div>
              <div class="row" style="width: 100%">
                <q-chip v-for="asset of assets" v-model:selected="assets[assets.findIndex((a) => a.assetID === asset.assetID)].selected" class="col-1 cursor-pointer" style="width: fit-content" outline color="primary" text-color="white" :key="asset.assetID">{{ asset.name }}</q-chip>
              </div>

              <!-- For sale/rent Filter -->
              <div class="row justify-between q-mt-md">
                <div class="col-5 text-left text-subtitle1 text-weight-bolder" style="font-family: 'Keep Calm'">For</div>
                <div class="col-7 text-right text-caption">{{ forSaleRent.charAt(0).toUpperCase() }}{{ forSaleRent.slice(1) }}</div>
              </div>
              <div>
                <q-radio v-model="forSaleRent" dark checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="rent" label="Rent" />
                <q-radio v-model="forSaleRent" dark checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="sale" label="Sale" />
              </div>

              <div class="q-mt-md text-center">
                <q-btn @click="applyFilters" unelevated rounded color="primary" label="apply filters" />
                <q-btn @click="resetFilters" unelevated outline rounded color="primary" class="q-ml-sm" label="reset" />
              </div>

              <div class="seperator q-my-sm"></div>
            </div>
          </q-slide-transition>
          <div class="row">
            <q-btn @click="filtersOpened = !filtersOpened" color="white" size="md" flat dense label="filters" icon-right="fa-solid fa-angle-down" />
          </div>
        </div>

        <RealEstateCard v-for="re of realEstates" :realEstate="re" :key="re.reID"></RealEstateCard>
      </div>
    </q-page-container>

    <q-page-sticky position="bottom" :offset="[18, 18]">
      <NavBar></NavBar>
    </q-page-sticky>
  </q-layout>
</template>

<script setup>
import { point, bboxPolygon, booleanPointInPolygon } from '@turf/turf';
import { ref, computed, onMounted } from 'vue';

import NavBar from '@/components/NavBar.vue';
import RealEstateCard from '../components/RealEstateCard.vue';
import { useRealEstateStore } from '@/stores/realEstates.js';

const realEstateStore = useRealEstateStore();

const searchString = ref('');
const filtersOpened = ref(false);
const realEstates = ref(realEstateStore.realEstatesShort);

// Filters
const priceRange = ref({ min: 0, max: realEstateStore.maxPrice });
const usableAreaRange = ref({ min: 0.0, max: Number(realEstateStore.maxUsableArea) });
const assets = ref();
const forSaleRent = ref('rent');

const leftPriceMarkerDisplay = computed(() => formatCurrency(priceRange.value.min));
const rightPriceMarkerDisplay = computed(() => formatCurrency(priceRange.value.max));
const leftUsableAreaMarkerDisplay = computed(() => `${usableAreaRange.value.min}m²`);
const rightUsableAreaMarkerDisplay = computed(() => `${usableAreaRange.value.max}m²`);

async function applyFilters() {
  realEstates.value = realEstates.value.filter((re) => re.price >= priceRange.value.min && re.price <= priceRange.value.max && re.usableArea >= usableAreaRange.value.min && re.usableArea <= usableAreaRange.value.max);
}

async function search() {
  const location = await realEstateStore.forwardGeocode(searchString.value);

  if (location) {
    const { bbox } = location.features[0];

    if (bbox) {
      const poly = bboxPolygon(bbox);
      realEstates.value = realEstateStore.realEstatesShort.filter((re) => booleanPointInPolygon(point([re.long, re.lat]), poly));
    }
  }
}

function resetSearch() {
  realEstates.value = realEstateStore.realEstatesShort;
  searchString.value = '';
}

function resetFilters() {
  realEstates.value = realEstateStore.realEstatesShort;
  searchString.value = '';
  priceRange.value = { min: 0, max: realEstateStore.maxPrice };
  usableAreaRange.value = { min: 0.0, max: Number(realEstateStore.maxUsableArea) };
  forSaleRent.value = 'rent';

  assets.value.forEach((a) => (a.selected = false));
}

function formatCurrency(num) {
  return `${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} €`;
}

onMounted(async () => {
  await realEstateStore.fetchAssetLabels();
  assets.value = JSON.parse(JSON.stringify(realEstateStore.allAssets));

  for (const asset of assets.value) {
    asset.selected = false;
  }
});
</script>

<style lang="scss" scoped>
.searchBar {
  font-family: 'Keep Calm';
  width: 88vw;
  margin-top: 5vh;

  :deep(.q-field__control) {
    border-radius: 20px;
  }
}

:deep(.q-chip) {
  display: flex !important;
}

.filtersContainer {
  width: 85%;
}

.seperator {
  width: 100%;
  height: 2px;

  border-bottom: 2px solid white;
}
</style>
