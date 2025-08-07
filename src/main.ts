import quasar from '@/plugins/quasar'
import fontawesome from '@/plugins/fontawesome'
import { createHead } from '@vueuse/head'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import { router } from './router'

const app = createApp(App)
const head = createHead()

app.use(router)
app.use(quasar)
app.use(fontawesome)
app.use(head)

app.mount('#app')
