import axios from "axios";
import router from "@/router";
import {useTokenStore} from "@/stores/TokenStore.js";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
  const tokenStore = useTokenStore();
  const accessToken = tokenStore.getAccessToken;


  if (accessToken) {
    config.headers.Authorization = `${accessToken}`;
    console.log(accessToken)
  }

  config.headers["Content-Type"] = "application/json";

  return config;
});

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {

  if (error.response.status === 401) {
    router.push({name: 'app_login'});
    return Promise.reject(error);
  }

  if (error.response.status === 500) {
    router.push("/error");
    return Promise.reject(error);
  }

  return Promise.reject(error);
});
