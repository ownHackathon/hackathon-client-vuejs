<template>
  <FormCard
      innerClass="pt-0"
  >
    <div class="flex justify-content-end w-full mt-4">
      <ConfirmPopup group="discardDraft">
        <template #container="{ message, acceptCallback, rejectCallback }">
          <div class="rounded p-4">
            <span>{{ message.message }}</span>
            <div class="flex items-center gap-2 mt-4">
              <Button label="verwerfen" @click="acceptCallback" variant="outlined" severity="success" size="small"></Button>
              <Button label="abbrechen" variant="outlined" @click="rejectCallback" severity="warn" size="small" text></Button>
            </div>
          </div>
        </template>
      </ConfirmPopup>
      <Button
          label="Entwurf verwerfen"
          icon="pi pi-trash"
          severity="help"
          outlined
          size="small"
          @click="discardDraft($event)"
          :class="isDraft ? 'opacity-100' : 'opacity-0 pointer-events-none'"
          class="transition-opacity duration-200"
      />
    </div>
    <div class="text-center p-3">
      <span style="color: white; font-size: 1.5rem">Workspace erstellen</span>
    </div>
    <Form
        v-slot="$form"
        :payload
        :resolver
        @submit="onFormSubmit"
        :validateOnValueUpdate="false"
        :validateOnSubmit="true"
        class="flex flex-column gap-1"
    >
      <div class="w-full md:w-8 lg:w-8">
        <div class="description-text pl-2">Ein eindeutiger Name für den Workspace</div>
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
        <div class="description-text pl-2">Eine kurze Beschreibung welche in Listen erscheint</div>
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
        >
          <template #description>
            Nutze
            <router-link :to="{ name: 'app_md_guide'}" target="_blank" class="inline-link">
              Markdown <sup><i class="pi pi-external-link" style="font-size: 0.5rem; color: white"></i></sup>
            </router-link>
            , um deinen Workspace individuell zu gestalten und umfassend zu beschreiben.
          </template>
        </MarkdownPreviewTabbedTextarea>
      </div>
      <div class="w-full">
        <p class="font-semibold">Sichtbarkeit: </p>
        <Dropdown v-model="payload.visibility" :options="visibilityOptions" optionLabel="label" placeholder="Sichtbarkeit wählen" class="w-16rem">
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
      <div class="flex justify-content-end align-items-center gap-2 mt-6 pb-4">

        <!-- Sekundäre Aktion -->
        <Button
            v-if="isDraft"
            label="Entwurf verwerfen"
            icon="pi pi-trash"
            severity="secondary"
            text
            size="small"
            @click="discardDraft($event)"
        />

        <!-- Primäre Aktion -->
        <Button
            type="submit"
            label="Workspace erstellen"
            icon="pi pi-check"
            class="px-5"
        />
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
import {useConfirm} from "primevue/useconfirm";

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
  const visChanged = payload.visibility?.id !== Visibility.PUBLIC.id;

  return n.length > 0 || d.length > 0 || det.length > 0 || visChanged;
});

const resolver = () => {
  const errors = {};

  if (!validate.workspaceName(payload.name)) {
    errors.name = [{message: 'mindestens 3 Zeichen und maximal 64 Zeichen'}];
  }

  if (!validate.workspaceDescription(payload.description)) {
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
  if (isDraft.value) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}, {deep: true});

const onFormSubmit = ({valid}) => {
  if (valid) {
    submitWorkspaceCreate();
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
      toast.add({severity: 'info', summary: 'Bestätigt', detail: 'Entwurf wurde verworfen', life: 3000});
    },
    reject: () => {
      toast.add({severity: 'error', summary: 'Abgewiesen', detail: 'Zurücksetzen abgebrochen', life: 3000});
    }
  });
};

async function submitWorkspaceCreate() {
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
