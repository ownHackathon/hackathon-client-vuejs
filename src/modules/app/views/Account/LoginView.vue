<template>
  <div class="flex justify-content-center form-container">
    <div class="flex justify-content-center form-content">
      <div class="form-content-inner">
        <Form v-slot="$form" :payload :resolver @submit="onFormSubmit">
          <div class=" text-white text-center">
            <h1>Willkommen</h1>
            <p>Noch keinen Account?
              <router-link :to="{name: 'app_register'}">Hier anlegen!</router-link>
            </p>
          </div>
          <div class="pb-4">
            <InputGroup>
              <InputGroupAddon>
                <i class="pi pi-at"></i>
              </InputGroupAddon>
              <FloatLabel variant="on">
                <InputText v-model="payload.email" name="email" type="email" class="inputTextWidth" size="small" fluid/>
                <label for="email">E-Mail</label>
              </FloatLabel>
            </InputGroup>
            <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error?.message }}</Message>
          </div>
          <div class="pb-4">
            <InputGroup>
              <InputGroupAddon>
                <i class="pi pi-lock"></i>
              </InputGroupAddon>
              <FloatLabel variant="on">
                <Password v-model="payload.password" name="password" class="inputTextWidth" size="small" toggleMask fluid>
                  <template #header>
                    <div class="font-semibold text-xm mb-4">Eingabe vom Passwort</div>
                    <hr>
                  </template>
                  <template #content>
                    <div class="font-semibold text-xm mb-4">Bitte beachten</div>
                  </template>
                  <template #footer>
                    <ul class="pl-2 ml-2 my-0 leading-normal">
                      <li>Sage keinem anderen dein Passwort</li>
                      <li>Wir werden dich nie nach deinem Passwort fragen!</li>
                    </ul>
                  </template>
                </Password>
                <label for="password">Passwort</label>
              </FloatLabel>
            </InputGroup>
            <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{ $form.password.error?.message }}</Message>
          </div>
          <div class="flex flex-row pb-4 gap-6 ">
            <div class="flex">
              <router-link :to="{name: 'app_account_password_forgotten'}">Passwort vergessen?</router-link>
            </div>
          </div>
          <div>
            <Button type="submit" class="submitButtonWith" label="Anmelden" icon="pi pi-user"/>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import {reactive} from "vue";
import {useToast} from "primevue/usetoast";
import {useRouter} from "vue-router";
import {Button, FloatLabel, InputGroup, InputGroupAddon, InputText, Message, Password} from "primevue";
import {useAuthStore} from "@/stores/AuthStore.js";
import {useValidator} from "@/utils/validator/validator.js";

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
            if (error?.response.status === 400 || error?.response.status === 401 || error?.response.status === 403) {
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
