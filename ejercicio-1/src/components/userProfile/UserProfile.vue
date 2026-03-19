<script setup>
import { ref, onMounted } from 'vue'
import { userService } from '../../services/userService'
import UserAvatar from './UserAvatar.vue'

const user = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    user.value = await userService.getUser(1);     
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="user-profile">
    <div  data-test="div-loading" v-if="loading">Cargando...</div>
    <div v-else-if="user">
      <h1 data-test="user-name">{{ user.name }}</h1>
      <UserAvatar :url="user.avatarUrl" />
    </div>
  </div>
</template>
