import { defineStore } from 'pinia';
import realEstates from '@/assets/data/realEstates.json';

export const useRealEstatesStore = defineStore('realEstates', {
  state: () => {
    return {
      realEstates,
    };
  },
});
