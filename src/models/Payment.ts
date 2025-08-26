/**
 * 支付记录模型（对应数据库 payments 表）
 */
export interface Payment {
  id: number;
  orderId: number;
  paymentNo: string;
  tradeNo: string;
  paymentMethod: 'alipay' | 'wechat';
  amount: number;
  status: 0 | 1 | 2 | 3; // 0待支付 1已支付 2支付失败 3已退款
  statusDesc?: string;
  transactionId: string | null;
  payTime: string | null; // ISO8601
  refundTime: string | null; // ISO8601
  createdAt: string; // ISO8601
  updatedAt: string; // ISO8601
  isDeleted: 0 | 1;
}
