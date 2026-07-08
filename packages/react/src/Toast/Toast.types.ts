export interface ToastItem {
  id: string;
  title?: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export interface ToastContainerProps {
  placement?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}
