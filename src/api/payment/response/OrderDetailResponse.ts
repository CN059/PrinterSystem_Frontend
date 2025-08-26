/**
 * 查询订单支付详情 - 响应数据
 */
export interface OrderDetailResponseData {
  paymentId: number;
  orderId: number;
  paymentNo: string;
  paymentMethod: string;
  amount: number;
  status: number;
  statusDesc: string;
  transactionId?: string | null;
  payTime?: string | null;
  refundTime?: string | null;
}
