/**
 * 用户主动查询订单支付状态 - 请求体
 */
export interface CheckPaymentStatusRequest {
  orderId: number;
}
