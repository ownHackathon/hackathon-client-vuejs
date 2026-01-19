import {defineStore} from "pinia";
import {v7} from "uuid";
import {ref} from "vue";


export const useClientIDStore = defineStore('clientID', () => {
  const uniqueClientID = ref('');

  function regenerateClientID() {
    uniqueClientID.value = v7();
  }

  return {uniqueClientID, regenerateClientID};
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
