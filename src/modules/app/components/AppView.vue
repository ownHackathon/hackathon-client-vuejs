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
.max-w-custom {
  width: 100%;
}
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100dvh;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  /* Verhindert das horizontale Wackeln auf dem Handy */
  overflow-x: hidden;
  position: relative;
}

#app {
  width: 100%;
  overflow-x: hidden;
}
</style>
