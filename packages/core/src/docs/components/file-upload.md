# File Upload Zone

The **File Upload Zone** provides a drag-and-drop area for selecting and uploading files, with type/size validation, image thumbnails, per-file progress bars, and animated preview cards.

---

## 📂 File Requirements
* **CSS:** [file-upload.css](file:///Volumes/SSD/Projects/UI%20Projects/mayvio-ui/styles/components/file-upload.css)
* **JS:** [file-upload.js](file:///Volumes/SSD/Projects/UI%20Projects/mayvio-ui/scripts/components/file-upload.js)

---

## 🧱 HTML Template
```html
<div class="fu-wrapper">
  <!-- Drop Zone -->
  <div class="fu-zone" role="region" aria-label="File upload drop zone"
    data-accept="image/*,.pdf,.docx" data-max-size="5">
    <input class="fu-input" type="file" multiple
      accept="image/*,.pdf,.docx" aria-label="Upload files" tabindex="-1" />
    <div class="fu-zone-icon" aria-hidden="true">☁️</div>
    <p class="fu-zone-title">Drop files here or browse</p>
    <p class="fu-zone-sub">Accepted: Images, PDF, DOCX</p>
    <button class="fu-browse-btn" type="button">Browse Files</button>
    <p class="fu-meta">Max size: 5 MB per file</p>
  </div>

  <!-- Preview Cards (populated dynamically) -->
  <div class="fu-preview" aria-live="polite" aria-label="Uploaded files"></div>
</div>
```

---

## ⚙️ Configuration Attributes

| Attribute | Example | Description |
|---|---|---|
| `data-accept` | `image/*,.pdf` | Comma-separated list of accepted MIME types or extensions |
| `data-max-size` | `5` | Maximum file size in megabytes per file |

---

## ⚙️ JavaScript Initialization
```javascript
import { initFileUpload } from "./components/file-upload.js";

// Initializes all .fu-zone elements on the page
initFileUpload();
```

---

## ♿ Accessibility
* Drop zone uses `role="region"` with `aria-label` for screen reader announcement
* Preview container uses `aria-live="polite"` so newly added file cards are announced
* Each remove button has `aria-label="Remove <filename>"` for specific identification
* The hidden `<input type="file">` is linked to the Browse button via script; the zone itself is the visible interactive element

---

## 🎨 CSS Customization Variables

| CSS Variable | Default Value | Description |
|---|---|---|
| `--primary` | `hsl(250 85% 65%)` | Drop zone hover border, progress fill color |
| `--card` | `hsl(240 10% 16%)` | Preview card background |
| `--border` | `hsl(240 10% 22%)` | Drop zone dashed border and card outline |
| `--error` | `#ef4444` | Error card border, error message text |
| `--success` | `#10b981` | Completed card border, progress bar done state |

---

## 🔌 Framework Quick Start
* **React:** Manage an array of `{ file, status, progress }` in state; use the native `File` API and `FileReader` for previews; dispatch progress events via `XMLHttpRequest.upload.onprogress`.
* **Angular:** Create a `FileUploadService` that wraps `HttpClient.post()` with `reportProgress: true` and `observe: 'events'`; listen for `HttpEventType.UploadProgress` to drive progress bars.
