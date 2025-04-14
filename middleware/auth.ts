export default defineNuxtRouteMiddleware((to) => {
  // Only check auth on client-side and for routes that require auth
  if (process.client && to.meta.requiresAuth) {
    // Get auth token from localStorage directly
    const token = localStorage.getItem('auth_token')
    
    // If no token is found, redirect to home page
    if (!token) {
      return navigateTo('/')
    }
  }
})
