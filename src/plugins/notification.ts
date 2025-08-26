// src/plugins/notification.ts

/**
 * 跨平台通知服务（当前使用浏览器原生 alert/confirm）
 * 未来可替换为 Toast、Notyf 等方案，无需修改业务代码
 */

export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'confirm';

class NotificationService {
  /**
   * 显示信息提示
   */
  info(msg: string): void {
    alert(`📌 提示：${msg}`);
  }

  /**
   * 显示成功消息
   */
  success(msg: string): void {
    alert(`✅ 成功：${msg}`);
  }

  /**
   * 显示警告
   */
  warning(msg: string): void {
    alert(`⚠️ 警告：${msg}`);
  }

  /**
   * 显示错误
   */
  error(msg: string): void {
    alert(`❌ 错误：${msg}`);
  }

  /**
   * 显示确认框
   * @returns Promise<boolean> 用户是否点击了“确定”
   */
  confirm(msg: string): Promise<boolean> {
    return new Promise((resolve) => {
      const confirmed = confirm(`❓ 确认操作？\n\n${msg}`);
      resolve(confirmed);
    });
  }
}

// 单例导出
export const notification = new NotificationService();

// 便捷函数（可选）
export const useNotification = () => notification;
