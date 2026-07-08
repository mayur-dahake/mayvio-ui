import { ToastItem } from './Toast.types.js';

type Listener = (toasts: ToastItem[]) => void;
let listeners: Listener[] = [];
let toastsList: ToastItem[] = [];

function emitChange() {
  listeners.forEach((l) => l([...toastsList]));
}

export const toast = {
  subscribe(listener: Listener) {
    listeners.push(listener);
    listener([...toastsList]);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },

  show(message: string, title?: string, type: ToastItem['type'] = 'info', duration = 3000) {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastItem = { id, message, title, type, duration };
    toastsList = [...toastsList, newToast];
    emitChange();

    if (duration > 0) {
      setTimeout(() => {
        this.dismiss(id);
      }, duration);
    }
  },

  success(message: string, title?: string, duration?: number) {
    this.show(message, title, 'success', duration);
  },

  error(message: string, title?: string, duration?: number) {
    this.show(message, title, 'error', duration);
  },

  warning(message: string, title?: string, duration?: number) {
    this.show(message, title, 'warning', duration);
  },

  info(message: string, title?: string, duration?: number) {
    this.show(message, title, 'info', duration);
  },

  dismiss(id: string) {
    toastsList = toastsList.filter((t) => t.id !== id);
    emitChange();
  },
};
