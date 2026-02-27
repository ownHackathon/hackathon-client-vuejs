<template>
  <Tabs value="0">
    <TabList>
      <Tab value="0">Schreiben</Tab>
      <Tab value="1">Vorschau</Tab>
      <Tab value="2">Markdown Guide</Tab>
    </TabList>
    <TabPanels>
      <TabPanel value="0">
        <span class="description-text">Hier kann mittels
          <router-link :to="{ name: 'app_md_guide'}" target="_blank" class="inline-link">Markdown <sup><i class="pi pi-external-link" style="font-size: 0.5rem; color: white"></i></sup> </router-link>
          der Workspace vollumfänglich Beschrieben und Präsentiert werden</span>
        <CustomTextarea
            id="Details"
            name="Details"
            v-model="model"
            :rows="20"
            label="Details"
         />
        <ConfirmPopup group="discardDetails">
          <template #container="{ message, acceptCallback, rejectCallback }">
            <div class="rounded p-4">
              <span>{{ message.message }}</span>
              <div class="flex items-center gap-2 mt-4">
                <Button label="verwerfen" @click="acceptCallback" variant="outlined" severity="success"  size="small"></Button>
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
        />

      </TabPanel>
      <TabPanel value="1">
        <MarkdownViewer
            :value="model"
        />
      </TabPanel>
      <TabPanel value="2">
        <MarkdownGuideView />
      </TabPanel>
    </TabPanels>
  </Tabs>
</template>

<script setup>
import MarkdownViewer from "@/modules/app/components/MarkdownViewer.vue";
import CustomTextarea from "@/modules/app/components/Input/CustomTextarea.vue";
import MarkdownGuideView from "@/modules/app/views/MarkdownGuideView.vue";
import { useConfirm } from "primevue/useconfirm";
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
      model.value='';
      toast.add({severity:'info', summary:'Bestätigt', detail:'Details wurde verworfen', life: 3000});
    },
    reject: () => {
      toast.add({severity:'error', summary:'Abgewiesen', detail:'Zurücksetzen abgebrochen', life: 3000});
    }
  });
}
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
