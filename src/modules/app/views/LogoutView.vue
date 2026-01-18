<template>
  <div class="flex justify-content-center p-5">
    <ProgressSpinner />
    <Toast/>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useClientIDStore } from "@/stores/ClientIDStore.js";
import { useTokenStore } from "@/stores/TokenStore.js";
import { useToast } from "primevue/usetoast";
import axios from "axios";
import ProgressSpinner from 'primevue/progressspinner';

const router = useRouter();
const clientIDStore = useClientIDStore();
const tokenStore = useTokenStore();
const toast = useToast();

onMounted(async () => {
  try {
    const response = await axios.get("/api/account/logout");

    if (response?.status === 200) {
      toast.add({severity: 'success', summary: 'Abgemeldet', detail: 'Bis bald!', life: 3000});
    }
  } catch (error) {
    console.error("Logout API Fehler:", error);
  } finally {
    tokenStore.removeToken();
    clientIDStore.removeClientID();
    clientIDStore.setClientID();

    axios.defaults.headers.common['x-ident'] = `${clientIDStore.getClientID()}`;

    router.push({ name: 'app_login' });
  }
});
</script>
