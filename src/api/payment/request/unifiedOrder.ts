/**
 * 统一下单支付接口 - 请求体
 */
export interface UnifiedOrderRequest {
  orderId: number;
  paymentMethod: 'alipay' | 'wxpay'; // 注意文档枚举是 alipay / wxpay
  returnUrl: string;
  deviceType: 'pc' | 'mobile' | 'qq' | 'wechat' | 'alipay' | 'jump';
  productName: string;
}
