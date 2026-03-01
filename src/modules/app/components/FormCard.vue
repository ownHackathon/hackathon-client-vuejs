<template>
  <div class="flex justify-content-center form-container pb-2">
    <div class="flex justify-content-center form-content card-border w-full md:w-10 lg:w-8">
      <div class="form-content-inner w-full">
        <p v-if="title" class="text-center pb-5">
          <i v-if="icon" :class="icon" class="mr-2"></i>
          <span style="color: white; font-size: 1.5rem">{{ title }}</span>
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
