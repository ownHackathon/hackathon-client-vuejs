<template>
  <div class="flex justify-content-center form-container">
    <div class="flex justify-content-center form-content">
      <div v-if="!register" class="form-content-inner">

        <div class=" text-white text-center">
          <h1>Neues Passwort setzen</h1>
          <p>Bitte geben Sie ein neues Passwort für Ihren Account ein</p>
        </div>
        <Form v-slot="$form" :payload :resolver @submit="onFormSubmit">
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-lock"></i>
            </InputGroupAddon>
            <FloatLabel variant="on">
              <InputText v-model="payload.password" name="password" type="password" class="inputTextWidth" size="small" fluid/>
              <label for="password">Password</label>
            </FloatLabel>
          </InputGroup>
          <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{ $form.password.error?.message }}</Message>
          <div class="flex pt-4 gap-6 ">
            <Button type="submit" class="submitButtonWith" label="neues Password setzen" icon="pi pi-user"/>
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

const register = ref(false);

async function submitRegister() {
  await axios
      .patch("/api/account/password/" + props.token, payload,)
      .then((response) => {
        if (response?.status === 200) {
          register.value = true;
          toast.add({severity: 'success', summary: 'Erfolg', detail: 'Neues Password wurde gesetzt', life: 3000});
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
