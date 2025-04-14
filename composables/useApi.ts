export const useApi = <T = any>(path: string, opts: any = {}) => {
  const config = useRuntimeConfig()
  
  // Prepare headers
  if (!opts.headers) {
    opts.headers = {

    }
  }
  
  // Add authorization header if token exists in localStorage
  if (process.client) {
    const token = localStorage.getItem('auth_token')
    if (token && !opts.headers['Authorization']) {
      opts.headers['Authorization'] = `Bearer ${token}`
    }
    
    // Handle token expiration
    opts.onResponseError = async (context: any) => {
      // If we get a 401 Unauthorized error and we have a refresh token
      if (context.response.status === 401) {
        const refreshToken = localStorage.getItem('refresh_token')
        
        if (refreshToken) {
          try {
            // Try to refresh the token
            const response = await $fetch<{ access?: string }>('/user/refresh/', {
              baseURL: config.public.apiBase,
              method: 'POST',
              body: { refresh: refreshToken }
            })
            
            if (response && response.access) {
              // If token refresh was successful, update localStorage
              localStorage.setItem('auth_token', response.access)
              
              // Update the Authorization header with the new token
              context.options.headers['Authorization'] = `Bearer ${response.access}`
              
              // Retry the request
              return $fetch(`${config.public.apiBase}${path}`, context.options)
            }
          } catch (err) {
            console.error('Error refreshing token:', err)
            // If token refresh failed, clear tokens and redirect to login
            localStorage.removeItem('auth_token')
            localStorage.removeItem('refresh_token')
            navigateTo('/')
          }
        }
      }
    }
  }
  
  return useFetch<T>(`${config.public.apiBase}${path}`, opts)
}
