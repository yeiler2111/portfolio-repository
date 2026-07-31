import { createHead } from '@vueuse/head'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import { reveal } from './directives/reveal'
import { router } from './router'

const app = createApp(App)

/**
 * Necesario para el `useHead()` de App.vue: sin instalar el plugin, el título
 * y la descripción no se actualizan al cambiar de idioma y el JSON-LD de
 * Schema.org nunca llega al documento.
 */
const head = createHead()

app.use(router)
app.use(head)
app.directive('reveal', reveal)

app.mount('#app')
