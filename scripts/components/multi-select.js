const MS_OPTIONS = [
  { value: "react", label: "React", group: "Frontend" },
  { value: "vue", label: "Vue.js", group: "Frontend" },
  { value: "angular", label: "Angular", group: "Frontend" },
  { value: "svelte", label: "Svelte", group: "Frontend" },
  { value: "node", label: "Node.js", group: "Backend" },
  { value: "express", label: "Express", group: "Backend" },
  { value: "django", label: "Django", group: "Backend" },
  { value: "fastapi", label: "FastAPI", group: "Backend" },
  { value: "figma", label: "Figma", group: "Design" },
  { value: "sketch", label: "Sketch", group: "Design" },
  { value: "framer", label: "Framer", group: "Design" },
];

export function initMultiSelect() {
  const wrapper = document.querySelector(".ms-wrapper");
  if (!wrapper) return;

  const trigger = wrapper.querySelector(".ms-trigger");
  const dropdown = wrapper.querySelector(".ms-dropdown");
  const searchInput = wrapper.querySelector(".ms-search");
  const listEl = wrapper.querySelector(".ms-list");
  const tagsContainer = wrapper.querySelector(".ms-tags");
  const placeholder = wrapper.querySelector(".ms-placeholder");
  const selectAllBtn = wrapper.querySelector(".ms-select-all");
  const clearAllBtn = wrapper.querySelector(".ms-clear-all");
  const countBadge = wrapper.querySelector(".ms-count");

  let selected = new Set();
  let query = "";
  let highlightedIndex = -1;
  let isOpen = false;

  // --- Helpers ---
  function getFilteredOptions() {
    if (!query) return MS_OPTIONS;
    return MS_OPTIONS.filter((o) =>
      o.label.toLowerCase().includes(query.toLowerCase())
    );
  }

  function getGroupedOptions(options) {
    const groups = {};
    options.forEach((opt) => {
      if (!groups[opt.group]) groups[opt.group] = [];
      groups[opt.group].push(opt);
    });
    return groups;
  }

  // --- Render Tags ---
  function renderTags() {
    // Remove existing tags (keep placeholder)
    tagsContainer.querySelectorAll(".ms-tag").forEach((t) => t.remove());

    if (selected.size === 0) {
      placeholder.style.display = "inline";
      countBadge.hidden = true;
    } else {
      placeholder.style.display = "none";
      countBadge.hidden = false;
      countBadge.textContent = selected.size;
    }

    selected.forEach((val) => {
      const opt = MS_OPTIONS.find((o) => o.value === val);
      if (!opt) return;

      const tag = document.createElement("span");
      tag.className = "ms-tag";
      tag.innerHTML = `<span>${opt.label}</span><button type="button" class="ms-tag-remove" aria-label="Remove ${opt.label}" data-value="${val}">×</button>`;
      tagsContainer.insertBefore(tag, placeholder);
    });

    // Sync Select All btn text
    const allVisible = getFilteredOptions().every((o) => selected.has(o.value));
    if (selectAllBtn) {
      selectAllBtn.textContent = allVisible && selected.size > 0 ? "Deselect All" : "Select All";
    }

    // Sync clear btn
    if (clearAllBtn) clearAllBtn.disabled = selected.size === 0;
  }

  // --- Render List ---
  function renderList() {
    listEl.innerHTML = "";
    highlightedIndex = -1;
    const filtered = getFilteredOptions();

    if (filtered.length === 0) {
      listEl.innerHTML = `<li class="ms-empty">No options found</li>`;
      return;
    }

    const groups = getGroupedOptions(filtered);
    let globalIndex = 0;

    Object.entries(groups).forEach(([groupName, opts]) => {
      const header = document.createElement("li");
      header.className = "ms-group-header";
      header.textContent = groupName;
      header.setAttribute("role", "presentation");
      listEl.appendChild(header);

      opts.forEach((opt) => {
        const li = document.createElement("li");
        li.className = `ms-option${selected.has(opt.value) ? " selected" : ""}`;
        li.setAttribute("role", "option");
        li.setAttribute("aria-selected", selected.has(opt.value) ? "true" : "false");
        li.dataset.value = opt.value;
        li.dataset.index = globalIndex++;
        li.innerHTML = `<span class="ms-check" aria-hidden="true">${selected.has(opt.value) ? "✓" : ""}</span><span>${opt.label}</span>`;

        li.addEventListener("click", () => toggleOption(opt.value));
        listEl.appendChild(li);
      });
    });
  }

  // --- Toggle Option ---
  function toggleOption(value) {
    if (selected.has(value)) {
      selected.delete(value);
    } else {
      selected.add(value);
    }
    renderTags();
    renderList();
    searchInput.focus();
  }

  // --- Open / Close ---
  function openDropdown() {
    isOpen = true;
    dropdown.classList.add("open");
    wrapper.setAttribute("aria-expanded", "true");
    trigger.classList.add("active");
    renderList();
    searchInput.value = "";
    query = "";
    searchInput.focus();
  }

  function closeDropdown() {
    isOpen = false;
    dropdown.classList.remove("open");
    wrapper.setAttribute("aria-expanded", "false");
    trigger.classList.remove("active");
    highlightedIndex = -1;
  }

  // --- Keyboard Navigation ---
  function getOptionItems() {
    return [...listEl.querySelectorAll(".ms-option")];
  }

  function updateHighlight(newIndex) {
    const items = getOptionItems();
    items.forEach((item) => item.classList.remove("highlighted"));
    if (newIndex >= 0 && newIndex < items.length) {
      items[newIndex].classList.add("highlighted");
      items[newIndex].scrollIntoView({ block: "nearest" });
      highlightedIndex = newIndex;
    } else {
      highlightedIndex = -1;
    }
  }

  searchInput.addEventListener("keydown", (e) => {
    const items = getOptionItems();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      updateHighlight(Math.min(highlightedIndex + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      updateHighlight(Math.max(highlightedIndex - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0 && items[highlightedIndex]) {
        toggleOption(items[highlightedIndex].dataset.value);
      }
    } else if (e.key === "Escape") {
      closeDropdown();
      trigger.focus();
    } else if (e.key === "Backspace" && searchInput.value === "" && selected.size > 0) {
      // Remove last selected tag
      const last = [...selected].pop();
      selected.delete(last);
      renderTags();
      renderList();
    }
  });

  searchInput.addEventListener("input", () => {
    query = searchInput.value;
    renderList();
  });

  // --- Trigger Click ---
  trigger.addEventListener("click", () => {
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  });

  // --- Tags container click (for remove buttons) ---
  tagsContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".ms-tag-remove");
    if (btn) {
      e.stopPropagation();
      selected.delete(btn.dataset.value);
      renderTags();
      renderList();
    } else {
      // Click on tags area — open dropdown
      if (!isOpen) openDropdown();
    }
  });

  // --- Select All ---
  selectAllBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    const filtered = getFilteredOptions();
    const allSelected = filtered.every((o) => selected.has(o.value));
    if (allSelected) {
      filtered.forEach((o) => selected.delete(o.value));
    } else {
      filtered.forEach((o) => selected.add(o.value));
    }
    renderTags();
    renderList();
  });

  // --- Clear All ---
  clearAllBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    selected.clear();
    renderTags();
    renderList();
  });

  // --- Outside Click ---
  document.addEventListener("click", (e) => {
    if (!wrapper.contains(e.target)) {
      closeDropdown();
    }
  });

  // Initial render
  renderTags();
}
