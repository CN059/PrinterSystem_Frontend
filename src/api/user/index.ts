// src/api/modules/user/index.ts

import api from '@/api/client';

// Requests
import type { UserRegisterRequest } from './request/register';
import type { UserLoginRequest } from './request/login';
import type { UserUpdateRequest } from './request/update';
import type { ChangePasswordRequest } from './request/changePassword';
import type { DeliveryPersonRegisterRequest } from './request/deliveryRegister';
import type { AdminLoginRequest } from './request/adminLogin';

// Responses
import type { UserInfoResponse } from './response/userInfo';
import type { UserLoginResponse } from './response/login';
import type { ListExperienceLogsResponse } from './response/userExperienceLogs';
import type { AdminLoginResponse } from './response/adminLogin';

export const userApi = {
  /**
   * 用户注册
   */
  register(data: UserRegisterRequest): Promise<void> {
    return api.post('/user/register', data);
  },

  /**
   * 用户登录
   */
  login(data: UserLoginRequest): Promise<UserLoginResponse> {
    return api.post('/user/login', data);
  },

  /**
   * 获取当前用户信息
   */
  getInfo(): Promise<UserInfoResponse> {
    return api.get('/user/info');
  },

  /**
   * 修改用户信息
   */
  update(data: UserUpdateRequest): Promise<void> {
    return api.post('/user/update', data);
  },

  /**
   * 修改密码
   */
  changePassword(data: ChangePasswordRequest): Promise<void> {
    return api.post('/user/password', data);
  },

  /**
   * 获取用户经验记录
   */
  getExperienceLogs(): Promise<ListExperienceLogsResponse> {
    return api.get('/user/experience/logs');
  },

  /**
   * 快递员注册（需用户身份 + 权限）
   */
  registerDeliveryPerson(data: DeliveryPersonRegisterRequest): Promise<void> {
    return api.post('/user/delivery/register', data);
  },

  /**
   * 管理员登录
   */
  adminLogin(data: AdminLoginRequest): Promise<AdminLoginResponse> {
    return api.post('/user/admin/login', data);
  },
};
