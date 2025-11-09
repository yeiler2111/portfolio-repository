import Home from '@/views/Home.vue'
import { createRouter, createWebHashHistory } from 'vue-router'



const routes = [
    { path: '/', component: Home },
    { path: '/contactme', component: () => import('@/views/ContactMe.vue') },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

