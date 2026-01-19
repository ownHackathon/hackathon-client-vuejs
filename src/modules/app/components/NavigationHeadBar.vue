<template>
  <nav class="w-full">
    <Toolbar class="flex-nowrap border-none overflow-hidden w-full">
      <template #start>
        <div class="flex items-center gap-2">
          <Button
              as="router-link"
              :to="{name: 'app_home'}"
              class="p-button-sm"
              link>
            <img class="my-custom-logo"/>
            <span class=" hidden md:block ml-2">ownHackathon</span>
          </Button>

        </div>
        <div class="flex items-center gap-2">
          <SplitButton :model="items"  text class="p-button-sm"><span class="">Menü</span></SplitButton>
        </div>

      </template>

      <template #center>
        <div class="flex-grow-1"></div>
      </template>

      <template #end>
        <div class="flex items-center gap-1">
          <Button
              v-if="!authStore.isLoggedIn"
              as="router-link"
              :to="{name: 'app_register'}"
              class="p-button-sm"
              link
              appendTo="body"
              title="Account anlegen"
          >
            <i class="pi pi-user-plus"></i>
            <span class="hidden md:block ml-2">Registrieren</span></Button>
          <SplitButton
              icon="pi pi-user"
              :model="account"
              @click="user_profile"
              text
              class="p-button-sm"
              appendTo="body"
          />
        </div>
      </template>
    </Toolbar>
  </nav>
</template>

<script setup>
import {computed, ref} from "vue";
import SplitButton from 'primevue/splitbutton';
import {useRouter} from "vue-router";
import {useAuthStore} from "@/stores/AuthStore.js";

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
          router.push({name: 'app_logout'});
        }
      }
    ];
  } else {
    return [
      {
        label: 'Anmelden',
        icon: 'pi pi-lock',
        command: () => {
          router.push({name: 'app_login'});
        }
      }
    ];
  }
});

const user_profile = () => {
  router.push({name: 'app_login'});
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

.my-custom-logo {
  content: url('@/assets/image/hackathon_logo.png');
  width: 32px;
  height: 32px;
  display: block;
}
</style>
