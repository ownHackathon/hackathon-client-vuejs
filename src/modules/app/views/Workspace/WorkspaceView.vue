<template>
  <div v-if="notFound">
    <NotFoundView/>
  </div>
  <div v-else class="card">
    <div class="text-center text-primary-0"><p style="font-size: 1.5rem">{{ workspace.name }}</p></div>
    <div class="text-center text-primary-0"><p>{{ workspace.description }}</p></div>
    <div class="text-primary-0">
      <MarkdownViewer
          :value="workspace.details"
      />
    </div>
    <div class="text-right">
      <p>
        <router-link to="">{{ workspace.owner }}</router-link>
        <span class="text-gray-500">
            's Workspace
          </span>
      </p>
    </div>
    <div>
      <hr class="text-gray-600"/>
    </div>
    <div>
      <p>Liste verfügbarer Events</p>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {WorkspaceService} from '@app/service/WorkspaceService';
import NotFoundView from "@/modules/app/views/NotFoundView.vue";
import MarkdownViewer from "@/modules/app/components/MarkdownViewer.vue";

const props = defineProps({
  slug: {
    type: String,
    required: true,
  }
});

const workspace = ref({
      name: '',
      description: '',
      owner: '',
      ownerUuid: '',
      details: ''
    }
);
const notFound = ref(false);

onMounted(() => {
  const data = history.state;
  const slug = data?.slug ?? props?.slug ?? 'undefined';

  loadWorkspace(slug);
});

const loadWorkspace = (slug) => {
  WorkspaceService.getWorkspace(slug).then((response) => {
    if (Array.isArray(response.data) && response.data.length === 0) {
      notFound.value = true;
      return;
    }
    workspace.value = response.data;
  });
};

</script>

<style scoped>

</style>
