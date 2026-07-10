import { useState, useRef, useEffect } from 'react';
import { NotificationCenterProps } from './NotificationCenter.types.js';
import 'mayvio-ui/notificationcenter/css';

export function NotificationCenter({
  title = 'Notifications',
  notifications = [],
  markAllText = 'Mark all as read',
  emptyText = 'No notifications',
  onMarkAllAsRead,
  className = '',
  ...props
}: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const handleOutsideClick = (e: globalThis.MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  const handleToggle = () => setIsOpen(!isOpen);

  const renderIcon = (status?: string) => {
    switch (status) {
      case 'success':
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        );
      case 'warning':
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        );
      case 'error':
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        );
      default:
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        );
    }
  };

  return (
    <div
      className={`mv-notification ${isOpen ? 'mv-notification--open' : ''} ${className}`}
      ref={containerRef}
      style={{ position: 'relative', display: 'inline-block' }}
      {...props}
    >
      <button
        type="button"
        className="mv-notification-trigger"
        onClick={handleToggle}
        aria-label="Notifications"
        aria-expanded={isOpen}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        {unreadCount > 0 && <span className="mv-notification-badge">{unreadCount}</span>}
      </button>

      {isOpen && (
        <div className="mv-notification-popup" role="dialog" aria-label={title}>
          <div className="mv-notification-header">
            <h3 className="mv-notification-title">{title}</h3>
            {unreadCount > 0 && onMarkAllAsRead && (
              <button type="button" className="mv-notification-mark-all" onClick={onMarkAllAsRead}>
                {markAllText}
              </button>
            )}
          </div>
          <div className="mv-notification-list">
            {notifications.length === 0 ? (
              <div className="mv-notification-empty">{emptyText}</div>
            ) : (
              notifications.map((n, i) => (
                <div
                  key={n.id || i}
                  className={`mv-notification-item ${n.unread ? 'mv-notification-item--unread' : ''}`}
                >
                  <div
                    className={`mv-notification-item-icon mv-notification-item-icon--${n.status || 'info'}`}
                  >
                    {renderIcon(n.status)}
                  </div>
                  <div className="mv-notification-item-content">
                    <div className="mv-notification-item-title">{n.title}</div>
                    {n.description && (
                      <div className="mv-notification-item-desc">{n.description}</div>
                    )}
                    {n.time && <div className="mv-notification-item-time">{n.time}</div>}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
