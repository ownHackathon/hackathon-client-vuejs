import axios from "axios";
import router from "@/utils/router/index.js";
import {useAuthStore} from "@/stores/AuthStore.js";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {

  const authStore = useAuthStore();
  const accessToken = authStore.accessToken;


  if (accessToken) {
    config.headers.Authorization = authStore.accessToken;
  }

  config.headers["Content-Type"] = "application/json";

  return config;
});

axios.interceptors.response.use(function (response) {
  return response;
}, async function (error) {
  const authStore = useAuthStore();

  if (error.response.status === 401 && error.response.data.message === 'Token has expired') {
    console.log('API Answer: Token has expired');
    const originalRequest = error.config;
    if (!originalRequest._retry) {
      originalRequest._retry = true;
    }
    try {
      authStore.accessToken = undefined
      const refreshResponse = await axios.get('/api/token/refresh',
          {
            headers: {
              Authentication: authStore.refreshToken,
              Authorization: undefined,
            }
          });

      authStore.accessToken = refreshResponse.data.accessToken;
      originalRequest.headers["Authorization"] = authStore.accessToken;
      return axios(originalRequest);
    } catch (refreshErrors) {
      return Promise.reject(refreshErrors);
    }
  } else if (error.response.status === 401) {
    console.log(error.response.data.message);
    await router.push({name: 'app_login'});
    return Promise.reject(error);
  }

  if (error.response.status === 500) {
    await router.push("/error");
    return Promise.reject(error);
  }

  return Promise.reject(error);
});
