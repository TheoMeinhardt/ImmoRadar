<template>
  <MapboxMap
    @mb-created="(mapboxInstance) => (map = mapboxInstance)"
    style="height: 100vh"
    :access-token="token"
    mapStyle="mapbox://styles/matthiaseisenhut/cl8comqv0002114mvdz3z0gh3"
    :center="[16.313192, 48.212161]"
    :zoom="12"
  >
    <MapboxGeolocateControl
      :trackUserLocation="true"
      :positionOptions="{ enableHighAccuracy: true }"
    />
    <MapboxMarker
      v-for="(re, k) of realEstateStore.realEstatesShort"
      :lng-lat="[re.long, re.lat]"
      :key="k"
    >
      <RealEstateBadge :map="map" :realEstate="re"></RealEstateBadge>
    </MapboxMarker>
  </MapboxMap>
</template>

<script setup>
import { ref } from 'vue';
import { MapboxMap, MapboxMarker, MapboxGeolocateControl } from '@studiometa/vue-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import RealEstateBadge from './RealEstateMapBadge.vue';

import { useRealEstateStore } from '../stores/realEstates';
import { useEstateMapStore } from '../stores/estate-map.js';

const realEstateStore = useRealEstateStore();
const estateMapStore = useEstateMapStore();

console.log(estateMapStore.long);
console.log(estateMapStore.lat);

const token = import.meta.env.VITE_MAPBOX_TOKEN;
// const centerCoords = ref(estateMapStore.lat && estateMapStore.lon ? [estateMapStore.long, estateMapStore.lat] : [16.313192, 48.212161]);
const map = ref();

// function waitForMap() {
//   console.log(map.value);
//   if (map.value !== 'undefined') {
//     console.log(map.value);
//     if (estateMapStore.lat) {
//       console.log('lat lang definiert bruder');
//       map.value.flyTo({
//         center: [estateMapStore.long, estateMapStore.lat],
//         zoom: 15,
//         essential: true,
//       });
//     }
//   } else {
//     setTimeout(waitForMap, 250);
//   }
// }

// waitForMap();

let intervalMSconsumed = 0;
const showLocationIntervall = setInterval(() => {
  const button = document.querySelector('.mapboxgl-ctrl-geolocate');
  if (button) {
    button.click();
    clearInterval(showLocationIntervall);
  }

  if (intervalMSconsumed >= 8000) clearInterval(showLocationIntervall);
  intervalMSconsumed += 500;
}, 500);
</script>
