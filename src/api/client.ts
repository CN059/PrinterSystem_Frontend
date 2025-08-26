// src/api/client.ts
import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { ApiResponse } from '@/api/types';
import { getToken, removeToken } from '@/utils/storage';
import { useRouter } from 'vue-router';

// 创建 axios 实例
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api', // 建议在 .env 中配置
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 路由实例（不能直接在模块顶层用 useRouter，需延迟初始化）
let routerInstance: ReturnType<typeof useRouter> | null = null;

export const setRouterForAxios = (router: ReturnType<typeof useRouter>) => {
  routerInstance = router;
};

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.data instanceof FormData) {
      // 删除 Content-Type，浏览器会自动设置为 multipart/form-data + boundary
      delete config.headers['Content-Type'];
      // 或者：config.headers['Content-Type'] = undefined;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
// 响应拦截器：保持返回 response，但挂载解包后的数据
api.interceptors.response.use(
  (response) => {
    const apiData: ApiResponse = response.data;

    if (typeof apiData.ifSuccess === 'undefined') {
      return Promise.reject(new Error('API 响应格式错误'));
    }

    if (!apiData.ifSuccess) {
      return Promise.reject(new Error(apiData.response || '请求失败'));
    }

    // ✅ 关键：返回原始 response 对象，但把业务数据放到 response.data 上
    response.data = apiData.data;
    return response.data; // 类型正确：AxiosResponse
  },
  (error) => {
    // 错误处理（401跳转等）
    const { response, request } = error;

    if (response) {
      if (response.status === 401) {
        removeToken();
        if (routerInstance) {
          routerInstance.push('/auth/login');
        }
      } else if (response.status === 500) {
        console.error('服务器内部错误');
      }
    } else if (!request) {
      console.error('网络错误或请求未发送');
    }

    return Promise.reject(error);
  }
);


export default api;
