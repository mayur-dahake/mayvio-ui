import { HTMLAttributes, ReactNode } from 'react';

export interface AccordionItem {
  id: string;
  title: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Array of accordion items { id, title, content, disabled? }
   */
  items: AccordionItem[];

  /**
   * Whether multiple items can be expanded at once.
   * @default false
   */
  allowMultiple?: boolean;

  /**
   * The ids of the initially expanded items (uncontrolled).
   */
  defaultExpandedIds?: string[];

  /**
   * The ids of the currently expanded items (controlled).
   */
  expandedIds?: string[];

  /**
   * Callback fired when expanded items change.
   */
  onChange?: (expandedIds: string[]) => void;
}
