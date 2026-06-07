export function initAccordion() {
  const accordions = document.querySelectorAll(".accordion");

  accordions.forEach((accordion) => {
    const multiExpand = accordion.querySelector("#multiExpandToggle");
    const items = [...accordion.querySelectorAll(".accordion-item")];

    function toggleItem(item, forceOpen) {
      const trigger = item.querySelector(".accordion-trigger");
      const isOpen = item.classList.contains("open");
      const shouldOpen = forceOpen !== undefined ? forceOpen : !isOpen;

      if (!multiExpand?.checked && shouldOpen) {
        items.forEach((other) => {
          if (other !== item) {
            other.classList.remove("open");
            other.querySelector(".accordion-trigger")?.setAttribute("aria-expanded", "false");
          }
        });
      }

      item.classList.toggle("open", shouldOpen);
      trigger?.setAttribute("aria-expanded", String(shouldOpen));
    }

    items.forEach((item) => {
      const trigger = item.querySelector(".accordion-trigger");

      trigger?.addEventListener("click", () => toggleItem(item));

      trigger?.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleItem(item);
        }
      });
    });

    multiExpand?.addEventListener("change", () => {
      if (!multiExpand.checked) {
        const openItems = items.filter((i) => i.classList.contains("open"));
        openItems.slice(1).forEach((item) => toggleItem(item, false));
      }
    });
  });
}
