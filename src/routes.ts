import Home from '@/components/Home.vue'
import { createMemoryHistory, createRouter } from 'vue-router'

const routes = [
    { path: '/', component: Home },
    { path: '/contactMe', component: () => import('@/components/ContactMe.vue') },
]

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

