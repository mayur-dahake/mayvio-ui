import { HTMLAttributes, ReactNode } from 'react';

export interface MultiSelectConfig {
  disabled?: boolean;
  searchable?: boolean;
  placeholder?: string;
  emptyText?: string;
}

export interface MultiSelectOptionConfig {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface MultiSelectProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'>, MultiSelectConfig {
  /**
   * The list of options to display in the dropdown menu
   */
  options: MultiSelectOptionConfig[];

  /**
   * The currently selected values
   */
  value?: (string | number)[];

  /**
   * Default selected values for uncontrolled mode
   */
  defaultValue?: (string | number)[];

  /**
   * Callback when the selection changes
   */
  onChange?: (value: (string | number)[]) => void;

  /**
   * Custom render function for selected tags
   */
  renderTag?: (option: MultiSelectOptionConfig, onRemove: () => void) => ReactNode;
}
