<script setup>
import {RouterView} from 'vue-router';
import {useClientIDStore} from '@/stores/ClientIDStore.js';
import axios from "axios";

const clientIDStore = useClientIDStore();
clientIDStore.setClientID();
axios.defaults.headers.common['x-ident'] = `${clientIDStore.getClientID()}`;
</script>

<template>
  <Toast/>

  <RouterView/>
</template>
