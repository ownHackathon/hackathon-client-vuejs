<template>
  <FormCard
      title="Workspace erstellen"
  >
    <div v-if="isDraft" class="flex justify-content-end w-full mt-4">
      <ConfirmPopup group="discardDraft">
        <template #container="{ message, acceptCallback, rejectCallback }">
          <div class="rounded p-4">
            <span>{{ message.message }}</span>
            <div class="flex items-center gap-2 mt-4">
              <Button label="verwerfen" @click="acceptCallback" variant="outlined" severity="success"  size="small"></Button>
              <Button label="abbrechen" variant="outlined" @click="rejectCallback" severity="warn" size="small" text></Button>
            </div>
          </div>
        </template>
      </ConfirmPopup>
      <Button
          v-if="isDraft"
          label="Entwurf verwerfen"
          severity="help"
          variant="outlined"
          text
          @click="discardDraft($event)"
      />
    </div>
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
            style="max-width: 65ch"
            :error-message="$form.name?.error?.message"
        />
      </div>
      <div class="w-full md:w-8 lg:w-8">
        <span class="description-text">Eine kurze Beschreibung welche in Listen erscheint</span>
        <CustomTextarea
            id="description"
            name="description"
            label="Kurzbeschreibung"
            rows="3"
            v-model="payload.description"
            style="max-width: 85ch"
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
        <Dropdown v-model="payload.visibility" :options="visibilityOptions" optionLabel="label" placeholder="Sichtbarkeit wählen" class="w-full md:w-14rem">
          <template #option="slotProps">
            <div class="flex flex-column gap-1 py-1">
              <div class="flex align-items-center">
                <i :class="slotProps.option.icon" class="mr-2 text-primary"></i>
                <span class="font-semibold">{{ slotProps.option.label }}</span>
              </div>

              <div class="text-sm text-color-secondary" style="white-space: normal; max-width: 250px;">
                {{ slotProps.option.description }}
              </div>
            </div>
          </template>
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
import {computed, onMounted, reactive, watch} from "vue";
import {useValidator} from "@/utils/validator/validator.js";
import CustomTextarea from "@/modules/app/components/Input/CustomTextarea.vue";
import {useToast} from "primevue/usetoast";
import {useRouter} from "vue-router";
import MarkdownPreviewTabbedTextarea from "@/modules/app/components/Input/MarkdownPreviewTabbedTextarea.vue";
import {Visibility} from '@/constants/visibility.js';
import { useConfirm } from "primevue/useconfirm";

const validate = useValidator();
const router = useRouter();
const toast = useToast();
const STORAGE_KEY = 'workspace_draft';
const confirm = useConfirm();


const visibilityOptions = Object.values(Visibility);

const payload = reactive({
  name: '',
  description: '',
  details: '',
  visibility: Visibility.PUBLIC,
});

const getDefaultPayload = () => ({
  name: '',
  description: '',
  details: '',
  visibility: Visibility.PUBLIC,
});


const isDraft = computed(() => {
  const n = payload.name ? payload.name.trim() : '';
  const d = payload.description ? payload.description.trim() : '';
  const det = payload.details ? payload.details.trim() : '';

  return n.length > 0 || d.length > 0 || det.length > 0;
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

onMounted(() => {
  const saveDraft = localStorage.getItem(STORAGE_KEY);

  if (saveDraft) {
    const draft = JSON.parse(saveDraft);

    if (!payload.name && !payload.description) {
      Object.assign(payload, draft);
      toast.add({
        severity: 'info',
        summary: 'Entwurf geladen',
        detail: 'Dein letzter Schreibfortschritt wurde wiederhergestellt.',
        life: 3000
      });
    }
  }
});

watch(payload, (newVal) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal));
}, {deep: true});

const onFormSubmit = ({valid}) => {
  if (valid) {
    submitlogin();
  }
};

const discardDraft = (event) => {
  confirm.require({
    target: event.currentTarget,
    group: 'discardDraft',
    message: 'Soll der Entwurf verworfen werden?',
    accept: () => {
      Object.assign(payload, getDefaultPayload());
      localStorage.removeItem(STORAGE_KEY);
      toast.add({severity:'info', summary:'Bestätigt', detail:'Entwurf wurde verworfen', life: 3000});
    },
    reject: () => {
      toast.add({severity:'error', summary:'Abgewiesen', detail:'Zurücksetzen abgebrochen', life: 3000});
    }
  });
}

async function submitlogin() {
  const finalPayload = {
    ...payload,
    visibility: payload.visibility?.id || null
  };
  await axios
      .post("/api/workspace", finalPayload)
      .then((response) => {
        if (response?.status === 201) {
          localStorage.removeItem(STORAGE_KEY);
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
