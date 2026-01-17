import {defineStore} from 'pinia';
import {computed, ref} from "vue";

export const useTokenStore = defineStore('tokenStore', () => {
  const accessToken = ref('');
  const refreshToken = ref('');

  // eslint-disable-next-line vue/return-in-computed-property
  const getAccessToken = computed(() => {
    if (accessToken.value) return accessToken.value;

    const token = sessionStorage.getItem('accessToken');
    if (token) {
      accessToken.value = token;
      return token;
    }
  });

  const getRefreshToken = computed(() => {
    if (refreshToken.value) {
      return refreshToken;
    }

    const token = localStorage.getItem('token');
    if (token) {
      refreshToken.value = token;

      return token;
    }

    return null;
  });

  function setAccessToken() {
    sessionStorage.setItem('accessToken', accessToken.value);
  }

  function persistToken() {
    localStorage.setItem('token', refreshToken.value);
  }

  function removeToken() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('accessToken');
    accessToken.value = '';

    refreshToken.value = '';
  }

  return {setAccessToken, accessToken, refreshToken, persistToken, getAccessToken, getRefreshToken, removeToken};
});
