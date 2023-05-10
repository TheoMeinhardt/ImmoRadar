<template>
  <q-layout>
    <q-page-container>
      <div class="flex justify-center" style="width: 100vw">
        <div class="column justify-center items-center">
          <q-input
            v-model="searchString"
            filled
            input-class="text-dark"
            type="search"
            bg-color="white"
            color="grey"
            placeholder="1160, Wien"
            class="searchBar block row"
          >
            <template v-slot:append>
              <q-select
                v-model="forSaleRent"
                filled
                color="dark"
                options-dense
                bg-color="primary"
                class="forSaleRentDropdow"
                option-value="id"
                option-label="desc"
                emit-value
                map-options
                :options="forSaleRentOptions"
                dense
                flat
              />
              <q-icon
                @click="search"
                name="fa-solid fa-search"
                class="q-ml-sm cursor-pointer"
                color="dark"
              />
            </template>
          </q-input>

          <q-slide-transition>
            <div v-show="filtersOpened" class="filtersContainer text-white">
              <div class="seperator q-my-sm"></div>

              <!-- Price Filter -->
              <div class="row justify-between q-mt-md">
                <div
                  class="col-3 text-left text-subtitle1 text-weight-bolder"
                  style="font-family: 'Keep Calm'"
                >
                  Price
                </div>
                <div class="col-9 text-right text-caption">
                  {{ formatCurrency(priceRange.min) }} - {{ formatCurrency(priceRange.max) }}
                </div>
              </div>
              <div class="text-center">
                <q-range
                  v-model="priceRange"
                  :min="0"
                  :max="calcMaxPrice + 100"
                  :step="5"
                  style="width: 95%"
                  color="primary"
                  label
                  switch-label-side
                  :left-label-value="leftPriceMarkerDisplay"
                  :right-label-value="rightPriceMarkerDisplay"
                />
              </div>

              <!-- Area Filter -->
              <div class="row justify-between q-mt-md">
                <div
                  class="col-5 text-left text-subtitle1 text-weight-bolder"
                  style="font-family: 'Keep Calm'"
                >
                  Usable Area
                </div>
                <div class="col-7 text-right text-caption">
                  {{ usableAreaRange.min }}m² - {{ usableAreaRange.max }}m²
                </div>
              </div>
              <div class="text-center">
                <q-range
                  v-model="usableAreaRange"
                  :min="0.0"
                  :max="realEstateStore.maxUsableArea + 1"
                  :step="1"
                  style="width: 95%"
                  color="primary"
                  label
                  switch-label-side
                  :left-label-value="leftUsableAreaMarkerDisplay"
                  :right-label-value="rightUsableAreaMarkerDisplay"
                />
              </div>

              <!-- Assets Filter -->
              <div class="row just-between q-mt-md">
                <div
                  class="col-3 text-left text-subtitle1 text-weight-bolder"
                  style="font-family: 'Keep Calm'"
                >
                  Assets
                </div>
              </div>
              <div class="row" style="width: 100%">
                <q-chip
                  v-for="asset of assets"
                  v-model:selected="
                    assets[assets.findIndex((a) => a.assetID === asset.assetID)].selected
                  "
                  class="col-1 cursor-pointer"
                  style="width: fit-content"
                  outline
                  color="primary"
                  text-color="white"
                  :key="asset.assetID"
                  >{{ asset.name }}</q-chip
                >
              </div>

              <div class="q-mt-md text-center">
                <q-btn
                  @click="applyFilters"
                  unelevated
                  rounded
                  color="primary"
                  label="apply filters"
                />
                <q-btn
                  @click="resetFilters"
                  unelevated
                  outline
                  rounded
                  color="primary"
                  class="q-ml-sm"
                  label="reset"
                />
              </div>

              <div class="seperator q-my-sm"></div>
            </div>
          </q-slide-transition>
          <div class="row">
            <q-btn
              @click="filtersOpened = !filtersOpened"
              color="white"
              size="md"
              flat
              dense
              label="filters"
              icon-right="fa-solid fa-angle-down"
            />
          </div>
        </div>

        <div class="row wrap justify-center">
          <div class="col-12 q-ml-xl q-mb-sm">
            <div class="gridListSwitchContainer q-px-md q-py-xs bg-dark">
              <q-icon
                @click="gridView = true"
                name="fa-solid fa-border-all"
                :color="gridView ? 'white' : 'grey'"
                :size="gridView ? '1.25rem' : '1rem'"
                class="cursor-pointer q-mr-sm"
              ></q-icon>
              <q-icon
                @click="gridView = false"
                name="fa-solid fa-list-ul"
                :color="!gridView ? 'white' : 'grey'"
                :size="!gridView ? '1.25rem' : '1rem'"
                class="cursor-pointer"
              ></q-icon>
            </div>
          </div>

          <div v-if="gridView" class="row wrap justify-center">
            <RealEstateCard
              v-for="re of realEstates"
              :realEstate="re"
              :key="re.reID"
              class="col-6"
              style="width: 40vw"
            ></RealEstateCard>
          </div>
          <div v-else class="col">
            <RealEstateListItem
              v-for="re of realEstates"
              :realEstate="re"
              :key="re.reID"
            ></RealEstateListItem>
          </div>
        </div>
      </div>
    </q-page-container>

    <q-page-sticky position="bottom" :offset="[18, 18]">
      <NavBar></NavBar>
    </q-page-sticky>
  </q-layout>
</template>

<script setup>
import { point, bboxPolygon, booleanPointInPolygon } from '@turf/turf';
import {
  ref, computed, onMounted, watch,
} from 'vue';

import NavBar from '@/components/NavBar.vue';
import RealEstateCard from '../components/RealEstateCard.vue';
import RealEstateListItem from '../components/RealEstateListItem.vue';
import { useRealEstateStore } from '@/stores/realEstates.js';

const realEstateStore = useRealEstateStore();

const searchString = ref('');
const filtersOpened = ref(false);
const realEstates = ref(realEstateStore.realEstatesShort);
const searchedRealEstates = ref(realEstateStore.realEstatesShort);
const filteredRealEstates = ref(realEstateStore.realEstatesShort);
const gridView = ref(true);

// Filters
const priceRange = ref({ min: 0, max: 0 });
const usableAreaRange = ref({ min: 0.0, max: Number(realEstateStore.maxUsableArea) });
const assets = ref();
const forSaleRent = ref(false);
const forSaleRentOptions = [
  { id: false, desc: 'for rent' },
  { id: true, desc: 'for sale' },
];

const leftPriceMarkerDisplay = computed(() => formatCurrency(priceRange.value.min));
const rightPriceMarkerDisplay = computed(() => formatCurrency(priceRange.value.max));
const leftUsableAreaMarkerDisplay = computed(() => `${usableAreaRange.value.min}m²`);
const rightUsableAreaMarkerDisplay = computed(() => `${usableAreaRange.value.max}m²`);

async function applyFilters() {
  realEstates.value = searchedRealEstates.value.filter(
    (re) => re.price >= priceRange.value.min
      && re.price <= priceRange.value.max
      && re.usableArea >= usableAreaRange.value.min
      && re.usableArea <= usableAreaRange.value.max
      && re.buyable === forSaleRent.value
      && realEstateHasAssets(
        re,
        assets.value.filter((a) => a.selected),
      ),
  );
  filteredRealEstates.value = realEstates.value;
}

async function search() {
  const location = await realEstateStore.forwardGeocode(searchString.value);

  if (location) {
    const { bbox } = location.features[0];

    if (bbox) {
      const poly = bboxPolygon(bbox);
      realEstates.value = filteredRealEstates.value.filter(
        (re) => booleanPointInPolygon(point([re.long, re.lat]), poly) && re.buyable === forSaleRent.value,
      );
      searchedRealEstates.value = realEstates.value;
    }
  }
}

function realEstateHasAssets(re, assets) {
  let matches = 0;
  for (const a of assets) {
    if (realEstateHasAsset(re, a)) matches++;
  }

  return matches === assets.length;
}

function realEstateHasAsset(re, asset) {
  if (re.assets.find((a) => a.assetID === asset.assetID)) return true;
  return false;
}

function resetFilters() {
  realEstateStore.calcMaxUsableArea(true);
  priceRange.value.max = calcMaxPrice;
  // priceRange.value.min = calcMinPrice;

  realEstates.value = realEstateStore.realEstatesShort;
  filteredRealEstates.value = realEstateStore.realEstatesShort;
  searchedRealEstates.value = realEstateStore.realEstatesShort;
  searchString.value = '';
  usableAreaRange.value = { min: 0.0, max: Number(realEstateStore.maxUsableArea) };
  forSaleRent.value = true;

  assets.value.forEach((a) => (a.selected = false));
}

function formatCurrency(num) {
  return `${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} €`;
}

const calcMaxPrice = computed(
  () => {
    let maxPrice = 0;

    for (const { price, buyable } of realEstates.value) {
      if (forSaleRent.value === buyable) maxPrice = Number(price) >= Number(maxPrice) ? price : Number(maxPrice);
      else if (forSaleRent.value === undefined) maxPrice = Number(price) >= Number(maxPrice) ? price : Number(maxPrice);
    }

    return maxPrice;
  },
  {
    dependencies: [forSaleRent],
  },
);

const calcMinPrice = computed(
  () => {
    let minPrice = realEstates.value[0].price;

    for (const { price, buyable } of realEstates.value) {
      if (forSaleRent.value === buyable) minPrice = Number(price) <= Number(minPrice) ? price : Number(minPrice);
      else if (forSaleRent.value === undefined) minPrice = Number(price) <= Number(minPrice) ? price : Number(minPrice);
    }

    return minPrice;
  },
  {
    dependencies: [forSaleRent],
  },
);

watch(forSaleRent, (newVal) => {
  realEstateStore.calcMaxUsableArea(newVal);

  usableAreaRange.value.max = realEstateStore.maxUsableArea;
});

onMounted(async () => {
  await realEstateStore.fetchAssetLabels();
  assets.value = JSON.parse(JSON.stringify(realEstateStore.allAssets));

  for (const asset of assets.value) {
    asset.selected = false;
  }

  priceRange.value.max = calcMaxPrice;
  // priceRange.value.min = calcMinPrice;
});
</script>

<style lang="scss" scoped>
:deep(.q-field--highlighted) {
  border: 0px;
}

:deep(.q-field--filled.q-field--highlighted .q-field__control::after) {
  transform: scale3d(0, 0, 0);
}

.searchBar {
  font-family: 'Keep Calm';
  width: 88vw;
  margin-top: 5vh;

  :deep(.q-field__control) {
    border-radius: 20px;
  }
}

.forSaleRentDropdow {
  :deep(.q-field__control) {
    border-radius: 15px;
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

.gridListSwitchContainer {
  width: fit-content;
  border-radius: 15px;
}
</style>
