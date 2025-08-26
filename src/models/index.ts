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

// Document 模型
export interface Document {
  id: bigint;
  userId: bigint;
  originalName: string;
  filePath: string;
  fileSize?: number;
  fileType?: string;
  pages: number;
  status: number;
  uploadTime: string;
  isDeleted: number;
}

// Order 模型
export interface Order {
  id: bigint;
  orderNo: string;
  userId: bigint;
  documentId?: bigint;
  printerId?: bigint;
  title: string;
  pages: number;
  copies: number;
  printType?: string;
  paperSize?: string;
  singleSided: number; // 1: 单面, 0: 双面
  bindingType?: string;
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  status: number; // 0: 未付款, 1: 已付款...
  remark?: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: number;
}

// DeliveryAddress 模型
export interface DeliveryAddress {
  id: bigint;
  userId: bigint;
  contactName: string;
  phone: string;
  address: string;
  isDefault: number;
  createdAt: string;
  updatedAt: string;
  isDeleted: number;
}

// DiscountRule 模型
export interface DiscountRule {
  id: bigint;
  name: string;
  description?: string;
  ruleType: 'percent' | 'fixed';
  discountValue: number;
  minAmount: number;
  maxDiscountAmount?: number;
  startTime?: string;
  endTime?: string;
  status: number;
  usageLimit: number;
  createdAt: string;
  updatedAt: string;
  isDeleted: number;
}

// UserDiscount 模型（用户与优惠规则关联）
export interface UserDiscount {
  id: bigint;
  userId: bigint;
  ruleId: bigint;
  usedCount: number;
  usedAmount: number;
  status: number;
  created_at: string;
  expiredAt?: string;
  isDeleted: number;
}
