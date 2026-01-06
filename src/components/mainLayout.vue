<template>
  <div class="app">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="profile">
        <img src="https://wallpaperaccess.com/full/2580788.jpg" alt="avatar" />
        <h3>Justin Morrison</h3>
        <p>Software Engineer</p>
        <span class="streak">🔥 659 Streak</span>
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
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const go = (path) => {
  router.push(path)
}

const isActive = (path) => {
  return route.path === path
}

const handleLogout = () => {
  localStorage.removeItem('user-token')
  router.push('/')
}
</script>

<style>
@import '@/assets/styles/layout.css';
</style>