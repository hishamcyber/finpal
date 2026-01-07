<template>
  <div class="transfer-page">
    <!-- Main Container -->
    <div class="container">
      <!-- Header -->
      <h1 class="page-title">Transfer Funds</h1>
      
      <!-- Form Container -->
      <div class="form-container">
        
        <!-- Send From -->
        <div class="form-group">
          <h2 class="section-title">Send from</h2>
          <div class="input-line">
            <div class="input-label">My Balance</div>
            <div class="input-value">¥ 2,711,213.00</div>
          </div>
        </div>
        
        <!-- Send To -->
        <div class="form-group">
          <h2 class="section-title">Send to</h2>
          <div class="input-line">
            <div class="input-label">James</div>
            <div class="input-email">bullshit@gmail.com</div>
          </div>
        </div>
        
        <!-- Amount -->
        <div class="form-group">
          <h2 class="section-title">How much you want to send?</h2>
          <div class="input-line">
            <div class="currency-symbol">¥</div>
            <div class="input-value">2500.00</div>
            <div class="country-tag">United kingdom</div>
          </div>
        </div>
        
        <!-- Date and Time -->
        <div class="form-group">
          <h2 class="section-title">Date and time</h2>
          <div class="datetime-group">
            <div class="date-value">2025/12/27</div>
            <div class="time-value">14 : 06</div>
          </div>
        </div>
        
        <!-- Divider -->
        <div class="divider"></div>
        
        <!-- E-receipt Checkbox -->
        <div class="checkbox-group">
          <input type="checkbox" id="receipt" checked>
          <label for="receipt" class="checkbox-label">
            Send the e-receipt to email
          </label>
        </div>
        
        <!-- Password -->
        <div class="form-group">
          <h2 class="section-title">Payment Password</h2>
          <input 
            type="password" 
            class="password-input" 
            placeholder="Enter your password"
            v-model="password"
          >
        </div>
        
        <!-- Confirm Button -->
        <button class="confirm-btn" @click="confirmTransfer">
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransferPage',
  data() {
    return {
      password: ''
    }
  },
  methods: {
    confirmTransfer() {
      if (this.password) {
        alert('Transfer confirmed successfully!');
      } else {
        alert('Please enter your password');
      }
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background-color: #f8fafc;
  padding: 20px;
}

.transfer-page {
  max-width: 500px;
  margin: 0 auto;
  padding: 40px 20px;
}

.container {
  background: white;
  border-radius: 20px;
  padding: 40px 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 30px;
  text-align: center;
  letter-spacing: -0.5px;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  margin-bottom: 5px;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.input-line {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  min-height: 48px;
  transition: all 0.2s;
}

.input-line:hover {
  border-color: #d1d5db;
  background: #ffffff;
}

.input-label {
  font-size: 16px;
  color: #374151;
  font-weight: 500;
  flex: 1;
}

.input-value {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  font-family: 'SF Mono', Monaco, monospace;
}

.input-email {
  font-size: 15px;
  color: #6b7280;
  font-family: 'SF Mono', Monaco, monospace;
  flex: 1;
}

.currency-symbol {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin-right: 8px;
  font-family: 'SF Mono', Monaco, monospace;
}

.country-tag {
  background: #e5e7eb;
  color: #4b5563;
  font-size: 13px;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 20px;
  margin-left: 12px;
  white-space: nowrap;
}

.datetime-group {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 12px 16px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  min-height: 48px;
}

.date-value, .time-value {
  font-size: 16px;
  font-weight: 500;
  color: #111827;
  font-family: 'SF Mono', Monaco, monospace;
}

.divider {
  height: 1px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    #e5e7eb 20%, 
    #e5e7eb 80%, 
    transparent 100%
  );
  margin: 20px 0;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  margin: 10px 0;
}

.checkbox-group input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: #3b82f6;
  cursor: pointer;
}

.checkbox-label {
  font-size: 15px;
  color: #374151;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
}

.password-input {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #f9fafb;
  color: #111827;
  transition: all 0.2s;
}

.password-input:focus {
  outline: none;
  border-color: #3b82f6;
  background: white;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.password-input::placeholder {
  color: #9ca3af;
}

.confirm-btn {
  width: 100%;
  padding: 16px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 20px;
  letter-spacing: 0.5px;
}

.confirm-btn:hover {
  background: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.confirm-btn:active {
  transform: translateY(0);
}

/* Responsive Design */
@media (max-width: 480px) {
  .transfer-page {
    padding: 20px 10px;
  }
  
  .container {
    padding: 30px 20px;
    border-radius: 16px;
  }
  
  .page-title {
    font-size: 24px;
  }
  
  .datetime-group {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  
  .input-line {
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .country-tag {
    margin-left: 0;
  }
}
</style>