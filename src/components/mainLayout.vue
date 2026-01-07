<template>
  <div class="app">
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="logo">
          <img 
            :src="logoUrl" 
            alt="FinPal Logo" 
            class="logo-image"
          />
        </div>
      </div>

      <div class="profile-section">
        <div class="profile-upload" @click="triggerFileUpload">
          <div class="profile-image-container">
            <img 
              :src="profileImage" 
              alt="Profile" 
              class="profile-image"
              @error="handleImageError"
            />
            <div class="upload-overlay">
              <span class="upload-icon">📷</span>
              <span class="upload-text">Change</span>
            </div>
          </div>
          <input 
            type="file" 
            ref="fileInput"
            @change="handleImageUpload"
            accept="image/*"
            style="display: none;"
          />
        </div>
        
        <div class="profile-info">
          <h3 class="user-name">{{ userName }}</h3>
          <div class="user-role-badge">
            <span class="role-icon">👤</span>
            <span class="role-text">{{ userRole }}</span>
          </div>
          
          <div class="streak-container">
            <div class="streak-badge">
              <span class="streak-icon">🔥</span>
              <span class="streak-text">{{ userStreak }} Day Streak</span>
            </div>
          </div>
        </div>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-section">
          <p class="nav-section-title">MAIN</p>
          <a 
            :class="{ active: isActive('/') || isActive('/dashboard') }"
            @click.prevent="go('/dashboard')"
            class="nav-link"
          >
            <span class="nav-icon">📊</span>
            <span class="nav-text">Dashboard</span>
          </a>

          <a
            :class="{ active: isActive('/statistics') }"
            @click.prevent="go('/statistics')"
            class="nav-link"
          >
            <span class="nav-icon">📈</span>
            <span class="nav-text">Statistics</span>
          </a>
        </div>

        <div class="nav-section">
          <p class="nav-section-title">MANAGEMENT</p>
          <a
            :class="{ active: isActive('/members') }"
            @click.prevent="go('/members')"
            class="nav-link"
          >
            <span class="nav-icon">👥</span>
            <span class="nav-text">Members</span>
          </a>

          <a
            :class="{ active: isActive('/notifications') }"
            @click.prevent="go('/notifications')"
            class="nav-link"
          >
            <span class="nav-icon">🔔</span>
            <span class="nav-text">Notifications</span>
            <span v-if="unreadCount > 0" class="notification-badge">{{ unreadCount }}</span>
          </a>

          <a
            :class="{ active: isActive('/exchanges') }"
            @click.prevent="go('/exchanges')"
            class="nav-link"
          >
            <span class="nav-icon">💱</span>
            <span class="nav-text">Exchanges</span>
          </a>
        </div>
      </nav>

      <div class="sidebar-footer">
        <div class="logout-btn" @click="logout">
          <span class="logout-icon">🚪</span>
          <span class="logout-text">Log Out</span>
        </div>
        <div class="version-info">v1.0.0</div>
      </div>
    </aside>

    <main class="main-content">
      <div class="content-container">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const fileInput = ref(null)

// User data - Default values
const userName = ref('Justin Morrison')
const userRole = ref('Software Engineer')
const userStreak = ref(659)
const profileImage = ref('') // Start with empty - will load default
const unreadCount = ref(3)

const logoUrl = 'https://i.ibb.co/HT0skp8s/finpal-logo.png'

// Default profile image URL
const defaultProfileImage = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'

// Load user data
onMounted(() => {
  loadUserData()
  loadProfileImage()
})

const loadUserData = () => {
  // Try to get user data from localStorage
  const name = localStorage.getItem('user-name')
  const role = localStorage.getItem('user-role')
  const streak = localStorage.getItem('user-streak')
  
  if (name && name.trim()) {
    userName.value = name
  }
  
  if (role && role.trim()) {
    userRole.value = role
  }
  
  if (streak) {
    userStreak.value = parseInt(streak)
  }
  
  // Check for notifications count
  const notifications = localStorage.getItem('unread-notifications')
  if (notifications) {
    unreadCount.value = parseInt(notifications)
  }
}

const loadProfileImage = () => {
  const savedImage = localStorage.getItem('user-profile-image')
  if (savedImage && savedImage.trim()) {
    profileImage.value = savedImage
  } else {
    // Set default profile image
    profileImage.value = defaultProfileImage
  }
}

const triggerFileUpload = () => {
  fileInput.value.click()
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB')
      return
    }
    
    const reader = new FileReader()
    reader.onload = (e) => {
      profileImage.value = e.target.result
      localStorage.setItem('user-profile-image', e.target.result)
      
      // Show success message
      alert('Profile picture updated successfully!')
    }
    reader.onerror = () => {
      alert('Error reading the image file. Please try again.')
    }
    reader.readAsDataURL(file)
  }
}

const handleImageError = () => {
  // Fallback to default if custom image fails to load
  profileImage.value = defaultProfileImage
  localStorage.removeItem('user-profile-image')
}

const go = (path) => {
  router.push(path)
}

const isActive = (path) => {
  return route.path === path
}

const logout = () => {
  if (confirm('Are you sure you want to log out?')) {
    // Clear user session data
    localStorage.removeItem('user-token')
    localStorage.removeItem('user-name')
    localStorage.removeItem('user-role')
    localStorage.removeItem('user-streak')
    localStorage.removeItem('user-profile-image')
    localStorage.removeItem('unread-notifications')
    
    // Redirect to login page
    router.push('/login')
  }
}
</script>

<style scoped>
/* Main app container */
.app {
  display: flex;
  min-height: 100vh;
  background: #f8fafc;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* Sidebar Styling - Matching Dashboard Style */
.sidebar {
  width: 280px;
  background: #ffffff;
  color: #1e293b;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
  border-right: 1px solid #e2e8f0;
  z-index: 100;
}

.sidebar-header {
  padding: 24px;
  border-bottom: 1px solid #f1f5f9;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Show logo at original size */
.logo-image {
  width: 150px;        /* Let browser decide width */
  height: auto;       /* Let browser decide height */
  max-height: 80px;   /* Optional: limit maximum height */
  object-fit: contain;
  border-radius: 8px;
}

.logo h2 {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

/* Profile Section */
.profile-section {
  padding: 32px 24px;
  text-align: center;
  border-bottom: 1px solid #f1f5f9;
  background: #ffffff;
}

.profile-upload {
  display: inline-block;
  cursor: pointer;
  position: relative;
  margin-bottom: 20px;
  transition: transform 0.2s;
}

.profile-upload:hover {
  transform: translateY(-2px);
}

.profile-image-container {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.profile-upload:hover .profile-image-container {
  border-color: #4f46e5;
  box-shadow: 0 8px 25px rgba(79, 70, 229, 0.2);
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #f1f5f9;
}

.upload-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: white;
}

.profile-upload:hover .upload-overlay {
  opacity: 1;
}

.upload-icon {
  font-size: 24px;
  margin-bottom: 4px;
}

.upload-text {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.profile-info {
  margin-top: 16px;
}

.user-name {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #1e293b;
}

.user-role-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #f1f5f9;
  padding: 6px 12px;
  border-radius: 20px;
  margin-bottom: 16px;
  border: 1px solid #e2e8f0;
}

.role-icon {
  font-size: 14px;
}

.role-text {
  font-size: 13px;
  font-weight: 500;
  color: #64748b;
}

.streak-container {
  display: flex;
  justify-content: center;
}

.streak-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  color: white;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
}

.streak-icon {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.7; }
  100% { opacity: 1; }
}

/* Navigation */
.sidebar-nav {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  background: #ffffff;
}

.nav-section {
  margin-bottom: 32px;
}

.nav-section-title {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #94a3b8;
  margin-bottom: 16px;
  padding-left: 8px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #64748b;
  text-decoration: none;
  border-radius: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  background: #ffffff;
  border: 1px solid transparent;
}

.nav-link:hover {
  background: #f8fafc;
  color: #1e293b;
  border-color: #e2e8f0;
}

.nav-link.active {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  border-color: #4f46e5;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
}

.nav-link.active .nav-icon {
  color: white;
}

.nav-icon {
  font-size: 18px;
  width: 20px;
  text-align: center;
  color: #64748b;
}

.nav-text {
  font-size: 14px;
  font-weight: 500;
  flex: 1;
}

.notification-badge {
  background: #ef4444;
  color: white;
  font-size: 11px;
  font-weight: 700;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* Sidebar Footer */
.sidebar-footer {
  padding: 24px;
  border-top: 1px solid #f1f5f9;
  background: #ffffff;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #fef2f2;
  color: #dc2626;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 16px;
  border: 1px solid #fecaca;
}

.logout-btn:hover {
  background: #fee2e2;
  color: #b91c1c;
  border-color: #fca5a5;
  transform: translateY(-1px);
}

.logout-icon {
  font-size: 18px;
}

.logout-text {
  font-size: 14px;
  font-weight: 500;
  flex: 1;
}

.version-info {
  font-size: 11px;
  color: #94a3b8;
  text-align: center;
  font-family: 'SF Mono', 'Courier New', monospace;
  letter-spacing: 0.5px;
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 32px;
  overflow-y: auto;
  background: #f8fafc;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .sidebar {
    width: 240px;
  }
  
  .main-content {
    padding: 24px;
  }
}

@media (max-width: 768px) {
  .sidebar {
    width: 220px;
  }
  
  .main-content {
    padding: 20px;
  }
  
  .profile-image-container {
    width: 80px;
    height: 80px;
  }
  
  .user-name {
    font-size: 16px;
  }
  
  .streak-badge {
    font-size: 13px;
    padding: 6px 12px;
  }
}

@media (max-width: 640px) {
  .app {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    height: auto;
    position: sticky;
    top: 0;
    z-index: 1000;
  }
  
  .sidebar-nav {
    display: flex;
    padding: 16px;
    overflow-x: auto;
    gap: 16px;
  }
  
  .nav-section {
    flex: none;
    margin-bottom: 0;
  }
  
  .nav-link {
    flex-direction: column;
    gap: 6px;
    padding: 12px;
    min-width: 80px;
    text-align: center;
  }
  
  .nav-text {
    font-size: 12px;
  }
  
  .notification-badge {
    position: absolute;
    top: 8px;
    right: 8px;
    min-width: 18px;
    height: 18px;
    font-size: 10px;
  }
  
  .main-content {
    padding: 16px;
  }
}
</style>