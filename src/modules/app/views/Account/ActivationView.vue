<template>
  <FormCard>
    <div class=" text-white text-center">
      <h1>Account Aktivierung</h1>
      <p>Bitte geben Sie Ihren Account einen Namen und wählen Sie ein Passwort</p>
      <p class="text-sm text-gray-500"><span class="text-red-500">Hinweis:</span> Durch klicken auf "Aktivieren" wird Ihr Account erstellt.</p>
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
          id="accountName"
          name="accountName"
          v-model="payload.accountName"
          type="text"
          label="Account Name"
          icon="pi pi-user"
          :error-message="$form.accountName?.error?.message"
      />
      <CustomPasswordInput
          id="accountPassword"
          name="account"
          v-model="payload.password"
          label="Password"
          icon="pi pi-lock"
          :error-message="$form.password?.error?.message"
          :feedback="true"
      />
      <Button type="submit" class="submitButtonWith" label="Aktivieren" icon="pi pi-user"/>
    </Form>
  </FormCard>
</template>

<script setup>
import {reactive} from "vue";
import {useValidator} from "@/utils/validator/validator.js";
import {useToast} from "primevue/usetoast";
import {useRouter} from "vue-router";
import axios from "axios";
import FormCard from "@/modules/app/components/FormCard.vue";
import CustomInputText from "@/modules/app/components/Input/CustomInputText.vue";
import CustomPasswordInput from "@/modules/app/components/Input/CustomPasswordInput.vue";
import {Form} from '@primevue/forms';

const validate = useValidator();
const toast = useToast();
const router = useRouter();

const props = defineProps({
  token: {
    type: String,
    required: true,
  }
});

const payload = reactive({
  accountName: '',
  password: '',
});

const resolver = ({values}) => {
  const errors = {};

  if (!validate.accountName(values.accountName)) {
    errors.accountName = [{message: 'Mindestens 3 und maximal 64 Zeichen'}];
  }

  if (!validate.password(values.password)) {
    errors.password = [{message: 'Passwort muss mindestens 6 und maximal 255 Zeichen betragen.'}];
  }

  return {
    errors
  };
};

const onFormSubmit = ({valid}) => {
  if (valid) {
    submitActivation();
  }
};

async function submitActivation() {
  await axios
      .post("/api/account/activation/" + props.token, payload,)
      .then((response) => {
            if (response?.status === 201) {
              toast.add({severity: 'success', summary: 'Erfolg', detail: 'Account wurde erfolgreich erstellt', life: 3000});
              router.push({name: 'app_login'});
            }
          }
      )
      .catch((error) => {
            if (error?.response.status === 400) {
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
