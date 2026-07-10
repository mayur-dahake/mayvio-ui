export interface DropdownConfig {
  /**
   * The alignment of the dropdown menu relative to the trigger
   * @default 'left'
   */
  align?: 'left' | 'center' | 'right';

  /**
   * Whether the dropdown menu is open
   * @default false
   */
  isOpen?: boolean;

  /**
   * Optional manual control over open state
   */
  defaultIsOpen?: boolean;
}
