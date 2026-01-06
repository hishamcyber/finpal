<template>
  <div class="layout">
    <sidebar v-if="showSidebar" />
    <div class="main-content">
      <navbar v-if="showNavbar" />
      <div class="content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './Sidebar.vue'
import Navbar from './Navbar.vue'

const route = useRoute()

const showSidebar = computed(() => route.meta.showSidebar || false)
const showNavbar = computed(() => route.meta.showNavbar || true)
</script>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}
.main-content {
  flex: 1;
}
.content {
  padding: 20px;
}
</style>