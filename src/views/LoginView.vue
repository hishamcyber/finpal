<template>
  <div class="login-container">
    <!-- Left Panel - Branding -->
    <div class="login-left">
      <div class="brand-section">
        <img :src="logoUrl" alt="FinPal Logo" class="logo" />
        <!-- <h1>FinPal</h1> -->
        <p class="tagline">Smart Finance Management Made Simple</p>
      </div>
      
      <div class="features">
        <div class="feature">
          <span class="feature-icon">💰</span>
          <div>
            <h3>Track Expenses</h3>
            <p>Monitor your spending in real-time</p>
          </div>
        </div>
        <div class="feature">
          <span class="feature-icon">📊</span>
          <div>
            <h3>Financial Insights</h3>
            <p>Get personalized financial reports</p>
          </div>
        </div>
        <div class="feature">
          <span class="feature-icon">👥</span>
          <div>
            <h3>Group Finance</h3>
            <p>Manage shared expenses with friends</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Panel - Login Form -->
    <div class="login-right">
      <div class="login-form-container">
        <h2>Welcome Back</h2>
        <p class="login-subtitle">Sign in to your FinPal account</p>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email">Email address</label>
            <input 
              id="email"
              v-model="email"
              type="email" 
              placeholder="you@example.com" 
              required
              class="form-input"
            />
          </div>

          <div class="form-group">
            <div class="password-label">
              <label for="password">Password</label>
              <a href="#" class="forgot-link" @click.prevent="forgotPassword">Forgot password?</a>
            </div>
            <input 
              id="password"
              v-model="password"
              type="password" 
              placeholder="Enter your password" 
              required
              class="form-input"
            />
          </div>

          <!-- reCAPTCHA Notice -->
          <div class="recaptcha-notice">
            <span class="shield-icon">🛡️</span>
            <span>Secure Login with reCAPTCHA subject to Google Terms & Privacy.</span>
          </div>

          <!-- Error display - Make it more visible -->
          <div v-if="errorMessage" class="error-display" :class="{ 'warning': errorMessage.includes('⚠️'), 'error': errorMessage.includes('❌') }">
            <span class="error-icon">{{ errorMessage.includes('⚠️') ? '⚠️' : '❌' }}</span>
            <span class="error-text">{{ errorMessage.replace('⚠️', '').replace('❌', '').trim() }}</span>
            <br>
            <br>
          </div>

          <button type="submit" class="login-btn" :disabled="loading">
            <span v-if="loading">Signing in...</span>
            <span v-else>Login</span>
          </button>
        </form>

        <!-- Divider -->
        <div class="divider">
          <span class="divider-text">OR</span>
        </div>

        <!-- Social Login -->
        <div class="social-login">
          <button class="social-btn google" @click="loginWithGoogle">
            <span class="social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </span>
            <span>Continue with Google</span>
          </button>

          <button class="social-btn facebook" @click="loginWithFacebook">
            <span class="social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </span>
            <span>Continue with Facebook</span>
          </button>

          <button class="social-btn wechat" @click="loginWithWechat">
            <span class="social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#07C160">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM5.61 16.78c-1.29-1.29-2-3-2-4.78 0-1.78.71-3.49 2-4.78 1.29-1.29 3-2 4.78-2 1.78 0 3.49.71 4.78 2 1.29 1.29 2 3 2 4.78 0 1.78-.71 3.49-2 4.78-1.29 1.29-3 2-4.78 2-1.78 0-3.49-.71-4.78-2z"/>
                <circle cx="8.5" cy="12" r="1.5"/>
                <circle cx="15.5" cy="12" r="1.5"/>
              </svg>
            </span>
            <span>Continue with WeChat</span>
          </button>
        </div>

        <!-- Register Link -->
        <div class="register-section">
          <p class="register-text">
            <span>CANT LOG IN?</span>
            <router-link to="/register" class="register-link">Go Register</router-link>
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div class="login-footer">
        <p>© 2024 FinPal. All rights reserved.</p>
        <div class="footer-links">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Help Center</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')
const router = useRouter()
const logoUrl = 'https://i.ibb.co/HT0skp8s/finpal-logo.png'

const handleLogin = () => {
  errorMessage.value = ''
  
  // Validation
  if (!email.value.trim()) {
    errorMessage.value = '⚠️ Please enter your email address'
    return
  }
  
  if (!password.value) {
    errorMessage.value = '⚠️ Please enter your password'
    return
  }
  
  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    errorMessage.value = '⚠️ Please enter a valid email address'
    return
  }
  
  loading.value = true
  
  setTimeout(() => {
    // Get saved user data from localStorage
    const savedEmail = localStorage.getItem('user-email')
    const savedPassword = localStorage.getItem('user-password')
    
    console.log('🔍 Login Check:')
    console.log('Saved:', { email: savedEmail, password: savedPassword ? '***' : 'none' })
    console.log('Entered:', { email: email.value, password: '***' })
    
    // Check 1: Is localStorage completely empty?
    if (!savedEmail && !savedPassword) {
      errorMessage.value = '❌ No account found. You need to register first.'
      loading.value = false
      return
    }
    
    // Check 2: Email doesn't match
    if (savedEmail !== email.value) {
      errorMessage.value = `❌ No account found`
      loading.value = false
      return
    }
    
    // Check 3: Password is wrong
    if (savedPassword !== password.value) {
      errorMessage.value = '❌ Incorrect password. Please try again.'
      loading.value = false
      return
    }
    
    // ✅ SUCCESS - User exists in localStorage and credentials match
    localStorage.setItem('user-token', 'logged-in-' + Date.now())
    
    console.log('✅ Login successful! Redirecting to dashboard...')
    errorMessage.value = ''
    
    // Redirect to dashboard
    router.push('/dashboard')
    loading.value = false
    
  }, 1000)
}

// Social login - Always creates new user
const loginWithSocial = (platform) => {
  loading.value = true
  errorMessage.value = ''
  
  setTimeout(() => {
    // Create new social user (overwrites existing)
    const userId = Date.now()
    const socialEmail = `${platform.toLowerCase()}-${userId}@example.com`
    
    localStorage.setItem('user-token', `${platform.toLowerCase()}-token`)
    localStorage.setItem('user-id', userId.toString())
    localStorage.setItem('user-email', socialEmail)
    localStorage.setItem('user-name', `${platform} User`)
    localStorage.setItem('user-password', 'social123')
    localStorage.setItem('user-balance', '0')
    localStorage.setItem('user-transactions', JSON.stringify([]))
    localStorage.setItem('user-createdAt', new Date().toISOString())
    
    console.log(`✅ ${platform} login - New user created`)
    errorMessage.value = ''
    
    router.push('/dashboard')
    loading.value = false
  }, 1000)
}

const loginWithGoogle = () => loginWithSocial('Google')
const loginWithFacebook = () => loginWithSocial('Facebook')
const loginWithWechat = () => loginWithSocial('WeChat')

const forgotPassword = () => {
  const savedEmail = localStorage.getItem('user-email')
  if (savedEmail) {
    alert(`Password reset link sent to: ${savedEmail}`)
  } else {
    alert('No account found. Please register first.')
  }
}
</script>

<style scoped>
/* IMPORTANT: CSS is in assets/styles/ */
@import '@/assets/styles/Login.css';
</style>

