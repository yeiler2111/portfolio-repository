import Home from '@/views/Home.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', component: Home },
    { path: '/contactme', component: () => import('@/views/ContactMe.vue') },
    // Cualquier ruta desconocida vuelve al inicio en lugar de dejar la app en blanco.
    { path: '/:pathMatch(.*)*', redirect: '/' },
]

export const router = createRouter({
    /**
     * History mode en vez de hash: con `/#/` las rutas no son indexables ni
     * compartibles como URLs reales. Requiere el fallback SPA del servidor,
     * definido en `netlify.toml`.
     */
    history: createWebHistory(),
    routes,

    /**
     * Al navegar entre rutas se vuelve arriba; al usar atrás/adelante se
     * respeta la posición previa. `behavior` queda en manos del CSS, que ya
     * desactiva el scroll suave con prefers-reduced-motion.
     */
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition
        if (to.hash) return { el: to.hash }
        return { top: 0 }
    },
})
