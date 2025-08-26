/**
 * 修改收货地址 - 请求体
 */
export interface UpdateAddressRequest {
  id: number; // 地址 ID
  contactName?: string;
  phone?: string;
  address?: string;
  isDefault?: 0 | 1;
}
