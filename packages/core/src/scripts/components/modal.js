function closeModal(overlay) {
  overlay.classList.remove("show");
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function openModal(overlay) {
  overlay.classList.add("show");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  overlay.querySelector(".modal-close")?.focus();
}

export function initModal() {
  // Set up triggers
  document.querySelectorAll("[data-modal-target]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const selector = trigger.dataset.modalTarget;
      const overlay = document.querySelector(selector);
      if (overlay) openModal(overlay);
    });
  });

  // Set up dismiss elements inside each modal
  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.querySelectorAll(".modal-close, [data-modal-dismiss]").forEach((btn) => {
      btn.addEventListener("click", () => closeModal(overlay));
    });

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal(overlay);
    });
  });

  // Global escape key handler
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const openModalOverlay = document.querySelector(".modal-overlay.show");
      if (openModalOverlay) closeModal(openModalOverlay);
    }
  });
}
