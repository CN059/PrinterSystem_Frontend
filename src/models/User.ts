// User 模型
export interface User {
  id: bigint;
  username: string;
  email: string;
  phone?: string;
  nickname?: string;
  avatar: string;
  userLevel: number;
  experience: number;
  status: number; // 1: 正常, 0: 禁用
  createdAt: string; // ISO 时间字符串
  updatedAt: string;
  isDeleted: number;
}
