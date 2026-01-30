<template>
  <div class="pb-4">
    <div class="field mb-3">
      <InputGroup>
        <InputGroupAddon v-if="icon">
          <i :class="icon"></i>
        </InputGroupAddon>
        <FloatLabel variant="on">
          <Textarea
              :id="id"
              :name="name"
              v-model="model"
              class="inputTextWidth"
              :rows="rows"
              :autoResize="autoResize"
              fluid
              :invalid="!!errorMessage"
          />
          <label :for="id">{{ label }}</label>
        </FloatLabel>
      </InputGroup>
      <p v-if="helpText" class="text-sm text-gray-500 mt-1">{{ helpText }}</p>
      <Message v-if="errorMessage" severity="error" size="small" variant="simple">
        {{ errorMessage }}
      </Message>
    </div>
  </div>
</template>

<script setup>
import Textarea from 'primevue/textarea';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import FloatLabel from 'primevue/floatlabel';
import Message from 'primevue/message';

const model = defineModel();

defineProps({
  id: { type: String, required: true },
  name: { type: String, required: true },
  label: String,
  icon: String,
  helpText: String,
  errorMessage: String,
  rows: { type: [Number, String], default: 5 },
  autoResize: { type: Boolean, default: false }
});
</script>
