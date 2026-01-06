<template>
  <div class="member-detail">
    <h1>Member Details: {{ member?.name }}</h1>
    <!-- Add member details here -->
    <button @click="router.back()">Back to Members</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const member = ref(null)

onMounted(() => {
  // Fetch member data based on route.params.id
  const memberId = route.params.id
  // TODO: Fetch from API
  member.value = {
    id: memberId,
    name: `person${memberId}`,
    email: `person${memberId}@example.com`
  }
})
</script>