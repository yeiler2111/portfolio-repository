import Home from '@/components/Home.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    { path: '/', component: Home },
    { path: '/contactme', component: () => import('@/components/ContactMe.vue') },
    { path: '/portfolio', component: () => import('@/components/Portfolio.vue') },
    { path: '/experience', component: () => import('@/components/shared/ExperienceWork.vue') },
    { path: '/privacy', component: () => import('@/components/shared/privacyPolicy.vue') }

]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

