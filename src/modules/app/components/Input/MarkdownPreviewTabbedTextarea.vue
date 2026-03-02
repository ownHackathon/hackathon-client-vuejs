<template>
  <Tabs value="0">
    <TabList>
      <Tab value="0">Schreiben</Tab>
      <Tab value="1">Vorschau</Tab>
    </TabList>
    <TabPanels class="p-0 pt-4">
      <TabPanel value="0">
      <div class="description-text pl-2">
        <slot name="description"/>
      </div>
      <CustomTextarea
          id="Details"
          name="Details"
          v-model="model"
          :rows="20"
          label="Details"
      />
      <div>
        <ConfirmPopup group="discardDetails">
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
            label="Details leeren"
            icon="pi pi-eraser"
            severity="help"
            outlined
            size="small"
            @click="discardDetails"
            v-show="model && model.length > 0"
            class="transition-all"
        />
      </div>

      </TabPanel>
      <TabPanel value="1">
        <MarkdownViewer
            :value="model"
        />
      </TabPanel>
    </TabPanels>
  </Tabs>
</template>

<script setup>
import MarkdownViewer from "@/modules/app/components/MarkdownViewer.vue";
import CustomTextarea from "@/modules/app/components/Input/CustomTextarea.vue";
import {useConfirm} from "primevue/useconfirm";
import {useToast} from "primevue/usetoast";


const confirm = useConfirm();
const toast = useToast();

const model = defineModel();

const discardDetails = (event) => {
  confirm.require({
    target: event.currentTarget,
    group: 'discardDetails',
    message: 'Soll Details verworfen werden?',
    accept: () => {
      model.value = '';
      toast.add({severity: 'info', summary: 'Bestätigt', detail: 'Details wurde verworfen', life: 3000});
    },
    reject: () => {
      toast.add({severity: 'error', summary: 'Abgewiesen', detail: 'Zurücksetzen abgebrochen', life: 3000});
    }
  });
};
</script>

<style scoped>
.description-text {
  font-size: 0.9rem;
  color: var(--p-gray-400);
}

:deep(.p-tablist) {
  background-color: var(--p-surface-700);
}

:deep(.p-tab-active) {
  background-color: var(--p-surface-800);
}

:deep(.p-tabpanels) {
  background-color: var(--p-surface-700);
}
</style>
