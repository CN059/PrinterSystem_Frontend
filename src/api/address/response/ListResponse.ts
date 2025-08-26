/**
 * 获取个人所有收货地址 - 响应数据
 * 对应接口：GET /api/address/list
 */
export type ListAddressResponseData = {
  id: number;
  contactName: string;
  phone: string;
  address: string;
  isDefault: 0 | 1;
  createdAt: string; // ISO8601
}[];
