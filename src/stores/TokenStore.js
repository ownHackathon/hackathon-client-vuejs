import {defineStore} from 'pinia';
import {computed, ref} from "vue";

export const useTokenStore = defineStore('tokenStore', () => {
  const accessToken = ref('');
  const refreshToken = ref('');

  const getAccessToken = computed(() => {
    if (accessToken.value.length > 0) {
      return accessToken.value;
    }

    return null;
  });

  const getRefreshToken = computed(() => {
    if (refreshToken.value.length > 0) {
      return refreshToken;
    }

    const token = localStorage.getItem('token');
    if (token !== null && token.length > 0) {
      refreshToken.value = token;

      return refreshToken.value;
    }

    return null;
  });

  function persistToken() {
    localStorage.setItem('token', refreshToken.value);
  }

  function removeToken() {
    localStorage.removeItem('token');
    accessToken.value = '';
    refreshToken.value = '';
  }

  return {accessToken, refreshToken, persistToken, getAccessToken, getRefreshToken, removeToken};
});
