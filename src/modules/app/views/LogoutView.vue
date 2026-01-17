<template>
  <div>
    <Toast/>
  </div>
</template>
<script setup>
import {useRouter} from "vue-router";
import {useClientIDStore} from "@/stores/ClientIDStore.js";
import axios from "axios";
import {useToast} from "primevue/usetoast";
import {useTokenStore} from "@/stores/TokenStore.js";

const router = useRouter();
const clientIDStore = useClientIDStore();
const tokenStore = useTokenStore();
const toast = useToast();

await axios
    .get("/api/account/logout")
    .then((response) => {
      if (response?.status === 200) {
        clientIDStore.removeClientID();
        clientIDStore.setClientID();
        tokenStore.removeToken();

        axios.defaults.headers.common['x-ident'] = `${clientIDStore.getClientID()}`;

        toast.add({severity: 'success', summary: 'Bye bye', detail: 'Abmeldung erfolgreich', life: 3000});
        router.push({ name: 'app_home' });
      }
    })
    .catch(() => {
        clientIDStore.removeClientID();
        clientIDStore.setClientID();
        tokenStore.removeToken();
        toast.add({severity: 'error', summary: 'Fehler bei der Abmeldung', detail: 'Unbekannter Fehler', life: 5000});
      }
    );

router.push({name: 'app_home'});
</script>
<style scoped>

</style>
