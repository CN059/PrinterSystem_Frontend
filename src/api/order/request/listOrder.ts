/**
 * 查询订单列表 - 请求体
 */
export interface ListOrderRequest {
  page: number;
  size: number;
  status?: number; // 可选筛选状态
}
