<script setup>
import {RouterView} from 'vue-router';
import {useClientIDStore} from '@/stores/ClientIDStore.js';
import axios from "axios";

const clientIDStore = useClientIDStore();
if (!clientIDStore.hasClientID) {
  clientIDStore.regenerateClientID();
}
axios.defaults.headers.common['x-ident'] = clientIDStore.uniqueClientID;
</script>

<template>
  <Toast position="top-right" />

  <RouterView/>
</template>
