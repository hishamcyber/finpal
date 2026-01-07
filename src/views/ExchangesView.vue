<template>
  <div class="page">
    <h1 class="title">Transfer Funds</h1>

    <!-- TOP CARD -->
    <div class="card top-card">
      <div class="left">
        <div class="field">
          <label>Send from</label>
          <div class="select">
            <div class="row">
              <img class="icon" src="https://i.imgur.com/2yaf2wb.png" />
              <span>My Balance</span>
            </div>
            <div class="row">
              <span class="money">¥ 2,711,213.00</span>
              <span class="arrow">▾</span>
            </div>
          </div>
        </div>

        <div class="field">
          <label>Send to</label>
          <div class="select">
            <div class="row">
              <img class="avatar" src="https://randomuser.me/api/portraits/men/45.jpg" />
              <span>James</span>
            </div>
            <div class="row">
              <span class="email">bullshit@gmail.com</span>
              <span class="arrow">▾</span>
            </div>
          </div>
        </div>
      </div>

      <div class="right">
        <div class="switch-box">
          <span>Schedule for Later</span>
          <label class="switch">
            <input type="checkbox" />
            <span></span>
          </label>
        </div>

        <div class="switch-box">
          <span>Record Transfer</span>
          <label class="switch">
            <input type="checkbox" />
            <span></span>
          </label>
        </div>
      </div>
    </div>

    <!-- MIDDLE CARD -->
    <div class="card">
      <p class="center-label">How much you want to send?</p>

      <div class="row">
        <input class="amount" value="¥ 2'500.00" />
        <div class="country">
          United kingdom
          <img src="https://i.imgur.com/2yaf2wb.png" />
        </div>
      </div>

      <p class="center-label">Date and time</p>

      <div class="row">
        <div class="input-icon">
          <input value="2025/12/27" />
          📅
        </div>
        <div class="input-icon">
          <input value="14 : 06" />
          🕒
        </div>
      </div>

      <label class="checkbox">
        <input type="checkbox" />
        Send the e-receipt to email
      </label>
    </div>

    <!-- BOTTOM CARD -->
    <div class="card bottom">
      <div class="password-row">
        <div class="field full">
          <label>Payment Password</label>
          <input />
        </div>

        <div class="switch-box small">
          <span>Show password</span>
          <label class="switch">
            <input type="checkbox" />
            <span></span>
          </label>
        </div>
      </div>

      <button class="confirm">Confirm</button>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.page {
  background: #f6f8fc;
  min-height: 100vh;
  padding: 40px;
  font-family: Inter, sans-serif;
}

.title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 25px;
  color: #2b2f4c;
}

/* CARDS */
.card {
  background: white;
  border-radius: 26px;
  padding: 30px;
  margin-bottom: 25px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
}

.top-card {
  display: flex;
  gap: 25px;
}

.left { flex: 2 }
.right {
  flex: 1;
  background: #f6f8fc;
  border-radius: 22px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

/* FIELDS */
.field label {
  font-size: 13px;
  color: #9aa0b4;
}

.select {
  background: #f6f8fc;
  border-radius: 18px;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

.row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon {
  width: 40px;
}

.avatar {
  width: 32px;
  border-radius: 50%;
}

.money {
  font-weight: 600;
}

.email {
  color: #9aa0b4;
  font-size: 13px;
}

.arrow {
  font-size: 14px;
  color: #aaa;
}

/* SWITCH */
.switch-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #8b90a8;
}

.switch {
  position: relative;
  width: 46px;
  height: 24px;
}
.switch input {
  display: none;
}
.switch span {
  position: absolute;
  background: #cfd3e6;
  width: 100%;
  height: 100%;
  border-radius: 30px;
}
.switch span::after {
  content: '';
  width: 18px;
  height: 18px;
  background: white;
  position: absolute;
  top: 3px;
  left: 3px;
  border-radius: 50%;
}
.switch input:checked + span {
  background: #6c63ff;
}
.switch input:checked + span::after {
  left: 25px;
}

/* MIDDLE */
.center-label {
  text-align: center;
  color: #9aa0b4;
  font-size: 14px;
  margin: 15px 0;
}

.amount {
  flex: 1;
  font-size: 20px;
  padding: 16px;
  border-radius: 16px;
  border: none;
  background: #f6f8fc;
}

.country {
  flex: 1;
  background: #f6f8fc;
  padding: 16px;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.input-icon {
  flex: 1;
  background: #f6f8fc;
  padding: 14px;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.input-icon input {
  border: none;
  background: transparent;
}

.checkbox {
  margin-top: 18px;
  display: flex;
  gap: 10px;
  color: #8b90a8;
}

/* BOTTOM */
.password-row {
  display: flex;
  gap: 20px;
  align-items: flex-end;
}

.full {
  flex: 1;
}

.bottom input {
  width: 100%;
  padding: 16px;
  border-radius: 16px;
  border: none;
  background: #f6f8fc;
}

.confirm {
  margin: 30px auto 0;
  display: block;
  width: 240px;
  padding: 16px;
  font-size: 20px;
  color: white;
  border: none;
  border-radius: 30px;
  background: linear-gradient(90deg,#f48fb1,#7b6cff);
}
</style>
