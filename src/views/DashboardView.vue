<template>
  <div class="dashboard">
    <!-- Header -->
    <div class="dashboard-header">
      <h1>Financial Dashboard</h1>
      <div class="header-actions">
        <button class="btn-primary" @click="openModal('income')">
          <span class="icon">+</span> Add Funds
        </button>
        <button class="btn-outline" @click="openModal('expense')">
          <span class="icon">−</span> Add Expense
        </button>
      </div>
    </div>

    <!-- Balance Overview -->
    <div class="balance-overview">
      <div class="balance-card main">
        <div class="balance-header">
          <h2>Total Balance</h2>
          <span class="trend" :class="balanceTrend >= 0 ? 'positive' : 'negative'">
            {{ balanceTrend >= 0 ? '+' : '' }}{{ balanceTrend }}% this month
          </span>
        </div>
        <div class="balance-amount">¥{{ formatCurrency(userBalance) }}</div>
        <div class="balance-breakdown">
          <div class="breakdown-item">
            <span class="label">Available</span>
            <span class="value">¥{{ formatCurrency(userBalance) }}</span>
          </div>
          <div class="breakdown-item">
            <span class="label">Owed to You</span>
            <span class="value">¥{{ formatCurrency(totalOwedToYou) }}</span>
          </div>
          <div class="breakdown-item">
            <span class="label">You Owe</span>
            <span class="value">¥{{ formatCurrency(totalYouOwe) }}</span>
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="balance-card stat">
        <div class="stat-icon">👥</div>
        <div class="stat-content">
          <h3>Active Members</h3>
          <div class="stat-number">{{ members.length }}</div>
          <div class="stat-desc">In your network</div>
        </div>
      </div>

      <div class="balance-card stat">
        <div class="stat-icon">💱</div>
        <div class="stat-content">
          <h3>Recent Exchanges</h3>
          <div class="stat-number">{{ recentExchangesCount }}</div>
          <div class="stat-desc">This month</div>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="content-grid">
      <!-- Recent Transactions -->
      <div class="content-card">
        <div class="card-header">
          <h3>Transaction History</h3>
          <button class="btn-text" @click="viewAllTransactions">View All →</button>
        </div>
        <div class="transactions-list">
          <div v-for="transaction in recentTransactions" :key="transaction.id" class="transaction-item">
            <div class="transaction-icon" :class="transaction.type">
              {{ transaction.type === 'income' ? '↑' : '↓' }}
            </div>
            <div class="transaction-details">
              <div class="transaction-title">{{ transaction.description }}</div>
              <div class="transaction-meta">
                <span class="transaction-category">{{ transaction.category }}</span>
                <span class="transaction-date">{{ formatDate(transaction.date) }}</span>
              </div>
            </div>
            <div class="transaction-amount" :class="transaction.type">
              {{ transaction.type === 'income' ? '+' : '-' }}¥{{ formatCurrency(transaction.amount) }}
            </div>
          </div>
          <div v-if="recentTransactions.length === 0" class="empty-state">
            No transactions yet. Add your first transaction!
          </div>
        </div>
      </div>

      <!-- Members Balance -->
      <div class="content-card">
        <div class="card-header">
          <h3>Members Balance</h3>
          <span class="badge">Total: ¥{{ formatCurrency(membersTotalBalance) }}</span>
        </div>
        <div class="members-list">
          <div v-for="member in members" :key="member.id" class="member-item">
            <div class="member-avatar">{{ member.name.charAt(0) }}</div>
            <div class="member-info">
              <div class="member-name">{{ member.name }}</div>
              <div class="member-email">{{ member.email }}</div>
            </div>
            <div class="member-balance" :class="{ positive: member.balance > 0, negative: member.balance < 0 }">
              ¥{{ formatCurrency(member.balance) }}
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Exchanges -->
      <div class="content-card wide">
        <div class="card-header">
          <h3>Recent Exchanges</h3>
          <button class="btn-text" @click="initiateExchange">New Exchange →</button>
        </div>
        <div class="exchanges-table">
          <div class="table-header">
            <div class="col from">From</div>
            <div class="col to">To</div>
            <div class="col amount">Amount</div>
            <div class="col date">Date</div>
            <div class="col status">Status</div>
          </div>
          <div v-for="exchange in exchanges.slice(0, 5)" :key="exchange.id" class="table-row">
            <div class="col from">{{ exchange.from }}</div>
            <div class="col to">{{ exchange.to }}</div>
            <div class="col amount">¥{{ formatCurrency(exchange.amount) }}</div>
            <div class="col date">{{ formatDate(exchange.date) }}</div>
            <div class="col status">
              <span class="status-badge completed">Completed</span>
            </div>
          </div>
          <div v-if="exchanges.length === 0" class="empty-state">
            No exchanges yet. Start your first exchange!
          </div>
        </div>
      </div>

      <!-- Notifications & Quick Actions -->
      <div class="content-grid-vertical">
        <!-- Notifications -->
        <div class="content-card">
          <div class="card-header">
            <h3>Notifications</h3>
            <span class="badge" :class="{ 'unread': unreadNotifications > 0 }">
              {{ unreadNotifications }} new
            </span>
          </div>
          <div class="notifications-list">
            <div v-for="notification in notifications.slice(0, 3)" :key="notification.id" 
                 class="notification-item" :class="{ 'unread': !notification.read }">
              <div class="notification-dot" v-if="!notification.read"></div>
              <div class="notification-message">{{ notification.message }}</div>
            </div>
            <div v-if="notifications.length === 0" class="empty-state">
              No notifications
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="content-card">
          <div class="card-header">
            <h3>Quick Actions</h3>
          </div>
          <div class="quick-actions">
            <button class="quick-action" @click="sendMoney">
              <span class="action-icon">📤</span>
              <span>Send Money</span>
            </button>
            <button class="quick-action" @click="requestMoney">
              <span class="action-icon">📥</span>
              <span>Request Money</span>
            </button>
            <button class="quick-action" @click="splitExpense">
              <span class="action-icon">🧾</span>
              <span>Split Expense</span>
            </button>
            <button class="quick-action" @click="viewReports">
              <span class="action-icon">📊</span>
              <span>View Reports</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Transaction Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <div class="modal-header">
          <h3>{{ modalMode === 'income' ? 'Add Funds' : 'Add Expense' }}</h3>
          <button class="modal-close" @click="closeModal">×</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>Amount (¥)</label>
            <input type="number" v-model="transactionAmount" placeholder="0.00" min="0" step="0.01" 
                   @keyup.enter="saveTransaction" ref="amountInput" />
          </div>
          <div class="form-group">
            <label>Description</label>
            <input type="text" v-model="transactionDescription" 
                   :placeholder="modalMode === 'income' ? 'e.g., Salary deposit' : 'e.g., Grocery shopping'"
                   @keyup.enter="saveTransaction" />
          </div>
          <div class="form-group" v-if="modalMode === 'expense'">
            <label>Category</label>
            <select v-model="transactionCategory">
              <option value="food">Food</option>
              <option value="transport">Transport</option>
              <option value="entertainment">Entertainment</option>
              <option value="shopping">Shopping</option>
              <option value="bills">Bills</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-secondary" @click="closeModal">Cancel</button>
          <button class="btn-primary" @click="saveTransaction" :disabled="!isValidTransaction">
            {{ modalMode === 'income' ? 'Add Funds' : 'Add Expense' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
// IMPORTANT: Check if your file is mockData.js or mockdata.js
import { members, exchanges, notifications } from '@/data/mockData.js'

// ========== STATE ==========
// Your wallet
const userBalance = ref(2564)
const userTransactions = ref([])

// Modal state
const showModal = ref(false)
const modalMode = ref('income')
const transactionAmount = ref('')
const transactionDescription = ref('')
const transactionCategory = ref('food')
const amountInput = ref(null)

// ========== DATA PERSISTENCE ==========
// Load saved data from browser
const loadSavedData = () => {
  const savedBalance = localStorage.getItem('finpal_balance')
  const savedTransactions = localStorage.getItem('finpal_transactions')
  
  if (savedBalance) userBalance.value = parseFloat(savedBalance)
  if (savedTransactions) {
    try {
      userTransactions.value = JSON.parse(savedTransactions)
    } catch (e) {
      userTransactions.value = []
    }
  }
}

// Save data to browser
const saveData = () => {
  localStorage.setItem('finpal_balance', userBalance.value.toString())
  localStorage.setItem('finpal_transactions', JSON.stringify(userTransactions.value))
}

// ========== BUSINESS LOGIC ==========
// Add transaction
const addTransaction = (type, amount, description, category = null) => {
  const transaction = {
    id: Date.now(),
    type: type, // 'income' or 'expense'
    amount: parseFloat(amount),
    description: description,
    category: type === 'expense' ? category : 'income',
    date: new Date().toISOString().split('T')[0]
  }
  
  // Add to beginning of array
  userTransactions.value.unshift(transaction)
  
  // Update balance
  if (type === 'income') {
    userBalance.value += parseFloat(amount)
  } else {
    userBalance.value -= parseFloat(amount)
  }
  
  saveData()
}

// Format money nicely
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

// Format date nicely
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric'
  })
}

// ========== COMPUTED PROPERTIES ==========
const recentTransactions = computed(() => {
  return userTransactions.value.slice(0, 5)
})

const unreadNotifications = computed(() => {
  return notifications.filter(n => !n.read).length
})

const membersTotalBalance = computed(() => {
  return members.reduce((sum, member) => sum + member.balance, 0)
})

const totalOwedToYou = computed(() => {
  return members
    .filter(m => m.balance > 0)
    .reduce((sum, m) => sum + m.balance, 0)
})

const totalYouOwe = computed(() => {
  return Math.abs(members
    .filter(m => m.balance < 0)
    .reduce((sum, m) => sum + m.balance, 0))
})

const balanceTrend = computed(() => {
  const recentIncome = userTransactions.value
    .filter(t => t.type === 'income')
    .slice(0, 5)
    .reduce((sum, t) => sum + t.amount, 0)
  
  const recentExpenses = userTransactions.value
    .filter(t => t.type === 'expense')
    .slice(0, 5)
    .reduce((sum, t) => sum + t.amount, 0)
  
  if (recentExpenses === 0) return 0
  return parseFloat(((recentIncome - recentExpenses) / recentExpenses * 100).toFixed(1))
})

const recentExchangesCount = computed(() => {
  const thisMonth = new Date().getMonth()
  return exchanges.filter(e => {
    const exchangeDate = new Date(e.date)
    return exchangeDate.getMonth() === thisMonth
  }).length
})

const isValidTransaction = computed(() => {
  return transactionAmount.value && 
         parseFloat(transactionAmount.value) > 0 && 
         transactionDescription.value.trim()
})

// ========== METHODS ==========
const openModal = (mode) => {
  modalMode.value = mode
  transactionCategory.value = 'food'
  transactionAmount.value = ''
  transactionDescription.value = ''
  showModal.value = true
  
  nextTick(() => {
    if (amountInput.value) {
      amountInput.value.focus()
    }
  })
}

const closeModal = () => {
  showModal.value = false
  transactionAmount.value = ''
  transactionDescription.value = ''
}

const saveTransaction = () => {
  if (!isValidTransaction.value) return
  
  addTransaction(
    modalMode.value,
    transactionAmount.value,
    transactionDescription.value,
    modalMode.value === 'expense' ? transactionCategory.value : null
  )
  
  closeModal()
}

const viewAllTransactions = () => {
  console.log('Navigate to transactions page')
}

const initiateExchange = () => {
  console.log('Start new exchange')
}

const sendMoney = () => {
  console.log('Send money flow')
}

const requestMoney = () => {
  console.log('Request money flow')
}

const splitExpense = () => {
  console.log('Split expense flow')
}

const viewReports = () => {
  console.log('View reports')
}

// ========== LIFECYCLE ==========
onMounted(() => {
  loadSavedData()
})
</script>

<style scoped>
@import '@/assets/styles/dashboard.css';
</style>