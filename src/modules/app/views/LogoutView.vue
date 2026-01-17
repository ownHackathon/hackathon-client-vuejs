<template>
  <div>
    <Toast />
  </div>
</template>
<script setup>
import {useRouter} from "vue-router";
import {useClientIDStore} from "@/stores/ClientIDStore.js";
import axios from "axios";
import {useToast} from "primevue/usetoast";

const router = useRouter();
const clientIDStore = useClientIDStore();
const toast = useToast()

clientIDStore.removeClientID();
clientIDStore.setClientID();
axios.defaults.headers.common['x-ident'] = `${clientIDStore.getClientID()}`;
toast.add({severity: 'success', summary: 'Bye bye', detail: 'Abmeldung erfolgreich', life: 3000});
router.push({name: 'app_home'});
</script>
<style scoped>

</style>
