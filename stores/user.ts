import { defineStore } from 'pinia'

interface User {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  city?: string;
  city_id?: number;
  avatar?: string;
}

interface TokenResponse {
  access?: string;
}

// Make sure to export the store definition
export const useUserStore = defineStore('user', {
  state: () => ({
    token: null as string | null,
    refreshToken: null as string | null,
    user: null as User | null
  }),
  actions: {
    setToken(token: string | null) {
      this.token = token
    },
    setRefreshToken(token: string | null) {
      this.refreshToken = token
    },
    setUser(user: User | null) {
      this.user = user
    },
    logout() {
      this.token = null;
      this.refreshToken = null;
      this.user = null;
    },
    async refreshAccessToken() {
      if (!this.refreshToken) return false;
      
      try {
        // Use $fetch instead of useFetch to avoid Pinia initialization issues
        const config = useRuntimeConfig();
        const response = await $fetch<TokenResponse>('/user/refresh/', {
          baseURL: config.public.apiBase,
          method: 'POST',
          body: { refresh: this.refreshToken }
        });
        
        if (response && response.access) {
          this.token = response.access;
          return true;
        }
        
        return false;
      } catch (err) {
        console.error('Error refreshing token:', err);
        this.logout();
        return false;
      }
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token
  },
  // Enable persistence when we add the required package
  // persist: true
})
