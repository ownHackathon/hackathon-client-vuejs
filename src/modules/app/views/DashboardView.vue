<template>
  <div class="card p-4">
    <Tabs :v-model="items">
      <TabList>
        <Tab v-for="tab in items" :key="tab.label" :value="tab.route">
          <router-link v-if="tab.route" v-slot="{ href, navigate }" :to="tab.route" custom>
            <a v-ripple :href="href" @click="navigate" class="flex items-center gap-2 text-inherit">
              <i :class="tab.icon" />
              <span>{{ tab.label }}</span>
            </a>
          </router-link>
        </Tab>
      </TabList>
      <TabPanels :items="items">
        <RouterView />
      </TabPanels>

    </Tabs>
  </div>
</template>

<script setup>
import { ref } from "vue";

const items = ref([
  { route: '/app/test', label: 'Dashboard', icon: 'pi pi-home' },
  { route: '/transactions', label: 'Profil', icon: 'pi pi-user' },
  { route: '/workspace', label: 'Workspace', icon: 'pi pi-list' },
  { route: '/messages', label: 'Events', icon: 'pi pi-inbox' }
]);
</script>
