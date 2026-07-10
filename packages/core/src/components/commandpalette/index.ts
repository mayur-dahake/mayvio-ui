export interface CommandPaletteConfig {
  /**
   * Whether the command palette is open
   * @default false
   */
  isOpen: boolean;

  /**
   * Placeholder for the search input
   * @default 'Search commands...'
   */
  placeholder?: string;

  /**
   * Text to show when no results are found
   * @default 'No results found.'
   */
  emptyText?: string;
}

export interface CommandPaletteItemConfig {
  /**
   * Unique identifier for the command
   */
  id: string;

  /**
   * Display label for the command
   */
  label: string;

  /**
   * Optional group name for categorization
   */
  group?: string;

  /**
   * Keyboard shortcut hint (e.g. ['⌘', 'K'])
   */
  shortcut?: string[];
}
