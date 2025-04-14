<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const username = ref('')
const password = ref('')
const errorMsg = ref('')
const isLoading = ref(false)
const router = useRouter()
const userStore = useUserStore()
const emit = defineEmits(['close'])

interface LoginResponse {
  access?: string;
  refresh?: string;
  detail?: string;
}

const login = async () => {
  // Reset error message
  errorMsg.value = ''
  
  // Validate inputs
  if (!username.value || !password.value) {
    errorMsg.value = 'Будь ласка, введіть логін та пароль'
    return
  }
  
  isLoading.value = true
  
  try {
    const { data, error } = await useApi<LoginResponse>('/user/sign-in/', {
      method: 'POST',
      body: { 
        username: username.value, 
        password: password.value 
      }
    })

    if (error.value) {
      if (error.value.data?.detail) {
        errorMsg.value = error.value.data.detail
      } else {
        errorMsg.value = 'Невірний логін або пароль'
      }
    } else if (data.value?.access && data.value?.refresh) {
      // Store tokens in localStorage
      localStorage.setItem('auth_token', data.value.access)
      localStorage.setItem('refresh_token', data.value.refresh)
      
      // Also update the store
      userStore.setToken(data.value.access)
      userStore.setRefreshToken(data.value.refresh)
      
      // Get user profile
      try {
        const { data: userData } = await useApi(`/user/user-profile/${username.value}/`, {
          headers: {
            'Authorization': `Bearer ${data.value.access}`
          }
        })
        
        if (userData.value?.user) {
          userStore.setUser({
            id: userData.value.user.id,
            username: userData.value.user.username,
            email: userData.value.user.email
          })
        }
      } catch (profileError) {
        console.error('Error fetching user profile:', profileError)
      }
      
      emit('close')
      router.push('/books')
    } else {
      errorMsg.value = 'Помилка при вході. Спробуйте пізніше.'
    }
  } catch (err) {
    console.error('Login error:', err)
    errorMsg.value = 'Помилка при вході. Спробуйте пізніше.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">Вхід</h2>
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
            v-model="password" 
            type="password" 
            placeholder="Пароль" 
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <p v-if="errorMsg" class="text-red-500 text-sm">{{ errorMsg }}</p>
        
        <button 
          @click="login" 
          class="w-full bg-black text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Увійти
        </button>
      </div>
    </div>
  </div>
</template>
