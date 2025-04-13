<script setup lang="ts">
const props = defineProps({
  showLoginModal: Boolean,
  showRegisterModal: Boolean
})

const emit = defineEmits(['update:show-login-modal', 'update:show-register-modal'])

const userStore = useUserStore()
const isAuthenticated = computed(() => !!userStore.token)
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

        <!-- Навігація -->
        <div class="flex items-center gap-4">
          <NuxtLink 
            to="/books" 
            class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
          >
            Книги
          </NuxtLink>
          
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
            <NuxtLink 
              to="/user/profile" 
              class="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <Icon name="heroicons:user-circle" class="w-6 h-6" />
              <span class="text-sm font-medium">Профіль</span>
            </NuxtLink>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template> 