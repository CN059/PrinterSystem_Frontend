import type { Document } from '@/models/Document';
import type { Printer } from '@/models/Printer';
import type { DeliveryAddress } from '@/models/DeliveryAddress';
import type { Order } from '@/models/Order';

/**
 * 查询订单详情 - 响应数据
 */
export interface DetailOrderResponseData extends Order {
  document: Document;
  printer: Printer;
  deliveryAddress: DeliveryAddress;
}
