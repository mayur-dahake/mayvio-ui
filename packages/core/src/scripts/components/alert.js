export function initAlerts() {
  document.querySelectorAll(".alert-close").forEach((btn) => {
    btn.addEventListener("click", () => {
      const alert = btn.closest(".alert");
      if (!alert) return;
      alert.style.animation = "alertIn 0.2s ease reverse forwards";
      setTimeout(() => alert.remove(), 200);
    });
  });

  document.querySelectorAll(".alert-action").forEach((btn) => {
    btn.addEventListener("click", () => {
      const alert = btn.closest(".alert");
      const action = btn.dataset.action;
      if (action === "dismiss" && alert) {
        alert.querySelector(".alert-close")?.click();
      }
    });
  });
}
