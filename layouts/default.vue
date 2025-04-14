<script setup>
import { useUserStore } from '@/stores/user'
const showLoginModal = ref(false)
const showRegisterModal = ref(false)

// Initialize auth state from localStorage on client-side
onMounted(() => {
  if (process.client) {
    // Check if token exists in localStorage
    const token = localStorage.getItem('auth_token')
    const refreshToken = localStorage.getItem('refresh_token')
    
    // Update the store if tokens exist
    if (token || refreshToken) {
      const userStore = useUserStore()
      
      if (token) {
        userStore.setToken(token)
      }
      
      if (refreshToken) {
        userStore.setRefreshToken(refreshToken)
      }
    }
  }
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <BooksNavbar 
      :show-login-modal="showLoginModal" 
      :show-register-modal="showRegisterModal"
      @update:show-login-modal="showLoginModal = $event"
      @update:show-register-modal="showRegisterModal = $event"
    />
    <main class="flex-grow">
      <slot />
    </main>
    <LandingFooter class="mt-auto" />
    <ModalsLoginModal v-if="showLoginModal" @close="showLoginModal = false" />
    <ModalsRegisterModal v-if="showRegisterModal" @close="showRegisterModal = false" />
  </div>
</template>
