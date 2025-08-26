/**
 * 订单模型
 */
export interface Order {
  orderId: number;
  orderNo: string;
  title: string;
  pages: number;
  copies: number;
  printType: string;
  paperSize: string;
  singleSided: number; // 1: 单面, 0: 双面
  bindingType: string | null;
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  status: number; // 0未付款 1已付款 2打印中 3待取货 4已完成 5已取消
  remark: string | null;
  createdAt: string; // ISO8601 时间字符串
}
