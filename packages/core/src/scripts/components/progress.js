export function initProgress() {
  // Handle determinate slider progress tracks
  document.querySelectorAll(".progress-slider").forEach((slider) => {
    const container = slider.closest(".progress-demo") || slider.parentElement;
    const fill = container?.querySelector(".progress-fill");
    const valueEl = container?.querySelector(".progress-value");

    if (fill) {
      function setValue(val) {
        fill.style.width = `${val}%`;
        if (valueEl) valueEl.textContent = `${val}%`;
        slider.value = val;
        slider.setAttribute("aria-valuenow", val);
      }

      slider.addEventListener("input", () => setValue(slider.value));
      setValue(slider.value || 60);
    }
  });

  // Handle indeterminate toggle button controls
  document.querySelectorAll("[data-toggle-indeterminate]").forEach((toggleBtn) => {
    const container = toggleBtn.closest(".progress-demo") || toggleBtn.parentElement;
    const track = container?.querySelector(".progress-track");
    const valueEl = container?.querySelector(".progress-value");
    const slider = container?.querySelector(".progress-slider");

    if (track) {
      toggleBtn.addEventListener("click", () => {
        const isIndeterminate = track.classList.toggle("indeterminate");
        toggleBtn.textContent = isIndeterminate ? "Determinate" : "Indeterminate";
        toggleBtn.setAttribute("aria-pressed", String(isIndeterminate));
        if (isIndeterminate && valueEl) valueEl.textContent = "Loading…";
        else if (slider) valueEl.textContent = `${slider.value}%`;
      });
    }
  });
}
