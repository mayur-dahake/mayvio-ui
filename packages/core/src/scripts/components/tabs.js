export function initTabs() {
  const tabLists = document.querySelectorAll("[role='tablist']");

  tabLists.forEach((tabList) => {
    const tabs = [...tabList.querySelectorAll("[role='tab']")];
    const panelContainer = tabList.closest(".tabs");
    const panels = panelContainer
      ? [...panelContainer.querySelectorAll("[role='tabpanel']")]
      : [];

    function activateTab(index) {
      tabs.forEach((tab, i) => {
        const isActive = i === index;
        tab.setAttribute("aria-selected", String(isActive));
        tab.tabIndex = isActive ? 0 : -1;
      });

      panels.forEach((panel, i) => {
        panel.classList.toggle("active", i === index);
        panel.hidden = i !== index;
      });
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activateTab(index));

      tab.addEventListener("keydown", (e) => {
        let nextIndex = index;

        if (e.key === "ArrowRight") {
          nextIndex = (index + 1) % tabs.length;
        } else if (e.key === "ArrowLeft") {
          nextIndex = (index - 1 + tabs.length) % tabs.length;
        } else if (e.key === "Home") {
          nextIndex = 0;
        } else if (e.key === "End") {
          nextIndex = tabs.length - 1;
        } else {
          return;
        }

        e.preventDefault();
        activateTab(nextIndex);
        tabs[nextIndex].focus();
      });
    });

    activateTab(0);
  });
}
