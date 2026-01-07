<template>
  <div class="exchanges-view">
    <div class="page-header">
      <h1><i class="fas fa-exchange-alt"></i> Currency Exchange</h1>
      <p class="page-subtitle">Convert currencies at competitive rates</p>
    </div>

    <div class="exchange-container">
      <!-- Exchange Calculator -->
      <div class="exchange-card">
        <div class="card-header">
          <h2><i class="fas fa-calculator"></i> Exchange Calculator</h2>
          <div class="live-rate">
            <span class="rate-badge">Live Rates</span>
            <span class="rate-text">Updates every 30 seconds</span>
          </div>
        </div>

        <div class="exchange-form">
          <div class="currency-row">
            <!-- From Currency -->
            <div class="currency-box send-box">
              <label class="currency-label">You Send</label>
              <div class="currency-input-group">
                <div class="currency-select-wrapper">
                  <div class="currency-select" @click="toggleFromDropdown">
                    <div class="flag-container">
                      <div class="currency-flag" :class="selectedFromCurrency.flag"></div>
                      <span>{{ selectedFromCurrency.code }}</span>
                    </div>
                    <i class="fas fa-chevron-down"></i>
                  </div>
                  <div class="dropdown-menu" v-if="showFromDropdown">
                    <div class="dropdown-item" 
                         v-for="currency in currencies" 
                         :key="currency.code"
                         @click="selectFromCurrency(currency)">
                      <div class="currency-option">
                        <div class="currency-flag" :class="currency.flag"></div>
                        <div class="currency-details">
                          <span class="currency-code">{{ currency.code }}</span>
                          <span class="currency-name">{{ currency.name }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="amount-input">
                  <input type="number" v-model="sendAmount" placeholder="0.00" min="0" step="0.01">
                </div>
              </div>
              <div class="balance-info">
                <span>Balance: $12,450.00</span>
                <button class="btn-use-max" @click="sendAmount = 12450">Use Max</button>
              </div>
            </div>

            <!-- Exchange Icon -->
            <div class="exchange-icon">
              <button class="swap-btn" @click="swapCurrencies">
                <i class="fas fa-exchange-alt"></i>
              </button>
            </div>

            <!-- To Currency -->
            <div class="currency-box receive-box">
              <label class="currency-label">You Receive</label>
              <div class="currency-input-group">
                <div class="currency-select-wrapper">
                  <div class="currency-select" @click="toggleToDropdown">
                    <div class="flag-container">
                      <div class="currency-flag" :class="selectedToCurrency.flag"></div>
                      <span>{{ selectedToCurrency.code }}</span>
                    </div>
                    <i class="fas fa-chevron-down"></i>
                  </div>
                  <div class="dropdown-menu" v-if="showToDropdown">
                    <div class="dropdown-item" 
                         v-for="currency in currencies" 
                         :key="currency.code"
                         @click="selectToCurrency(currency)">
                      <div class="currency-option">
                        <div class="currency-flag" :class="currency.flag"></div>
                        <div class="currency-details">
                          <span class="currency-code">{{ currency.code }}</span>
                          <span class="currency-name">{{ currency.name }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="amount-input">
                  <input type="text" :value="receiveAmount" readonly class="receive-amount">
                </div>
              </div>
              <div class="receive-info">
                <div class="receive-display">
                  <span class="receive-value">€{{ receiveAmount }}</span>
                  <span class="receive-label">EUR</span>
                </div>
                <div class="fee-text">No hidden fees</div>
              </div>
            </div>
          </div>

          <!-- Exchange Details -->
          <div class="exchange-details">
            <div class="detail-row">
              <span>Exchange Rate</span>
              <span>1 {{ selectedFromCurrency.code }} = {{ exchangeRate }} {{ selectedToCurrency.code }}</span>
            </div>
            <div class="detail-row">
              <span>Transfer Fee</span>
              <span class="no-fee">$0.00</span>
            </div>
            <div class="detail-row total">
              <span>Total to Receive</span>
              <span class="total-amount">{{ selectedToCurrency.symbol }}{{ receiveAmount }}</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="action-buttons">
            <button class="btn btn-secondary" @click="viewHistory">
              <i class="fas fa-history"></i> View History
            </button>
            <button class="btn btn-primary" @click="initiateExchange">
              <i class="fas fa-exchange-alt"></i> Exchange Now
            </button>
          </div>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div class="transactions-card">
        <div class="card-header">
          <h2><i class="fas fa-history"></i> Recent Transactions</h2>
          <button class="btn-view-all" @click="viewAllTransactions">View All <i class="fas fa-arrow-right"></i></button>
        </div>

        <div class="transactions-list">
          <div class="transaction-item" v-for="transaction in transactions" :key="transaction.id">
            <div class="transaction-icon" :class="transaction.status">
              <i :class="transaction.icon"></i>
            </div>
            <div class="transaction-details">
              <div class="transaction-header">
                <h4>{{ transaction.description }}</h4>
                <span class="transaction-amount" :class="transaction.amountClass">
                  {{ transaction.amount }}
                </span>
              </div>
              <div class="transaction-info">
                <span class="transaction-date">{{ transaction.date }}</span>
                <span class="transaction-status" :class="transaction.status">
                  {{ transaction.status }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Exchange -->
        <div class="quick-exchange">
          <h3><i class="fas fa-bolt"></i> Quick Exchange</h3>
          <div class="quick-options">
            <button class="quick-option" @click="setQuickAmount(100)">
              $100
            </button>
            <button class="quick-option" @click="setQuickAmount(500)">
              $500
            </button>
            <button class="quick-option" @click="setQuickAmount(1000)">
              $1,000
            </button>
            <button class="quick-option" @click="setQuickAmount(5000)">
              $5,000
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Exchange Rate Table -->
    <div class="rates-card">
      <div class="card-header">
        <h2><i class="fas fa-chart-line"></i> Popular Exchange Rates</h2>
        <div class="time-update">Updated: Just now</div>
      </div>

      <div class="rates-table">
        <table>
          <thead>
            <tr>
              <th>Currency Pair</th>
              <th>Rate</th>
              <th>Change</th>
              <th>Last Updated</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="rate in exchangeRates" :key="rate.pair">
              <td>
                <div class="currency-pair">
                  <div class="pair-flag">
                    <div class="flag-small" :class="rate.fromFlag"></div>
                    <div class="flag-small" :class="rate.toFlag"></div>
                  </div>
                  <span>{{ rate.pair }}</span>
                </div>
              </td>
              <td class="rate-value">{{ rate.rate }}</td>
              <td :class="rate.changeClass">
                <i :class="rate.changeIcon"></i> {{ rate.change }}
              </td>
              <td>{{ rate.updated }}</td>
              <td>
                <button class="btn-use-rate" @click="useRate(rate)">
                  Use
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExchangesView',
  
  data() {
    return {
      sendAmount: 1000,
      exchangeRate: 0.92,
      showFromDropdown: false,
      showToDropdown: false,
      selectedFromCurrency: {
        code: 'USD',
        name: 'US Dollar',
        flag: 'usd',
        symbol: '$'
      },
      selectedToCurrency: {
        code: 'EUR',
        name: 'Euro',
        flag: 'eur',
        symbol: '€'
      },
      currencies: [
        { code: 'USD', name: 'US Dollar', flag: 'usd', symbol: '$' },
        { code: 'EUR', name: 'Euro', flag: 'eur', symbol: '€' },
        { code: 'GBP', name: 'British Pound', flag: 'gbp', symbol: '£' },
        { code: 'JPY', name: 'Japanese Yen', flag: 'jpy', symbol: '¥' },
        { code: 'CAD', name: 'Canadian Dollar', flag: 'cad', symbol: 'C$' },
        { code: 'AUD', name: 'Australian Dollar', flag: 'aud', symbol: 'A$' },
        { code: 'CHF', name: 'Swiss Franc', flag: 'chf', symbol: 'CHF' },
        { code: 'CNY', name: 'Chinese Yuan', flag: 'cny', symbol: '¥' }
      ],
      exchangeRates: [
        {
          pair: 'USD/EUR',
          fromFlag: 'usd',
          toFlag: 'eur',
          rate: '1 USD = 0.92 EUR',
          change: '+0.002',
          changeClass: 'positive',
          changeIcon: 'fas fa-arrow-up',
          updated: '2 min ago'
        },
        {
          pair: 'USD/GBP',
          fromFlag: 'usd',
          toFlag: 'gbp',
          rate: '1 USD = 0.79 GBP',
          change: '-0.001',
          changeClass: 'negative',
          changeIcon: 'fas fa-arrow-down',
          updated: '5 min ago'
        },
        {
          pair: 'EUR/USD',
          fromFlag: 'eur',
          toFlag: 'usd',
          rate: '1 EUR = 1.09 USD',
          change: '+0.003',
          changeClass: 'positive',
          changeIcon: 'fas fa-arrow-up',
          updated: '1 min ago'
        },
        {
          pair: 'USD/JPY',
          fromFlag: 'usd',
          toFlag: 'jpy',
          rate: '1 USD = 150.25 JPY',
          change: '+0.15',
          changeClass: 'positive',
          changeIcon: 'fas fa-arrow-up',
          updated: '3 min ago'
        },
        {
          pair: 'GBP/EUR',
          fromFlag: 'gbp',
          toFlag: 'eur',
          rate: '1 GBP = 1.17 EUR',
          change: '-0.005',
          changeClass: 'negative',
          changeIcon: 'fas fa-arrow-down',
          updated: '7 min ago'
        }
      ],
      transactions: [
        {
          id: 1,
          description: 'USD to EUR Exchange',
          amount: '+€920.00',
          amountClass: 'positive',
          date: 'Today, 14:30',
          status: 'completed',
          icon: 'fas fa-check-circle'
        },
        {
          id: 2,
          description: 'GBP to USD Exchange',
          amount: '+$635.50',
          amountClass: 'positive',
          date: 'Yesterday, 11:20',
          status: 'completed',
          icon: 'fas fa-check-circle'
        },
        {
          id: 3,
          description: 'EUR to JPY Exchange',
          amount: 'Processing',
          amountClass: 'neutral',
          date: 'Dec 25, 09:45',
          status: 'processing',
          icon: 'fas fa-clock'
        },
        {
          id: 4,
          description: 'USD to GBP Exchange',
          amount: '-$2,000.00',
          amountClass: 'negative',
          date: 'Dec 24, 16:15',
          status: 'completed',
          icon: 'fas fa-check-circle'
        }
      ]
    };
  },
  
  computed: {
    receiveAmount() {
      const amount = this.sendAmount * this.exchangeRate;
      return amount.toFixed(2);
    }
  },
  
  methods: {
    toggleFromDropdown() {
      this.showFromDropdown = !this.showFromDropdown;
      this.showToDropdown = false; // Close other dropdown
    },
    
    toggleToDropdown() {
      this.showToDropdown = !this.showToDropdown;
      this.showFromDropdown = false; // Close other dropdown
    },
    
    selectFromCurrency(currency) {
      this.selectedFromCurrency = currency;
      this.showFromDropdown = false;
      this.updateExchangeRate();
    },
    
    selectToCurrency(currency) {
      this.selectedToCurrency = currency;
      this.showToDropdown = false;
      this.updateExchangeRate();
    },
    
    updateExchangeRate() {
      // In a real app, this would fetch the exchange rate from an API
      // For demo, we'll use a simple mapping
      const pair = `${this.selectedFromCurrency.code}/${this.selectedToCurrency.code}`;
      const rateMap = {
        'USD/EUR': 0.92,
        'EUR/USD': 1.09,
        'USD/GBP': 0.79,
        'GBP/USD': 1.27,
        'USD/JPY': 150.25,
        'EUR/GBP': 0.86,
        'GBP/EUR': 1.17,
        'USD/CAD': 1.35,
        'EUR/JPY': 162.23
      };
      
      this.exchangeRate = rateMap[pair] || 1.0;
    },
    
    swapCurrencies() {
      [this.selectedFromCurrency, this.selectedToCurrency] = 
      [this.selectedToCurrency, this.selectedFromCurrency];
      this.updateExchangeRate();
      this.sendAmount = this.receiveAmount;
    },
    
    setQuickAmount(amount) {
      this.sendAmount = amount;
    },
    
    initiateExchange() {
      if (!this.sendAmount || this.sendAmount <= 0) {
        alert('Please enter a valid amount');
        return;
      }
      
      const confirmMessage = `Confirm exchange of ${this.selectedFromCurrency.symbol}${this.sendAmount} for ${this.selectedToCurrency.symbol}${this.receiveAmount}?`;
      
      if (confirm(confirmMessage)) {
        alert(`Exchange initiated!\n${this.selectedFromCurrency.symbol}${this.sendAmount} → ${this.selectedToCurrency.symbol}${this.receiveAmount}\nTransaction ID: EX${Date.now().toString().slice(-6)}`);
        
        this.transactions.unshift({
          id: Date.now(),
          description: `${this.selectedFromCurrency.code} to ${this.selectedToCurrency.code} Exchange`,
          amount: `+${this.selectedToCurrency.symbol}${this.receiveAmount}`,
          amountClass: 'positive',
          date: 'Just now',
          status: 'processing',
          icon: 'fas fa-clock'
        });
      }
    },
    
    useRate(rate) {
      alert(`Selected ${rate.pair} at rate ${rate.rate}`);
    },
    
    viewHistory() {
      alert('Viewing transaction history...');
    },
    
    viewAllTransactions() {
      alert('Opening all transactions...');
    }
  },
  
  mounted() {
    console.log('ExchangesView component loaded');
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.currency-select-wrapper')) {
        this.showFromDropdown = false;
        this.showToDropdown = false;
      }
    });
  }
};
</script>

<style scoped>
/* Overall size reduction */
.exchanges-view {
  padding: 20px;
  max-width: 1300px;
  margin: 0 auto;
  background: #f8fafc;
  min-height: 100vh;
}

.page-header {
  margin-bottom: 30px;
  text-align: center;
}

.page-header h1 {
  color: #1a237e;
  font-size: 2.2rem;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.page-subtitle {
  color: #666;
  font-size: 1rem;
  opacity: 0.9;
}

.exchange-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 25px;
  margin-bottom: 35px;
}

@media (max-width: 1024px) {
  .exchange-container {
    grid-template-columns: 1fr;
  }
}

/* Cards made slightly smaller */
.exchange-card,
.transactions-card,
.rates-card {
  background: white;
  border-radius: 18px;
  padding: 25px;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.07);
  border: 1px solid #eef2f7;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 18px;
  border-bottom: 1px solid #eef2f7;
}

.card-header h2 {
  color: #333;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

.live-rate {
  display: flex;
  align-items: center;
  gap: 8px;
}

.rate-badge {
  background: #4caf50;
  color: white;
  padding: 5px 10px;
  border-radius: 18px;
  font-size: 0.8rem;
  font-weight: 600;
}

.rate-text {
  color: #666;
  font-size: 0.85rem;
}

/* LARGER Send and Receive Containers */
.currency-row {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 20px;
  align-items: stretch;
  margin-bottom: 25px;
}

@media (max-width: 768px) {
  .currency-row {
    grid-template-columns: 1fr;
    gap: 25px;
  }
}

.currency-box {
  background: #f8f9ff;
  border-radius: 18px;
  padding: 30px;
  border: 2px solid #e8edff;
  min-height: 240px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.send-box {
  background: linear-gradient(135deg, #f8f9ff, #eef5ff);
  border-color: #1a237e;
}

.receive-box {
  background: linear-gradient(135deg, #f8f9ff, #f0f8ff);
  border-color: #4caf50;
}

.currency-label {
  display: block;
  margin-bottom: 20px;
  color: #555;
  font-weight: 600;
  font-size: 1.1rem;
}

/* SMALLER Input Fields with flags */
.currency-input-group {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex: 1;
  align-items: center;
}

@media (max-width: 480px) {
  .currency-input-group {
    flex-direction: column;
    align-items: stretch;
  }
}

/* Currency Select with Dropdown */
.currency-select-wrapper {
  position: relative;
  min-width: 130px;
}

.currency-select {
  background: white;
  border: 1px solid #e1e5eb;
  border-radius: 12px;
  padding: 12px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.3s;
  min-height: 56px;
}

.currency-select:hover {
  border-color: #1a237e;
  box-shadow: 0 2px 8px rgba(26, 35, 126, 0.1);
}

.flag-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.currency-flag {
  width: 30px;
  height: 20px;
  border-radius: 4px;
  flex-shrink: 0;
}

/* SMALLER Amount Input */
.amount-input {
  flex: 1;
}

.amount-input input,
.receive-amount {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #e1e5eb;
  border-radius: 12px;
  font-size: 1.5rem; /* SMALLER font size */
  font-weight: 600;
  color: #333;
  background: white;
  outline: none;
  min-height: 56px;
  text-align: right;
}

.receive-amount {
  background: #f0f8ff;
  color: #1a237e;
  border-color: #4caf50;
}

.amount-input input:focus {
  border-color: #1a237e;
  box-shadow: 0 0 0 2px rgba(26, 35, 126, 0.1);
}

/* Dropdown Menu */
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e1e5eb;
  border-radius: 12px;
  margin-top: 5px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 100;
  max-height: 300px;
  overflow-y: auto;
}

.dropdown-item {
  padding: 12px 15px;
  cursor: pointer;
  transition: background-color 0.2s;
  border-bottom: 1px solid #f0f0f0;
}

.dropdown-item:last-child {
  border-bottom: none;
}

.dropdown-item:hover {
  background-color: #f8f9ff;
}

.currency-option {
  display: flex;
  align-items: center;
  gap: 12px;
}

.currency-details {
  display: flex;
  flex-direction: column;
}

.currency-code {
  font-weight: 600;
  color: #333;
  font-size: 0.95rem;
}

.currency-name {
  font-size: 0.85rem;
  color: #666;
}

/* Currency Flag Variations */
.currency-flag.usd {
  background: linear-gradient(to bottom, #b22234 33%, white 33%, white 66%, #b22234 66%);
  border-left: 10px solid #3c3b6e;
}

.currency-flag.eur {
  background: #003399;
  position: relative;
}

.currency-flag.eur::after {
  content: "★";
  color: #ffcc00;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
}

.currency-flag.gbp {
  background: linear-gradient(to bottom, #c8102e 33%, white 33%, white 66%, #c8102e 66%);
  border-left: 10px solid #012169;
}

.currency-flag.jpy {
  background: white;
  position: relative;
}

.currency-flag.jpy::after {
  content: "●";
  color: #bc002d;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
}

.currency-flag.cad {
  background: linear-gradient(to right, #ff0000 33%, white 33%, white 66%, #ff0000 66%);
  position: relative;
}

.currency-flag.cad::after {
  content: "🍁";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
}

.currency-flag.aud {
  background: #00008b;
  position: relative;
}

.currency-flag.aud::after {
  content: "★";
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
}

.currency-flag.chf {
  background: linear-gradient(to right, #ff0000 33%, white 33%, white 66%, #ff0000 66%);
  position: relative;
}

.currency-flag.chf::after {
  content: "+";
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  font-weight: bold;
}

.currency-flag.cny {
  background: #ff0000;
  position: relative;
}

.currency-flag.cny::after {
  content: "★";
  color: #ffde00;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
}

/* RECEIVE INFO SECTION */
.receive-info {
  margin-top: auto;
  padding-top: 15px;
  border-top: 2px solid rgba(76, 175, 80, 0.2);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.receive-display {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
}

.receive-value {
  font-size: 2.2rem;
  font-weight: 700;
  color: #1a237e;
  line-height: 1;
}

.receive-label {
  font-size: 1.2rem;
  font-weight: 600;
  color: #4caf50;
  background: rgba(76, 175, 80, 0.1);
  padding: 6px 12px;
  border-radius: 8px;
}

.fee-text {
  color: #4caf50;
  font-weight: 600;
  font-size: 0.9rem;
  text-align: right;
}

.balance-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95rem;
  color: #666;
  margin-top: auto;
  padding-top: 15px;
  border-top: 2px solid rgba(26, 35, 126, 0.2);
}

.btn-use-max {
  background: #1a237e;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-use-max:hover {
  background: #283593;
  transform: translateY(-2px);
}

.exchange-icon {
  display: flex;
  align-items: center;
}

.swap-btn {
  background: linear-gradient(135deg, #1a237e, #283593);
  color: white;
  border: none;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 5px 15px rgba(26, 35, 126, 0.3);
}

.swap-btn:hover {
  transform: rotate(180deg) scale(1.1);
  box-shadow: 0 8px 25px rgba(26, 35, 126, 0.4);
}

.exchange-details {
  background: #f8f9ff;
  border-radius: 16px;
  padding: 22px;
  margin-bottom: 25px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e8edff;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-row.total {
  font-size: 1.1rem;
  font-weight: 600;
  padding-top: 18px;
  margin-top: 8px;
  border-top: 2px solid #e8edff;
}

.total-amount {
  color: #1a237e;
  font-size: 1.4rem;
}

.no-fee {
  color: #4caf50;
  font-weight: 600;
}

.action-buttons {
  display: flex;
  gap: 15px;
}

.btn {
  flex: 1;
  padding: 16px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s;
}

.btn-primary {
  background: linear-gradient(135deg, #1a237e, #283593);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(26, 35, 126, 0.4);
}

.btn-secondary {
  background: #f0f3ff;
  color: #1a237e;
  border: 1px solid #d1dcff;
}

.btn-secondary:hover {
  background: #e1e8ff;
}

/* Rest of the CSS remains the same... */
.transactions-list {
  margin-bottom: 25px;
}

.transaction-item {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 18px;
  border-bottom: 1px solid #eef2f7;
  transition: all 0.3s;
}

.transaction-item:hover {
  background: #f8f9ff;
  border-radius: 12px;
}

.transaction-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}

.transaction-icon.completed {
  background: #e8f5e9;
  color: #388e3c;
}

.transaction-icon.processing {
  background: #e3f2fd;
  color: #1976d2;
}

.transaction-details {
  flex: 1;
}

.transaction-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.transaction-header h4 {
  color: #333;
  font-size: 1rem;
  font-weight: 600;
}

.transaction-amount {
  font-weight: 600;
  font-size: 1rem;
}

.transaction-amount.positive {
  color: #388e3c;
}

.transaction-amount.negative {
  color: #d32f2f;
}

.transaction-amount.neutral {
  color: #666;
}

.transaction-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: #666;
}

.transaction-status {
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.transaction-status.completed {
  background: #e8f5e9;
  color: #388e3c;
}

.transaction-status.processing {
  background: #e3f2fd;
  color: #1976d2;
}

.btn-view-all {
  background: none;
  border: none;
  color: #1a237e;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: gap 0.3s;
  font-size: 0.9rem;
}

.btn-view-all:hover {
  gap: 12px;
}

.quick-exchange {
  background: #f8f9ff;
  border-radius: 16px;
  padding: 22px;
}

.quick-exchange h3 {
  color: #333;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.2rem;
}

.quick-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

@media (max-width: 480px) {
  .quick-options {
    grid-template-columns: 1fr;
  }
}

.quick-option {
  background: white;
  border: 1px solid #e1e5eb;
  border-radius: 10px;
  padding: 14px;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  cursor: pointer;
  transition: all 0.3s;
}

.quick-option:hover {
  background: #1a237e;
  color: white;
  border-color: #1a237e;
}

.rates-card {
  margin-top: 25px;
}

.time-update {
  color: #666;
  font-size: 0.85rem;
}

.rates-table {
  overflow-x: auto;
  font-size: 0.9rem;
}

.rates-table table {
  width: 100%;
  border-collapse: collapse;
}

.rates-table th {
  background: #f8f9ff;
  padding: 16px 18px;
  text-align: left;
  color: #555;
  font-weight: 600;
  border-bottom: 2px solid #e8edff;
  font-size: 0.9rem;
}

.rates-table td {
  padding: 16px 18px;
  border-bottom: 1px solid #eef2f7;
  color: #333;
}

.rates-table tbody tr:hover {
  background: #f8f9ff;
}

.currency-pair {
  display: flex;
  align-items: center;
  gap: 10px;
}

.pair-flag {
  display: flex;
  gap: 4px;
}

.flag-small {
  width: 22px;
  height: 15px;
  border-radius: 3px;
}

.rate-value {
  font-weight: 600;
  color: #333;
}

.positive {
  color: #388e3c;
}

.negative {
  color: #d32f2f;
}

.btn-use-rate {
  background: #e8edff;
  color: #1a237e;
  border: none;
  padding: 6px 14px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.85rem;
}

.btn-use-rate:hover {
  background: #d1dcff;
}
</style>