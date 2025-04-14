<script setup>
import { useUserStore } from '@/stores/user'

// Initialize auth state from localStorage on client-side
if (process.client) {
  // This runs before the component is mounted
  const token = localStorage.getItem('auth_token')
  const refreshToken = localStorage.getItem('refresh_token')
  
  // We need to wait for Pinia to be ready
  const nuxtApp = useNuxtApp()
  
  // Set up a hook to initialize auth when Pinia is ready
  nuxtApp.hook('app:created', () => {
    try {
      const userStore = useUserStore()
      
      if (token) {
        userStore.setToken(token)
      }
      
      if (refreshToken) {
        userStore.setRefreshToken(refreshToken)
      }
    } catch (error) {
      console.error('Error initializing auth state:', error)
    }
  })
}
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
