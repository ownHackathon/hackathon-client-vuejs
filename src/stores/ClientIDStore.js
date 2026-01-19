import {defineStore} from "pinia";
import {v7} from "uuid";
import {computed, ref} from "vue";


export const useClientIDStore = defineStore('clientID', () => {
  const uniqueClientID = ref('');

  const hasClientID = computed(() => {
    return uniqueClientID.value !== null;
  })

  function regenerateClientID() {
    uniqueClientID.value = v7();
  }

  return {uniqueClientID, regenerateClientID, hasClientID};
}, {
  persist: {
    key: 'identify',
    serializer: {
      serialize: (state) => {
        return btoa(JSON.stringify(state));
      },
      deserialize: (value) => {
        return JSON.parse(atob(value));
      }
    }
  }
});
