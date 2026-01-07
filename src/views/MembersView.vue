<template>
  <div class="app-container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="profile">
        <img src="https://randomuser.me/api/portraits/men/32.jpg" />
        <div>
          <h4>Justin Morrison</h4>
          <p>Software Engineer</p>
          <span class="streak">🔥 659 Streak</span>
        </div>
      </div>

      <nav class="menu">
        <router-link to="/dashboard">Dashboard</router-link>
        <router-link to="/statistics">Statistics</router-link>
        <router-link to="/members">Members</router-link>
        <router-link to="/notifications">Notifications</router-link>
        <router-link to="/exchanges" class="active">Exchanges</router-link>
      </nav>
    </aside>

    <!-- Content -->
    <main class="content">
      <h1>Transfer Funds</h1>

      <div class="transfer-card">
        <!-- Send From -->
        <div class="field">
          <label>Send from</label>
          <div class="select-card">
            <span>💳 My Balance</span>
            <strong>¥ 2,711,213.00</strong>
          </div>
        </div>

        <!-- Send To -->
        <div class="field">
          <label>Send to</label>
          <div class="select-card">
            <div class="user">
              <img src="https://randomuser.me/api/portraits/men/45.jpg" />
              <div>
                <strong>James</strong>
                <small>bullshit@gmail.com</small>
              </div>
            </div>
          </div>
        </div>

        <!-- Switches -->
        <div class="switches">
          <label>
            <input type="checkbox" v-model="schedule" />
            <span class="switch"></span>
            Schedule for later
          </label>

          <label>
            <input type="checkbox" v-model="record" />
            <span class="switch"></span>
            Record Transfer
          </label>
        </div>

        <!-- Amount -->
        <div class="field">
          <label>How much you want to send?</label>
          <div class="row">
            <input class="amount" v-model="amount" />
            <div class="country">United kingdom</div>
          </div>
        </div>

        <!-- Date Time -->
        <div class="field">
          <label>Date and time</label>
          <div class="row">
            <input type="date" v-model="date" />
            <input type="time" v-model="time" />
          </div>
        </div>

        <!-- Receipt -->
        <label class="checkbox">
          <input type="checkbox" v-model="receipt" />
          Send the e-receipt to email
        </label>

        <!-- Password -->
        <div class="field">
          <label>Payment Password</label>
          <div class="password">
            <input :type="show ? 'text' : 'password'" v-model="password" />
            <span @click="show = !show">Show password</span>
          </div>
        </div>

        <!-- Confirm -->
        <button class="confirm" @click="confirm">
          Confirm
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue"

const amount = ref("2500.00")
const date = ref("2025-12-27")
const time = ref("14:06")
const password = ref("")
const receipt = ref(false)
const show = ref(false)
const schedule = ref(false)
const record = ref(false)

const confirm = () => {
  alert(`Transfer ¥${amount.value} confirmed`)
}
</script>

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
  background: #f5f7fb;
  font-family: Inter, sans-serif;
}

/* Sidebar */
.sidebar {
  width: 260px;
  background: #fff;
  padding: 30px;
}
.profile {
  display: flex;
  gap: 15px;
}
.profile img {
  width: 50px;
  border-radius: 50%;
}
.streak {
  background: #ffe8a3;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
}
.menu {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.menu a {
  text-decoration: none;
  color: #555;
}
.menu .active {
  color: #6c63ff;
  font-weight: 600;
}

/* Content */
.content {
  flex: 1;
  padding: 40px;
}

.transfer-card {
  background: #fff;
  padding: 35px;
  max-width: 650px;
  border-radius: 24px;
  box-shadow: 0 15px 40px rgba(0,0,0,0.06);
}

.field {
  margin-bottom: 22px;
}
label {
  font-size: 13px;
  color: #888;
}

/* Select cards */
.select-card {
  background: #f7f8fc;
  padding: 18px;
  border-radius: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.user {
  display: flex;
  gap: 12px;
}
.user img {
  width: 40px;
  border-radius: 50%;
}

/* Switches */
.switches {
  display: flex;
  gap: 30px;
  margin: 20px 0;
}
.switches label {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Inputs */
.row {
  display: flex;
  gap: 15px;
}
.amount {
  flex: 1;
  font-size: 22px;
  padding: 14px;
}
.country {
  padding: 14px;
  background: #f7f8fc;
  border-radius: 12px;
}
input {
  border: none;
  background: #f7f8fc;
  border-radius: 12px;
  padding: 14px;
  width: 100%;
}

/* Password */
.password {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.password span {
  color: #6c63ff;
  cursor: pointer;
}

/* Confirm */
.confirm {
  width: 100%;
  padding: 18px;
  border-radius: 16px;
  border: none;
  font-size: 18px;
  font-weight: 600;
  color: white;
  background: linear-gradient(90deg, #ff7aa2, #6c63ff);
  cursor: pointer;
}
</style>
