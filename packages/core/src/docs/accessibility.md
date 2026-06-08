# Mayvio UI — Accessibility & WAI-ARIA Specifications

This document outlines the accessibility design patterns, HTML structures, ARIA roles, and keyboard navigation requirements implemented across Mayvio UI components.

---

## 🏛️ Core Guidelines

Mayvio UI aims for full compliance with WCAG 2.1 AA guidelines. Every interactive component is designed to be accessible to keyboard-only users and screen readers by adhering to the following rules:

1. **Logical Tab Order:** All interactive elements are reachable via `Tab` key navigation in order of presentation.
2. **Visible Focus Indicators:** Never hide focus rings (`outline: none` is prohibited without a custom `:focus-visible` outline).
3. **Semantic HTML:** Native elements (like `<button>`, `<nav>`, `<input>`) are preferred to minimize custom ARIA scripting.
4. **Contrast Compliance:** Colors meet a minimum ratio of 4.5:1 for normal text and 3:1 for graphical interfaces.

---

## ♿ Component Specifications

### 1. Theme Switcher
* **Semantic HTML:** `<button>` with `type="button"`.
* **ARIA Attributes:**
  * `role="switch"`: Identifies the toggle switch.
  * `aria-checked="true|false"`: Communicates the current state (checked for dark mode, unchecked for light mode).
  * `aria-label="Switch to dark theme"`: Self-explanatory label.
* **Keyboard Interaction:**
  * `Tab`: Focuses the toggle button.
  * `Enter` / `Space`: Toggles the theme.

### 2. Skeleton Loader
* **Semantic HTML:** Container styled to act as placeholder wrapper.
* **ARIA Attributes:**
  * `aria-busy="true"`: Communicates to screen readers that the parent element or section is loading content.
  * `aria-live="polite"`: Prevents screen readers from aggressively interrupting the user while content is loading.

### 3. Toast Notification
* **ARIA Attributes:**
  * `role="alert"` (for Error/Warning toasts): Immediately reads the message text.
  * `role="status"` (for Success/Info toasts): Announced politely at the screen reader's next natural pause.
  * `aria-atomic="true"`: Announces the entire toast node content if updated.
* **Actionable Toasts:** If a toast has action buttons (e.g. "Undo"), do not use `role="alert"` as it doesn't receive focus. Instead, use a live region and ensure the button is in the standard tabbing cycle.

### 4. Modal Dialog
* **ARIA Attributes:**
  * `role="dialog"`: Identifies the overlay container.
  * `aria-modal="true"`: Instructs assistive technologies to ignore background content.
  * `aria-labelledby="modal-title"`: Points to the main header element.
* **Focus Management:**
  * **On Open:** Focus moves to the first focusable element inside the modal (typically the primary action button or close button).
  * **Focus Trap:** Tabbing is restricted within the modal boundaries (pressing `Tab` on the last element wraps back to the first, and `Shift + Tab` on the first wraps to the last).
  * **On Close:** Focus is restored back to the trigger button that launched the modal.
* **Keyboard Navigation:**
  * `Escape`: Closes the active modal overlay.

### 5. Tabs
* **ARIA Structure:**
  * `role="tablist"`: Container holding the tab elements.
  * `role="tab"`: Interactive tab headers.
  * `role="tabpanel"`: Container enclosing the pane content.
* **ARIA Attributes:**
  * `aria-selected="true|false"`: Communicates which tab is active.
  * `aria-controls="panel-id"`: Links the tab trigger to its corresponding content panel.
  * `aria-labelledby="tab-id"`: Links the content panel back to the tab header.
* **Keyboard Navigation:**
  * `ArrowRight` / `ArrowLeft`: Moves focus and activates adjacent tabs in the list.
  * `Home` / `End`: Focuses the first and last tab respectively.
  * `Enter` / `Space`: Activates the tab when manually focused.

### 6. Accordion
* **ARIA Structure:**
  * Header contains a `<button>` trigger.
  * Panel content wrapped in a container.
* **ARIA Attributes:**
  * `aria-expanded="true|false"`: Placed on the header button, communicating whether its panel is open.
  * `aria-controls="panel-id"`: Points to the container holding panel text.
* **Keyboard Navigation:**
  * `Tab`: Focuses the accordion trigger buttons.
  * `Enter` / `Space`: Toggles the expanded/collapsed state of the panel.

### 7. Dropdown (Searchable Combobox)
* **ARIA Structure:**
  * Text input with `role="combobox"`.
  * Menu container with `role="listbox"`.
  * Items with `role="option"`.
* **ARIA Attributes:**
  * `aria-expanded="true|false"`: Communicates menu visibility.
  * `aria-haspopup="listbox"`: Shows that the element triggers a listbox menu.
  * `aria-selected="true|false"`: Communicates which option is active.
  * `aria-multiselectable="true"` (for Multi-select): Placed on the listbox.
* **Keyboard Navigation:**
  * `ArrowDown` / `ArrowUp`: Opens the dropdown (if closed) and navigates options.
  * `Enter`: Selects the highlighted option.
  * `Escape`: Closes the dropdown without selection.

### 8. Tooltip
* **ARIA Attributes:**
  * `role="tooltip"`: Placed on the tooltip bubble.
  * `aria-describedby="tooltip-id"`: Placed on the triggering element, linking it to the tooltip.
* **Activation Rules:**
  * Must display on **mouse hover** AND **keyboard focus**.
  * Must dismiss on mouse leave, keyboard blur, or pressing the `Escape` key.

### 9. Progress Bar
* **ARIA Structure:**
  * Progress track wrapper with `role="progressbar"`.
* **ARIA Attributes:**
  * `aria-valuenow="X"`: Current numerical progress value.
  * `aria-valuemin="0"`: Minimum boundary.
  * `aria-valuemax="100"`: Maximum boundary.
  * `aria-valuetext="Loading..."` (for Indeterminate): Text description of progress.

### 10. Alert
* **ARIA Structure:**
  * Container with `role="alert"`.
* **ARIA Attributes:**
  * `aria-label="Dismiss alert"`: Applied to the close button trigger to give it context.

### 11. Command Palette
* **ARIA Structure:**
  * Input with `role="combobox"`.
  * Options list with `role="listbox"`.
  * Elements inside list with `role="option"`.
* **Focus Management:**
  * **On Open:** Focus is immediately captured by the search input field.
  * **Focus Retention:** Focus remains inside the input box while using navigation arrows. Selection is handled using the `aria-activedescendant` attribute pointing to the highlighted option.
* **Keyboard Navigation:**
  * `ArrowDown` / `ArrowUp`: Highlights items in the list.
  * `Enter`: Triggers the action of the highlighted command.
  * `Escape`: Closes the palette overlay.

### 12. Sidebar Navigation
* **Semantic HTML:** `<nav aria-label="Sidebar Menu">` wrapping navigation links.
* **ARIA Attributes:**
  * `aria-expanded="true|false"`: Applied to the expand/collapse button trigger.

### 13. Notification Center
* **Semantic HTML:** `<aside>` or `<div>` with `role="region"` and `aria-label="Notification Center"`.
* **ARIA Attributes:**
  * `aria-expanded="true|false"`: Placed on the notification bell toggle button.

### 14. Breadcrumb
* **Semantic HTML:** `<nav aria-label="Breadcrumb">` wrapper containing an ordered list (`<ol>`).
* **ARIA Attributes:**
  * `aria-current="page"`: Applied to the last item in the list, signifying it represents the current webpage.

### 15. Data Grid
* **ARIA Structure:**
  * Grid wrapper container with `role="region"`, `aria-label="Data Grid"`, and `tabindex="0"`.
  * Table element with `role="grid"`.
  * Header row with `role="row"` and header cells with `role="columnheader"`.
  * Body rows with `role="row"` and body cells with `role="gridcell"`.
* **ARIA Attributes:**
  * `aria-sort="ascending|descending|none"`: Applied to sortable headers to communicate the active sort direction.
  * `aria-expanded="true|false"`: Placed on the column visibility dropdown button.
  * `aria-live="polite"`: Placed on the pagination status region.
* **Keyboard Navigation:**
  * `Tab` / `Shift + Tab`: Focuses the table container, search input, column toggle trigger, select size element, and pagination controls in a logical sequence.
  * `Enter` / `Space` (on sortable header cells): Sorts the grid by that column.
