import { HTMLAttributes } from 'react';
import { SliderConfig } from 'mayvio-ui/slider';

export interface SliderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>, SliderConfig {
  /**
   * Callback when the slider value changes
   */
  onChange?: (value: number) => void;
}
