export function initCommandPalette() {
  const palette = document.querySelector('.command-palette');
  const openButton = document.querySelector('[data-open-palette]');
  const closeButton = palette?.querySelector('.command-palette-close');
  const input = palette?.querySelector('.command-palette-input');
  const items = [...(palette?.querySelectorAll('.command-palette-item') || [])];

  if (!palette || !closeButton || !input || !items.length) return;

  let focusedIndex = -1;

  const getVisibleItems = () => items.filter((item) => !item.classList.contains('hidden'));

  const setOpen = (open) => {
    palette.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      input.value = '';
      filterItems('');
      input.focus();
    } else {
      resetFocus();
    }
  };

  const resetFocus = () => {
    focusedIndex = -1;
    items.forEach((item) => item.classList.remove('focused'));
  };

  const updateFocus = (visibleItems) => {
    items.forEach((item) => item.classList.remove('focused'));
    if (focusedIndex >= 0 && focusedIndex < visibleItems.length) {
      const activeItem = visibleItems[focusedIndex];
      activeItem.classList.add('focused');
      activeItem.scrollIntoView({ block: 'nearest' });
    }
  };

  const executeCommand = (item) => {
    if (!item) return;
    const commandName = item.dataset.command;
    const event = new CustomEvent('command-select', { detail: { command: commandName } });
    palette.dispatchEvent(event);
    
    console.log('Executed command:', commandName);
    setOpen(false);
  };

  const filterItems = (query) => {
    const normalized = query.trim().toLowerCase();
    items.forEach((item) => {
      const label = item.dataset.command?.toLowerCase() || item.textContent.toLowerCase();
      item.classList.toggle('hidden', normalized && !label.includes(normalized));
    });
    resetFocus();
  };

  if (openButton) {
    openButton.addEventListener('click', () => setOpen(true));
  }
  closeButton.addEventListener('click', () => setOpen(false));

  palette.addEventListener('click', (event) => {
    if (event.target === palette) setOpen(false);
  });

  input.addEventListener('input', (event) => filterItems(event.target.value));

  input.addEventListener('keydown', (event) => {
    const visible = getVisibleItems();
    if (!visible.length) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      focusedIndex = (focusedIndex + 1) % visible.length;
      updateFocus(visible);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      focusedIndex = (focusedIndex - 1 + visible.length) % visible.length;
      updateFocus(visible);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (focusedIndex >= 0 && focusedIndex < visible.length) {
        executeCommand(visible[focusedIndex]);
      } else if (visible.length > 0) {
        executeCommand(visible[0]);
      }
    }
  });

  items.forEach((item) => {
    item.addEventListener('click', () => executeCommand(item));
  });

  window.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      setOpen(true);
      return;
    }

    if (event.key === 'Escape' && palette.classList.contains('is-open')) {
      setOpen(false);
    }
  });
}
