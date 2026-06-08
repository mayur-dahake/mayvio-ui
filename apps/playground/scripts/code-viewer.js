import { HTML_TEMPLATES, REACT_TEMPLATES, ANGULAR_TEMPLATES } from "./templates.js";

// Helper to escape HTML characters for visual display
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function initCodeViewer() {
  const modal = document.getElementById("codeViewerModal");
  const closeBtn = modal?.querySelector(".modal-close");
  const codeTabs = modal?.querySelectorAll(".code-tab");
  const codeDisplay = document.getElementById("codeViewerDisplay");
  const copyBtn = modal?.querySelector(".code-copy-btn");

  if (!modal || !closeBtn || !codeTabs || !codeDisplay || !copyBtn) return;

  let currentComponent = "";
  let activeLang = "html";
  const cache = { html: "", css: "", js: "", react: "", angular: "" };

  const COPY_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
  const CHECK_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`;

  const openCodeViewer = (componentName) => {
    currentComponent = componentName;
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    
    // Clear and populate initial cache
    cache.html = HTML_TEMPLATES[componentName] || "";
    cache.react = REACT_TEMPLATES[componentName] || "";
    cache.angular = ANGULAR_TEMPLATES[componentName] || "";
    cache.css = "";
    cache.js = "";

    // Set default tab to HTML
    switchTab("html");
  };

  const closeCodeViewer = () => {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    codeDisplay.textContent = "";
  };

  const switchTab = async (lang) => {
    activeLang = lang;
    codeTabs.forEach((tab) => {
      const isSelected = tab.dataset.lang === lang;
      tab.classList.toggle("active", isSelected);
      tab.setAttribute("aria-selected", String(isSelected));
    });

    if (cache[lang] !== "") {
      codeDisplay.innerHTML = escapeHtml(cache[lang]);
      return;
    }

    codeDisplay.textContent = "Loading source code...";

    try {
      let content = "";
      if (lang === "css") {
        const res = await fetch(`styles/components/${currentComponent}.css`);
        if (!res.ok) throw new Error("CSS file not found");
        content = await res.text();
      } else if (lang === "js") {
        // Map component names to JS filenames if they differ
        let filename = currentComponent;
        if (currentComponent === "theme-toggle") filename = "theme-toggle";
        else if (currentComponent === "progress") filename = "progress";

        const res = await fetch(`scripts/components/${filename}.js`);
        if (!res.ok) throw new Error("JS file not found");
        content = await res.text();
      }

      cache[lang] = content;
      codeDisplay.innerHTML = escapeHtml(content);
    } catch {
      let fallback = "";
      if (lang === "css") {
        fallback = "/* No separate styling stylesheet required or styles embedded in utilities.css */";
      } else if (lang === "js") {
        fallback = "/* Purely CSS-driven component. No JavaScript initialization required. */";
      } else if (lang === "react") {
        fallback = "/* React wrapper code not available for this component. */";
      } else if (lang === "angular") {
        fallback = "/* Angular wrapper code not available for this component. */";
      }
      cache[lang] = fallback;
      codeDisplay.innerHTML = fallback;
    }
  };

  // Bind trigger clicks
  document.querySelectorAll("[data-view-code]").forEach((btn) => {
    btn.addEventListener("click", () => {
      openCodeViewer(btn.dataset.viewCode);
    });
  });

  // Modal dismiss buttons
  closeBtn.addEventListener("click", closeCodeViewer);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeCodeViewer();
  });

  // Global key listener for escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      closeCodeViewer();
    }
  });

  // Tab trigger clicks
  codeTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      switchTab(tab.dataset.lang);
    });
  });

  // Set up copy button within viewer
  copyBtn.innerHTML = `${COPY_ICON}<span>Copy Code</span>`;
  copyBtn.addEventListener("click", async () => {
    const textToCopy = cache[activeLang] || codeDisplay.textContent;
    if (!textToCopy) return;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = textToCopy;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      copyBtn.classList.add("copied");
      copyBtn.innerHTML = `${CHECK_ICON}<span>Copied!</span>`;
      
      setTimeout(() => {
        copyBtn.classList.remove("copied");
        copyBtn.innerHTML = `${COPY_ICON}<span>Copy Code</span>`;
      }, 2000);
    } catch (err) {
      copyBtn.innerHTML = `${COPY_ICON}<span>Failed</span>`;
      setTimeout(() => {
        copyBtn.innerHTML = `${COPY_ICON}<span>Copy Code</span>`;
      }, 2000);
    }
  });
}
