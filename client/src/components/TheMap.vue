<template>
  <MapboxMap style="height: 100vh" :access-token="token" mapStyle="mapbox://styles/matthiaseisenhut/cl8comqv0002114mvdz3z0gh3" :center="[16.313192, 48.212161]" :zoom="12">
    <MapboxMarker v-for="(re, k) of realEstates" :lng-lat="[re.long, re.lat]" :key="k">
      <RealEstateBadge :realEstate="re"></RealEstateBadge>
    </MapboxMarker>
  </MapboxMap>
</template>

<script setup>
import RealEstateBadge from './RealEstateMapBadge.vue';

import axios from 'axios';
import { ref } from 'vue';
import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

getShortRealEstates();

const token = import.meta.env.VITE_MAPBOX_TOKEN;
const realEstates = ref();
const badgeExpanded = ref(false);

async function getShortRealEstates() {
  const { data } = await axios.get('/api/realestate/short');
  realEstates.value = data;
}
</script>
