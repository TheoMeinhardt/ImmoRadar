import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      jwt: String,
      user: Object,
      needProfileUpdate: Boolean,
    };
  },
  actions: {
    checkIfProfileNeedsUpdate() {
      console.log(this.user);
      this.needProfileUpdate = !(this.user.username && this.user.firstname && this.user.lastname && this.user.phone);
    },
  },
});
