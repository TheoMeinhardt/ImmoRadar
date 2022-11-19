<template>
  <MapboxMap
    style="height: 100vh"
    access-token="pk.eyJ1IjoibWF0dGhpYXNlaXNlbmh1dCIsImEiOiJjbDNqeXRiYWEwZWdxM2VvNzJpcTRlandiIn0.WeTb8gVsnnDVGQ_9fC-bwg"
    mapStyle="mapbox://styles/matthiaseisenhut/cl8comqv0002114mvdz3z0gh3"
    :center="[16.313192, 48.212161]"
    zoom="12"
  >
  </MapboxMap>
</template>

<script setup>
import { MapboxMap } from '@studiometa/vue-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
</script>
