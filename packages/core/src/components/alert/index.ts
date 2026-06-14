export interface AlertConfig {
  variant?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export type AlertVariant = NonNullable<AlertConfig['variant']>;
