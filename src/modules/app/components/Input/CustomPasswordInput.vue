<template>
  <div class="pb-4">
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
            :toggleMask="toggleMask"
            :feedback="feedback"
            size="small"
            fluid
            class="w-full"
            :invalid="!!errorMessage"
            :inputClass="'w-full'"
        >
          <template #header>
            <slot name="header">
              <div v-if="showRules">
                <div class="font-semibold text-xm mb-4">Eingabe vom Passwort</div>
                <hr>
              </div>
            </slot>
          </template>
          <template #content>
            <slot name="content">
              <div v-if="showRules">
                <div class="font-semibold text-xm mb-4">Bitte beachten</div>
              </div>
            </slot>
          </template>
          <template #footer>
            <slot name="footer">
              <div v-if="showRules">
                <ul class="pl-2 ml-2 my-0 leading-normal">
                  <li>Sage keinem anderen dein Passwort</li>
                  <li>Wir werden dich nie nach deinem Passwort fragen!</li>
                </ul>
              </div>
            </slot>
          </template>
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
</style>
