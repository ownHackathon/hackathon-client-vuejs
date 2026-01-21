<template>
  <div class="flex justify-content-center form-container">
    <div class="flex justify-content-center form-content">
      <div class="form-content-inner">
        <div class=" text-white text-center">
          <h1>Account Aktivierung</h1>
          <p>Bitte geben Sie Ihren Account einen Namen und wählen Sie ein Passwort</p>
          <p class="text-sm text-gray-500"><span class="text-red-500">Hinweis:</span> Durch klicken auf "Aktivieren" wird Ihr Account erstellt.</p>
        </div>
        <Form v-slot="$form" :payload :resolver @submit="onFormSubmit">
          <div class="pb-4">
            <InputGroup>
              <InputGroupAddon>
                <i class="pi pi-user"></i>
              </InputGroupAddon>
              <FloatLabel variant="on">
                <InputText v-model="payload.accountName" name="accountName" type="text" class="inputTextWidth" size="small" fluid/>
                <label for="accountName">Account Name</label>
              </FloatLabel>
            </InputGroup>
            <Message v-if="$form.accountName?.invalid" severity="error" size="small" variant="simple">{{ $form.accountName.error?.message }}</Message>
          </div>
          <div class="pb-4">
            <InputGroup>
              <InputGroupAddon>
                <i class="pi pi-lock"></i>
              </InputGroupAddon>
              <FloatLabel variant="on">
                <Password v-model="payload.password" name="password" type="password" class="inputTextWidth" size="small" toggleMask fluid/>
                <label for="password">Passwort</label>
              </FloatLabel>
            </InputGroup>
            <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{ $form.password.error?.message }}</Message>
          </div>
          <div class="flex pt-4 gap-6 ">
            <Button type="submit" class="submitButtonWith" label="Aktivieren" icon="pi pi-user"/>
          </div>
        </Form>
      </div>
    </div>
  </div>

</template>

<script setup>
import {reactive} from "vue";
import {useValidator} from "@/utils/validator/validator.js";
import {useToast} from "primevue/usetoast";
import {useRouter} from "vue-router";
import axios from "axios";

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
            if (response?.status === 200) {
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
