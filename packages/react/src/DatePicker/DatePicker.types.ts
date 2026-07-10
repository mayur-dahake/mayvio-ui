import { HTMLAttributes } from 'react';
import { DatePickerConfig } from 'mayvio-ui/datepicker';

export interface DatePickerProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'>,
    Omit<DatePickerConfig, 'value'> {
  /**
   * The currently selected date
   */
  value?: Date;

  /**
   * Default selected date for uncontrolled mode
   */
  defaultValue?: Date;

  /**
   * Callback when the date changes
   */
  onChange?: (date: Date | undefined) => void;
}
