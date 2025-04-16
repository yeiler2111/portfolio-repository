import quasar from '@/plugin/quasar';
import { createHead } from '@vueuse/head';
import { createApp } from 'vue';
import App from './App.vue';
import './assets/tailwind.css';
import { router } from './routes';


const app = createApp(App);
const head = createHead();

app.use(router);
app.use(quasar);
app.use(head);

app.mount('#app');
