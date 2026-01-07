<template>
  <div class="app-container">
    <!-- Main Chat Area -->
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
              <h1>{{ currentMember.name }}</h1>
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
              <p class="message-text"><strong>What is it bro? Im all ears. ?</strong></p>
            </div>
            <div class="message-time">14:06</div>
          </div>

          <!-- Your Message -->
          <div class="message yours">
            <div class="message-bubble">
              <p class="message-text">Its almost time for the deadline on the rent I just wanted to let you know in advance.</p>
            </div>
            <div class="message-time">16:08</div>
          </div>

          <!-- Their Message 2 -->
          <div class="message theirs">
            <div class="message-bubble">
              <p class="message-text"><strong>Thanks for sending the rent!</strong></p>
            </div>
            <div class="message-time">16:17</div>
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
            <div class="message-time">17:08</div>
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
            <div class="message-time">17:22</div>
          </div>

          <!-- Your Latest Message -->
          <div class="message yours">
            <div class="message-bubble">
              <p class="message-text">I wanter to ask you something ---</p>
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
            placeholder="Type your message..." 
            class="message-input"
            @keyup.enter="sendMessage"
          />
          
          <!-- Transfer Button - Cleaner -->
          <button class="icon-btn transfer-btn" @click="openTransferModal">
            <i class="fas fa-exchange-alt"></i>
            <span class="transfer-text">Transfer</span>
          </button>
          
          <!-- Send Button -->
          <button class="send-btn" @click="sendMessage">
            <i class="fas fa-paper-plane"></i> Send(5)
          </button>
        </div>
        
        <!-- Clean Quick Action Buttons -->
        <div class="quick-actions">
          <button class="quick-action-btn" @click="openRequestMoney">
            <i class="fas fa-money-bill-wave"></i> Request Money
          </button>
          <button class="quick-action-btn" @click="openSplitBill">
            <i class="fas fa-receipt"></i> Split Bill
          </button>
          <button class="quick-action-btn" @click="setReminder">
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
  name: route.query.name || 'Jamal Williams',
  avatar: route.query.avatar || 'https://randomuser.me/api/portraits/men/32.jpg'
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

const openRequestMoney = () => {
  console.log('Opening request money')
}

const openSplitBill = () => {
  console.log('Opening split bill')
}

const setReminder = () => {
  console.log('Setting reminder')
}

onMounted(() => {
  console.log('Member ID:', route.params.id)
})
</script>

<style scoped>
/* Main container - Clean */
.app-container {
  display: flex;
  height: 100vh;
  background: #f5f7fa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* Chat Container - Full width */
.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  margin: 15px;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  border: 1px solid #e1e5eb;
}

/* Chat Header with Back Arrow */
.chat-header {
  padding: 18px 25px;
  background: #ffffff;
  border-bottom: 1px solid #e1e5eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  backdrop-filter: blur(10px);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.back-btn {
  background: #f0f2f5;
  border: none;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  color: #4a6cf7;
  font-size: 16px;
}

.back-btn:hover {
  background: #4a6cf7;
  color: white;
  transform: translateX(-2px);
}

.member-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.member-avatar {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 2px solid #4a6cf7;
  object-fit: cover;
}

.member-name-container h1 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
}

.status {
  margin: 3px 0 0 0;
  color: #10b981;
  font-size: 13px;
  font-weight: 500;
}

.header-right {
  display: flex;
  gap: 10px;
}

.call-btn, .video-btn {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 15px;
}

.call-btn {
  background: #e8f5e9;
  color: #10b981;
}

.call-btn:hover {
  background: #10b981;
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
  padding: 20px 25px;
  overflow-y: auto;
  background: #f8f9fa;
}

.message-thread {
  margin-bottom: 25px;
}

.timestamp {
  text-align: center;
  color: #888888;
  font-size: 11px;
  font-weight: 500;
  margin: 15px 0 12px 0;
  letter-spacing: 0.3px;
  text-transform: uppercase;
}

.message {
  margin-bottom: 14px;
  display: flex;
  flex-direction: column;
  max-width: 75%;
  animation: fadeIn 0.3s ease;
}

.message.theirs {
  align-self: flex-start;
}

.message.yours {
  align-self: flex-end;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message-bubble {
  padding: 10px 16px;
  border-radius: 18px;
  line-height: 1.4;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
  font-size: 14px;
  line-height: 1.5;
}

.message-time {
  font-size: 10px;
  color: #888888;
  margin-top: 4px;
  padding: 0 6px;
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
  gap: 10px;
}

.payment-info i {
  font-size: 18px;
  background: rgba(255, 255, 255, 0.2);
  padding: 8px;
  border-radius: 50%;
}

.payment-title {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
}

.payment-amount {
  margin: 3px 0 0 0;
  font-size: 16px;
  font-weight: 700;
}

.divider {
  height: 1px;
  background: linear-gradient(to right, transparent, #e1e5eb, transparent);
  margin: 25px 0;
  position: relative;
}

.divider:before {
  content: 'Earlier';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #f8f9fa;
  color: #888888;
  padding: 0 10px;
  font-size: 11px;
  font-weight: 500;
}

/* Message Input Container */
.message-input-container {
  padding: 15px 25px;
  background: #ffffff;
  border-top: 1px solid #e1e5eb;
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f8f9fa;
  padding: 6px 6px 6px 16px;
  border-radius: 25px;
  border: 1px solid #e1e5eb;
  transition: all 0.3s;
  margin-bottom: 12px;
}

.input-wrapper:focus-within {
  border-color: #4a6cf7;
  background: white;
  box-shadow: 0 0 0 2px rgba(74, 108, 247, 0.1);
}

.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 50%;
  background: transparent;
}

.emoji-btn {
  color: #ffc107;
  width: 36px;
  height: 36px;
  font-size: 16px;
}

.emoji-btn:hover {
  background: #fff3cd;
  transform: scale(1.1);
}

/* TRANSFER BUTTON - Clean */
.transfer-btn {
  background: #f0f2f5;
  color: #555555;
  width: auto;
  height: 36px;
  padding: 0 15px;
  border-radius: 18px;
  gap: 6px;
  font-weight: 500;
  font-size: 13px;
}

.transfer-btn:hover {
  background: #4a6cf7;
  color: white;
}

.transfer-text {
  margin-left: 4px;
  font-size: 12px;
  font-weight: 600;
}

.message-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 14px;
  color: #1a1a1a;
  padding: 8px 0;
  outline: none;
}

.message-input::placeholder {
  color: #888888;
  font-weight: 400;
}

.send-btn {
  background: #4a6cf7;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 18px;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s;
  letter-spacing: 0.3px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.send-btn:hover {
  background: #3a5ce5;
  transform: translateY(-1px);
}

/* Clean Quick Actions */
.quick-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.quick-action-btn {
  background: transparent;
  border: 1px solid #e1e5eb;
  padding: 8px 15px;
  border-radius: 18px;
  font-size: 12px;
  color: #555555;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
}

.quick-action-btn:hover {
  background: #f8f9fa;
  border-color: #4a6cf7;
  color: #4a6cf7;
}

.quick-action-btn:nth-child(1):hover {
  border-color: #10b981;
  color: #10b981;
}

.quick-action-btn:nth-child(2):hover {
  border-color: #f59e0b;
  color: #f59e0b;
}

.quick-action-btn:nth-child(3):hover {
  border-color: #8b5cf6;
  color: #8b5cf6;
}

/* Scrollbar Styling */
.chat-messages::-webkit-scrollbar {
  width: 4px;
}

.chat-messages::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Responsive Design */
@media (max-width: 768px) {
  .app-container {
    margin: 0;
  }
  
  .chat-container {
    margin: 0;
    border-radius: 0;
    border: none;
  }
  
  .chat-header {
    padding: 12px 15px;
  }
  
  .member-name-container h1 {
    font-size: 16px;
  }
  
  .member-avatar {
    width: 40px;
    height: 40px;
  }
  
  .message {
    max-width: 85%;
  }
  
  .chat-messages {
    padding: 15px;
  }
  
  .message-input-container {
    padding: 12px 15px;
  }
  
  .send-btn {
    padding: 8px 15px;
    font-size: 12px;
  }
  
  .transfer-btn {
    padding: 0 10px;
  }
  
  .transfer-text {
    display: none;
  }
  
  .quick-actions {
    flex-wrap: wrap;
  }
  
  .quick-action-btn {
    padding: 6px 12px;
    font-size: 11px;
  }
}
</style>