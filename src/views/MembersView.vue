<template>
  <!-- Only Main Content - No Sidebar -->
  <main class="content">
    <!-- Header -->
    <header class="header">
      <div class="header-left">
        <h1>Members</h1>
        <div class="member-count">
          <i class="fas fa-users"></i>
          <span>{{ members.length }} Members</span>
        </div>
      </div>
      <div class="header-right">
        <button class="icon-btn add-btn" @click="addMember">
          <i class="fas fa-user-plus"></i>
          <span>Add Member</span>
        </button>
        <button class="icon-btn notification-btn" @click="goToNotifications">
          <i class="fas fa-bell"></i>
          <span class="notification-badge" v-if="unreadCount > 0">{{ unreadCount }}</span>
        </button>
      </div>
    </header>

    <!-- Search Bar -->
    <div class="search-container">
      <div class="search-wrapper">
        <i class="fas fa-search"></i>
        <input 
          v-model="searchQuery"
          type="text" 
          class="search-input" 
          placeholder="Search members by name or message..."
        />
      </div>
    </div>

    <!-- Members List - Bigger design -->
    <div class="members-list-large">
      <!-- Member Item -->
      <div 
        v-for="member in filteredMembers" 
        :key="member.id"
        class="member-item-large"
        @click="goToMember(member.id, member.name, member.avatar)"
      >
        <div class="member-content-large">
          <!-- Profile picture - Removed status indicator -->
          <div class="member-avatar-large">
            <img :src="member.avatar" :alt="member.name" />
          </div>
          
          <!-- Member info -->
          <div class="member-info-large">
            <div class="member-header-large">
              <h3 class="member-name-large">{{ member.name }}</h3>
              <span class="member-role-large">{{ member.role }}</span>
            </div>
            
            <div class="member-details-large">
              <div class="detail-item-large">
                <span class="detail-label-large">Joined:</span>
                <span class="detail-value-large">{{ member.joined }}</span>
              </div>
              <div class="detail-item-large">
                <span class="detail-label-large">Active:</span>
                <span class="detail-value-large">{{ member.lastActive }}</span>
              </div>
            </div>
          </div>
          
          <!-- Message section - Made more prominent -->
          <div class="message-section-large">
            <p class="message-text-large">{{ member.recentMessage }}</p>
          </div>
        </div>
        
        <!-- Separator line -->
        <div class="member-separator-large"></div>
      </div>

      <!-- Add Member Button -->
      <div class="add-member-large" @click="addMember">
        <div class="add-member-content-large">
          <i class="fas fa-user-plus"></i>
          <h3>Add New Member</h3>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredMembers.length === 0" class="empty-state-large">
      <i class="fas fa-users-slash"></i>
      <h3>No members found</h3>
      <p>Try adjusting your search</p>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Mock data
const members = ref([
  {
    id: 1,
    name: 'Alex Chen',
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
    role: 'Roommate',
    joined: '3 months ago',
    lastActive: 'Today',
    status: 'active',
    recentMessage: 'Thanks for sending the rent!',
    balance: 1500,
    totalExchanges: 24,
    streak: 45
  },
  {
    id: 2,
    name: 'Maya Rodriguez',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    role: 'Roommate',
    joined: '1 year ago',
    lastActive: '2 days ago',
    status: 'active',
    recentMessage: 'Can you pick up the groceries this week? I\'ll pay you back.',
    balance: -320,
    totalExchanges: 42,
    streak: 120
  },
  {
    id: 3,
    name: 'David Kim',
    avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
    role: 'Friend',
    joined: '6 months ago',
    lastActive: '1 week ago',
    status: 'inactive',
    recentMessage: 'The concert tickets came to $86 each.',
    balance: 86,
    totalExchanges: 15,
    streak: 30
  },
  {
    id: 4,
    name: 'Sarah Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    role: 'Sister',
    joined: '2 years ago',
    lastActive: 'Yesterday',
    status: 'active',
    recentMessage: 'Mom\'s birthday gift total is $120 split 4 ways.',
    balance: -120,
    totalExchanges: 58,
    streak: 200
  },
  {
    id: 5,
    name: 'Jamal Williams',
    avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
    role: 'Co-worker',
    joined: '1 month ago',
    lastActive: 'Online now',
    status: 'online',
    recentMessage: 'Coffee fund is running low, want to chip in?',
    balance: 25,
    totalExchanges: 8,
    streak: 5
  }
])

// State
const searchQuery = ref('')
const unreadCount = ref(3)

// Computed properties
const filteredMembers = computed(() => {
  if (!searchQuery.value) {
    return members.value
  }
  
  const query = searchQuery.value.toLowerCase()
  return members.value.filter(member => 
    member.name.toLowerCase().includes(query) ||
    member.recentMessage.toLowerCase().includes(query)
  )
})

// Methods
const goToMember = (id, name, avatar) => {
  router.push({
    name: 'MemberDetail',
    params: { id },
    query: { name, avatar }
  })
}

const addMember = () => {
  console.log('Add new member')
  // You can add your add member logic here
}

// NEW METHOD: Navigate to Notifications page
const goToNotifications = () => {
  router.push('/notifications')
}
</script>

<style scoped>
/* Main Content - Full width since sidebar is in layout */
.content {
  flex: 1;
  padding: 30px 40px;
  overflow-y: auto;
  background: #ffffff;
  min-height: 100vh;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header h1 {
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  color: #111827;
}

.member-count {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #f9fafb;
  border-radius: 20px;
  color: #4f46e5;
  font-weight: 600;
  font-size: 15px;
  border: 1px solid #e5e7eb;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

.icon-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 15px;
}

.add-btn {
  background: #4f46e5;
  color: white;
}

.add-btn:hover {
  background: #4338ca;
}

.notification-btn {
  position: relative;
  background: white;
  color: #6b7280;
  border: 1px solid #e5e7eb;
  width: 45px;
  justify-content: center;
  cursor: pointer;
}

.notification-btn:hover {
  background: #f9fafb;
}

.notification-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ef4444;
  color: white;
  font-size: 12px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Search Container */
.search-container {
  margin-bottom: 25px;
}

.search-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f9fafb;
  padding: 12px 20px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  max-width: 450px;
  transition: all 0.2s;
}

.search-wrapper:focus-within {
  background: white;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.search-wrapper i {
  color: #9ca3af;
  font-size: 18px;
}

.search-input {
  flex: 1;
  border: none;
  padding: 10px 0;
  font-size: 16px;
  background: transparent;
  outline: none;
  color: #111827;
  font-weight: 500;
}

.search-input::placeholder {
  color: #9ca3af;
  font-weight: 400;
}

/* Members List - Larger design */
.members-list-large {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.member-item-large {
  background: white;
  border-radius: 16px;
  padding: 25px 30px;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
}

.member-item-large:hover {
  border-color: #d1d5db;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.member-content-large {
  display: flex;
  align-items: center;
  gap: 25px;
}

/* Profile picture - Larger without status indicator */
.member-avatar-large {
  flex-shrink: 0;
}

.member-avatar-large img {
  width: 70px; /* Larger avatar */
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

/* Member info - Larger text */
.member-info-large {
  flex: 1;
  min-width: 0;
}

.member-header-large {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.member-name-large {
  margin: 0;
  font-size: 20px; /* Larger font */
  font-weight: 700;
  color: #111827;
}

.member-role-large {
  font-size: 14px;
  color: #6b7280;
  background: #f3f4f6;
  padding: 4px 10px;
  border-radius: 8px;
  font-weight: 500;
}

.member-details-large {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.detail-item-large {
  display: flex;
  align-items: center;
  gap: 6px;
}

.detail-label-large {
  font-size: 15px; /* Larger font */
  color: #6b7280;
  font-weight: 500;
}

.detail-value-large {
  font-size: 15px; /* Larger font */
  color: #111827;
  font-weight: 600;
}

/* Message section - Larger and more prominent */
.message-section-large {
  flex: 2;
  min-width: 0;
  max-width: 350px;
  margin-left: auto;
}

.message-text-large {
  margin: 0;
  font-size: 16px; /* Larger font */
  color: #374151;
  line-height: 1.5;
  font-weight: 500;
  padding: 15px;
  background: #f9fafb;
  border-radius: 12px;
  border-left: 4px solid #4f46e5;
}

.member-separator-large {
  height: 1px;
  background-color: #e5e7eb;
  margin-top: 25px;
  margin-left: 95px; /* Account for larger avatar */
  margin-right: 30px;
}

.member-item-large:last-child .member-separator-large {
  display: none;
}

/* Add Member Button - Larger */
.add-member-large {
  background: white;
  border-radius: 16px;
  padding: 25px 30px;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px dashed #d1d5db;
  margin-top: 10px;
  text-align: center;
}

.add-member-large:hover {
  background: #f9fafb;
  border-color: #9ca3af;
  transform: translateY(-2px);
}

.add-member-content-large {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #4f46e5;
}

.add-member-content-large i {
  font-size: 24px;
}

.add-member-content-large h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

/* Empty State */
.empty-state-large {
  text-align: center;
  padding: 60px 30px;
  background: white;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  margin-top: 20px;
}

.empty-state-large i {
  font-size: 56px;
  color: #d1d5db;
  margin-bottom: 20px;
}

.empty-state-large h3 {
  margin: 0 0 10px 0;
  color: #111827;
  font-size: 22px;
  font-weight: 700;
}

.empty-state-large p {
  margin: 0;
  color: #6b7280;
  font-size: 16px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .content {
    padding: 25px;
  }
  
  .header {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
  
  .header-right {
    width: 100%;
    justify-content: space-between;
  }
  
  .member-content-large {
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .message-section-large {
    flex: 1 0 100%;
    margin-left: 95px;
    margin-top: 15px;
  }
  
  .member-separator-large {
    margin-left: 95px;
  }
  
  .member-item-large {
    padding: 20px 25px;
  }
}

@media (max-width: 480px) {
  .header h1 {
    font-size: 28px;
  }
  
  .member-name-large {
    font-size: 18px;
  }
  
  .member-avatar-large img {
    width: 60px;
    height: 60px;
  }
  
  .message-text-large {
    font-size: 15px;
    padding: 12px;
  }
  
  .member-item-large {
    padding: 18px 20px;
  }
  
  .member-separator-large {
    margin-left: 80px;
    margin-right: 20px;
  }
}
</style>