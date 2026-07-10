import { InputHTMLAttributes } from 'react';
import { FileUploadConfig } from 'mayvio-ui/fileupload';

export interface FileUploadProps
  extends
    Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'defaultValue' | 'onChange'>,
    FileUploadConfig {
  /**
   * Label for the dropzone
   * @default 'Drag and drop files here or click to browse'
   */
  label?: string;

  /**
   * Hint text below the label
   * @default 'Max file size: 5MB'
   */
  hint?: string;

  /**
   * Callback when files change
   */
  onChange?: (files: File[]) => void;
}
