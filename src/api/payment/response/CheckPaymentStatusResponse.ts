/**
 * 用户主动查询支付状态 - 响应数据
 */
import type { OrderDetailResponseData } from '@/api/payment/response/OrderDetailResponse';
export interface CheckPaymentStatusResponseData extends OrderDetailResponseData {
  orderStatus: number;
  orderStatusDesc: string;
}
