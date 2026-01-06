<template>
  <div class="members">
    <h1>Members</h1>
    <div class="member-list">
      <div 
        v-for="member in members" 
        :key="member.id"
        class="member-card"
        @click="goToMember(member.id)"
      >
        <div class="avatar">{{ member.name.charAt(0) }}</div>
        <div class="info">
          <h3>{{ member.name }}</h3>
          <p>{{ member.email }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const members = ref([
  { id: 1, name: 'person1', email: 'person1@example.com' },
  { id: 2, name: 'person2', email: 'person2@example.com' },
  { id: 3, name: 'person3', email: 'person3@example.com' },
  { id: 4, name: 'person4', email: 'person4@example.com' }
])

const goToMember = (id) => {
  router.push(`/members/${id}`)
}
</script>

<style scoped>
.member-list {
  display: grid;
  gap: 1rem;
}
.member-card {
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
}
.member-card:hover {
  background-color: #f5f5f5;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #42b983;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
}
</style>