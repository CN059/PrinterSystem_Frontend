/**
 * 统一下单支付接口 - 响应数据
 */
export interface UnifiedOrderResponseData {
  paymentId: number;
  payUrl: string;
  qrcodeUrl?: string; // 可选
  amount: number;
}
