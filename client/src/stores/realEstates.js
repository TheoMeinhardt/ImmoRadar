import axios from 'axios';
import { defineStore } from 'pinia';

export const useRealEstateStore = defineStore('realEstateStore', {
  state: () => {
    return {
      realEstatesShort: Array,
      wholeRealEstate: Object,
    };
  },
  actions: {
    async fetchAllRealEstateShort() {
      const { data } = await axios.get('/realestate/short');
      this.realEstatesShort = data;
    },
    async fetchWholeRealEstate(reID) {
      const { data } = await axios.get(`/realestate/${reID}`);
      this.wholeRealEstate = data;
    },
  },
});
