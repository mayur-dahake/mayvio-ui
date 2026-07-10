export interface SidebarConfig {
  /**
   * Whether the sidebar is collapsed
   * @default false
   */
  collapsed?: boolean;

  /**
   * Used for mobile responsiveness
   * @default false
   */
  mobileOpen?: boolean;
}

export interface SidebarLinkConfig {
  /**
   * The URL or route
   */
  href?: string;

  /**
   * The text label
   */
  label: string;

  /**
   * Whether this link is currently active
   * @default false
   */
  active?: boolean;
}
