export function initDropdowns() {
  document.querySelectorAll(".dropdown").forEach((dropdown) => {
    const isMulti = dropdown.dataset.multi === "true";
    const trigger = dropdown.querySelector(".dropdown-trigger");
    const menu = dropdown.querySelector(".dropdown-menu");
    const searchInput = dropdown.querySelector(".dropdown-search input");
    const options = [...dropdown.querySelectorAll(".dropdown-option")];
    const chipsContainer = dropdown.querySelector(".dropdown-chips");
    let focusedIndex = -1;
    let selected = isMulti ? [] : null;

    function open() {
      document.querySelectorAll(".dropdown.open").forEach((d) => {
        if (d !== dropdown) d.classList.remove("open");
      });
      dropdown.classList.add("open");
      trigger.setAttribute("aria-expanded", "true");
      searchInput?.focus();
    }

    function close() {
      dropdown.classList.remove("open");
      trigger.setAttribute("aria-expanded", "false");
      focusedIndex = -1;
      options.forEach((o) => o.classList.remove("focused"));
      if (searchInput) searchInput.value = "";
      filterOptions("");
    }

    function filterOptions(query) {
      const q = query.toLowerCase();
      options.forEach((opt) => {
        const text = opt.textContent.trim().toLowerCase();
        opt.classList.toggle("hidden", q && !text.includes(q));
      });
    }

    function getVisibleOptions() {
      return options.filter((o) => !o.classList.contains("hidden"));
    }

    function updateTriggerLabel() {
      const label = trigger.querySelector(".dropdown-label");
      if (!label) return;

      if (isMulti) {
        label.textContent = selected.length
          ? `${selected.length} selected`
          : "";
        label.classList.toggle("placeholder", !selected.length);
        if (!selected.length) label.textContent = "Select options…";
      } else {
        label.textContent = selected ? selected.label : "Select an option…";
        label.classList.toggle("placeholder", !selected);
      }
    }

    function updateChips() {
      if (!chipsContainer || !isMulti) return;
      chipsContainer.innerHTML = selected
        .map(
          (s) => `
          <span class="dropdown-chip">
            ${s.label}
            <button type="button" aria-label="Remove ${s.label}" data-value="${s.value}">✕</button>
          </span>`
        )
        .join("");

      chipsContainer.querySelectorAll("button").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const val = btn.dataset.value;
          selected = selected.filter((s) => s.value !== val);
          options.forEach((o) => {
            if (o.dataset.value === val) o.classList.remove("selected");
          });
          updateTriggerLabel();
          updateChips();
        });
      });
    }

    function selectOption(opt) {
      const value = opt.dataset.value;
      const label = opt.dataset.label || opt.textContent.trim();

      if (isMulti) {
        const idx = selected.findIndex((s) => s.value === value);
        if (idx >= 0) {
          selected.splice(idx, 1);
          opt.classList.remove("selected");
        } else {
          selected.push({ value, label });
          opt.classList.add("selected");
        }
        updateTriggerLabel();
        updateChips();
      } else {
        selected = { value, label };
        options.forEach((o) => o.classList.remove("selected"));
        opt.classList.add("selected");
        updateTriggerLabel();
        close();
      }
    }

    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.classList.contains("open") ? close() : open();
    });

    searchInput?.addEventListener("input", (e) => {
      filterOptions(e.target.value);
      focusedIndex = -1;
    });

    searchInput?.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const visible = getVisibleOptions();
        focusedIndex = Math.min(focusedIndex + 1, visible.length - 1);
        visible.forEach((o, i) => o.classList.toggle("focused", i === focusedIndex));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const visible = getVisibleOptions();
        focusedIndex = Math.max(focusedIndex - 1, 0);
        visible.forEach((o, i) => o.classList.toggle("focused", i === focusedIndex));
      } else if (e.key === "Enter" && focusedIndex >= 0) {
        e.preventDefault();
        selectOption(getVisibleOptions()[focusedIndex]);
      } else if (e.key === "Escape") {
        close();
        trigger.focus();
      }
    });

    options.forEach((opt) => {
      opt.addEventListener("click", () => selectOption(opt));
    });

    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) close();
    });

    updateTriggerLabel();
  });
}
