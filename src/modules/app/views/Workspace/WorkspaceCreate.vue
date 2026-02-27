<template>
  <FormCard
      title="Workspace erstellen"
  >
    <Form
        v-slot="$form"
        :payload
        :resolver
        @submit="onFormSubmit"
        :validateOnValueUpdate="false"
        :validateOnBlur="true"
        class="flex flex-column gap-1"
    >
      <div class="w-full md:w-8 lg:w-8">
        <span class="description-text">Ein eindeutiger Name für den Workspace</span>
        <CustomInputText
            id="name"
            name="name"
            label="Name"
            type="text"
            v-model="payload.name"
            :error-message="$form.name?.error?.message"
        />
      </div>
      <div class="w-full md:w-8 lg:w-8">
        <span class="description-text">Eine kurze Beschreibung welche in Listen erscheint</span>
        <CustomTextarea
            id="description"
            name="description"
            label="Kurzbeschreibung"
            rows="2"
            v-model="payload.description"
            :error-message="$form.description?.error?.message"
        />
      </div>

      <div class="w-full">
        <MarkdownPreviewTabbedTextarea
            v-model="payload.details"
        />
      </div>
      <div class="w-full pt-4">
        <span class="font-semibold">Sichtbarkeit: </span>
        <Dropdown v-model="payload.visibility" :options="visibilityOptions" optionLabel="label"  placeholder="Sichtbarkeit wählen" class="w-full md:w-14rem"
        >
          <!-- Bonus: Icons im Dropdown anzeigen -->
          <template #option="slotProps">
            <div class="flex flex-column gap-1 py-1">
              <!-- Obere Zeile: Icon und Label -->
              <div class="flex align-items-center">
                <i :class="slotProps.option.icon" class="mr-2 text-primary"></i>
                <span class="font-semibold">{{ slotProps.option.label }}</span>
              </div>

              <!-- Untere Zeile: Beschreibung in Grau -->
              <div class="text-sm text-color-secondary" style="white-space: normal; max-width: 250px;">
                {{ slotProps.option.description }}
              </div>
            </div>
          </template>
          <!-- Bonus: Icon im gewählten Wert anzeigen -->
          <template #value="slotProps">
            <div v-if="slotProps.value" class="flex align-items-center">
              <i :class="slotProps.value.icon" class="mr-2"></i>
              <div>{{ slotProps.value.label }}</div>
            </div>
            <span v-else>{{ slotProps.placeholder }}</span>
          </template>
        </Dropdown>
      </div>
      <div class="w-full md:w-8 lg:w-8 align-self-center flex justify-content-center mt-4">
        <Button type="submit" class="submitButtonWith" label="Workspace Erstellen"/>
      </div>
    </Form>
  </FormCard>
</template>

<script setup>
import axios from "axios";
import FormCard from "@/modules/app/components/FormCard.vue";
import CustomInputText from "@/modules/app/components/Input/CustomInputText.vue";
import {reactive} from "vue";
import {useValidator} from "@/utils/validator/validator.js";
import CustomTextarea from "@/modules/app/components/Input/CustomTextarea.vue";
import {useToast} from "primevue/usetoast";
import {useRouter} from "vue-router";
import MarkdownPreviewTabbedTextarea from "@/modules/app/components/Input/MarkdownPreviewTabbedTextarea.vue";
import { Visibility } from '@/constants/visibility.js';

const validate = useValidator();
const router = useRouter();
const toast = useToast();

const visibilityOptions = Object.values(Visibility);

const payload = reactive({
  name: '',
  description: '',
  details: '',
  visibility: Visibility.PUBLIC,
});

const resolver = ({values}) => {
  const errors = {};

  if (!validate.workspaceName(values.name)) {
    errors.name = [{message: 'mindestens 3 Zeichen und maximal 64 Zeichen'}];
  }

  if (!validate.workspaceDescription(values.description)) {
    errors.description = [{message: 'maximal 255 Zeichen'}];
  }

  return {
    errors
  };
};

const onFormSubmit = ({valid}) => {
  if (valid) {
    submitlogin();
  }
};

async function submitlogin() {
  const finalPayload = {
    ...payload,
    visibility: payload.visibility?.id || null
  };
  await axios
      .post("/api/workspace", finalPayload)
      .then((response) => {
        if (response?.status === 201) {
          toast.add({severity: 'success', summary: 'Erfolgreich', detail: 'Workspace wurde erstellt', life: 3000});
          router.push(`/app/workspace/${response.data.slug}`);
        }
      })
      .catch((error) => {
            if (error?.response.status === 400 || error?.response.status === 401 || error?.response.status === 403 || error?.response.status === 409) {
              toast.add({severity: 'error', summary: 'Fehler', detail: 'Eingegebene Daten prüfen', life: 5000});
            } else {
              toast.add({severity: 'error', summary: 'Fehler', detail: 'Unbekannter Fehler', life: 5000});
            }
          }
      );
}
</script>

<style scoped>
.description-text {
  font-size: 0.9rem;
  color: var(--p-gray-400);
}

.submitButtonWith {
  width: 100%;
}
</style>
