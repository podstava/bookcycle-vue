<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const props = defineProps({
  showLoginModal: Boolean,
  showRegisterModal: Boolean
})

const emit = defineEmits(['update:show-login-modal', 'update:show-register-modal'])

const userStore = useUserStore()
const isAuthenticated = computed(() => userStore.isAuthenticated)
const router = useRouter()
const isAuthLoaded = ref(false)

// Check authentication state on component mount
onMounted(() => {
  // Check if token exists in localStorage
  const token = localStorage.getItem('auth_token')
  
  // Update the store if token exists
  if (token) {
    userStore.setToken(token)
    
    // Also set refresh token if it exists
    const refreshToken = localStorage.getItem('refresh_token')
    if (refreshToken) {
      userStore.setRefreshToken(refreshToken)
    }
  }
  
  // Mark auth as loaded
  isAuthLoaded.value = true
})

const logout = () => {
  // Clear tokens from localStorage
  localStorage.removeItem('auth_token')
  localStorage.removeItem('refresh_token')
  
  // Also update the store
  userStore.logout()
  
  // Redirect to home page
  router.push('/')
}

const menuItems = [
  {
    title: "Книги",
    path: "/books",
  },
  {
    title: "Особливості",
    path: "/features",
  },
  {
    title: "Ціни",
    path: "/pricing",
  },
  {
    title: "Про нас",
    path: "/about",
  },
  {
    title: "Контакти",
    path: "/contact",
  }
]

const open = ref(false)
</script>

<template>
  <nav class="bg-white border-b border-gray-200">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Лого та посилання -->
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center">
            <span class="text-xl font-bold text-slate-800">Book</span>
            <span class="text-xl text-slate-500">cycle</span>
          </NuxtLink>
        </div>

        <!-- Навігація для десктопу -->
        <div class="hidden md:flex items-center gap-4">
          <NuxtLink 
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path" 
            class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
          >
            {{ item.title }}
          </NuxtLink>
          
          <!-- Показуємо кнопки тільки після завантаження стану авторизації -->
          <template v-if="isAuthLoaded">
            <!-- Кнопки для неавторизованих користувачів -->
            <template v-if="!isAuthenticated">
              <button 
                @click="emit('update:show-login-modal', true)" 
                class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Увійти
              </button>
              <button 
                @click="emit('update:show-register-modal', true)" 
                class="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Зареєструватись
              </button>
            </template>

            <!-- Профіль для авторизованих користувачів -->
            <template v-else>
              <div class="flex items-center gap-4">
                <NuxtLink 
                  to="/user/profile" 
                  class="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  <Icon name="heroicons:user-circle" class="w-6 h-6" />
                  <span class="text-sm font-medium">Профіль</span>
                </NuxtLink>
                
                <button 
                  @click="logout" 
                  class="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  <Icon name="heroicons:arrow-right-on-rectangle" class="w-6 h-6" />
                  <span class="text-sm font-medium">Вийти</span>
                </button>
              </div>
            </template>
          </template>
          
          <!-- Показуємо заглушку під час завантаження -->
          <template v-else>
            <div class="w-24 h-8"></div>
          </template>
        </div>

        <!-- Мобільне меню -->
        <div class="md:hidden">
          <button @click="open = !open" class="text-gray-600 hover:text-gray-900">
            <Icon :name="open ? 'heroicons:x-mark' : 'heroicons:bars-3'" class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Мобільне меню (випадаюче) -->
      <div v-if="open" class="md:hidden py-4">
        <div class="flex flex-col space-y-2">
          <NuxtLink 
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path" 
            class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
          >
            {{ item.title }}
          </NuxtLink>

          <template v-if="isAuthLoaded && !isAuthenticated">
            <button 
              @click="emit('update:show-login-modal', true)" 
              class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium text-left"
            >
              Увійти
            </button>
            <button 
              @click="emit('update:show-register-modal', true)" 
              class="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors text-left"
            >
              Зареєструватись
            </button>
          </template>

          <template v-else-if="isAuthLoaded && isAuthenticated">
            <NuxtLink 
              to="/user/profile" 
              class="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              <Icon name="heroicons:user-circle" class="w-6 h-6" />
              <span>Профіль</span>
            </NuxtLink>
            
            <button 
              @click="logout" 
              class="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium text-left"
            >
              <Icon name="heroicons:arrow-right-on-rectangle" class="w-6 h-6" />
              <span>Вийти</span>
            </button>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>
