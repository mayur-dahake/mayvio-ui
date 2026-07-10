import { HTMLAttributes } from 'react';
import { SidebarConfig, SidebarLinkConfig } from 'mayvio-ui/sidebar';

export interface SidebarProps extends HTMLAttributes<HTMLDivElement>, SidebarConfig {
  /**
   * Title or logo text
   */
  title?: string;

  /**
   * Links to display
   */
  links?: SidebarLinkConfig[];

  /**
   * Callback when a link is clicked
   */
  onLinkClick?: (link: SidebarLinkConfig) => void;

  /**
   * Callback when toggle button is clicked (to collapse/expand)
   */
  onToggleCollapse?: (collapsed: boolean) => void;

  /**
   * Callback when mobile overlay is clicked
   */
  onMobileClose?: () => void;
}
