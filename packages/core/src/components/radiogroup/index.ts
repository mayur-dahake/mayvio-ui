export interface RadioGroupConfig {
  /**
   * Layout orientation of the radio buttons
   * @default "vertical"
   */
  orientation?: 'vertical' | 'horizontal';
  /**
   * The name attribute for the native input radios
   */
  name?: string;
  /**
   * The currently selected value
   */
  value?: string;
  /**
   * Whether the radio group has an error state
   * @default false
   */
  error?: boolean;
  /**
   * Whether the entire radio group is disabled
   * @default false
   */
  disabled?: boolean;
}

export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}
