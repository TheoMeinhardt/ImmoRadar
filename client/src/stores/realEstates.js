import { defineStore } from 'pinia';

export const useRealEstateStore = defineStore('realEstateStore', {
  state: () => {
    return {
      realEstatesShort: Array,
    };
  },
});
