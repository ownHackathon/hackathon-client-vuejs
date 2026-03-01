<template>
  <div class="pt-1 sm:pt-3">
  <div class="field mb-3">
    <InputGroup>
      <InputGroupAddon v-if="icon">
        <i :class="icon"></i>
      </InputGroupAddon>
      <FloatLabel variant="on">
        <Password
            :id="id"
            :name="name"
            v-model="model"
            toggleMask
            :feedback="false"
            size="small"
            fluid
            class="w-full"
            :invalid="!!errorMessage"
            :inputClass="'w-full'"
            style="max-width: 300px"
        >

        </Password>
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
defineOptions({inheritAttrs: false});

const model = defineModel();

defineProps({
  id: {type: String, required: true},
  name: {type: String, required: true}, // Wichtig für $form
  label: {type: String, default: 'Passwort'},
  icon: {type: String, default: 'pi pi-lock'},
  helpText: String,
  errorMessage: String,


  toggleMask: {type: Boolean, default: true},
  feedback: {type: Boolean, default: false},
  showRules: {type: Boolean, default: false}
});
</script>

<style scoped>
:deep(.p-password-input) {
  width: 100%;
}

/* 1. Sicherstellen, dass das Input-Feld rechts Platz für das Icon lässt */
:deep(.p-password-input) {
  padding-right: 2.5rem !important;
}

/* 2. Das Icon (oder der Button-Container) muss über dem Input liegen */
:deep(.p-password-toggle-mask-icon),
:deep(.p-password-mask-icon),
:deep(.p-icon-field-icon) {
  z-index: 10 !important;
  opacity: 1 !important;
  visibility: visible !important;
  pointer-events: all !important; /* Sicherstellen, dass es klickbar bleibt */
  color: var(--p-text-color) !important; /* Explizite Farbe setzen */
}

/* 3. PrimeVue v4 spezifisch: Falls das Icon in einem Button liegt */
:deep(.p-password-mask-icon) {
  display: flex !important;
  align-items: center;
  justify-content: center;
}
:deep(input::-ms-reveal),
:deep(input::-ms-clear) {
  display: none !important;
}
</style>
