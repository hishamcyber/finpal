import { defineStore } from "pinia";
import { fetchNotifications, saveNotifications } from "@/utils/notifications.service";

export const useNotificationsStore = defineStore("notifications", {
  state: () => ({
    items: [],
    loading: false
  }),

  getters: {
    unreadCount(state) {
      return state.items.filter((n) => !n.isRead).length;
    },
    countAll(state) {
      return state.items.length;
    },
    countInbox(state) {
      return state.items.filter((n) => n.category === "inbox").length;
    },
    countFollowing(state) {
      return state.items.filter((n) => n.category === "following").length;
    },
    countArchive(state) {
      return state.items.filter((n) => n.category === "archive").length;
    }
  },

  actions: {
    async init() {
      if (this.items.length > 0) return;
      this.loading = true;
      try {
        this.items = await fetchNotifications();
      } finally {
        this.loading = false;
      }
    },

    async refresh() {
      this.loading = true;
      try {
        this.items = await fetchNotifications();
      } finally {
        this.loading = false;
      }
    },

    async markAllRead() {
      this.items = this.items.map((n) => ({ ...n, isRead: true }));
      await saveNotifications(this.items);
    },

    async toggleRead(id) {
      this.items = this.items.map((n) =>
        n.id === id ? { ...n, isRead: !n.isRead } : n
      );
      await saveNotifications(this.items);
    },

    async remove(id) {
      this.items = this.items.filter((n) => n.id !== id);
      await saveNotifications(this.items);
    },

    async clearRead() {
      this.items = this.items.filter((n) => !n.isRead);
      await saveNotifications(this.items);
    },

    async archive(id) {
      this.items = this.items.map((n) =>
        n.id === id ? { ...n, category: "archive", isRead: true } : n
      );
      await saveNotifications(this.items);
    }
  }
});
