import {defineStore} from "pinia";
import {v7} from "uuid";
import {ref} from "vue";

export const useClientIDStore = defineStore('clientID', () => {
  const uniqueClientID = ref(0);

  function persistClientID() {
    localStorage.setItem('uniqueID', uniqueClientID.value);
    return uniqueClientID.value;
  }

  function removeClientID() {
    localStorage.removeItem('uniqueID');
    sessionStorage.removeItem('uniqueID');
    uniqueClientID.value=0;
  }

  function setClientID() {
    if (localStorage.getItem('uniqueID')) {
      sessionStorage.setItem('uniqueID', localStorage.getItem('uniqueID'))
    }
    if (!sessionStorage.getItem('uniqueID')) {
      sessionStorage.setItem('uniqueID', v7());
    }
    uniqueClientID.value = sessionStorage.getItem('uniqueID');
  }

  function getClientID() {
    return localStorage.getItem('uniqueID') ?? uniqueClientID.value;
  }

  return {setClientID, getClientID, removeClientID, persistClientID};
});
