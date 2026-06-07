const COPY_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;

const CHECK_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`;

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

function resetButton(btn, originalLabel) {
  setTimeout(() => {
    btn.classList.remove("copied");
    btn.innerHTML = `${COPY_ICON}<span>${originalLabel}</span>`;
    btn.setAttribute("aria-label", `Copy ${originalLabel.toLowerCase()} code`);
  }, 2000);
}

export function initCopyButtons() {
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    const block = btn.closest(".code-block");
    const code = block?.querySelector("code");
    if (!code) return;

    const label = btn.dataset.label || "Copy";
    btn.innerHTML = `${COPY_ICON}<span>${label}</span>`;
    btn.setAttribute("aria-label", `Copy ${label.toLowerCase()} code`);

    btn.addEventListener("click", async () => {
      try {
        await copyText(code.textContent);
        btn.classList.add("copied");
        btn.innerHTML = `${CHECK_ICON}<span>Copied!</span>`;
        btn.setAttribute("aria-label", "Copied to clipboard");
        resetButton(btn, label);
      } catch {
        btn.innerHTML = `${COPY_ICON}<span>Failed</span>`;
        resetButton(btn, label);
      }
    });
  });
}

export function initSnippetTabs() {
  const tabGroups = document.querySelectorAll(".snippet-section");

  tabGroups.forEach((section) => {
    const tabs = [...section.querySelectorAll(".snippet-tab")];
    const panels = [...section.querySelectorAll(".snippet-panel")];

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => {
          t.classList.remove("active");
          t.setAttribute("aria-selected", "false");
        });
        panels.forEach((p) => p.classList.remove("active"));

        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");
        panels[index]?.classList.add("active");
      });
    });
  });
}
