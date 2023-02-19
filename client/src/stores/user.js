import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      jwt: String,
      user: Object,
      needProfileUpdate: Boolean,
      isLoggedIn: false,
    };
  },
  actions: {
    checkIfProfileNeedsUpdate() {
      this.needProfileUpdate = !(this.user.username && this.user.firstname && this.user.lastname && this.user.phone);
    },
  },
});
