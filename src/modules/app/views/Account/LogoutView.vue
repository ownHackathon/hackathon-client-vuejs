<template>
  <div class="flex justify-content-center p-5">
    <ProgressSpinner/>
    <Toast/>
  </div>
</template>

<script setup>
import {onMounted} from "vue";
import {useRouter} from "vue-router";
import {useClientIDStore} from "@/stores/ClientIDStore.js";
import {useAuthStore} from "@/stores/AuthStore.js";
import {useToast} from "primevue/usetoast";
import axios from "axios";
import ProgressSpinner from 'primevue/progressspinner';

const router = useRouter();
const clientIDStore = useClientIDStore();
const authStore = useAuthStore();
const toast = useToast();

onMounted(async () => {
  try {
    if (authStore.isLoggedIn) {
      const response = await axios.get("/api/account/logout");
      console.log(response?.status);
      if (response?.status === 200) {
        toast.add({severity: 'success', summary: 'Abgemeldet', detail: 'Bis bald!', life: 3000});
      }
    }
  } catch (error) {
    console.error("Logout API Fehler:", error);
  } finally {
    authStore.logOut();
    clientIDStore.regenerateClientID();
    axios.defaults.headers.common['x-ident'] = clientIDStore.uniqueClientID;
    await router.push({name: 'app_home'});
  }
});
</script>
