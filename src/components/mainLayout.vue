<template>
  <div class="app">
    <aside class="sidebar">
      <div class="profile">
        <img src="https://wallpaperaccess.com/full/2580788.jpg" alt="avatar" />
        <h3>{{ userName }}</h3>
        <p>{{ userRole }}</p>
        <span class="streak">🔥 {{ userStreak }} Streak</span>
      </div>

      <nav>
        <!-- CORRECTED PATHS: Remove /app/ prefix -->
        <a 
          :class="{ active: isActive('/') }"
          @click.prevent="go('/')"
        >
          Dashboard
        </a>

        <a
          href="#"
          :class="{ active: isActive('/statistics') }"
          @click.prevent="go('/statistics')"
        >
          Statistics
        </a>

        <a
          href="#"
          :class="{ active: isActive('/members') }"
          @click.prevent="go('/members')"
        >
          Members
        </a>

        <a
          href="#"
          :class="{ active: isActive('/notifications') }"
          @click.prevent="go('/notifications')"
        >
          Notifications
        </a>

        <a
          href="#"
          :class="{ active: isActive('/exchanges') }"
          @click.prevent="go('/exchanges')"
        >
          Exchanges
        </a>
      </nav>

      <div class="logout" @click="logout">Log out</div>
    </aside>

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

const logout = () => {
  // Clear all user-related localStorage
  localStorage.removeItem('user-token')
  localStorage.removeItem('user-id')
  localStorage.removeItem('user-email')
  localStorage.removeItem('user-name')
  localStorage.removeItem('user-password')
  localStorage.removeItem('user-balance')
  localStorage.removeItem('user-transactions')
  localStorage.removeItem('user-createdAt')
  
  // Also clear user-specific data if using that system
  const currentUserId = localStorage.getItem('currentUserId')
  if (currentUserId) {
    localStorage.removeItem('currentUserId')
    // Remove user-specific keys
    const keysToRemove = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key.startsWith(`user_${currentUserId}_`)) {
        keysToRemove.push(key)
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key))
  }
  
  // Redirect to login
  router.push('/')
  
  console.log('User logged out successfully')
}
</script>

<style>
@import "@/assets/styles/layout.css";

.badge {
  background: #ff3b30;
  color: #fff;
  font-size: 12px;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 999px;
}

.sidebar nav a {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>