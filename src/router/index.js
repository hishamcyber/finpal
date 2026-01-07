import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // Public routes
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/RegisterView.vue')
  },
  // Dashboard and protected routes
  {
    path: '/',
    component: () => import('@/components/mainLayout.vue'),
    meta: { requiresAuth: true },
    redirect: '/dashboard',  // Add redirect here
    children: [
      {
        path: 'dashboard',  // Changed from '' to 'dashboard'
        name: 'Dashboard',
        component: () => import('@/views/DashboardView.vue')
      },
      {
        path: 'education',
        name: 'Education',
        component: () => import('@/views/EducationView.vue')
      },
      {
        path: 'statistics',
        name: 'Statistics',
        component: () => import('@/views/StatisticsView.vue')
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: () => import('@/views/NotificationsView.vue')
      },
      {
        path: 'members',
        name: 'Members',
        component: () => import('@/views/MembersView.vue')
      },
      {
        path: 'members/:id',
        name: 'MemberDetail',
        component: () => import('@/views/MemberDetailView.vue')
      },
      {
        path: 'exchanges',
        name: 'Exchanges',
        component: () => import('@/views/ExchangesView.vue')
      }
    ]
  },
  // 404
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('user-token')
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login') // Redirect to login page
  } else if ((to.name === 'Login' || to.name === 'Register') && isAuthenticated) {
    next('/dashboard') // Redirect to dashboard
  } else {
    next()
  }
})

export default router