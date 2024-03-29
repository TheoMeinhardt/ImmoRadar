import axios from 'axios';
import { defineStore } from 'pinia';

// eslint-disable-next-line import/prefer-default-export
export const useRealEstateStore = defineStore('realEstateStore', {
  state: () => ({
    realEstatesShort: Array,
    wholeRealEstate: Object,
    realEstateShort: Object,
    allAssets: Array,
    maxPrice: Number,
    maxUsableArea: Number,
  }),
  actions: {
    async fetchAllRealEstateShort() {
      const { data } = await axios.get('/realestate/short');

      // convert price and usableArea props on shortRealEstate to Numbers
      for (const re of data) {
        re.price = Number(re.price);
        re.usableArea = Number(re.usableArea);
      }

      this.realEstatesShort = data;

      this.calcMaxUsableArea(undefined);
    },

    // eslint-disable operator-linebreak
    calcMaxUsableArea(forSale) {
      let maxUsableArea = 0.0;
      for (const { usableArea, buyable } of this.realEstatesShort) {
        if (forSale === buyable) {
          maxUsableArea = Number(usableArea) >= Number(maxUsableArea) ? Number(usableArea) : maxUsableArea;
        } else if (forSale === undefined) {
          maxUsableArea = Number(usableArea) >= Number(maxUsableArea) ? Number(usableArea) : maxUsableArea;
        }

        this.maxUsableArea = Number(maxUsableArea);
      }
    },
    // eslint-enable operator-linebreak

    async getImageForRealEstate(reID) {
      const realEstate = this.realEstatesShort.find((re) => reID === re.reID);

      if (realEstate.image) return realEstate.image;

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
    },

    async fetchAssetLabels() {
      const { data } = await axios.get('/asset');
      this.allAssets = data;
    },

    async forwardGeocode(str) {
      const { data } = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${str}.json?access_token=${
          import.meta.env.VITE_MAPBOX_TOKEN
        }`,
      );
      return data.features[0] ? data : undefined;
    },

    async fetchWholeRealEstate(reID) {
      const { data } = await axios.get(`/realestate/${reID}`);
      this.wholeRealEstate = data;
    },
    async fetchRealEstateShort(reID) {
      const { data } = await axios.get(`/realestate/short/${reID}`);
      this.realEstateShort = data;
    },
  },
});
