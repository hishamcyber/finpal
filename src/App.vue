<template>
  <router-view v-slot="{ Component, route }">
    <Layout v-if="route.meta.requiresAuth">
      <component :is="Component" />
    </Layout>
    <component v-else :is="Component" />
  </router-view>
</template>

<script setup>
import Layout from '@/components/mainLayout.vue'
</script>