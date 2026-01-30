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
    >
    <CustomInputText
        id="name"
        name="name"
        label="Workspace Name"
        type="text"
        v-model="payload.name"
        :error-message="$form.name?.error?.message"
      />
      <CustomTextarea
          id="description"
          name="description"
          label="Workspace Beschreibung"
          v-model="payload.description"
          :error-message="$form.description?.error?.message"
      />
      <div>
        <Button type="submit" class="submitButtonWith" label="Erstellen"/>
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

const validate = useValidator();
const router = useRouter();
const toast = useToast();
const payload = reactive({
  name: '',
  description: '',
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
  await axios
      .post("/api/workspace", payload,)
      .then((response) => {
        if (response?.status === 201) {
          toast.add({severity: 'success', summary: 'Erfolgreich', detail: 'Workspace wurde erstellt', life: 3000});
          router.push(`/app/workspace/${response.data.slug}`)
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
.inputTextWidth {
  width: 100%;
}

.submitButtonWith {
  width: 100%;
}
</style>
