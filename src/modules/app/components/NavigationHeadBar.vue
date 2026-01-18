<template>
  <nav>
    <div class="card">
      <Menubar :model="items">
        <template #start>
          <div class="">
            <router-link :to="{name: 'app_home'}" class="nav-link">ownHackathon</router-link>
          </div>
        </template>
        <template #end>
          <div class="card flex justify-center">
            <SplitButton icon="pi pi-user" :model="account" @click="save" text/>

          </div>
        </template>
      </Menubar>
    </div>
  </nav>
</template>

<script setup>
import {computed, ref} from "vue";
import Menubar from 'primevue/menubar';
import SplitButton from 'primevue/splitbutton';
import {useRouter} from "vue-router";
import {useAuthStore } from "@/stores/AuthStore.js";

const router = useRouter();
const authStore = useAuthStore();

const items = ref([
  {
    label: 'Testeintrag',
    icon: 'pi pi-spinner',
    command: () => {
      router.push({name: 'app_test'});
    }
  },
]);

const account = computed(() => {
  if (authStore.isLoggedIn) {
    return [
      {
        label: 'Ausloggen',
        icon: 'pi pi-sign-out', // Passendes Icon für Logout
        command: () => {
          router.push({ name: 'app_logout' })
        }
      }
    ]
  } else {
  return [
    {
      label: 'Anmelden',
      icon: 'pi pi-lock',
      command: () => {
        router.push({ name: 'app_login' })
      }
    }
  ]}
});

const save = () => {
  router.push({name: 'app_login'})
};
</script>

<style scoped>
.nav-link:link, .nav-link:visited {
  font-size: 1.2rem;
  color: lavender;
  text-decoration: none;
}

.nav-link:hover, .nav-link:active {
  color: white;
  text-decoration-thickness: 2px;
}
</style>
