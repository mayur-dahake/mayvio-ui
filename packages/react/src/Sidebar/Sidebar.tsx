import { MouseEvent } from 'react';
import { SidebarProps } from './Sidebar.types.js';
import { SidebarLinkConfig } from 'mayvio-ui/sidebar';
import 'mayvio-ui/sidebar/css';

export function Sidebar({
  title = 'Mayvio UI',
  links = [],
  collapsed = false,
  mobileOpen = false,
  onLinkClick,
  onToggleCollapse,
  onMobileClose,
  className = '',
  ...props
}: SidebarProps) {
  const handleToggle = () => {
    onToggleCollapse?.(!collapsed);
  };

  const handleLinkClick = (e: MouseEvent, link: SidebarLinkConfig) => {
    if (!link.href) e.preventDefault();
    onLinkClick?.(link);
    // On mobile, clicking a link usually closes the sidebar
    if (mobileOpen) {
      onMobileClose?.();
    }
  };

  return (
    <>
      <div
        className={`mv-sidebar-overlay ${mobileOpen ? 'mv-sidebar-overlay--mobile-open' : ''}`}
        onClick={onMobileClose}
        aria-hidden="true"
      />

      <aside
        className={`mv-sidebar ${collapsed ? 'mv-sidebar--collapsed' : ''} ${mobileOpen ? 'mv-sidebar--mobile-open' : ''} ${className}`}
        {...props}
      >
        <div className="mv-sidebar-header">
          <div className="mv-sidebar-logo">{title}</div>
          <button
            type="button"
            className="mv-sidebar-toggle"
            onClick={handleToggle}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="3" x2="9" y2="21"></line>
            </svg>
          </button>
        </div>

        <div className="mv-sidebar-content">
          <ul className="mv-sidebar-nav">
            {links.map((link, i) => (
              <li key={i} className="mv-sidebar-item">
                <a
                  href={link.href || '#'}
                  className={`mv-sidebar-link ${link.active ? 'mv-sidebar-link--active' : ''}`}
                  onClick={(e) => handleLinkClick(e, link)}
                >
                  <div className="mv-sidebar-icon">
                    {/* Default placeholder icon */}
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="3"></circle>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                  </div>
                  <span className="mv-sidebar-label">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
