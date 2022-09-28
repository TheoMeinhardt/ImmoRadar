<script setup>
import { MapboxMap } from '@studiometa/vue-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
</script>

<template>
  <MapboxMap
    style="height: 400px"
    access-token="..."
    mapStyle="mapbox://styles/matthiaseisenhut/cl8comqv0002114mvdz3z0gh3"
  >
  </MapboxMap>
</template>
