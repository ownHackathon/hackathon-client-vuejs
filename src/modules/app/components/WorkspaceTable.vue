<template>
  <div class="card">
    <DataTable
        :value="workspaces"
        lazy
        :paginator="totalItems > 5"
        :first="first"
        :rows="rows"
        :totalRecords="totalItems"
        :loading="loading"
        @page="onPage"
        :rowsPerPageOptions="[5, 10, 20]"
    >
      <Column field="name" header="Workspace" style="min-width: 50%">
        <template #body="{ data }">
          <router-link :to="`/app/workspace/${data.slug}`" class="font-bold text-primary hover:underline">
            {{ data.name }}
          </router-link>
        </template>
      </Column>
      <Column field="description" header="Beschreibung">
        <template #body="{ data }">
          <div style="white-space: normal; word-wrap: break-word;">
            {{ data.description }}
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {WorkspaceService} from '@app/service/WorkspaceService';
import router from "@/utils/router/index.js";

const workspaces = ref([]);
const totalItems = ref(0);
const loading = ref(false);
const first = ref(0);
const rows = ref(5);

const loadWorkspaces = () => {
  loading.value = true;

  const params = {
    first: first.value,
    rows: rows.value
  };

  WorkspaceService.getOwnWorkspaces(params).then((response) => {
    console.log(response);
    workspaces.value = response.data;
    totalItems.value = response.totalItems;
    loading.value = false;
    if (totalItems.value === 0) {
      router.push({name: 'app_workspace_create'});
    }
  });
};

const onPage = (event) => {
  first.value = event.first;
  rows.value = event.rows;
  loadWorkspaces();
};

onMounted(() => {
  loadWorkspaces();

});
</script>
