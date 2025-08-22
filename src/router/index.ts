import Home from '@/views/Home.vue'
import { createRouter, createWebHashHistory } from 'vue-router'



const routes = [
    { path: '/', component: Home },
    { path: '/contactme', component: () => import('@/views/ContactMe.vue') },
    { path: '/portfolio', component: () => import('@/views/Portfolio.vue') },
    { path: '/experience', component: () => import('@/components/shared/ExperienceWork.vue') },
    { path: '/privacy', component: () => import('@/components/shared/privacyPolicy.vue') }

]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

