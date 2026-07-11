import { InputHTMLAttributes } from 'react';
import { SwitchConfig } from 'mayvio-ui/switch';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>, SwitchConfig {
  /**
   * Label text for the switch
   */
  label?: React.ReactNode;
}
