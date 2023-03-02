import axios from 'axios';
import { defineStore } from 'pinia';

export const useEstateUserStore = defineStore('estateUserStore', {
  state: () => {
    return {
      estateUser: Object,
    };
  },
  actions: {
    async fetchEstateUser(userID) {
      const { data } = await axios.get(`/user/${userID}`);
      this.estateUser = data;
    },
  },
});
