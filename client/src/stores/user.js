import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      jwt: String,
      user: Object,
    };
  },
});