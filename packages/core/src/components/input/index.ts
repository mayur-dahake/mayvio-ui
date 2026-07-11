export interface InputConfig {
  /**
   * Whether the input is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Whether the input is in an error state
   * @default false
   */
  error?: boolean;
  
  /**
   * Size of the input
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';
}
