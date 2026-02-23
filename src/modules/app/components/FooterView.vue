<script setup>

</script>

<template>

  <div class="grid bg-gray-800 m-0 p-0 align-items-center text-xs" style="height: 50px;">
    <div class="col-fixed p-0 pl-2">
      <div class="">
        ownHackathon
      </div>
    </div>
    <div class="col">
      <div class="text-center border-round-sm font-bold ">
        ...
      </div>
    </div>
    <div class="col-fixed">
      <div class="flex">
        <div class="text-right border-round-sm pr-4">
          <router-link :to="{name: 'external_discord'}" title="Discord"><i class="pi pi-discord"/></router-link>
        </div>
        <div class="text-right border-round-sm pr-4">
          <router-link :to="{name: 'external_stoat'}" title="Stoat"><i class="stoat-logo"/></router-link>
        </div>
        <div class="text-right border-round-sm pr-4">
          <router-link :to="{name: 'external_fluxer'}" title="Fluxer"><i class="fluxer-logo"/></router-link>
        </div>
        <div class="text-right border-round-sm pr-2">
          <router-link :to="{name: 'external_github'}" title="Github"><i class="pi pi-github"/></router-link>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.stoat-logo {
  content: url('@/assets/image/stoat-desktop.png');
  width: 16px;
  height: 16px;

}

.fluxer-logo {
  content: url('@/assets/image/fluxer-desktop.png');
  width: 16px;
  height: 16px;

}
</style>
