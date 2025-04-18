import { useUserStore } from '@/stores/user'

export default defineNuxtRouteMiddleware(async (to) => {
  // Only check auth on client-side and for routes that require auth
  if (process.client && to.meta.requiresAuth) {
    // Get auth token from localStorage directly
    const token = localStorage.getItem('auth_token')
    
    // If no token is found, redirect to home page
    if (!token) {
      return navigateTo('/')
    }
    
    // Skip profile check for the complete-profile page itself
    if (to.path === '/user/complete-profile') {
      return
    }
    
    // Check if user profile is complete
    try {
      // Get username from store
      const userStore = useUserStore()
      const username = userStore.user?.username
      
      if (username) {
        const { data } = await useApi(`/user/user-profile/`)
        
        // If profile is incomplete, redirect to profile completion page
        if (data.value && (!data.value.first_name || !data.value.last_name || !data.value.phone_number)) {
          return navigateTo('/user/complete-profile')
        }
      }
    } catch (error) {
      console.error('Error checking profile completeness:', error)
    }
  }
})
