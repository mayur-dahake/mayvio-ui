export interface FileUploadConfig {
  /**
   * Whether multiple files can be selected
   * @default false
   */
  multiple?: boolean;

  /**
   * Comma-separated list of accepted file types (e.g. '.pdf,image/*')
   */
  accept?: string;

  /**
   * Maximum allowed file size in bytes
   */
  maxSize?: number;

  /**
   * Whether the file upload is disabled
   * @default false
   */
  disabled?: boolean;
}
