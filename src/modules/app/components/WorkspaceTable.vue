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
      <Column field="name" header="Workspace" style="min-width: 30%" class="width-100-on-mobile">
        <template #body="{ data }">
          <router-link :to="{path:`/app/workspace/${data.slug}`, state: data}" class="font-bold text-primary hover:underline">
            {{ data.name }}
          </router-link>
        </template>
      </Column>
      <Column field="description"
              header="Beschreibung"
              class="hidden-on-mobile"
              headerClass="hidden-on-mobile"
              style="min-width: 70%"
      >
        <template #body="{ data }">
          <div style="white-space: normal; word-wrap: break-word;">
            {{ data.description }}
          </div>
        </template>
      </Column>
      <Column field="actions" header="" style="width: 4rem; text-align: end; white-space: nowrap;">
        <template #body="{ data }">
          <div style="white-space: normal; word-wrap: break-word;">
            <router-link :to="`/app/workspace/${data.slug}`" class="font-bold text-primary hover:underline">
              <i class="pi pi-file-edit edit-icon"/>
            </router-link>
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
<style scoped>
.card {
  border: 1px solid transparent;
  border-radius: 12px;
  background:
      linear-gradient(var(--p-surface-700), var(--p-surface-700)) padding-box,
      linear-gradient(to bottom,
      var(--p-surface-600) 0%,      /* Oben: Hell */
      var(--p-surface-700) 20%,     /* Übergang zu Dunkel an den Seiten */
      var(--p-surface-700) 70%,     /* Bleibt Dunkel an den Seiten */
      var(--p-surface-600) 100%     /* Unten: Wieder hell */
      ) border-box;

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


.edit-icon {
  color: #E2E8F0;
  opacity: 0.5;
  transition: opacity 0.2s ease, color 0.2s ease;
  cursor: pointer;
}

.edit-icon:hover {
  opacity: 1;
  color: #38BDF8;
}

@media screen and (max-width: 768px) {
  .hidden-on-mobile {
    display: none !important;
  }

  .width-100-on-mobile {
    width: 100%;
  }
}
</style>
