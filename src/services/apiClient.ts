// src/services/apiClient.ts

import axios from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'
import type { ApiResponse } from '@/types/api' //导入统一响应类型

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => {
    // 使用泛型接口进行类型提示
    const apiRes = response.data as ApiResponse
    if (apiRes.ifSuccess) {
      return response
    }
    return Promise.reject(new Error(apiRes.response || '请求失败'))
  },
  (error) => {
    const status = error.response?.status
    const message = error.response?.data?.response || error.message

    switch (status) {
      case 401:
        localStorage.removeItem('auth_token')
        window.location.href = '/login'
        break
      case 404:
        console.warn('接口不存在:', error.config?.url)
        break
      default:
        console.error('[API Error]', message)
    }

    return Promise.reject(error)
  },
)

export default apiClient
