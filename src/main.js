import { createApp } from 'vue'
import { createPinia } from 'pinia'  // Add this import
import App from './App.vue'
import router from './router'

// Create the Pinia instance
const pinia = createPinia()

// Create app and use both router and pinia
const app = createApp(App)

// Use plugins - ORDER MATTERS!
app.use(pinia)    // Pinia should come first
app.use(router)   // Router comes after

// Mount the app
app.mount('#app')