export function initNotificationCenter() {
  const card = document.querySelector(".notification-center-card");
  if (!card) return;

  const toggle = card.querySelector("[data-toggle-notifications]");
  const panel = card.querySelector(".notification-panel");
  const clearAll = card.querySelector("[data-clear-notifications]");
  const footer = card.querySelector(".notification-footer");

  const getItems = () => card.querySelectorAll(".notification-item");

  const updateState = () => {
    const isOpen = panel.classList.contains("is-open");
    const hasItems = getItems().length > 0;

    toggle.setAttribute('aria-expanded', String(isOpen));
    if (footer) {
      footer.hidden = !hasItems;
    }
  };

  const removeItem = (button) => {
    const item = button.closest(".notification-item");
    item?.remove();
    updateState();
  };

  toggle.addEventListener("click", () => {
    panel.classList.toggle("is-open");
    updateState();
  });

  panel.addEventListener("click", (event) => {
    const dismissButton = event.target.closest(".notification-dismiss");
    if (!dismissButton) return;

    removeItem(dismissButton);
  });

  clearAll?.addEventListener("click", () => {
    getItems().forEach((item) => item.remove());
    updateState();
  });

  updateState();
}
