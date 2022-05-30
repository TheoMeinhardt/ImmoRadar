<template>
  <div id="map"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { onMounted, createApp, defineComponent, nextTick } from 'vue';
import TestPopupContent from '@/components/TestPopupContent.vue';

export default {
  setup() {
    onMounted(() => {
      mapboxgl.accessToken = 'api key';
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v9',
      });
      map.on('load', () => {
        map.addSource('usa', {
          type: 'geojson',
          data: 'https://raw.githubusercontent.com/johan/world.geo.json/master/countries/USA.geo.json',
        });
        map.addLayer({
          id: 'usa-fill',
          type: 'fill',
          source: 'usa',
          paint: {
            'fill-color': 'red',
          },
        });
        map.on('click', 'usa-fill', function (e) {
          new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML('<div id="popup-content"></div>')
            .addTo(map);
          const MyNewPopup = defineComponent({
            extends: TestPopupContent,
            setup() {
              const title = 'This is the USA';
              return { title };
            },
          });
          nextTick(() => {
            createApp(MyNewPopup).mount('#popup-content');
          });
        });
      });
    });
    return {};
  },
};
</script>

<style>
#map {
  height: 100vh;
}
</style>
