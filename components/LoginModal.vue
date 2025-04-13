<script setup>
import { useUserStore } from '@/stores/user'

const username = ref('')
const password = ref('')
const errorMsg = ref('')
const router = useRouter()
const userStore = useUserStore()
const emit = defineEmits(['close'])

const login = async () => {
  const { data, error } = await useFetch('/auth/token/login/', {
    baseURL: useRuntimeConfig().public.apiBase,
    method: 'POST',
    body: { username: username.value, password: password.value }
  })

  if (error.value) {
    errorMsg.value = 'Невірний логін або пароль'
  } else if (data.value?.auth_token) {
    userStore.setToken(data.value.auth_token)
    emit('close')
    router.push('/user/profile')
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