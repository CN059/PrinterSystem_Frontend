import { defineStore } from 'pinia'

interface User {
  id: number
  username: string
  email: string
  nickname: string
  avatar: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('auth_token') || '',
    userInfo: null as User | null,
    isLoggedIn: !!localStorage.getItem('auth_token'),
  }),

  actions: {
    setToken(token: string) {
      this.token = token
      this.isLoggedIn = true
      localStorage.setItem('auth_token', token)
    },

    setUserInfo(user: User) {
      this.userInfo = user
    },

    logout() {
      this.token = ''
      this.userInfo = null
      this.isLoggedIn = false
      localStorage.removeItem('auth_token')
    },

    // 初始化，从 localStorage 恢复状态（用于刷新页面）
    async init() {
      if (this.token && !this.userInfo) {
        // 可选：调用 /api/user/info 恢复用户信息
        // await fetchUserInfo()
      }
      this.isLoggedIn = !!this.token
    },
  },
})
