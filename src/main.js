import { createApp } from 'vue'
import App from './App.vue'
import router from './router'  // Make sure this import exists

const app = createApp(App)
app.use(router)  // Make sure this line exists
app.mount('#app')