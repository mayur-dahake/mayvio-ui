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

export function createToast(type, customMessage) {
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "mv-toast-container mv-toast-container--bottom-right";
    container.setAttribute("aria-live", "polite");
    container.setAttribute("aria-atomic", "true");
    document.body.appendChild(container);
  }

  const message = customMessage || MESSAGES[type] || "";
  const toast = document.createElement("div");
  toast.className = `mv-toast mv-toast--${type}`;
  toast.setAttribute("role", "alert");
  toast.innerHTML = `
    <span class="mv-toast-icon" aria-hidden="true">${ICONS[type]}</span>
    <span class="mv-toast-message">${message}</span>
    <button class="mv-toast-close" aria-label="Dismiss notification">✕</button>
  `;

  container.appendChild(toast);

  const timer = setTimeout(() => dismissToast(toast), AUTO_DISMISS_MS);

  toast.querySelector(".mv-toast-close").addEventListener("click", () => {
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
