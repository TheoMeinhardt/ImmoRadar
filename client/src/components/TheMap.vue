<template>
  <MapboxMap @mb-created="(mapboxInstance) => (map = mapboxInstance)" style="height: 100vh" :access-token="token" mapStyle="mapbox://styles/matthiaseisenhut/cl8comqv0002114mvdz3z0gh3" :center="[16.313192, 48.212161]" :zoom="12">
    <MapboxMarker v-for="(re, k) of realEstateStore.realEstatesShort" :lng-lat="[re.long, re.lat]" :key="k">
      <RealEstateBadge :map="map" :realEstate="re"></RealEstateBadge>
    </MapboxMarker>
  </MapboxMap>
</template>

<script setup>
import { ref } from 'vue';
import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import RealEstateBadge from './RealEstateMapBadge.vue';

import { useRealEstateStore } from '../stores/realEstates';

const realEstateStore = useRealEstateStore();

const token = import.meta.env.VITE_MAPBOX_TOKEN;
const map = ref();
</script>
