<script setup>

</script>

<template>
  <Toast position="top-right" />

  <RouterView />
  <ScrollTop
      :threshold="200"
      :buttonProps="{ severity: 'contrast', raised: true, rounded: true }"
      icon="pi pi-arrow-up"
  />
</template>
