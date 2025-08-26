/**
 * 打印机模型
 */
export interface Printer {
  printerId: number;
  name: string;
  model: string | null;
  location: string | null;
  description: string | null;
  printType: string | null;
  maxSize: string | null;
}
