<template>
  <nav class="w-full">
    <Menubar :model="items">
      <template #start>
        <Button
            as="router-link"
            :to="{name: 'app_home'}"
            class="p-button-sm"
            link>
          <img class="my-custom-logo"/>
          <span class=" hidden md:block ml-2">ownHackathon</span>
        </Button>
      </template>
      <template #item="{ item, props, hasSubmenu, root }">
        <a v-ripple class="flex items-center" v-bind="props.action">
          <span>{{ item.label }}</span>
          <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge"/>
          <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
          <i v-if="hasSubmenu" :class="['pi pi-angle-down ml-auto', { 'pi-angle-down': root, 'pi-angle-right': !root }]"></i>
        </a>
      </template>

      <template #end>
        <div v-if="authStore.isLoggedIn" class="flex items-center gap-2">
          <Button
              type="button"
              @click="toggleAccountMenu"
              aria-haspopup="true"
              aria-controls="overlay_menu"
              rounded
              text
              severity="secondary"
          >
            <i class="pi pi-user"></i><i class="pi pi-angle-down"></i>
          </Button>

          <!-- Das eigentliche Popup-Menü -->
          <Menu ref="menu" id="overlay_menu" :model="account" :popup="true">
            <template #item="{ item, props }">
              <a v-ripple class="flex items-center" v-bind="props.action">
                <span :class="item.icon"/>
                <span class="ml-2">{{ item.label }}</span>
              </a>
            </template>
          </Menu>
        </div>
        <div v-else class="flex items-center gap-2">
          <Button
              as="router-link"
              label="Registrieren"
              variant="outlined"
              severity="primary"
              :to="{name: 'app_register'}"
              size="small"
          />
          <Button
              as="router-link"
              label="Anmelden"
              variant="outlined"
              severity="primary"
              :to="{name: 'app_login'}"
              size="small"
          />
        </div>
      </template>
    </Menubar>
  </nav>
</template>

<script setup>
import {computed, ref} from "vue";
import {useRouter} from "vue-router";
import {useAuthStore} from "@/stores/AuthStore.js";

const router = useRouter();
const authStore = useAuthStore();

const items = computed(() => [
  {
    label: "Entdecken",
    visible: !authStore.isLoggedIn,
  },
  {
    label: "Ruhmeshalle",
    visible: !authStore.isLoggedIn,
  },
  {
    label: "Anleitung",
    visible: !authStore.isLoggedIn,
  },
  {
    label: "Dashboard",
    visible: authStore.isLoggedIn,
  },
  {
    label: 'Meine Events',
    icon: 'pi pi-at',
    visible: authStore.isLoggedIn,
    items: [
      {
        label: 'Anstehende',
      },
      {
        label: 'Aktiv',
      },
      {
        label: 'Vergangende',
      }
    ]
  },
  {
    label: 'Organisation',
    icon: 'pi pi-at',
    visible: authStore.isLoggedIn,
    items: [
      {
        label: 'Alle',
      },
      {
        label: 'Beigetreten',
      },
      {
        label: 'Meine',
      }
    ]
  }
]);


const menu = ref(); // Referenz für das Popup-Menü

const toggleAccountMenu = (event) => {
  menu.value.toggle(event);
};

const account = computed(() => [
  {
    label: 'Profil',
    icon: 'pi pi-user',
  },
  {
    label: 'Anmelden',
    icon: 'pi pi-sign-in',
    visible: !authStore.isLoggedIn,
    command: () => router.push({name: 'app_login'}),
  },
  {
    label: 'Registrieren',
    icon: 'pi pi-user-plus',
    visible: !authStore.isLoggedIn,
    command: () => router.push({name: 'app_register'}),
  },
  {
    visible: authStore.isLoggedIn,
    separator: true,
  },
  {
    label: 'Einstellungen',
    icon: 'pi pi-cog',
    visible: authStore.isLoggedIn,

  },
  {
    visible: authStore.isLoggedIn,
    separator: true,
  },
  {
    label: 'Abmelden',
    icon: 'pi pi-sign-out',
    visible: authStore.isLoggedIn,
    command: () => router.push({name: 'app_logout'}),
  }
]);

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
