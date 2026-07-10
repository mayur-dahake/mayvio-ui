import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import 'mayvio-ui/fileupload/css';

@Component({
  selector: 'mv-fileupload',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mv-fileupload" [class]="className">
      <div
        class="mv-fileupload-dropzone"
        [class.mv-fileupload-dropzone--drag-active]="isDragActive"
        [class.mv-fileupload-dropzone--disabled]="disabled"
        (dragover)="onDragOver($event)"
        (dragleave)="onDragLeave($event)"
        (drop)="onDrop($event)"
        (click)="fileInput.click()"
      >
        <svg
          class="mv-fileupload-icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
        <div class="mv-fileupload-text">{{ label }}</div>
        <div class="mv-fileupload-hint" *ngIf="hint">{{ hint }}</div>

        <input
          #fileInput
          type="file"
          class="mv-fileupload-input"
          [multiple]="multiple"
          [accept]="accept || '*'"
          [disabled]="disabled"
          (change)="onFileInputChange($event)"
        />
      </div>

      <div class="mv-fileupload-list" *ngIf="files.length > 0">
        <div *ngFor="let file of files; let i = index" class="mv-fileupload-item">
          <div class="mv-fileupload-item-info">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              style="color: var(--mv-color-text-muted); flex-shrink: 0;"
            >
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
              <polyline points="13 2 13 9 20 9"></polyline>
            </svg>
            <span class="mv-fileupload-item-name">{{ file.name }}</span>
            <span class="mv-fileupload-item-size">{{ formatSize(file.size) }}</span>
          </div>
          <button
            type="button"
            class="mv-fileupload-item-remove"
            [attr.aria-label]="'Remove ' + file.name"
            (click)="removeFile(i)"
            [disabled]="disabled"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
})
export class FileUploadComponent {
  @Input() multiple = false;
  @Input() accept?: string;
  @Input() maxSize?: number;
  @Input() disabled = false;
  @Input() label = 'Drag and drop files here or click to browse';
  @Input() hint = 'Max file size: 5MB';
  @Input() className = '';

  @Output() fileChange = new EventEmitter<File[]>();

  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  files: File[] = [];
  isDragActive = false;
  private cdr = inject(ChangeDetectorRef);

  onDragOver(e: DragEvent) {
    e.preventDefault();
    if (!this.disabled) {
      this.isDragActive = true;
      this.cdr.markForCheck();
    }
  }

  onDragLeave(e: DragEvent) {
    e.preventDefault();
    this.isDragActive = false;
    this.cdr.markForCheck();
  }

  onDrop(e: DragEvent) {
    e.preventDefault();
    this.isDragActive = false;
    if (this.disabled) return;

    if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      this.handleFiles(e.dataTransfer.files);
    }
    this.cdr.markForCheck();
  }

  onFileInputChange(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.handleFiles(target.files);
    }
    if (this.fileInputRef?.nativeElement) {
      this.fileInputRef.nativeElement.value = '';
    }
  }

  handleFiles(fileList: FileList) {
    let validFiles = Array.from(fileList);

    if (this.maxSize) {
      validFiles = validFiles.filter((f) => f.size <= this.maxSize!);
    }

    if (!this.multiple && validFiles.length > 0) {
      validFiles = [validFiles[0]];
    }

    this.files = this.multiple ? [...this.files, ...validFiles] : validFiles;
    this.fileChange.emit(this.files);
    this.cdr.markForCheck();
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
    this.files = [...this.files];
    this.fileChange.emit(this.files);
    this.cdr.markForCheck();
  }

  formatSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }
}
