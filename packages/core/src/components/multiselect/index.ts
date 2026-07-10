export interface MultiSelectConfig {
  /**
   * Whether the multiselect is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether to show a search input in the menu
   * @default false
   */
  searchable?: boolean;

  /**
   * Text to show when no options are selected
   * @default 'Select options...'
   */
  placeholder?: string;

  /**
   * Text to show when search returns no results
   * @default 'No options found.'
   */
  emptyText?: string;
}

export interface MultiSelectOptionConfig {
  /**
   * Unique identifier for the option
   */
  value: string | number;

  /**
   * Display label for the option
   */
  label: string;

  /**
   * Whether the option is disabled
   * @default false
   */
  disabled?: boolean;
}
