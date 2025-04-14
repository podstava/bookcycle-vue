<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMsg = ref('')
const isLoading = ref(false)
const router = useRouter()
const userStore = useUserStore()
const emit = defineEmits(['close'])

const register = async () => {
  // Reset error message
  errorMsg.value = ''
  
  // Validate passwords match
  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'Паролі не співпадають'
    return
  }
  
  // Validate password length
  if (password.value.length < 8) {
    errorMsg.value = 'Пароль повинен містити щонайменше 8 символів'
    return
  }
  
  // Validate username
  if (username.value.length < 5 || username.value.length > 20) {
    errorMsg.value = "Ім'я користувача повинно бути від 5 до 20 символів"
    return
  }
  
  if (!/^[a-zA-Z0-9_]+$/.test(username.value)) {
    errorMsg.value = "Ім'я користувача може містити лише латинські літери, цифри та підкреслення"
    return
  }
  
  // Validate email
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value)) {
    errorMsg.value = "Неправильний формат електронної пошти"
    return
  }

  isLoading.value = true
  
  try {
    // Register user
    const { data, error } = await useApi('/user/sign-up/', {
      method: 'POST',
      body: { 
        username: username.value,
        email: email.value,
        password: password.value
      }
    })

    if (error.value) {
      // Handle specific error messages from backend
      if (error.value.data) {
        if (error.value.data.username) {
          errorMsg.value = error.value.data.username[0]
        } else if (error.value.data.email) {
          errorMsg.value = error.value.data.email[0]
        } else if (error.value.data.password) {
          errorMsg.value = error.value.data.password[0]
        } else {
          errorMsg.value = 'Помилка при реєстрації'
        }
      } else {
        errorMsg.value = 'Помилка при реєстрації'
      }
    } else if (data.value?.tokens?.access) {
      // Registration successful, store tokens in localStorage
      localStorage.setItem('auth_token', data.value.tokens.access)
      localStorage.setItem('refresh_token', data.value.tokens.refresh)
      
      // Also update the store
      userStore.setToken(data.value.tokens.access)
      userStore.setRefreshToken(data.value.tokens.refresh)
      
      // Store user data
      if (data.value.user) {
        userStore.setUser({
          id: data.value.user.id,
          username: data.value.user.username,
          email: data.value.user.email
        })
      }
      
      emit('close')
      router.push('/books')
    }
  } catch (err) {
    console.error('Registration error:', err)
    errorMsg.value = 'Помилка при реєстрації. Спробуйте пізніше.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">Реєстрація</h2>
        <button @click="emit('close')" class="text-gray-500 hover:text-gray-700">
          <Icon name="heroicons:x-mark" class="w-6 h-6" />
        </button>
      </div>
      
      <div class="space-y-4">
        <div>
          <input 
            v-model="username" 
            type="text" 
            placeholder="Логін" 
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <input 
            v-model="email" 
            type="email" 
            placeholder="Email" 
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <input 
            v-model="password" 
            type="password" 
            placeholder="Пароль" 
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <input 
            v-model="confirmPassword" 
            type="password" 
            placeholder="Підтвердіть пароль" 
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <p v-if="errorMsg" class="text-red-500 text-sm">{{ errorMsg }}</p>
        
        <button 
          @click="register" 
          class="w-full bg-black text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Зареєструватись
        </button>
      </div>
    </div>
  </div>
</template>
