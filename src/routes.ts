import Home from '@/components/Home.vue'
import { createMemoryHistory, createRouter } from 'vue-router'

const routes = [
    { path: '/', component: Home },
    { path: '/contactme', component: () => import('@/components/ContactMe.vue') },
    { path: '/portfolio', component: () => import('@/components/Portfolio.vue') }
]

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

