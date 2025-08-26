/**
 * 新增收货地址 - 请求体
 */
export interface CreateAddressRequest {
  contactName: string;
  phone: string;
  address: string;
  isDefault?: 0 | 1; // 可选字段
}
