<template>
  <FormCard>
    <div class=" text-white text-center">
      <h1>Neues Passwort setzen</h1>
      <p>Bitte geben Sie ein neues Passwort für Ihren Account ein</p>
    </div>
    <Form
        v-slot="$form"
        :payload
        :resolver
        @submit="onFormSubmit"
        :validateOnValueUpdate="false"
        :validateOnBlur="true"
    >
      <CustomPasswordInput
          id="password"
          name="password"
          label="Password"
          v-model="payload.password"
          icon="pi pi-lock"
          :error-message="$form.password?.error?.message"
          :feedback="true"
      />
      <Button type="submit" class="submitButtonWith" label="neues Password setzen" icon="pi pi-user"/>
    </Form>
  </FormCard>
</template>

<script setup>
import axios from "axios";
import {reactive} from "vue";
import {Button} from "primevue";
import {useToast} from "primevue/usetoast";
import {useValidator} from "@/utils/validator/validator.js";
import router from "@/utils/router/index.js";
import FormCard from "@/modules/app/components/FormCard.vue";
import CustomPasswordInput from "@/modules/app/components/Input/CustomPasswordInput.vue";
import {Form} from '@primevue/forms';

const toast = useToast();
const validate = useValidator();

const props = defineProps({
  token: {
    type: String,
    required: true,
  }
});

const payload = reactive({
  password: '',
});

const resolver = ({values}) => {
  const errors = {};

  if (!validate.password(values.password)) {
    errors.password = [{message: 'Passwort muss mindestens 6 und maximal 255 Zeichen betragen.'}];
  }

  return {
    errors
  };
};

const onFormSubmit = ({valid}) => {
  if (valid) {
    submitRegister();
  }
};

async function submitRegister() {
  await axios
      .patch("/api/account/password/" + props.token, payload,)
      .then((response) => {
        if (response?.status === 200) {
          toast.add({severity: 'success', summary: 'Erfolg', detail: 'Neues Password wurde gesetzt', life: 3000});
          router.push({name: 'app_login'});
        }
      })
      .catch((error) => {
            if (error?.response.status === 400 || error?.response.status === 401 || error?.response.status === 403) {
              toast.add({severity: 'error', summary: 'Fehler bei der Verarbeitung', detail: 'Eingegebene Daten prüfen', life: 5000});
            } else {
              toast.add({severity: 'error', summary: 'Fehler bei der Verarbeitung', detail: 'Unbekannter Fehler', life: 5000});
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
