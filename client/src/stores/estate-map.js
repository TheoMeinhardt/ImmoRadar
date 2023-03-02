import { defineStore } from 'pinia';

export const useEstateMapStore = defineStore('estateMapStore', {
  state: () => {
    return {
      long: Number,
      lat: Number,
    };
  },
});
