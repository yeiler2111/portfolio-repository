<<<<<<<< HEAD:src/router/index.ts
import Home from '@/views/Home.vue'
import { createMemoryHistory, createRouter } from 'vue-router'

const routes = [
    { path: '/', component: Home },
    { path: '/contactme', component: () => import('@/views/ContactMe.vue') },
    { path: '/portfolio', component: () => import('@/views/Portfolio.vue') },
    { path: '/experience', component: () => import('@/components/shared/ExperienceWork.vue') }
========
import Home from '@/components/Home.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    { path: '/', component: Home },
    { path: '/contactme', component: () => import('@/components/ContactMe.vue') },
    { path: '/portfolio', component: () => import('@/components/Portfolio.vue') },
    { path: '/experience', component: () => import('@/components/shared/ExperienceWork.vue') },
    { path: '/privacy', component: () => import('@/components/shared/privacyPolicy.vue') }

>>>>>>>> privacyPolicy:src/routes.ts
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

