import { SelectHTMLAttributes } from 'react';
import { SelectConfig } from 'mayvio-ui/select';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>, SelectConfig {
  /**
   * The options to render inside the select
   */
  options: SelectOption[];
}
