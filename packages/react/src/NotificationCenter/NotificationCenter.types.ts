import { HTMLAttributes } from 'react';
import { NotificationItemConfig } from 'mayvio-ui/notificationcenter';

export interface NotificationCenterProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Title of the notification center
   * @default 'Notifications'
   */
  title?: string;

  /**
   * List of notifications
   */
  notifications?: NotificationItemConfig[];

  /**
   * Text for mark all as read button
   * @default 'Mark all as read'
   */
  markAllText?: string;

  /**
   * Callback when "Mark all as read" is clicked
   */
  onMarkAllAsRead?: () => void;

  /**
   * Text to show when empty
   * @default 'No notifications'
   */
  emptyText?: string;
}
