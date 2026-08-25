import {defineStore} from 'pinia';
import {computed, ref} from "vue";

export const useAuthStore = defineStore('authStore', () => {
      const accessToken = ref(null);
      const refreshToken = ref(null);

      const isLoggedIn = computed(() => !!accessToken.value);

      function logOut() {
        accessToken.value = null;
        refreshToken.value = null;
      }

      return {accessToken, refreshToken, isLoggedIn, logOut};
    },
    {
      persist: {
        key: 'user_session',
        serializer: {
          serialize: (state) => {
            return btoa(JSON.stringify(state));
          },
          deserialize: (value) => {
            return JSON.parse(atob(value));
          }
        }
      }
    });
