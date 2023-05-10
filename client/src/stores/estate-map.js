import { defineStore } from 'pinia';

// eslint-disable-next-line import/prefer-default-export
export const useEstateMapStore = defineStore('estateMapStore', {
  state: () => ({
    long: Number,
    lat: Number,
  }),
});
