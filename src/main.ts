import quasar from "@/plugin/quasar"
import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css'
import { router } from './routes'


const app = createApp(App)
app.use(router).use(quasar).mount('#app')
