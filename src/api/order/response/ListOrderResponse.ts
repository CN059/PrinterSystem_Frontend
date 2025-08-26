import type { Order } from '@/models/Order';

/**
 * 查询订单列表 - 响应数据
 */
export interface ListOrderResponseData extends Array<Order> {}
