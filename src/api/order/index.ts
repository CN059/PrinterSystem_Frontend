// src/api/order/index.ts

import api from '../client';

// 请求类型
import type { CreateOrderRequest } from './request/createOrder';
import type { ListOrderRequest } from './request/listOrder';
import type { DetailOrderRequest } from './request/detailOrder';
import type { CancelOrderRequest } from './request/cancelOrder';

// 响应类型
import type { CreateOrderResponseData } from './response/CreateOrderResponse';
import type { ListOrderResponseData } from './response/ListOrderResponse';
import type { DetailOrderResponseData } from './response/DetailOrderResponse';
import type { CancelOrderResponseData } from './response/CancelOrderResponse';

/**
 * 订单相关 API
 */
export class OrderApi {
  /**
   * 创建订单
   */
  static create(data: CreateOrderRequest) {
    return api.post<CreateOrderResponseData>('/order/create', data);
  }

  /**
   * 查询订单列表（分页）
   */
  static list(data: ListOrderRequest) {
    return api.post<ListOrderResponseData>('/order/list', data);
  }

  /**
   * 查询订单详情
   */
  static detail(data: DetailOrderRequest) {
    return api.post<DetailOrderResponseData>('/order/detail', data);
  }

  /**
   * 取消订单
   */
  static cancel(data: CancelOrderRequest) {
    return api.post<CancelOrderResponseData>('/order/cancel', data);
  }
}

// 便捷导出
export const { create, list, detail, cancel } = OrderApi;
