export interface ModalConfig {
  /**
   * The size of the modal
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg' | 'full';

  /**
   * Whether the modal is open
   * @default false
   */
  isOpen?: boolean;

  /**
   * Whether the modal can be closed by clicking outside
   * @default true
   */
  closeOnOutsideClick?: boolean;

  /**
   * Whether the modal can be closed by pressing the Escape key
   * @default true
   */
  closeOnEscape?: boolean;
}
