<template>
  <div class="flex justify-content-center form-container">
    <div class="flex justify-content-center form-content" >
      <div class="form-content-inner">
        <p v-if="title">
          <i v-if="icon" :class="icon" class="mr-2"></i>
          <span>{{ title }}</span>
        </p>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: '' // z.B. 'pi pi-user'
  }
});
</script>

<style scoped>

</style>
