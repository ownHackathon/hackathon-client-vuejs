<template>
  <FormCard>
    <div v-if="!register">
      <div class=" text-white text-center">
        <h1>Passwort vergessen</h1>
        <p>Bitte geben Sie Ihre E-Mail Adresse ein.</p>
      </div>
      <Form
          v-slot="$form"
          :payload
          :resolver
          @submit="onFormSubmit"
          :validateOnValueUpdate="false"
          :validateOnBlur="true"
      >
        <CustomInputText
            id="email"
            name="email"
            v-model="payload.email"
            type="email"
            label="E-Mail"
            icon="pi pi-at"
            :error-message="$form.email?.error?.message"
        />
        <Button type="submit" class="submitButtonWith" label="Passwort anfordern" icon="pi pi-user"/>
      </Form>
    </div>
    <div v-else>
      Es wurde Ihnen eine Nachricht an die eingegebene E-Mail gesendet.
      Bitte sehen Sie in Ihr Postfach (ggf. auch im Spam Ordner) nach und folgen den Anweisungen.
    </div>
  </FormCard>
</template>

<script setup>
import axios from "axios";
import {reactive, ref} from "vue";
import {Button} from "primevue";
import {useToast} from "primevue/usetoast";
import {useValidator} from "@/utils/validator/validator.js";
import FormCard from "@/modules/app/components/FormCard.vue";
import CustomInputText from "@/modules/app/components/Input/CustomInputText.vue";
import {Form} from '@primevue/forms';

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
      .post("/api/account/password/forgotten", payload,)
      .then((response) => {
        if (response?.status === 200) {
          register.value = true;
          toast.add({severity: 'success', summary: 'E-Mail gesendet', detail: 'Bitte schauen Sie in Ihr Postfach', life: 3000});
        }
      })
      .catch((error) => {
            register.value = false;
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
