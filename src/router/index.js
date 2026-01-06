import { createRouter, createWebHistory } from 'vue-router'

// Lazy load all components for better performance
const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/RegisterView.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: { requiresAuth: true } // Protected route
  },
  {
    path: '/education',
    name: 'Education',
    component: () => import('@/views/EducationView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: () => import('@/views/StatisticsView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: () => import('@/views/NotificationsView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/members',
    name: 'Members',
    component: () => import('@/views/MembersView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/members/:id',
    name: 'MemberDetail',
    component: () => import('@/views/MemberDetailView.vue'),
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/exchanges',
    name: 'Exchanges',
    component: () => import('@/views/ExchangesView.vue'),
    meta: { requiresAuth: true }
  },
  // 404 page
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

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('user-token') // Or use Vuex/Pinia
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/') // Redirect to login
  } else {
    next()
  }
})

export default router