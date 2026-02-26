<template>
  <div class="flex flex-column gap-2 w-full">
    <label :for="id" class="font-bold text-gray-700">
      <i v-if="icon" :class="icon" class="mr-2"></i>{{ label }}
    </label>
    <Textarea
        :id="id"
        v-model="model"
        :rows="rows"
        class="w-full font-mono p-3 shadow-sm border-1 border-300"
        :placeholder="placeholder"
        autoResize
    />
  </div>
</template>

<script setup>
import Textarea from 'primevue/textarea';

// Nutzt das moderne defineModel für einfaches v-model Binding
const model = defineModel();

defineProps({
  id: String,
  label: String,
  icon: String,
  placeholder: String,
  rows: { type: Number, default: 10 }
});
</script>
