// src/api/client.ts
import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { ApiResponse } from '@/types/common';
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
api.interceptors.response.use(
  (response) => {
    const data: ApiResponse = response.data;

    // 检查响应格式是否符合统一结构
    if (typeof data.ifSuccess === 'undefined') {
      console.error('⚠️ API 响应格式不符合规范，缺少 ifSuccess 字段');
      // ❌ 严重警告：放弃响应处理
      return Promise.reject(new Error('API 响应格式错误'));
    }

    // 业务逻辑错误（如登录失败、订单不存在）
    if (!data.ifSuccess) {
      console.error('❌ 业务错误：', data.response);
      // 可以统一提示
      // ElMessage.error(data.response);
      return Promise.reject(new Error(data.response || '请求失败'));
    }

    // 成功直接返回 data 字段（payload）
    return Promise.resolve(data.data);
  },
  (error) => {
    const response = error.response;
    const request = error.request;

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
