export const adminRoutes = [
    {
        path: '/admin/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/AdminDashboardView.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/admin/companies',
        name: 'Companies',
        component: () => import('@/views/Companies/CompaniesView.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/admin/companies/:id',
        name: 'CompanyDetails',
        component: () => import('@/views/Companies/CompanyView.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/admin/users',
        name: 'Users',
        component: () => import('@/views/Users/UsersView.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/admin/games',
        name: 'Games',
        component: () => import('@/views/Games/GamesView.vue'),
        meta: {
            requiresAuth: true
        }
    },
]