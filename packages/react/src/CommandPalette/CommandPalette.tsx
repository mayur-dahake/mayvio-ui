import { useState, useEffect, KeyboardEvent, useMemo } from 'react';
import { CommandPaletteProps } from './CommandPalette.types.js';
import { CommandPaletteItemConfig } from 'mayvio-ui/commandpalette';
import 'mayvio-ui/commandpalette/css';

export function CommandPalette({
  isOpen,
  onClose,
  commands,
  onSelect,
  placeholder = 'Search commands...',
  emptyText = 'No results found.',
  className = '',
  ...props
}: CommandPaletteProps) {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Filter commands based on search
  const filteredCommands = useMemo(() => {
    if (!search) return commands;
    const q = search.toLowerCase();
    return commands.filter((cmd) => cmd.label.toLowerCase().includes(q));
  }, [search, commands]);

  // Group commands
  const groupedCommands = useMemo(() => {
    const groups: Record<string, CommandPaletteItemConfig[]> = { '': [] };
    filteredCommands.forEach((cmd) => {
      const g = cmd.group || '';
      if (!groups[g]) groups[g] = [];
      groups[g].push(cmd);
    });
    return groups;
  }, [filteredCommands]);

  // Flattened array for keyboard navigation (to map index -> command)
  const flattenedList = useMemo(() => {
    const list: CommandPaletteItemConfig[] = [];
    Object.keys(groupedCommands)
      .sort()
      .forEach((g) => {
        list.push(...groupedCommands[g]);
      });
    return list;
  }, [groupedCommands]);

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearch('');
      setSelectedIndex(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle global Cmd+K to open (optional behavior but standard for command palettes)
  useEffect(() => {
    const handleGlobalKeyDown = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Typically the parent controls isOpen, so this might not open it directly
        // But we add it here just as a pattern. It's up to the app to open it.
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen, onClose]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (flattenedList.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < flattenedList.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : flattenedList.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSelect(flattenedList[selectedIndex]);
    }
  };

  const handleSelect = (command: CommandPaletteItemConfig) => {
    onSelect?.(command);
    onClose();
  };

  if (!isOpen) return null;

  let currentIndex = 0;

  return (
    <div className={`mv-commandpalette-overlay mv-commandpalette-overlay--open`} onClick={onClose}>
      <div
        className={`mv-commandpalette ${className}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Command Palette"
        {...props}
      >
        <div className="mv-commandpalette-search-wrapper">
          <svg
            className="mv-commandpalette-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            className="mv-commandpalette-input"
            placeholder={placeholder}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          {search && (
            <button
              className="mv-commandpalette-icon"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              onClick={() => setSearch('')}
              aria-label="Clear search"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>

        <div className="mv-commandpalette-list" role="listbox">
          {flattenedList.length === 0 ? (
            <div className="mv-commandpalette-empty">{emptyText}</div>
          ) : (
            Object.keys(groupedCommands)
              .sort()
              .map((group) => {
                if (groupedCommands[group].length === 0) return null;
                return (
                  <div key={`group-${group}`}>
                    {group && <div className="mv-commandpalette-group">{group}</div>}
                    {groupedCommands[group].map((cmd) => {
                      const isSelected = currentIndex === selectedIndex;
                      const index = currentIndex++; // increment after assignment
                      return (
                        <div
                          key={cmd.id}
                          className="mv-commandpalette-item"
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => handleSelect(cmd)}
                          onMouseEnter={() => setSelectedIndex(index)}
                        >
                          <div className="mv-commandpalette-item-icon">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                          </div>
                          <div style={{ flexGrow: 1 }}>{cmd.label}</div>
                          {cmd.shortcut && (
                            <div style={{ display: 'flex', gap: '4px' }}>
                              {cmd.shortcut.map((key) => (
                                <kbd
                                  key={key}
                                  style={{
                                    fontSize: '0.75rem',
                                    padding: '2px 4px',
                                    background: 'var(--mv-color-bg-subtle)',
                                    borderRadius: 'var(--mv-radius-sm)',
                                  }}
                                >
                                  {key}
                                </kbd>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })
          )}
        </div>
      </div>
    </div>
  );
}
