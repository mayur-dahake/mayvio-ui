// Helper to escape HTML characters inside code blocks
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Custom lightweight Markdown Parser
function parseMarkdown(md) {
  let html = md;

  // 1. Code blocks (```lang ... ```)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/gm, (match, lang, code) => {
    return `<div class="docs-code-block"><pre><code class="language-${lang}">${escapeHtml(code.trim())}</code></pre></div>`;
  });

  // 2. Headings
  html = html.replace(/^# (.*?)$/gm, "<h1>$1</h1>");
  html = html.replace(/^## (.*?)$/gm, "<h2>$1</h2>");
  html = html.replace(/^### (.*?)$/gm, "<h3>$1</h3>");

  // 3. Horizontal Rule
  html = html.replace(/^---$/gm, '<hr class="docs-hr">');

  // 4. Bullet lists
  html = html.replace(/^\* (.*?)$/gm, "<li>$1</li>");
  // Wrap sequential <li> tags in <ul>
  html = html.replace(/((?:<li>.*?<\/li>\s*)+)/gs, "<ul>$1</ul>");

  // 5. Bold & Italic
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
  
  // 6. Inline code
  html = html.replace(/`([^`\n]+)`/g, "<code>$1</code>");

  // 7. Links ([text](url))
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="docs-link">$1</a>');

  // 8. Table formatting (Simple converter for accessibility/CSS vars tables)
  // Check if we have standard markdown tables
  html = html.replace(/^\|(.*?)\|$/gm, (match, cellsStr) => {
    const cells = cellsStr.split("|").map(c => c.trim());
    const isHeader = cells.every(c => c.startsWith("-"));
    if (isHeader) return "<!-- table separator -->";
    
    const cellType = match.includes("CSS Variable") || match.includes("Default Value") ? "th" : "td";
    const cellsHtml = cells.map(c => `<${cellType}>${c}</${cellType}>`).join("");
    return `<tr>${cellsHtml}</tr>`;
  });
  // Wrap table rows in table
  html = html.replace(/((?:<tr>.*?<\/tr>\s*)+)/gs, (match) => {
    return `<div class="data-grid-wrapper"><table class="data-grid"><tbody>${match}</tbody></table></div>`;
  });

  // 9. Paragraph handling: split double newlines, wrap in <p> if not starting with tag
  const blocks = html.split(/\n\n+/);
  html = blocks
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (
        trimmed.startsWith("<h") ||
        trimmed.startsWith("<ul") ||
        trimmed.startsWith("<div") ||
        trimmed.startsWith("<hr") ||
        trimmed.startsWith("<li") ||
        trimmed.startsWith("<table")
      ) {
        return trimmed;
      }
      return `<p>${trimmed.replace(/\n/g, "<br>")}</p>`;
    })
    .join("\n");

  return html;
}

export function initDocsViewer() {
  const modal = document.getElementById("docsViewerModal");
  const closeBtn = modal?.querySelector(".modal-close");
  const docsContent = document.getElementById("docsViewerContent");
  const titleHeader = document.getElementById("docs-viewer-title");

  if (!modal || !closeBtn || !docsContent) return;

  const openDocsViewer = async (target) => {
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    docsContent.innerHTML = "<p>Loading documentation...</p>";

    let fileUrl = "";
    let cleanTitle = "Documentation";

    if (target === "global-integration") {
      fileUrl = "docs/framework-integration.md";
      cleanTitle = "Framework Integration Guide";
    } else if (target === "global-accessibility") {
      fileUrl = "docs/accessibility.md";
      cleanTitle = "Accessibility Specifications";
    } else {
      fileUrl = `docs/components/${target}.md`;
      // Capitalize component name
      cleanTitle = target
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ") + " Documentation";
    }

    if (titleHeader) {
      titleHeader.textContent = cleanTitle;
    }

    try {
      const res = await fetch(fileUrl);
      if (!res.ok) throw new Error("Documentation file not found");
      const mdContent = await res.text();
      docsContent.innerHTML = parseMarkdown(mdContent);
    } catch (err) {
      docsContent.innerHTML = `
        <p style="color: var(--error);">Failed to load documentation file: <code>${fileUrl}</code></p>
        <p>Ensure the file exists in the repository directories.</p>
      `;
    }
  };

  const closeDocsViewer = () => {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    docsContent.innerHTML = "";
  };

  // Bind all triggers dynamically
  document.addEventListener("click", (e) => {
    // Check if clicked element or its parent has data-view-docs
    const trigger = e.target.closest("[data-view-docs]");
    if (trigger) {
      e.preventDefault();
      openDocsViewer(trigger.dataset.viewDocs);
    }
  });

  // Modal dismiss buttons
  closeBtn.addEventListener("click", closeDocsViewer);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeDocsViewer();
  });

  // Global key listener for escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      closeDocsViewer();
    }
  });
}
