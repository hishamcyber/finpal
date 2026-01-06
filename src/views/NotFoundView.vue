<template>
  <div class="not-found">
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <router-link to="/">Go to Home</router-link>
  </div>
</template>

<script setup>
// 404 logic here
</script>

<style scoped>
.not-found {
  padding: 20px;
  text-align: center;
}
</style>