export function initNotificationCenter() {
  const container = document.getElementById("demoNotificationCenter");
  if (!container) return;

  const trigger = container.querySelector(".mv-notificationcenter-trigger");
  const popup = container.querySelector(".mv-notificationcenter-popup");
  const clearAll = container.querySelector(".mv-notificationcenter-clear");
  const body = container.querySelector(".mv-notificationcenter-body");

  if (!trigger || !popup || !body) return;

  const updateState = () => {
    const isOpen = container.classList.contains("mv-notificationcenter--open");
    trigger.setAttribute('aria-expanded', String(isOpen));
  };

  trigger.addEventListener("click", () => {
    container.classList.toggle("mv-notificationcenter--open");
    // Simple mock logic for popping up
    if (container.classList.contains("mv-notificationcenter--open")) {
      popup.style.display = "flex";
      popup.style.bottom = "100%";
      popup.style.right = "0";
      popup.style.position = "absolute";
    } else {
      popup.style.display = "none";
    }
    updateState();
  });

  clearAll?.addEventListener("click", () => {
    body.innerHTML = ''; // mock clearing
    const badge = container.querySelector(".mv-notificationcenter-badge");
    if(badge) badge.style.display = 'none';
  });
}
