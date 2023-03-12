import { defineStore } from 'pinia';

// eslint-disable-next-line import/prefer-default-export
export const useUserStore = defineStore('userStore', {
  state: () => ({
    jwt: String,
    user: Object,
    needProfileUpdate: Boolean,
    isLoggedIn: false,
  }),
  actions: {
    checkIfProfileNeedsUpdate() {
      this.needProfileUpdate = !(
        this.user.username
        && this.user.firstname
        && this.user.lastname
        && this.user.phone
      );
    },
  },
});
