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
            v-model="model"
            :rows="20"
            label="Details"
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
import {ref} from "vue";
import CustomTextarea from "@/modules/app/components/Input/CustomTextarea.vue";
import MarkdownGuideView from "@/modules/app/views/MarkdownGuideView.vue";

const model = ref('');
</script>
<style scoped>
.description-text {
  font-size: 0.9rem;
  color: var(--p-gray-400);
}
</style>
