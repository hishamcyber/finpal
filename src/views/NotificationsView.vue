<template>
  <div class="notifications-page">
    <!-- Header -->
    <div class="topbar">
      <h1 class="title">Notifications</h1>

      <div class="top-actions">
        <button class="link-btn" @click="markAllRead" :disabled="unreadCount === 0 || loading">
          ✓✓ <span>Mark all as read</span>
        </button>

        <div class="menu-wrap">
          <button class="icon-btn" @click="toggleMenu" aria-label="More">⋯</button>
          <div v-if="menuOpen" class="menu">
            <button class="menu-item" @click="refresh">Refresh</button>
            <button class="menu-item" @click="clearRead">Clear read</button>
            <button class="menu-item" @click="openSettings">Preferences</button>
          </div>
        </div>
      </div>
    </div>

    <div class="divider"></div>

    <!-- Tabs row -->
    <div class="tabs-row">
      <div class="tabs">
        <button class="tab" :class="{ active: tab === 'all' }" @click="tab = 'all'">
          All <span class="count">{{ countAll }}</span>
        </button>

        <button class="tab" :class="{ active: tab === 'inbox' }" @click="tab = 'inbox'">
          Inbox <span class="count">{{ countInbox }}</span>
        </button>

        <button class="tab" :class="{ active: tab === 'following' }" @click="tab = 'following'">
          Following <span class="count">{{ countFollowing }}</span>
        </button>

        <button class="tab" :class="{ active: tab === 'archive' }" @click="tab = 'archive'">
          Archive <span class="count">{{ countArchive }}</span>
        </button>
      </div>

      <button class="icon-btn" @click="openSettings" aria-label="Settings">⚙</button>
    </div>

    <!-- Content -->
    <div class="content">
      <div v-if="loading" class="empty">
        <div class="empty-title">Loading…</div>
        <div class="empty-sub">Fetching notifications.</div>
      </div>

      <div v-else-if="filtered.length === 0" class="empty">
        <div class="empty-title">You’re all caught up</div>
        <div class="empty-sub">No notifications found for this filter.</div>
      </div>

      <div v-else class="list">
        <div
          v-for="n in filtered"
          :key="n.id"
          class="item"
          :class="{ unread: !n.isRead }"
          @click="open(n)"
        >
          <div class="left">
            <div class="dot" v-if="!n.isRead"></div>

            <div class="meta">
              <div class="item-title">{{ n.title }}</div>
              <div class="item-body">{{ n.body }}</div>
            </div>
          </div>

          <div class="right">
            <div class="time">{{ formatTime(n.createdAt) }}</div>

            <div class="row-actions">
              <button class="mini-btn" @click.stop="toggleRead(n.id)">
                {{ n.isRead ? "Unread" : "Read" }}
              </button>

              <button class="mini-btn" @click.stop="archive(n.id)" v-if="n.category !== 'archive'">
                Archive
              </button>

              <button class="mini-btn danger" @click.stop="remove(n.id)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useNotificationsStore } from "@/stores/notifications.store";

const router = useRouter();
const store = useNotificationsStore();

const tab = ref("all");
const menuOpen = ref(false);

const loading = computed(() => store.loading);

const countAll = computed(() => store.countAll);
const countInbox = computed(() => store.countInbox);
const countFollowing = computed(() => store.countFollowing);
const countArchive = computed(() => store.countArchive);
const unreadCount = computed(() => store.unreadCount);

const filtered = computed(() => {
  if (tab.value === "all") return store.items;
  return store.items.filter((n) => n.category === tab.value);
});

onMounted(async () => {
  await store.init();
});

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

async function refresh() {
  menuOpen.value = false;
  await store.refresh();
}

async function markAllRead() {
  await store.markAllRead();
}

async function clearRead() {
  menuOpen.value = false;
  await store.clearRead();
}

async function toggleRead(id) {
  await store.toggleRead(id);
}

async function remove(id) {
  await store.remove(id);
}

async function archive(id) {
  await store.archive(id);
}

function openSettings() {
  menuOpen.value = false;
  alert("Notification settings (placeholder)");
}

async function open(n) {
  if (!n.isRead) await store.toggleRead(n.id);
  if (n.link) router.push(n.link);
}

function formatTime(iso) {
  return new Date(iso).toLocaleString();
}
</script>

<style>
@import "@/assets/styles/Notification.css";
</style>
