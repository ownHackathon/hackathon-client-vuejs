<template>
  <div v-if="notFound">
    <NotFoundView/>
  </div>
  <div v-else class="card">
    <div class="text-center text-primary-0"><p style="font-size: 1.5rem">{{ workspace.name }}</p></div>
    <div class="text-center text-primary-0"><p>{{ workspace.description }}</p></div>
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
.card {
  margin: 2rem auto;
  width: calc(100% - 2rem);

  @media (min-width: 768px) {
    max-width: 720px;
  }

  @media (min-width: 1024px) {
    max-width: 960px;
  }

  @media (min-width: 1280px) {
    max-width: 1200px;
  }
}
</style>
