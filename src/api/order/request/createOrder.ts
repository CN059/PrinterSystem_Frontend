/**
 * 创建订单 - 请求体
 */
export interface CreateOrderRequest {
  documentId: number;
  printerId?: number; // 可选
  title: string;
  pages: number;
  copies: number;
  printType: string;
  paperSize: string;
  singleSided: number; // 1: 单面, 0: 双面
  bindingType?: string;
  remark?: string;
  deliveryAddressId: number;
}
