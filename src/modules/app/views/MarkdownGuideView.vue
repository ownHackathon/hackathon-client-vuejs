<template>
  <MarkdownViewer
      :value="detailsText"
      class="card border-round surface-50 border-1 border-200 "
  />
</template>

<script setup>
import {ref} from 'vue';
import MarkdownViewer from './../components/MarkdownViewer.vue';
import defaultMarkdown from './../../../../docs/markdown-guide.md?raw';

const detailsText = ref(defaultMarkdown);
</script>
