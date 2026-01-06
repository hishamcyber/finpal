<template>
  <div class="register">
    <h1>Register</h1>
    <form @submit.prevent="handleRegister">
      <input v-model="email" type="email" placeholder="Email" required>
      <input v-model="password" type="password" placeholder="Password" required>
      <input v-model="confirmPassword" type="password" placeholder="Confirm Password" required>
      <button type="submit">Register</button>
    </form>
    <p>Already have an account? <router-link to="/">Login</router-link></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const router = useRouter()

const handleRegister = () => {
  // Registration logic
  localStorage.setItem('user-token', 'dummy-token')
  router.push('/dashboard')
}
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
}
</style>