import {defineStore} from 'pinia';
import {computed, ref} from "vue";

export const useAuthStore = defineStore('authStore', () => {
      const accessToken = ref('');
      const refreshToken = ref('');

      const isLoggedIn = computed(() => !!accessToken.value);

      function logOut() {
        accessToken.value = '';
        refreshToken.value = '';
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
