<script setup>
import { ref, reactive } from 'vue'

const emit = defineEmits(['submit-form'])

const form = reactive({
  name: '',
  email: ''
})

const errors = reactive({
  name: '',
  email: ''
})

const validate = () => {
  let isValid = true
  errors.name = ''
  errors.email = ''

  if (!form.name.trim()) {
    errors.name = 'El nombre es obligatorio'
    isValid = false
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.email)) {
    errors.email = 'Email inválido'
    isValid = false
  }

  return isValid
}

const handleSubmit = () => {
  if (validate()) {
    emit('submit-form', { ...form })
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="user-form">
    <div class="field">
      <label for="name">Nombre:</label>
      <input 
        id="name"
        v-model="form.name" 
        data-test="name-input"
        type="text" 
      />
      <span v-if="errors.name" data-test="name-error" class="error">{{ errors.name }}</span>
    </div>

    <div class="field">
      <label for="email">Email:</label>
      <input 
        id="email"
        v-model="form.email" 
        data-test="email-input"
        type="email" 
      />
      <span v-if="errors.email" data-test="email-error" class="error">{{ errors.email }}</span>
    </div>

    <button type="submit" data-test="submit-btn">Enviar</button>
  </form>
</template>

<style scoped>
.user-form { display: flex; flex-direction: column; gap: 1rem; max-width: 300px; }
.field { display: flex; flex-direction: column; }
.error { color: red; font-size: 0.8rem; }
</style>
