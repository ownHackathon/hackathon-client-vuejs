<template>
  <div class="flex justify-content-center register-form-container p-4">
    <div class="flex justify-content-center register-form-content">
      <div v-if="!register" class="register-form-content-inner">

        <div class=" text-white text-center">
          <h1>Registrieren</h1>
          <p>Bitte eine gültige E-Mail Adresse für einen neuen Account angeben</p>
          <p class="text-sm text-gray-500"><span class="text-red-500">Hinweis:</span> Sie müssen Zugriff auf diese haben!</p>
        </div>
        <Form v-slot="$form" :payload :resolver @submit="onFormSubmit">
          <FloatLabel variant="on">
            <InputText v-model="payload.email" name="email" type="email" class="inputTextWidth" size="small" fluid/>
            <label for="email">E-Mail</label>
          </FloatLabel>
          <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error?.message }}</Message>
          <div class="flex pt-4 gap-6 ">
            <Button type="submit" class="submitButtonWith" label="Registrieren" icon="pi pi-user"/>
          </div>
        </Form>
      </div>
      <div v-else>
        Es wurde Ihnen eine Nachricht an die eingegebene E-Mail gesendet.
        Bitte sehen Sie in Ihr Postfach (ggf. auch im Spam Ordner) nach und folgen den Anweisungen.
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import {reactive, ref} from "vue";
import {Button, FloatLabel, InputText} from "primevue";
import {useToast} from "primevue/usetoast";
import {useValidator} from "@/utils/validator/validator.js";

const toast = useToast();
const validate = useValidator();
const payload = reactive({
  email: '',
});

const resolver = ({values}) => {
  const errors = {};

  if (!validate.email(values.email)) {
    errors.email = [{message: 'Bitte eine gültige E-Mail eingeben.'}];
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

const register = ref(false);

async function submitRegister() {
  await axios
      .post("/api/account", payload,)
      .then((response) => {
        if (response?.status === 200) {
          register.value = true;
          toast.add({severity: 'success', summary: 'E-Mail gesendet', detail: 'Bitte schauen Sie in Ihr Postfach', life: 3000});
        }
      })
      .catch((error) => {
            register.value = false;
            if (error?.response.status === 400 || error?.response.status === 401 || error?.response.status === 403) {
              toast.add({severity: 'error', summary: 'Fehler bei der Registrierung', detail: 'Eingegebene Daten prüfen', life: 5000});
            } else {
              toast.add({severity: 'error', summary: 'Fehler bei der Registrierung', detail: 'Unbekannter Fehler', life: 5000});
            }
          }
      );
}
</script>

<style scoped>
.register-form-container {
  width: 100%;
}

.register-form-content {
  margin-top: 10px;
  padding: 10px;
  max-width: 95%;
  min-width: 25%;
  background-color: #111827;
  border-radius: 10px;
  border: gray solid thin;
}

.register-form-content-inner {
  padding: 20px;
}
</style>
