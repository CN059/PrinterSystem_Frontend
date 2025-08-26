// 统一响应格式
export interface ApiResponse<T = any> {
  status: number;
  response: string;
  ifSuccess: boolean;
  data: T;
}
