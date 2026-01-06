<template>
  <div id="app">
    <!-- Show navbar only if not on login/register pages -->
    <nav v-if="showNavbar">
      <router-link to="/dashboard">Dashboard</router-link> |
      <router-link to="/education">Education</router-link> |
      <router-link to="/statistics">Statistics</router-link> |
      <router-link to="/notifications">Notifications</router-link> |
      <router-link to="/members">Members</router-link> |
      <router-link to="/exchanges">Exchanges</router-link> |
      <button @click="logout">Logout</button>
    </nav>
    
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const showNavbar = computed(() => {
  return !['Login', 'Register'].includes(route.name)
})

const logout = () => {
  localStorage.removeItem('user-token')
  router.push('/')
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;
  text-align: center;
  background: #f8f9fa;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  margin: 0 10px;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #42b983;
}

nav button {
  margin-left: 20px;
  padding: 5px 15px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>