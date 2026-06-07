export function initProgress() {
  document.querySelectorAll(".progress-demo").forEach((demo) => {
    const fill = demo.querySelector(".progress-fill");
    const valueEl = demo.querySelector(".progress-value");
    const slider = demo.querySelector(".progress-slider");
    const track = demo.querySelector(".progress-track");
    const toggleBtn = demo.querySelector("[data-toggle-indeterminate]");

    if (slider && fill) {
      function setValue(val) {
        fill.style.width = `${val}%`;
        if (valueEl) valueEl.textContent = `${val}%`;
        slider.value = val;
        slider.setAttribute("aria-valuenow", val);
      }

      slider.addEventListener("input", () => setValue(slider.value));
      setValue(slider.value || 60);
    }

    if (toggleBtn && track) {
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
