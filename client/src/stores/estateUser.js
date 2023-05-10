import axios from 'axios';
import { defineStore } from 'pinia';

// eslint-disable-next-line import/prefer-default-export
export const useEstateUserStore = defineStore('estateUserStore', {
  state: () => ({
    estateUser: Object,
  }),
  actions: {
    async fetchEstateUser(userID) {
      const { data } = await axios.get(`/user/${userID}`);
      this.estateUser = data;
    },
  },
});
