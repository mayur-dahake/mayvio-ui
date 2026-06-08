export function initDatePicker() {
  document.querySelectorAll(".dp-wrapper").forEach((wrapper) => {
    setupDatePicker(wrapper);
  });
}

function setupDatePicker(wrapper) {
  const input = wrapper.querySelector(".dp-input");
  const trigger = wrapper.querySelector(".dp-trigger");
  const popup = wrapper.querySelector(".dp-popup");
  const rangeMode = wrapper.dataset.range === "true";

  if (!input || !popup) return;

  let viewYear = new Date().getFullYear();
  let viewMonth = new Date().getMonth(); // 0-based
  let selectedStart = null;
  let selectedEnd = null;
  let isOpen = false;

  const MONTHS = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // --- Build popup structure ---
  popup.innerHTML = `
    <div class="dp-header">
      <button class="dp-nav-btn" id="${wrapper.id}-prev" aria-label="Previous month">‹</button>
      <div class="dp-month-year">
        <button class="dp-month-btn" aria-label="Select month">${MONTHS[viewMonth]}</button>
        <button class="dp-year-btn" aria-label="Select year">${viewYear}</button>
      </div>
      <button class="dp-nav-btn" id="${wrapper.id}-next" aria-label="Next month">›</button>
    </div>
    <div class="dp-day-names" role="row">
      ${DAYS.map((d) => `<span role="columnheader" aria-label="${d}">${d}</span>`).join("")}
    </div>
    <div class="dp-grid" role="grid" aria-label="Calendar"></div>
    ${rangeMode ? `<div class="dp-range-hint">Click start date, then end date</div>` : ""}
    <div class="dp-footer">
      <button class="dp-today-btn">Today</button>
      <button class="dp-clear-btn">Clear</button>
    </div>
  `;

  const prevBtn = popup.querySelector(`#${wrapper.id}-prev`);
  const nextBtn = popup.querySelector(`#${wrapper.id}-next`);
  const grid = popup.querySelector(".dp-grid");
  const monthBtn = popup.querySelector(".dp-month-btn");
  const yearBtn = popup.querySelector(".dp-year-btn");
  const todayBtn = popup.querySelector(".dp-today-btn");
  const clearBtn = popup.querySelector(".dp-clear-btn");
  const rangeHint = popup.querySelector(".dp-range-hint");

  // --- Render Grid ---
  function renderGrid() {
    grid.innerHTML = "";
    monthBtn.textContent = MONTHS[viewMonth];
    yearBtn.textContent = viewYear;

    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const daysInPrev = new Date(viewYear, viewMonth, 0).getDate();
    const today = new Date();

    // Previous month padding
    for (let i = firstDay - 1; i >= 0; i--) {
      const cell = createCell(daysInPrev - i, viewYear, viewMonth - 1, true);
      grid.appendChild(cell);
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const cell = createCell(d, viewYear, viewMonth, false, today);
      grid.appendChild(cell);
    }

    // Next month padding (fill grid to complete rows)
    const total = firstDay + daysInMonth;
    const remainder = total % 7 === 0 ? 0 : 7 - (total % 7);
    for (let d = 1; d <= remainder; d++) {
      const cell = createCell(d, viewYear, viewMonth + 1, true);
      grid.appendChild(cell);
    }
  }

  function createCell(day, year, month, overflow = false, today = null) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "dp-day";
    btn.textContent = day;

    const cellDate = new Date(year, month, day);
    btn.dataset.date = formatDate(cellDate);

    if (overflow) btn.classList.add("overflow");

    // Today highlight
    if (today && isSameDay(cellDate, today)) btn.classList.add("today");

    // Selected states
    if (rangeMode) {
      if (selectedStart && isSameDay(cellDate, selectedStart)) {
        btn.classList.add("selected", "range-start");
        btn.setAttribute("aria-pressed", "true");
      }
      if (selectedEnd && isSameDay(cellDate, selectedEnd)) {
        btn.classList.add("selected", "range-end");
        btn.setAttribute("aria-pressed", "true");
      }
      if (selectedStart && selectedEnd && cellDate > selectedStart && cellDate < selectedEnd) {
        btn.classList.add("in-range");
      }
    } else {
      if (selectedStart && isSameDay(cellDate, selectedStart)) {
        btn.classList.add("selected");
        btn.setAttribute("aria-pressed", "true");
      }
    }

    btn.setAttribute("aria-label", cellDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }));
    btn.setAttribute("role", "gridcell");

    btn.addEventListener("click", () => handleDayClick(cellDate));

    return btn;
  }

  function handleDayClick(date) {
    if (rangeMode) {
      if (!selectedStart || (selectedStart && selectedEnd)) {
        // Start fresh
        selectedStart = date;
        selectedEnd = null;
        if (rangeHint) rangeHint.textContent = "Now click an end date";
      } else {
        // Second click — set end (ensure start <= end)
        if (date < selectedStart) {
          selectedEnd = selectedStart;
          selectedStart = date;
        } else {
          selectedEnd = date;
        }
        if (rangeHint) rangeHint.textContent = "Range selected";
        updateInput();
        // Auto-close after small delay to show selection
        setTimeout(closePopup, 400);
      }
    } else {
      selectedStart = date;
      updateInput();
      setTimeout(closePopup, 200);
    }
    renderGrid();
  }

  function updateInput() {
    if (rangeMode && selectedStart && selectedEnd) {
      input.value = `${formatDate(selectedStart)} → ${formatDate(selectedEnd)}`;
    } else if (selectedStart) {
      input.value = formatDate(selectedStart);
    }
  }

  // --- Navigation ---
  prevBtn.addEventListener("click", () => {
    viewMonth--;
    if (viewMonth < 0) { viewMonth = 11; viewYear--; }
    renderGrid();
  });

  nextBtn.addEventListener("click", () => {
    viewMonth++;
    if (viewMonth > 11) { viewMonth = 0; viewYear++; }
    renderGrid();
  });

  // --- Today / Clear ---
  todayBtn.addEventListener("click", () => {
    const today = new Date();
    viewYear = today.getFullYear();
    viewMonth = today.getMonth();
    selectedStart = today;
    selectedEnd = null;
    updateInput();
    renderGrid();
    if (!rangeMode) setTimeout(closePopup, 200);
  });

  clearBtn.addEventListener("click", () => {
    selectedStart = null;
    selectedEnd = null;
    input.value = "";
    if (rangeHint) rangeHint.textContent = "Click start date, then end date";
    renderGrid();
  });

  // --- Open / Close ---
  function openPopup() {
    isOpen = true;
    popup.classList.add("open");
    popup.setAttribute("aria-hidden", "false");
    const now = new Date();
    if (selectedStart) {
      viewYear = selectedStart.getFullYear();
      viewMonth = selectedStart.getMonth();
    } else {
      viewYear = now.getFullYear();
      viewMonth = now.getMonth();
    }
    renderGrid();
  }

  function closePopup() {
    isOpen = false;
    popup.classList.remove("open");
    popup.setAttribute("aria-hidden", "true");
  }

  trigger.addEventListener("click", () => {
    if (isOpen) closePopup(); else openPopup();
  });

  input.addEventListener("focus", openPopup);

  // Keyboard: Escape closes
  popup.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closePopup(); trigger.focus(); }
  });

  // Outside click
  document.addEventListener("click", (e) => {
    if (!wrapper.contains(e.target)) closePopup();
  });

  // --- Utils ---
  function formatDate(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  function isSameDay(a, b) {
    return a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();
  }

  // Prevent popup from closing when interacting inside
  popup.addEventListener("click", (e) => e.stopPropagation());
}
