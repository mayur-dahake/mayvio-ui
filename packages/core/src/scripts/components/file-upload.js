export function initFileUpload() {
  document.querySelectorAll(".fu-zone").forEach((zone) => {
    setupFileUpload(zone);
  });
}

function setupFileUpload(zone) {
  const input = zone.querySelector(".fu-input");
  const browseBtn = zone.querySelector(".fu-browse-btn");
  const preview = zone.closest(".fu-wrapper")?.querySelector(".fu-preview");

  const maxMB = parseFloat(zone.dataset.maxSize || "5");
  const acceptTypes = zone.dataset.accept || "*";

  if (!input) return;

  // --- Drag events ---
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();
    zone.classList.add("drag-over");
  });

  zone.addEventListener("dragleave", (e) => {
    if (!zone.contains(e.relatedTarget)) {
      zone.classList.remove("drag-over");
    }
  });

  zone.addEventListener("drop", (e) => {
    e.preventDefault();
    zone.classList.remove("drag-over");
    handleFiles([...e.dataTransfer.files]);
  });

  // --- Browse button ---
  browseBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    input.click();
  });

  zone.addEventListener("click", () => input.click());

  input.addEventListener("change", () => {
    handleFiles([...input.files]);
    input.value = ""; // reset so same file can be re-added
  });

  // --- Process files ---
  function handleFiles(files) {
    files.forEach((file) => {
      const error = validateFile(file);
      addPreviewCard(file, error);
    });
  }

  function validateFile(file) {
    if (maxMB && file.size > maxMB * 1024 * 1024) {
      return `File exceeds ${maxMB}MB limit`;
    }
    if (acceptTypes !== "*") {
      const types = acceptTypes.split(",").map((t) => t.trim());
      const isValid = types.some((type) => {
        if (type.startsWith(".")) return file.name.toLowerCase().endsWith(type);
        if (type.endsWith("/*")) return file.type.startsWith(type.replace("/*", ""));
        return file.type === type;
      });
      if (!isValid) return `File type not accepted`;
    }
    return null;
  }

  function addPreviewCard(file, errorMsg) {
    if (!preview) return;

    const card = document.createElement("div");
    card.className = `fu-card${errorMsg ? " fu-error" : ""}`;

    const isImage = file.type.startsWith("image/");
    const sizeStr = formatBytes(file.size);
    const icon = getFileIcon(file);

    card.innerHTML = `
      <div class="fu-card-thumb">
        ${isImage && !errorMsg ? `<img src="" alt="${file.name}" class="fu-thumb-img" />` : `<span class="fu-file-icon">${icon}</span>`}
      </div>
      <div class="fu-card-info">
        <div class="fu-card-name" title="${file.name}">${truncateFilename(file.name)}</div>
        <div class="fu-card-size">${sizeStr}</div>
        ${errorMsg
          ? `<div class="fu-card-error">${errorMsg}</div>`
          : `<div class="fu-progress-bar"><div class="fu-progress-fill"></div></div>
             <div class="fu-card-status">Uploading...</div>`
        }
      </div>
      <button class="fu-card-remove" aria-label="Remove ${file.name}" type="button">✕</button>
    `;

    // Load image preview
    if (isImage && !errorMsg) {
      const img = card.querySelector(".fu-thumb-img");
      const reader = new FileReader();
      reader.onload = (e) => { img.src = e.target.result; };
      reader.readAsDataURL(file);
    }

    // Remove button
    card.querySelector(".fu-card-remove").addEventListener("click", () => {
      card.style.animation = "fu-card-out 0.2s ease forwards";
      setTimeout(() => card.remove(), 200);
    });

    preview.appendChild(card);

    // Simulate upload progress (only for valid files)
    if (!errorMsg) simulateUpload(card);
  }

  function simulateUpload(card) {
    const fill = card.querySelector(".fu-progress-fill");
    const status = card.querySelector(".fu-card-status");
    let progress = 0;
    const duration = 1200 + Math.random() * 800;
    const startTime = performance.now();

    function animate(now) {
      const elapsed = now - startTime;
      progress = Math.min((elapsed / duration) * 100, 100);
      fill.style.width = `${progress}%`;

      if (progress < 100) {
        requestAnimationFrame(animate);
      } else {
        status.textContent = "Upload complete";
        status.classList.add("fu-complete");
        card.classList.add("fu-done");
      }
    }

    requestAnimationFrame(animate);
  }

  function formatBytes(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  function truncateFilename(name, max = 24) {
    if (name.length <= max) return name;
    const ext = name.lastIndexOf(".");
    if (ext > 0) {
      return name.slice(0, max - 3 - (name.length - ext)) + "..." + name.slice(ext);
    }
    return name.slice(0, max) + "...";
  }

  function getFileIcon(file) {
    const t = file.type;
    if (t.startsWith("image/")) return "🖼️";
    if (t.startsWith("video/")) return "🎬";
    if (t.startsWith("audio/")) return "🎵";
    if (t.includes("pdf")) return "📄";
    if (t.includes("zip") || t.includes("compressed")) return "📦";
    if (t.includes("spreadsheet") || t.includes("excel") || file.name.endsWith(".xlsx") || file.name.endsWith(".csv")) return "📊";
    if (t.includes("word") || file.name.endsWith(".docx")) return "📝";
    return "📁";
  }
}
