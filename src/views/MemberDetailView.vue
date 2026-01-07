<template>
  <div class="app-container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="profile">
        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Profile" />
        <div class="profile-info">
          <h4>Justin Morrison</h4>
          <span class="role">Software Engineer</span>
          <span class="streak">🔥 659 Streak</span>
        </div>
      </div>

      <nav class="menu">
        <router-link to="/dashboard"><i class="fas fa-home"></i> Dashboard</router-link>
        <router-link to="/statistics"><i class="fas fa-chart-bar"></i> Statistics</router-link>
        <router-link to="/members"><i class="fas fa-users"></i> Members</router-link>
        <router-link to="/notifications"><i class="fas fa-bell"></i> Notifications</router-link>
        <router-link to="/exchanges"><i class="fas fa-exchange-alt"></i> Exchanges</router-link>
      </nav>

      <div class="logout">
        <i class="fas fa-sign-out-alt"></i> Login
      </div>
    </aside>

    <!-- Chat Area -->
    <main class="chat-container">
      <!-- Chat Header with Back Arrow -->
      <header class="chat-header">
        <div class="header-left">
          <button class="back-btn" @click="goBack">
            <i class="fas fa-arrow-left"></i>
          </button>
          <div class="member-info">
            <img :src="currentMember.avatar" class="member-avatar" />
            <div class="member-name-container">
              <h1># {{ currentMember.name }}</h1>
              <p class="status">Active today</p>
            </div>
          </div>
        </div>
        <div class="header-right">
          <button class="call-btn">
            <i class="fas fa-phone"></i>
          </button>
          <button class="video-btn">
            <i class="fas fa-video"></i>
          </button>
        </div>
      </header>

      <!-- Chat Messages -->
      <div class="chat-messages">
        <!-- Rent Conversation -->
        <div class="message-thread">
          <div class="timestamp">14:06</div>
          
          <!-- Their Message 1 -->
          <div class="message theirs">
            <div class="message-bubble">
              <p class="message-text"><strong>What is it bro? Im all ears .?</strong></p>
            </div>
            <div class="message-time">14:06</div>
          </div>

          <!-- Your Message -->
          <div class="message yours">
            <div class="message-bubble">
              <p class="message-text">Its almost time for the deadline on the rent I just wanted to let you know in advance.</p>
            </div>
            <div class="message-time">14:17</div>
          </div>

          <!-- Their Message 2 -->
          <div class="message theirs">
            <div class="message-bubble">
              <p class="message-text"><strong>Thanks for sending the rent! 😊️</strong></p>
            </div>
            <div class="message-time">16:31</div>
          </div>
        </div>

        <!-- Divider Line -->
        <div class="divider"></div>

        <!-- Previous Messages -->
        <div class="message-thread">
          <div class="timestamp">17:06</div>
          
          <!-- Your Message -->
          <div class="message yours">
            <div class="message-bubble">
              <p class="message-text">Can you send me the utility bill for this month?</p>
            </div>
            <div class="message-time">17:06</div>
          </div>

          <!-- Their Message -->
          <div class="message theirs">
            <div class="message-bubble">
              <p class="message-text"><strong>Sure, it's $85. I'll send you the receipt.</strong></p>
            </div>
            <div class="message-time">17:22</div>
          </div>

          <!-- Payment Message -->
          <div class="message theirs payment">
            <div class="message-bubble">
              <div class="payment-info">
                <i class="fas fa-receipt"></i>
                <div>
                  <p class="payment-title">Utility Bill - March 2024</p>
                  <p class="payment-amount">$85.00</p>
                </div>
              </div>
            </div>
            <div class="message-time">17:30</div>
          </div>
        </div>
      </div>

      <!-- Message Input (At Bottom) -->
      <div class="message-input-container">
        <div class="input-wrapper">
          <!-- Emoji Button -->
          <button class="icon-btn emoji-btn" @click="toggleEmojiPicker">
            <i class="fas fa-smile"></i>
          </button>
          
          <!-- Message Input -->
          <input 
            v-model="newMessage" 
            type="text" 
            placeholder="I wanter to ask you something ....." 
            class="message-input"
            @keyup.enter="sendMessage"
          />
          
          <!-- Transfer Button - Enhanced -->
          <button class="icon-btn transfer-btn" @click="openTransferModal">
            <i class="fas fa-exchange-alt"></i>
            <span class="transfer-text">Transfer</span>
          </button>
          
          <!-- Send Button -->
          <button class="send-btn" @click="sendMessage">
            <i class="fas fa-paper-plane"></i> Send(S)
          </button>
        </div>
        
        <!-- Quick Action Buttons -->
        <div class="quick-actions">
          <button class="quick-action-btn">
            <i class="fas fa-money-bill-wave"></i> Request Money
          </button>
          <button class="quick-action-btn">
            <i class="fas fa-receipt"></i> Split Bill
          </button>
          <button class="quick-action-btn">
            <i class="fas fa-calendar-alt"></i> Set Reminder
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const newMessage = ref('')
const showEmojiPicker = ref(false)

const currentMember = ref({
  id: route.params.id || 1,
  name: route.query.name || 'Alex Chen',
  avatar: route.query.avatar || 'https://randomuser.me/api/portraits/men/11.jpg'
})

const goBack = () => {
  router.push('/members')
}

const sendMessage = () => {
  if (newMessage.value.trim()) {
    console.log('Sending message:', newMessage.value)
    newMessage.value = ''
  }
}

const toggleEmojiPicker = () => {
  showEmojiPicker.value = !showEmojiPicker.value
  console.log('Emoji picker:', showEmojiPicker.value ? 'open' : 'closed')
}

const openTransferModal = () => {
  console.log('Opening transfer modal')
  // You can add modal logic here
}

onMounted(() => {
  console.log('Member ID:', route.params.id)
})
</script>

<style scoped>
/* Main container */
.app-container {
  display: flex;
  height: 100vh;
  background: #f0f2f5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* Sidebar */
.sidebar {
  width: 280px;
  background: #ffffff;
  padding: 25px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e1e5eb;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
}

.profile {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f2f5;
}

.profile img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #4a6cf7;
  object-fit: cover;
}

.profile-info h4 {
  margin: 0;
  font-size: 16px;
  color: #1a1a1a;
  font-weight: 600;
}

.role {
  display: block;
  color: #666666;
  font-size: 14px;
  margin-top: 2px;
}

.streak {
  display: block;
  color: #ff6b00;
  font-size: 14px;
  margin-top: 4px;
  font-weight: 500;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.menu a {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  color: #555555;
  text-decoration: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.2s;
  border: none;
  background: transparent;
}

.menu a:hover {
  background: #f5f7fa;
  color: #333333;
}

.menu a.router-link-active {
  background: #4a6cf7;
  color: white;
}

.menu i {
  width: 20px;
  text-align: center;
  font-size: 16px;
}

.logout {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  color: #666666;
  cursor: pointer;
  border-radius: 8px;
  font-weight: 500;
  transition: background-color 0.2s;
  margin-top: auto;
  border: 1px solid #e1e5eb;
  background: white;
}

.logout:hover {
  background: #f5f7fa;
  color: #333333;
}

/* Chat Container */
.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  margin: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  border: 1px solid #e1e5eb;
}

/* Chat Header with Back Arrow */
.chat-header {
  padding: 20px 30px;
  background: #ffffff;
  border-bottom: 1px solid #e1e5eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.back-btn {
  background: #f0f2f5;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  color: #4a6cf7;
  font-size: 18px;
}

.back-btn:hover {
  background: #4a6cf7;
  color: white;
  transform: translateX(-2px);
}

.member-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.member-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #4a6cf7;
  object-fit: cover;
}

.member-name-container h1 {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: #1a1a1a;
}

.status {
  margin: 4px 0 0 0;
  color: #666666;
  font-size: 14px;
  font-weight: 400;
}

.header-right {
  display: flex;
  gap: 12px;
}

.call-btn, .video-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 16px;
}

.call-btn {
  background: #e8f5e9;
  color: #4caf50;
}

.call-btn:hover {
  background: #4caf50;
  color: white;
  transform: scale(1.1);
}

.video-btn {
  background: #e3f2fd;
  color: #2196f3;
}

.video-btn:hover {
  background: #2196f3;
  color: white;
  transform: scale(1.1);
}

/* Chat Messages */
.chat-messages {
  flex: 1;
  padding: 25px 30px;
  overflow-y: auto;
  background: #f8f9fa;
}

.message-thread {
  margin-bottom: 25px;
}

.timestamp {
  text-align: center;
  color: #888888;
  font-size: 12px;
  font-weight: 500;
  margin: 20px 0 15px 0;
  letter-spacing: 0.3px;
}

.message {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  max-width: 70%;
}

.message.theirs {
  align-self: flex-start;
}

.message.yours {
  align-self: flex-end;
}

.message-bubble {
  padding: 12px 18px;
  border-radius: 18px;
  line-height: 1.4;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.theirs .message-bubble {
  background: #f0f2f5;
  color: #1a1a1a;
  border-bottom-left-radius: 4px;
}

.yours .message-bubble {
  background: #4a6cf7;
  color: white;
  border-bottom-right-radius: 4px;
}

.message-text {
  margin: 0;
  font-size: 15px;
  line-height: 1.4;
}

.message-time {
  font-size: 11px;
  color: #888888;
  margin-top: 6px;
  padding: 0 8px;
  font-weight: 400;
}

.yours .message-time {
  text-align: right;
}

.theirs .message-time {
  text-align: left;
}

.payment .message-bubble {
  background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
  color: white;
  border: none;
}

.payment-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.payment-info i {
  font-size: 20px;
  background: rgba(255, 255, 255, 0.2);
  padding: 10px;
  border-radius: 50%;
}

.payment-title {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
}

.payment-amount {
  margin: 4px 0 0 0;
  font-size: 18px;
  font-weight: 700;
}

.divider {
  height: 1px;
  background: #e1e5eb;
  margin: 30px 0;
  position: relative;
}

/* Message Input Container */
.message-input-container {
  padding: 20px 30px;
  background: #ffffff;
  border-top: 1px solid #e1e5eb;
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f8f9fa;
  padding: 8px 8px 8px 20px;
  border-radius: 30px;
  border: 2px solid #e1e5eb;
  transition: all 0.3s;
  margin-bottom: 15px;
}

.input-wrapper:focus-within {
  border-color: #4a6cf7;
  background: white;
  box-shadow: 0 0 0 3px rgba(74, 108, 247, 0.1);
}

.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 50%;
}

.emoji-btn {
  background: #fff3cd;
  color: #ffc107;
  width: 40px;
  height: 40px;
  font-size: 18px;
}

.emoji-btn:hover {
  background: #ffc107;
  color: white;
  transform: scale(1.1);
}

/* TRANSFER BUTTON - ENHANCED */
.transfer-btn {
  background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
  color: white;
  width: auto;
  height: 40px;
  padding: 0 18px;
  border-radius: 20px;
  gap: 8px;
  font-weight: 600;
  font-size: 14px;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
}

.transfer-btn:hover {
  background: linear-gradient(135deg, #0da271 0%, #2ec58c 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}

.transfer-text {
  margin-left: 5px;
  font-size: 13px;
  font-weight: 600;
}

.message-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 15px;
  color: #1a1a1a;
  padding: 10px 0;
  outline: none;
}

.message-input::placeholder {
  color: #888888;
  font-weight: 400;
}

.send-btn {
  background: linear-gradient(135deg, #4a6cf7 0%, #6a82fb 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  letter-spacing: 0.3px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 15px rgba(74, 108, 247, 0.3);
}

.send-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(74, 108, 247, 0.4);
}

/* Quick Actions */
.quick-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.quick-action-btn {
  background: #f0f2f5;
  border: none;
  padding: 10px 18px;
  border-radius: 20px;
  font-size: 13px;
  color: #555555;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}

.quick-action-btn:hover {
  background: #4a6cf7;
  color: white;
  transform: translateY(-2px);
}

.quick-action-btn:nth-child(1):hover {
  background: #10b981;
}

.quick-action-btn:nth-child(2):hover {
  background: #f59e0b;
}

.quick-action-btn:nth-child(3):hover {
  background: #8b5cf6;
}

/* Scrollbar Styling */
.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .app-container {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    height: auto;
    padding: 20px;
  }
  
  .chat-container {
    margin: 10px;
  }
}

@media (max-width: 768px) {
  .chat-header {
    padding: 15px 20px;
  }
  
  .member-name-container h1 {
    font-size: 18px;
  }
  
  .message {
    max-width: 85%;
  }
  
  .message-input-container {
    padding: 15px 20px;
  }
  
  .send-btn {
    padding: 10px 18px;
    font-size: 13px;
  }
  
  .transfer-btn {
    padding: 0 12px;
  }
  
  .transfer-text {
    display: none;
  }
  
  .quick-actions {
    flex-wrap: wrap;
  }
}
</style>