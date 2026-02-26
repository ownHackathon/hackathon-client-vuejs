<template>
  <FormCard title="Workspace Details bearbeiten">
        <MarkdownViewer
            :value="detailsText"
        />
  </FormCard>
</template>

<script setup>
import { ref } from 'vue';
import MarkdownViewer from './../components/MarkdownViewer.vue'
import defaultMarkdown from './../../../../docs/markdown-guide.md?raw';

// Der zentrale State, den beide Komponenten teilen
const detailsText = ref(defaultMarkdown);
</script>
