import axios from 'axios';
import { defineStore } from 'pinia';

export const useRealEstateStore = defineStore('realEstateStore', {
  state: () => {
    return {
      realEstatesShort: Array,
      allAssets: Array,
      maxPrice: Number,
      maxUsableArea: Number,
    };
  },
  actions: {
    async fetchAllRealEstateShort() {
      const { data } = await axios.get('/realestate/short');

      // convert price and usableArea props on shortRealEstate to Numbers
      for (const re of data) {
        re.price = Number(re.price);
        re.usableArea = Number(re.usableArea);
      }

      this.realEstatesShort = data;

      let maxPrice = 0;
      for (const { price } of data) {
        maxPrice = Number(price) >= Number(maxPrice) ? price : Number(maxPrice);
      }

      this.maxPrice = maxPrice;

      let maxUsableArea = 0.0;
      for (const { usableArea } of data) {
        maxUsableArea = Number(usableArea) >= Number(maxUsableArea) ? Number(usableArea) : maxUsableArea;
      }

      this.maxUsableArea = Number(maxUsableArea);
    },

    async getImageForRealEstate(reID) {
      const realEstate = this.realEstatesShort.find((re) => reID === re.reID);

      if (realEstate.image) return realEstate.image;
      else {
        try {
          const res = await axios.post('/image', {
            path: realEstate.thumbnail,
          });

          this.realEstatesShort[this.realEstatesShort.indexOf(realEstate)].image = res.data;
          return res.data;
        } catch (err) {
          this.realEstatesShort[this.realEstatesShort.indexOf(realEstate)].image = "https://dummyimage.com/600x400/ffffff/000000.png&text=Couldn't+find+image";
          return "https://dummyimage.com/600x400/ffffff/000000.png&text=Couldn't+find+image";
        }
      }
    },

    async fetchAssetLabels() {
      const { data } = await axios.get('/asset');
      this.allAssets = data;
    },

    async forwardGeocode(str) {
      const { data } = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${str}.json?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`);
      return data.features[0] ? data : undefined;
    },
  },
});
