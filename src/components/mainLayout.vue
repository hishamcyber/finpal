<template>
  <div class="app">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="profile">
        <img src="https://wallpaperaccess.com/full/2580788.jpg" alt="avatar" />
        <h3>{{ userName }}</h3>
        <p>{{ userRole }}</p>
        <span class="streak">🔥 {{ userStreak }} Streak</span>
      </div>

      <nav>
        <a
          href="#"
          :class="{ active: isActive('/dashboard') }"
          @click.prevent="go('/dashboard')"
        >
          Dashboard
        </a>

        <a
          href="#"
          :class="{ active: isActive('/dashboard/statistics') }"
          @click.prevent="go('/dashboard/statistics')"
        >
          Statistics
        </a>

        <a
          href="#"
          :class="{ active: isActive('/dashboard/members') }"
          @click.prevent="go('/dashboard/members')"
        >
          Members
        </a>

        <a
          href="#"
          :class="{ active: isActive('/dashboard/notifications') }"
          @click.prevent="go('/dashboard/notifications')"
        >
          Notifications
        </a>

        <a
          href="#"
          :class="{ active: isActive('/dashboard/exchanges') }"
          @click.prevent="go('/dashboard/exchanges')"
        >
          Exchanges
        </a>
      </nav>

      <div class="logout" @click="handleLogout">
        Log out
      </div>
    </aside>

    <!-- Main -->
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

// User data from localStorage
const userName = ref('User')
const userRole = ref('Member')
const userStreak = ref(0)
const userBalance = ref(0)

// Load user data on component mount
onMounted(() => {
  loadUserData()
})

const loadUserData = () => {
  // Get user data from localStorage
  const name = localStorage.getItem('user-name')
  const email = localStorage.getItem('user-email')
  const balance = localStorage.getItem('user-balance')
  
  // Set user name (fallback to email or default)
  if (name && name.trim()) {
    userName.value = name
  } else if (email) {
    // Use email prefix as name
    userName.value = email.split('@')[0]
    userName.value = userName.value.charAt(0).toUpperCase() + userName.value.slice(1)
  }
  
  // Set role based on email or default
  if (email && email.includes('@admin.')) {
    userRole.value = 'Administrator'
  } else if (email && (email.includes('google') || email.includes('facebook') || email.includes('wechat'))) {
    userRole.value = 'Social User'
  } else {
    userRole.value = 'Member'
  }
  
  // Calculate streak (demo logic - 1 day for every ¥1000 balance)
  if (balance) {
    const balanceNum = parseInt(balance)
    userStreak.value = Math.floor(balanceNum / 1000) + 1
    userBalance.value = balanceNum
  }
  
  console.log('User loaded:', {
    name: userName.value,
    role: userRole.value,
    streak: userStreak.value,
    balance: userBalance.value
  })
}

const go = (path) => {
  router.push(path)
}

const isActive = (path) => {
  return route.path === path
}

const handleLogout = () => {
  // Clear all user-related localStorage
  localStorage.removeItem('user-token')
  localStorage.removeItem('user-id')
  localStorage.removeItem('user-email')
  localStorage.removeItem('user-name')
  localStorage.removeItem('user-password')
  localStorage.removeItem('user-balance')
  localStorage.removeItem('user-transactions')
  localStorage.removeItem('user-createdAt')
  
  // Redirect to login
  router.push('/')
}
</script>

<style>
@import '@/assets/styles/layout.css';
</style>