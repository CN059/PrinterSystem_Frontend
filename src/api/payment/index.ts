// src/api/payment/index.ts

import api from '../client';

// 请求
import type { UnifiedOrderRequest } from './request/unifiedOrder';
import type { OrderDetailRequest } from './request/orderDetail';
import type { CheckPaymentStatusRequest } from './request/checkPaymentStatus';

// 响应
import type { UnifiedOrderResponseData } from './response/UnifiedOrderResponse';
import type { OrderDetailResponseData } from './response/OrderDetailResponse';
import type { CheckPaymentStatusResponseData } from './response/CheckPaymentStatusResponse';

/**
 * 支付相关 API
 */
export class PaymentApi {
  /**
   * 统一下单支付接口
   */
  static unifiedOrder(data: UnifiedOrderRequest) {
    return api.post<UnifiedOrderResponseData>('/payment/unified-order', data);
  }

  /**
   * 查询订单支付详情
   */
  static getOrderDetail(data: OrderDetailRequest) {
    return api.post<OrderDetailResponseData>('/payment/order-detail', data);
  }

  /**
   * 用户主动查询订单支付状态
   */
  static checkPaymentStatus(data: CheckPaymentStatusRequest) {
    return api.post<CheckPaymentStatusResponseData>('/payment/check-payment-status', data);
  }
}

// 便捷导出
export const { unifiedOrder, getOrderDetail, checkPaymentStatus } = PaymentApi;
