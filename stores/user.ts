import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null,
    user: null
  }),
  actions: {
    setToken(token: any) {
      this.token = token
    },
    setUser(user: any) {
      this.user = user
    }
  }
})
