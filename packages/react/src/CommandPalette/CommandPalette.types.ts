import { HTMLAttributes } from 'react';
import { CommandPaletteConfig, CommandPaletteItemConfig } from 'mayvio-ui/commandpalette';

export interface CommandPaletteProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'onSelect'>,
    Omit<CommandPaletteConfig, 'isOpen'> {
  /**
   * Whether the command palette is currently open
   */
  isOpen: boolean;

  /**
   * Callback when the command palette requests to close
   */
  onClose: () => void;

  /**
   * The list of commands to display
   */
  commands: CommandPaletteItemConfig[];

  /**
   * Callback when a command is selected
   */
  onSelect?: (command: CommandPaletteItemConfig) => void;
}
