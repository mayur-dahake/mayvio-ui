import { InputHTMLAttributes } from 'react';
import { RadioGroupConfig, RadioOption } from 'mayvio-ui/radiogroup';

export interface RadioGroupProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'value'>, RadioGroupConfig {
  /**
   * The options for the radio group
   */
  options: RadioOption[];
  /**
   * Callback when a radio option is selected
   */
  onChange?: (value: string) => void;
}
