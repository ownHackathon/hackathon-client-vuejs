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
          <span v-if="!authStore.isLoggedIn" class=" hidden md:block ml-2">ownHackathon</span>
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
        <div v-if="authStore.isLoggedIn" class="flex items-center">
          <div class="flex items-center ">
            <Button
                type="button"
                @click="toggleCreationMenu"
                aria-haspopup="true"
                aria-controls="overlay_creation_menu"
                rounded
                text
                severity="secondary"
            >
              <i class="pi pi-plus-circle"></i><i class="pi pi-angle-down"></i>
            </Button>
            <Menu ref="creation_menu" id="overlay_creation_menu" :model="creation_menu_model" :popup="true">
              <template #item="{ item, props }">
                <a v-ripple class="flex items-center" v-bind="props.action">
                  <span :class="item.icon"/>
                  <span class="ml-2">{{ item.label }}</span>
                </a>
              </template>
            </Menu>
          </div>
          <div class="flex items-center ">
            <Button
                type="button"
                rounded
                text
                severity="secondary"
            >
              <i class="pi pi-envelope"></i>
            </Button>
          </div>
          <div class="flex items-center ">
            <Button
                type="button"
                rounded
                text
                severity="secondary"
            >
              <i class="pi pi-bell"></i>
            </Button>
          </div>
          <div class="flex items-center ">
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
            <Menu ref="menu" id="overlay_menu" :model="account" :popup="true">
              <template #item="{ item, props }">
                <a v-ripple class="flex items-center" v-bind="props.action">
                  <span :class="item.icon"/>
                  <span class="ml-2">{{ item.label }}</span>
                </a>
              </template>
            </Menu>
          </div>
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
    command: () => router.push({name: 'app_dashboard'}),
  },
]);


const menu = ref();
const creation_menu = ref();

const toggleAccountMenu = (event) => {
  menu.value.toggle(event);
};

const toggleCreationMenu = (event) => {
  creation_menu.value.toggle(event);
};

const creation_menu_model = computed(() => [
  {
    label: 'Neuen Workspace',
    icon: 'pi pi-plus',
    command: () => router.push({name: 'app_workspace_create'}),
  },
  {
    label: 'Neues Event',
    icon: 'pi pi-plus',
  },
  {
    separator: true,
  },
  {
    label: 'Neue Nachricht',
    icon: 'pi pi-plus',
  },
]);

const account = computed(() => [
  {
    label: 'Profil',
    icon: 'pi pi-user',
  },
  {
    separator: true,
  },
  {
    label: 'Events',
    icon: 'pi pi-cog',
  },
  {
    label: 'Workspace',
    icon: 'pi pi-cog',
    command: () => router.push({name: 'app_workspace_me'}),
  },
  {
    label: 'Favoriten',
    icon: 'pi pi-cog',
  },
  {
    separator: true,
  },
  {
    label: 'Einstellungen',
    icon: 'pi pi-cog',
  },
  {
    separator: true,
  },
  {
    label: 'Abmelden',
    icon: 'pi pi-sign-out',
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
