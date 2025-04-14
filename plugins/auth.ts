import { useUserStore } from '@/stores/user'

export default defineNuxtPlugin({
  name: 'auth-plugin',
  setup() {
    // Only run on client-side
    if (process.client) {
      // Add a hook to run after app is mounted
      const app = useNuxtApp()
      
      app.hook('app:mounted', () => {
        try {
          const userStore = useUserStore()
          
          // Load tokens from localStorage
          const token = localStorage.getItem('auth_token')
          const refreshToken = localStorage.getItem('refresh_token')
          
          if (token) {
            userStore.setToken(token)
          }
          
          if (refreshToken) {
            userStore.setRefreshToken(refreshToken)
          }
          
          // Watch for token changes and update localStorage
          watch(() => userStore.token, (newToken) => {
            if (newToken) {
              localStorage.setItem('auth_token', newToken)
            } else {
              localStorage.removeItem('auth_token')
            }
          })
          
          watch(() => userStore.refreshToken, (newToken) => {
            if (newToken) {
              localStorage.setItem('refresh_token', newToken)
            } else {
              localStorage.removeItem('refresh_token')
            }
          })
        } catch (error) {
          console.error('Error initializing auth plugin:', error)
        }
      })
    }
  }
})
