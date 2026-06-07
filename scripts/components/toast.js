const MESSAGES = {
  success: "Data saved successfully",
  error: "Something went wrong",
  warning: "Check your input",
  info: "New update available",
};

const ICONS = {
  success: "✓",
  error: "✕",
  warning: "⚠",
  info: "ℹ",
};

const AUTO_DISMISS_MS = 4000;

function dismissToast(toast) {
  toast.style.animation = "slideOut 0.3s ease forwards";
  setTimeout(() => toast.remove(), 300);
}

export function createToast(type) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.setAttribute("role", "alert");
  toast.innerHTML = `
    <span class="toast-icon" aria-hidden="true">${ICONS[type]}</span>
    <span class="toast-message">${MESSAGES[type]}</span>
    <button class="toast-close" aria-label="Dismiss notification">✕</button>
    <div class="toast-progress"></div>
  `;

  container.appendChild(toast);

  const timer = setTimeout(() => dismissToast(toast), AUTO_DISMISS_MS);

  toast.querySelector(".toast-close").addEventListener("click", () => {
    clearTimeout(timer);
    dismissToast(toast);
  });
}

export function initToast() {
  document.querySelectorAll(".toast-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const type = [...btn.classList].find((c) => MESSAGES[c]);
      if (type) createToast(type);
    });
  });
}
