<script setup>
import NavigationHeadBar from "@app/components/NavigationHeadBar.vue";
import FooterView from "@/modules/app/components/FooterView.vue";
import {RouterView} from "vue-router";
</script>

<template>
  <div class="layout-wrapper">
  <header>
    <div class="flex w-full">
      <NavigationHeadBar class="w-full"/>
    </div>
  </header>
  <main class="flex-grow-1 flex flex-column overflow-auto">
    <div class="flex-grow-1 w-full flex flex-column">
      <RouterView />
    </div>
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
