export interface SliderConfig {
  /**
   * The current value of the slider
   */
  value?: number;
  /**
   * The minimum value
   * @default 0
   */
  min?: number;
  /**
   * The maximum value
   * @default 100
   */
  max?: number;
  /**
   * The step amount
   * @default 1
   */
  step?: number;
  /**
   * Whether the slider is disabled
   * @default false
   */
  disabled?: boolean;
}
