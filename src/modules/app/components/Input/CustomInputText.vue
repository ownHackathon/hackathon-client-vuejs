<template>
  <div class="pb-4">
    <div class="field mb-3">
      <InputGroup>
        <InputGroupAddon v-if="icon">
          <i :class="icon"></i>
        </InputGroupAddon>
        <FloatLabel variant="on">
          <InputText
              :id="id"
              :name="name"
              v-model="model"
              :type="type"
              class="inputTextWidth"
              size="small"
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
const model = defineModel();

defineProps({
  id: {type: String, required: true},
  name: {type: String, required: true},
  label: String,
  type: {type: String, default: 'text'},
  icon: String,
  helpText: String,
  errorMessage: String
});
</script>
