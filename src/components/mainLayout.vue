<template>
  <div class="app">
    <aside class="sidebar">
      <div class="profile">
        <img src="https://wallpaperaccess.com/full/2580788.jpg" />
        <h3>Justin Morrison</h3>
        <p>Software Engineer</p>
        <span class="streak">🔥 659 Streak</span>
      </div>

      <nav>
        <a :class="{ active: isActive('/dashboard') }" @click.prevent="go('/dashboard')">
          Dashboard
        </a>

        <a :class="{ active: isActive('/statistics') }" @click.prevent="go('/statistics')">
          Statistics
        </a>

        <a :class="{ active: isActive('/members') }" @click.prevent="go('/members')">
          Members
        </a>

        <a :class="{ active: isActive('/notifications') }" @click.prevent="go('/notifications')">
          <span>Notifications</span>
          <span v-if="unread > 0" class="badge">{{ unread }}</span>
        </a>

        <a :class="{ active: isActive('/exchanges') }" @click.prevent="go('/exchanges')">
          Exchanges
        </a>
      </nav>

      <div class="logout" @click="logout">Log out</div>
    </aside>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useNotificationsStore } from "@/stores/notifications.store";

/* ROUTER */
const router = useRouter();
const route = useRoute();

/* FUNCTIONS — MUST BE TOP LEVEL */
function go(path) {
  router.push(path);
}

function isActive(path) {
  return route.path === path;
}

/* STORE */
const store = useNotificationsStore();
const unread = computed(() => store.unreadCount);

onMounted(() => {
  store.init();
});

/* LOGOUT */
function logout() {
  localStorage.removeItem("user-token");
  router.push("/login");
}
</script>

<style>
@import "@/assets/styles/layout.css";

.badge {
  background: #ff3b30;
  color: #fff;
  font-size: 12px;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 999px;
}

.sidebar nav a {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
np