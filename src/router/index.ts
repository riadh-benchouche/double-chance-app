import {createRouter, createWebHistory} from 'vue-router'
import {adminRoutes} from "@/router/adminRoutes";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...adminRoutes,
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/LoginView.vue')
        },
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/HomeView.vue')
        },
    ]
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    const authRequired = to.matched.some(record => record.meta.requiresAuth)
    if (authRequired && !token) {
        return next('/login')
    }
    if (to.path === '/login' && token) {
        return next('/admin/dashboard')
    }
    next()
})
export default router
