import { Injectable, signal } from '@angular/core';

export interface ToastItem {
  id: string;
  title?: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  readonly toasts = signal<ToastItem[]>([]);

  show(message: string, title?: string, type: ToastItem['type'] = 'info', duration = 3000): string {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastItem = { id, message, title, type, duration };

    this.toasts.update((current) => [...current, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        this.dismiss(id);
      }, duration);
    }

    return id;
  }

  success(message: string, title?: string, duration?: number): string {
    return this.show(message, title, 'success', duration);
  }

  error(message: string, title?: string, duration?: number): string {
    return this.show(message, title, 'error', duration);
  }

  warning(message: string, title?: string, duration?: number): string {
    return this.show(message, title, 'warning', duration);
  }

  info(message: string, title?: string, duration?: number): string {
    return this.show(message, title, 'info', duration);
  }

  dismiss(id: string): void {
    this.toasts.update((current) => current.filter((t) => t.id !== id));
  }
}
