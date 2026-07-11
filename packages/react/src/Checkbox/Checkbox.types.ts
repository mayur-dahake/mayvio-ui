import { InputHTMLAttributes } from 'react';
import { CheckboxConfig } from 'mayvio-ui/checkbox';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>, CheckboxConfig {
  /**
   * Label text for the checkbox
   */
  label?: React.ReactNode;
}
