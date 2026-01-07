<template>
  <div class="login-container">
    <!-- Left Panel - Same as login -->
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

    <!-- Right Panel - Register Form -->
    <div class="login-right">
      <div class="login-form-container">
        <h2>Create Account</h2>
        <p class="login-subtitle">Join FinPal and take control of your finances</p>

        <!-- Register Form -->
        <form @submit.prevent="handleRegister" class="login-form">
          <div class="form-group">
            <label for="fullName">Full Name</label>
            <input 
              id="fullName"
              v-model="fullName"
              type="text" 
              placeholder="John Doe" 
              required
              class="form-input"
            />
          </div>

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
            <label for="password">Password</label>
            <input 
              id="password"
              v-model="password"
              type="password" 
              placeholder="Create a strong password" 
              required
              class="form-input"
            />
            <!-- Password requirements hint -->
            <p class="hint-text">Use at least 8 characters with mix of letters, numbers & symbols</p>
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input 
              id="confirmPassword"
              v-model="confirmPassword"
              type="password" 
              placeholder="Confirm your password" 
              required
              class="form-input"
              :class="{ 'error': !passwordsMatch && confirmPassword }"
            />
            <p v-if="!passwordsMatch && confirmPassword" class="error-text">
              Passwords do not match
            </p>
          </div>

          <!-- Terms & Conditions -->
          <div class="terms-group">
            <input 
              type="checkbox" 
              id="terms" 
              v-model="acceptTerms"
              required
              class="terms-checkbox"
            />
            <label for="terms" class="terms-label">
              I agree to the <a href="#" @click.prevent="openTerms">Terms of Service</a> and 
              <a href="#" @click.prevent="openPrivacy">Privacy Policy</a>
            </label>
          </div>

          <!-- reCAPTCHA Notice -->
          <div class="recaptcha-notice">
            <span class="shield-icon">🛡️</span>
            <span>Secure Registration with reCAPTCHA subject to Google Terms & Privacy.</span>
          </div>

          <!-- After error display, add this: -->
          <div v-if="errorMessage && errorMessage.includes('already registered')" class="email-suggestion">
            <router-link to="/">Already registered, click here to login instead</router-link>
            <br>
            <br>
          </div>

          <button type="submit" class="login-btn" :disabled="!isFormValid || loading">
            <span v-if="loading">Creating Account...</span>
            <span v-else>Create Account</span>
          </button>
        </form>

        <!-- Divider -->
        <div class="divider">
          <span class="divider-text">OR</span>
        </div>

        <!-- Social Register -->
        <div class="social-login">
          <button class="social-btn google" @click="registerWithGoogle">
            <span class="social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </span>
            <span>Sign up with Google</span>
          </button>

          <button class="social-btn facebook" @click="registerWithFacebook">
            <span class="social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </span>
            <span>Sign up with Facebook</span>
          </button>

          <button class="social-btn wechat" @click="registerWithWechat">
            <span class="social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#07C160">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM5.61 16.78c-1.29-1.29-2-3-2-4.78 0-1.78.71-3.49 2-4.78 1.29-1.29 3-2 4.78-2 1.78 0 3.49.71 4.78 2 1.29 1.29 2 3 2 4.78 0 1.78-.71 3.49-2 4.78-1.29 1.29-3 2-4.78 2-1.78 0-3.49-.71-4.78-2z"/>
                <circle cx="8.5" cy="12" r="1.5"/>
                <circle cx="15.5" cy="12" r="1.5"/>
              </svg>
            </span>
            <span>Sign up with WeChat</span>
          </button>
        </div>

        <!-- Login Link -->
        <div class="register-section">
          <p class="register-text">
            <span>Already have an account?</span>
            <router-link to="/" class="register-link">Login here</router-link>
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const acceptTerms = ref(false)
const loading = ref(false)
const errorMessage = ref('')
const router = useRouter()
const logoUrl = 'https://i.ibb.co/HT0skp8s/finpal-logo.png'

const passwordsMatch = computed(() => password.value === confirmPassword.value)

const isFormValid = computed(() => {
  return fullName.value.trim() &&
         email.value.trim() &&
         password.value &&
         confirmPassword.value &&
         passwordsMatch.value &&
         password.value.length >= 6 &&
         acceptTerms.value
})

// Function to check if email already exists in localStorage
const emailExists = (emailToCheck) => {
  const savedEmail = localStorage.getItem('user-email')
  return savedEmail && savedEmail.toLowerCase() === emailToCheck.toLowerCase()
}

const handleRegister = () => {
  errorMessage.value = ''
  
  if (!isFormValid.value) {
    errorMessage.value = 'Please fill all fields correctly'
    return
  }
  
  // Check if email already registered
  if (emailExists(email.value)) {
    errorMessage.value = `Email "${email.value}" is already registered. Please login instead.`
    return
  }
  
  loading.value = true
  
  setTimeout(() => {
    try {
      // Generate unique ID
      const userId = Date.now()
      
      // 1. Save USER data (for login/authentication)
      const userData = {
        name: fullName.value.trim(),
        email: email.value.trim().toLowerCase(),
        role: 'Software Engineer', // Default role
        streak: 1, // New user starts with streak of 1
        lastLogin: new Date().toISOString()
      }
      
      localStorage.setItem('user-token', 'user-token-' + userId)
      localStorage.setItem('user-id', userId.toString())
      localStorage.setItem('user-email', userData.email)
      localStorage.setItem('user-name', userData.name)
      localStorage.setItem('user-password', password.value)
      localStorage.setItem('user-data', JSON.stringify(userData))
      localStorage.setItem('user-createdAt', new Date().toISOString())
      
      // 2. Save DASHBOARD data (for DashboardView)
      const dashboardData = {
        userName: userData.name,
        userRole: userData.role,
        streak: userData.streak,
        members: 1, // Just the user
        memberGrowth: 0,
        bills: 0,
        billsLevel: 'Level 1',
        budget: 1000,
        budgetGrowth: 0,
        loggedDays: 1,
        newMessages: 0,
        totalSales: 0,
        chartData: [
          { name: 'Jan', spent: 0, earned: 0 },
          { name: 'Feb', spent: 0, earned: 0 },
          { name: 'Mar', spent: 0, earned: 0 }
        ]
      }
      
      localStorage.setItem('dashboardData', JSON.stringify(dashboardData))
      
      console.log('✅ New user registered:', userData)
      console.log('✅ Dashboard data initialized:', dashboardData)
      
      // Success message
      errorMessage.value = ''
      
      // Redirect to dashboard
      router.push('/dashboard')
      
    } catch (error) {
      errorMessage.value = 'Registration failed. Please try again.'
      console.error('Registration error:', error)
    } finally {
      loading.value = false
    }
  }, 1000)
}

// Social register - also check for existing users
const registerWithSocial = (platform) => {
  loading.value = true
  errorMessage.value = ''
  
  setTimeout(() => {
    try {
      const savedEmail = localStorage.getItem('user-email')
      
      // If user already exists, just login
      if (savedEmail) {
        console.log('User already exists, logging in...')
        router.push('/dashboard')
        loading.value = false
        return
      }
      
      // Create new social user
      const userId = Date.now()
      const socialEmail = `${platform.toLowerCase()}-${userId}@example.com`
      const socialName = `${platform} User`
      
      // User data
      const userData = {
        name: socialName,
        email: socialEmail,
        role: 'Software Engineer',
        streak: 1,
        lastLogin: new Date().toISOString()
      }
      
      // Dashboard data
      const dashboardData = {
        userName: socialName,
        userRole: 'Software Engineer',
        streak: 1,
        members: 1,
        memberGrowth: 0,
        bills: 0,
        billsLevel: 'Level 1',
        budget: 1000,
        budgetGrowth: 0,
        loggedDays: 1,
        newMessages: 0,
        totalSales: 0,
        chartData: [
          { name: 'Jan', spent: 0, earned: 0 },
          { name: 'Feb', spent: 0, earned: 0 },
          { name: 'Mar', spent: 0, earned: 0 }
        ]
      }
      
      localStorage.setItem('user-token', `${platform.toLowerCase()}-token`)
      localStorage.setItem('user-id', userId.toString())
      localStorage.setItem('user-email', socialEmail)
      localStorage.setItem('user-name', socialName)
      localStorage.setItem('user-password', 'social123')
      localStorage.setItem('user-data', JSON.stringify(userData))
      localStorage.setItem('dashboardData', JSON.stringify(dashboardData))
      localStorage.setItem('user-createdAt', new Date().toISOString())
      
      console.log(`✅ ${platform} user registered:`, socialEmail)
      
      router.push('/dashboard')
      
    } catch (error) {
      errorMessage.value = `${platform} registration failed`
    } finally {
      loading.value = false
    }
  }, 1000)
}

const registerWithGoogle = () => registerWithSocial('Google')
const registerWithFacebook = () => registerWithSocial('Facebook')
const registerWithWechat = () => registerWithSocial('WeChat')

const openTerms = () => alert('Terms of Service - Coming soon!')
const openPrivacy = () => alert('Privacy Policy - Coming soon!')
</script>

<style scoped>
/* Use the same Login.css */
@import '@/assets/styles/Login.css';

/* Add register-specific styles */
.hint-text {
  font-size: 12px;
  color: #64748b;
  margin-top: 6px;
}

.error-text {
  color: #ef4444;
  font-size: 14px;
  margin-top: 6px;
}

.form-input.error {
  border-color: #ef4444;
  background: #fef2f2;
}

.terms-group {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 20px;
  padding: 15px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.terms-checkbox {
  margin-top: 3px;
}

.terms-label {
  font-size: 14px;
  color: #475569;
  line-height: 1.5;
}

.terms-label a {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
}

.terms-label a:hover {
  text-decoration: underline;
}

/* FIX LOGO POSITION - Add this */
.login-left {
  padding-top: 40px !important; /* Move everything up */
}

.brand-section {
  margin-bottom: 30px !important; /* Reduce space below logo */
}

.logo {
  margin-bottom: 10px !important; /* Less space below logo */
}

.tagline {
  margin-bottom: 300px !important; /* Less space below tagline */
}
</style>