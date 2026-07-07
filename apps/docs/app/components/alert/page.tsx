import type { Metadata } from 'next';
import { ComponentHeader } from '@/components/ComponentHeader';
import { PropsTable } from '@/components/PropsTable';
import { LiveDemo } from '@/components/LiveDemo';

export const metadata: Metadata = {
  title: 'Alert',
  description: 'Display contextual feedback messages with the Mayvio UI Alert component.',
};

const alertProps = [
  {
    name: 'variant',
    type: "'success' | 'error' | 'warning' | 'info'",
    default: "'info'",
    description: 'The colour theme and meaning of the alert.',
  },
  { name: 'title', type: 'string', description: 'Optional bold heading shown above the message.' },
  {
    name: 'dismissible',
    type: 'boolean',
    default: 'false',
    description: 'Shows a ✕ close button. Clicking it triggers onDismiss after the exit animation.',
  },
  {
    name: 'onDismiss',
    type: '() => void',
    description: 'Callback fired after the alert finishes its dismiss animation.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    required: true,
    description: 'The main alert message body.',
  },
  {
    name: '...props',
    type: 'React.HTMLAttributes<HTMLDivElement>',
    description: 'Any additional div HTML attributes.',
  },
];

export default function AlertPage() {
  return (
    <>
      <ComponentHeader
        name="Alert"
        description="Contextual feedback messages for success, error, warning, or informational states. Supports titles, dismiss animation, and custom callbacks."
      />

      <h2 className="section-title">Demo 1 — All Variants</h2>
      <LiveDemo
        componentName="Alert Variants"
        code={`<>
  <div class="mv-alert mv-alert--success">
    <span class="mv-alert__icon" aria-hidden="true">✓</span>
    <div class="mv-alert__content">
      <div class="mv-alert__message">Your changes have been saved.</div>
    </div>
  </div>
  <div class="mv-alert mv-alert--error">
    <span class="mv-alert__icon" aria-hidden="true">✕</span>
    <div class="mv-alert__content">
      <div class="mv-alert__message">Something went wrong. Please try again.</div>
    </div>
  </div>
  <div class="mv-alert mv-alert--warning">
    <span class="mv-alert__icon" aria-hidden="true">⚠</span>
    <div class="mv-alert__content">
      <div class="mv-alert__message">Your session will expire in 5 minutes.</div>
    </div>
  </div>
  <div class="mv-alert mv-alert--info">
    <span class="mv-alert__icon" aria-hidden="true">ℹ</span>
    <div class="mv-alert__content">
      <div class="mv-alert__message">A new version is available.</div>
    </div>
  </div>
</>`}
        editorHeight={280}
      />

      <h2 className="section-title">Demo 2 — With Title</h2>
      <LiveDemo
        componentName="Alert Title"
        code={`<div class="mv-alert mv-alert--success">
  <span class="mv-alert__icon" aria-hidden="true">✓</span>
  <div class="mv-alert__content">
    <div class="mv-alert__title">Payment successful</div>
    <div class="mv-alert__message">Your subscription has been activated. Check your email for the receipt.</div>
  </div>
</div>`}
        editorHeight={140}
      />

      <h2 className="section-title">Demo 3 — Dismissible (React)</h2>
      <LiveDemo
        componentName="Alert Dismiss"
        code={`<>
  <div class="mv-alert mv-alert--info">
    <span class="mv-alert__icon" aria-hidden="true">ℹ</span>
    <div class="mv-alert__content">
      <div class="mv-alert__title">Update available</div>
      <div class="mv-alert__message">Version 4.0 is ready to install.</div>
    </div>
    <button class="mv-alert__close" aria-label="Dismiss alert">✕</button>
  </div>
</>`}
        editorHeight={140}
      />

      <h2 className="section-title">React Usage</h2>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 'var(--mv-radius-md)',
          padding: 16,
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          marginBottom: 24,
          overflowX: 'auto',
        }}
      >
        {`import { Alert } from '@mayvio-ui/react/Alert';

<Alert variant="success">Changes saved!</Alert>
<Alert variant="error" title="Error">Failed to connect.</Alert>
<Alert variant="info" dismissible onDismiss={() => console.log('dismissed')}>
  A new version is available.
</Alert>`}
      </pre>

      <h2 className="section-title">Angular Usage</h2>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 'var(--mv-radius-md)',
          padding: 16,
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          marginBottom: 24,
          overflowX: 'auto',
        }}
      >
        {`import { AlertComponent } from '@mayvio-ui/angular/alert';

<mv-alert variant="success">Changes saved!</mv-alert>
<mv-alert variant="error" title="Error">Failed to connect.</mv-alert>
<mv-alert variant="info" [dismissible]="true" (dismissed)="onDismissed()">
  A new version is available.
</mv-alert>`}
      </pre>

      <h2 className="section-title">Props</h2>
      <PropsTable props={alertProps} />
    </>
  );
}
