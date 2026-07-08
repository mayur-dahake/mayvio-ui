import { HTMLAttributes, ReactNode } from 'react';

export interface TabItem {
  id: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Array of tab items { id, label, content, disabled? }
   */
  items: TabItem[];

  /**
   * The id of the initially active tab (uncontrolled mode).
   */
  defaultActiveId?: string;

  /**
   * The id of the currently active tab (controlled mode).
   */
  activeId?: string;

  /**
   * Callback fired when the active tab changes.
   */
  onChange?: (id: string) => void;
}
