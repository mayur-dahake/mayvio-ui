export interface NotificationItemConfig {
  id: string;
  title: string;
  description?: string;
  time?: string;
  /**
   * Status type for icon styling
   * @default 'info'
   */
  status?: 'info' | 'success' | 'warning' | 'error';
  unread?: boolean;
}
