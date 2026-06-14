/**
 * Dashboard Widgets Initializer
 * Orchestrates HTML5 Drag & Drop layout sorting, localStorage state persistence,
 * panel folding/collapsing, and card dismissals.
 */
export function initDashboardWidgets(gridOrSelector, options = {}) {
  const grid = typeof gridOrSelector === "string"
    ? document.querySelector(gridOrSelector)
    : gridOrSelector;

  if (!grid) return;

  const storageKey = options.storageKey || `mayvio-widget-order-${grid.id || 'default'}`;
  const widgets = [...grid.querySelectorAll(".widget")];

  // --- 1. Load layout from LocalStorage ---
  const restoreLayout = () => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (!stored) return;
      const order = JSON.parse(stored);

      // Re-append elements in stored order
      order.forEach(id => {
        const item = widgets.find(w => w.id === id);
        if (item) {
          grid.appendChild(item);
        }
      });
    } catch (e) {
      console.warn("Could not load widget layout", e);
    }
  };

  const saveLayout = () => {
    try {
      const order = [...grid.querySelectorAll(".widget")].map(w => w.id);
      localStorage.setItem(storageKey, JSON.stringify(order));
    } catch (e) {
      console.warn("Could not save widget layout", e);
    }
  };

  restoreLayout();

  // --- 2. Setup Drag and Drop events ---
  widgets.forEach(widget => {
    const handle = widget.querySelector(".widget-drag-handle");

    // Restrict dragging to the drag handle
    if (handle) {
      handle.addEventListener("mousedown", () => widget.setAttribute("draggable", "true"));
      handle.addEventListener("mouseup", () => widget.removeAttribute("draggable"));
      handle.addEventListener("mouseleave", () => widget.removeAttribute("draggable"));
    } else {
      widget.setAttribute("draggable", "true");
    }

    widget.addEventListener("dragstart", (e) => {
      widget.classList.add("dragging");
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", widget.id);
    });

    widget.addEventListener("dragend", () => {
      widget.classList.remove("dragging");
      widget.removeAttribute("draggable");
      saveLayout();
    });
  });

  // Calculate closest insert position
  const getDragAfterElement = (container, y, x) => {
    const draggableElements = [...container.querySelectorAll(".widget:not(.dragging)")];

    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      
      // Compute distances in both axes for grid flexibility
      const offsetY = y - (box.top + box.height / 2);
      const offsetX = x - (box.left + box.width / 2);
      const distance = Math.sqrt(offsetY * offsetY + offsetX * offsetX);

      if (distance < closest.distance) {
        return { distance, element: child, offset: { y: offsetY, x: offsetX } };
      } else {
        return closest;
      }
    }, { distance: Number.POSITIVE_INFINITY }).element;
  };

  grid.addEventListener("dragover", (e) => {
    e.preventDefault();
    const dragging = grid.querySelector(".widget.dragging");
    if (!dragging) return;

    const afterElement = getDragAfterElement(grid, e.clientY, e.clientX);

    if (afterElement) {
      const box = afterElement.getBoundingClientRect();
      const isBefore = (e.clientX < box.left + box.width / 2) || (e.clientY < box.top + box.height / 2);
      
      if (isBefore) {
        grid.insertBefore(dragging, afterElement);
      } else {
        grid.insertBefore(dragging, afterElement.nextSibling);
      }
    } else {
      grid.appendChild(dragging);
    }
  });

  // --- 3. Setup Action Listeners (Collapse & Close) ---
  widgets.forEach(widget => {
    const collapseBtn = widget.querySelector(".widget-btn-collapse");
    const closeBtn = widget.querySelector(".widget-btn-close");

    if (collapseBtn) {
      collapseBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const collapsed = widget.classList.toggle("collapsed");
        collapseBtn.setAttribute("aria-expanded", String(!collapsed));
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        widget.classList.add("dismissed");
        setTimeout(() => {
          widget.remove();
          saveLayout();
        }, 300);
      });
    }
  });
}
