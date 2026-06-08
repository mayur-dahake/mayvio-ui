// @ts-nocheck
import React, { useRef, useEffect } from "react";
import { initFileUpload } from "mayvio-ui/scripts/components/file-upload.js";

/**
 * FileUploadWrapper
 * React integration example for the Mayvio UI File Upload Zone component.
 *
 * Props:
 *   accept: string — comma-separated accepted types (default "image/*,.pdf,.docx")
 *   maxSizeMB: number — max file size in MB (default 5)
 */
export function FileUploadWrapper({ accept = "image/*,.pdf,.docx", maxSizeMB = 5 }) {
  const zoneRef = useRef(null);

  useEffect(() => {
    const cleanup = initFileUpload(zoneRef.current);
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div className="fu-wrapper">
      <div
        className="fu-zone"
        ref={zoneRef}
        role="region"
        aria-label="File upload drop zone"
        data-accept={accept}
        data-max-size={maxSizeMB}
      >
        <input
          className="fu-input"
          type="file"
          multiple
          accept={accept}
          aria-label="Upload files"
          tabIndex={-1}
        />
        <div className="fu-zone-icon" aria-hidden="true">☁️</div>
        <p className="fu-zone-title">Drop files here or browse</p>
        <p className="fu-zone-sub">Accepted: {accept}</p>
        <button className="fu-browse-btn" type="button">Browse Files</button>
        <p className="fu-meta">Max size: {maxSizeMB} MB per file</p>
      </div>
      <div className="fu-preview" aria-live="polite" aria-label="Uploaded files"></div>
    </div>
  );
}
