// 1. Core & Third-Party Plugins
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 2. PrimeVue Core & UI Components
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'
import  stylePreset from "./theme/lara-preset.js"
import ConfirmationService from 'primevue/confirmationservice';

// 3. Routing & API
import App from '@/App.vue'
import router from '@/utils/router'
import '@/utils/axios/axios.js'

// 4. Styles (Global & Framework)
import '/node_modules/primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import '@/assets/reset.css'
import '@/assets/main.css'

const app = createApp(App)
const pinia = createPinia()

// Pinia Setup
pinia.use(piniaPluginPersistedstate)

// Middleware & Plugins
app.use(pinia)
app.use(router)
app.use(ToastService)
app.use(PrimeVue, {
  theme: {
    preset: stylePreset,
    options: {
      darkModeSelector: '.p-dark',
      cssLayer: false
    },
  },
  ripple: false,
})
app.use(ConfirmationService);

// Global Components
// eslint-disable-next-line vue/multi-word-component-names
app.component('Toast', Toast)

// Mount
app.mount('#app')
