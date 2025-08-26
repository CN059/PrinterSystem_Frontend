// src/api/types.ts

/**
 * 统一响应格式
 */
export interface ApiResponse<T = unknown> {
  status: number;
  response: string;
  ifSuccess: boolean;
  data: T;
}

/**
 * 分页响应格式
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page?: number;
  size?: number;
}
