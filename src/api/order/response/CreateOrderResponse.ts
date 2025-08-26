/**
 * 创建订单 - 响应数据
 */
export interface CreateOrderResponseData {
  orderId: number;
  orderNo: string;
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
}
