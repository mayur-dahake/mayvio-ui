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
  const overlay = document.getElementById("modalOverlay");
  const openBtn = document.getElementById("openModalBtn");

  if (!overlay || !openBtn) return;

  const closeBtn = overlay.querySelector(".modal-close");
  const cancelBtn = overlay.querySelector("#cancelModalBtn");

  openBtn.addEventListener("click", () => openModal(overlay));
  closeBtn?.addEventListener("click", () => closeModal(overlay));
  cancelBtn?.addEventListener("click", () => closeModal(overlay));

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal(overlay);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("show")) {
      closeModal(overlay);
    }
  });
}

export function initInfoModal() {
  const overlay = document.getElementById("infoModalOverlay");
  const openBtn = document.getElementById("openInfoModalBtn");

  if (!overlay || !openBtn) return;

  const closeBtn = overlay.querySelector(".modal-close");
  const okBtn = overlay.querySelector("#infoModalOkBtn");

  openBtn.addEventListener("click", () => openModal(overlay));
  closeBtn?.addEventListener("click", () => closeModal(overlay));
  okBtn?.addEventListener("click", () => closeModal(overlay));

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal(overlay);
  });
}
