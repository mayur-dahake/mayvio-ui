import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { FileUploadProps } from './FileUpload.types.js';
import 'mayvio-ui/fileupload/css';

export function FileUpload({
  multiple = false,
  accept,
  maxSize,
  disabled = false,
  label = 'Drag and drop files here or click to browse',
  hint = 'Max file size: 5MB',
  className = '',
  onChange,
  ...props
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (newFiles: FileList | File[]) => {
    let validFiles = Array.from(newFiles);

    if (maxSize) {
      validFiles = validFiles.filter((f) => f.size <= maxSize);
    }

    if (!multiple && validFiles.length > 0) {
      validFiles = [validFiles[0]];
    }

    const updatedFiles = multiple ? [...files, ...validFiles] : validFiles;
    setFiles(updatedFiles);
    onChange?.(updatedFiles);
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) setIsDragActive(true);
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    if (disabled) return;
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
    // reset input so same file can be selected again
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onChange?.(newFiles);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className={`mv-fileupload ${className}`}>
      <div
        className={`mv-fileupload-dropzone ${isDragActive ? 'mv-fileupload-dropzone--drag-active' : ''} ${disabled ? 'mv-fileupload-dropzone--disabled' : ''}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
      >
        <svg
          className="mv-fileupload-icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
        <div className="mv-fileupload-text">{label}</div>
        {hint && <div className="mv-fileupload-hint">{hint}</div>}

        <input
          type="file"
          className="mv-fileupload-input"
          ref={inputRef}
          multiple={multiple}
          accept={accept}
          disabled={disabled}
          onChange={onChangeInput}
          data-testid="fileupload-input"
          {...props}
        />
      </div>

      {files.length > 0 && (
        <div className="mv-fileupload-list">
          {files.map((file, i) => (
            <div key={`${file.name}-${i}`} className="mv-fileupload-item">
              <div className="mv-fileupload-item-info">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: 'var(--mv-color-text-muted)', flexShrink: 0 }}
                >
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                  <polyline points="13 2 13 9 20 9"></polyline>
                </svg>
                <span className="mv-fileupload-item-name">{file.name}</span>
                <span className="mv-fileupload-item-size">{formatSize(file.size)}</span>
              </div>
              <button
                type="button"
                className="mv-fileupload-item-remove"
                aria-label={`Remove ${file.name}`}
                onClick={() => removeFile(i)}
                disabled={disabled}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
