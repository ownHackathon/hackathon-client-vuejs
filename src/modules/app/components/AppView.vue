<script setup>
import NavigationHeadBar from "@app/components/NavigationHeadBar.vue";
import FooterView from "@/modules/app/components/FooterView.vue";
import {RouterView} from "vue-router";
</script>

<template>
  <div class="layout-wrapper w-full">
  <header>
    <div class="flex w-full">
      <NavigationHeadBar class="w-full"/>
    </div>
  </header>
  <main class="flex flex-column flex-grow-1">
      <RouterView />
  </main>
  <footer class="flex w-full">
    <FooterView class="w-full"/>
  </footer>
  </div>
</template>

<style scoped>

.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100dvh;
}

#app {
  width: 100%;
  overflow-x: hidden;
}
</style>
