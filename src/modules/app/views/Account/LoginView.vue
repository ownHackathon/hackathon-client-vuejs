<template>
  <FormCard>
    <Form
        v-slot="$form"
        :payload
        :resolver
        @submit="onFormSubmit"
        :validateOnValueUpdate="false"
        :validateOnBlur="true"
    >
      <div class=" text-white text-center">
        <h1>Willkommen</h1>
        <p>Noch keinen Account?
          <router-link :to="{name: 'app_register'}">Hier anlegen!</router-link>
        </p>
      </div>
      <CustomInputText
          id="email"
          name="email"
          v-model="payload.email"
          type="email"
          label="E-Mail"
          icon="pi pi-at"
          help-text="demouser@ownhackathon.de"
          :error-message="$form.email?.error?.message"
      />
      <CustomPasswordInput
          id="password"
          name="password"
          v-model="payload.password"
          label="Passwort"
          icon="pi pi-lock"
          help-text="Demouser"
          :error-message="$form.password?.error?.message"
          :feedback="true"
          :show-rules="true"
      />
      <div class="flex flex-row pb-4 gap-6 ">
        <div class="flex">
          <router-link :to="{name: 'app_account_password_forgotten'}">Passwort vergessen?</router-link>
        </div>
      </div>
      <div>
        <Button type="submit" class="submitButtonWith" label="Anmelden" icon="pi pi-user"/>
      </div>
    </Form>
  </FormCard>
</template>

<script setup>
import axios from "axios";
import {reactive} from "vue";
import {useToast} from "primevue/usetoast";
import {useRouter} from "vue-router";
import {Button} from "primevue";
import {useAuthStore} from "@/stores/AuthStore.js";
import {useValidator} from "@/utils/validator/validator.js";
import FormCard from "@/modules/app/components/FormCard.vue";
import CustomInputText from "@/modules/app/components/Input/CustomInputText.vue";
import CustomPasswordInput from "@/modules/app/components/Input/CustomPasswordInput.vue";
import { Form } from '@primevue/forms';

const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();
const validate = useValidator();

const payload = reactive({
  email: '',
  password: '',
});

const resolver = ({values}) => {
  const errors = {};

  if (!validate.email(values.email)) {
    errors.email = [{message: 'Bitte eine gültige E-Mail eingeben.'}];
  }

  if (!validate.password(values.password)) {
    errors.password = [{message: 'Bitte ein gültiges Passwort eingeben.'}];
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
      .post("/api/account/authentication", payload,)
      .then((response) => {
        if (response?.status === 200) {
          const {accessToken, refreshToken} = response.data;
          authStore.accessToken = accessToken;
          authStore.refreshToken = refreshToken;
          toast.add({severity: 'success', summary: 'Willkommen', detail: 'Anmeldung erfolgreich', life: 3000});
          router.back();
        }
      })
      .catch((error) => {
            if (error?.response.status === 400 || error?.response.status === 401 || error?.response.status === 403 || error?.response.status === 409) {
              toast.add({severity: 'error', summary: 'Fehler bei der Anmeldung', detail: 'Eingegebene Daten prüfen', life: 5000});
            } else {
              toast.add({severity: 'error', summary: 'Fehler bei der Anmeldung', detail: 'Unbekannter Fehler', life: 5000});
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
