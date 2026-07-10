export interface DatePickerConfig {
  /**
   * The currently selected date
   */
  value?: Date;

  /**
   * Whether the datepicker is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Placeholder text when no date is selected
   * @default 'Select date'
   */
  placeholder?: string;

  /**
   * Minimum selectable date
   */
  minDate?: Date;

  /**
   * Maximum selectable date
   */
  maxDate?: Date;
}
