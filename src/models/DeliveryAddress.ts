/**
 * 收货地址模型（对应数据库 delivery_addresses 表）
 */
export interface DeliveryAddress {
  id: number;
  userId: number;
  contactName: string;
  phone: string;
  address: string;
  isDefault: 0 | 1; // 0: 否, 1: 是
  createdAt: string; // ISO8601
  updatedAt: string; // ISO8601
  isDeleted: 0 | 1;
}
