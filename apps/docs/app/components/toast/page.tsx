import type { Metadata } from 'next';
import { ComponentHeader } from '@/components/ComponentHeader';
import { PropsTable } from '@/components/PropsTable';
import { LiveDemo } from '@/components/LiveDemo';

export const metadata: Metadata = {
  title: 'Toast',
  description: 'Display quick feedback notifications with the Mayvio UI Toast component.',
};

const toastProps = [
  {
    name: 'message',
    type: 'string',
    required: true,
    description: 'The text body message of the notification.',
  },
  { name: 'title', type: 'string', description: 'Optional bold header above the message.' },
  {
    name: 'type',
    type: "'success' | 'error' | 'warning' | 'info'",
    default: "'info'",
    description: 'Sets the variant color border theme.',
  },
  {
    name: 'duration',
    type: 'number',
    default: '3000',
    description: 'Time in milliseconds before auto dismissing. Set to 0 to disable auto dismiss.',
  },
];

export default function ToastPage() {
  return (
    <>
      <ComponentHeader
        name="Toast"
        description="Non-intrusive floating feedback messages that slide into corners of the screen to notify user actions."
      />

      <h2 className="section-title">Demo 1 — Toast Variants</h2>
      <LiveDemo
        componentName="Toast Variants"
        code={`<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
  <div class="mv-toast mv-toast--success">
    <div class="mv-toast__content">
      <div class="mv-toast__title">Success</div>
      <div class="mv-toast__message">Your changes have been saved.</div>
    </div>
    <button class="mv-toast__close" aria-label="Dismiss toast">✕</button>
  </div>
  <div class="mv-toast mv-toast--error">
    <div class="mv-toast__content">
      <div class="mv-toast__title">Error</div>
      <div class="mv-toast__message">Failed to upload files.</div>
    </div>
    <button class="mv-toast__close" aria-label="Dismiss toast">✕</button>
  </div>
  <div class="mv-toast mv-toast--warning">
    <div class="mv-toast__content">
      <div class="mv-toast__title">Warning</div>
      <div class="mv-toast__message">Your storage is almost full.</div>
    </div>
    <button class="mv-toast__close" aria-label="Dismiss toast">✕</button>
  </div>
  <div class="mv-toast mv-toast--info">
    <div class="mv-toast__content">
      <div class="mv-toast__title">Information</div>
      <div class="mv-toast__message">A new update is available.</div>
    </div>
    <button class="mv-toast__close" aria-label="Dismiss toast">✕</button>
  </div>
</div>`}
        editorHeight={340}
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
        {`import { ToastContainer, toast } from '@mayvio-ui/react/Toast';

// Mount the container at root of your app shell:
<ToastContainer placement="top-right" />

// Trigger alerts anywhere:
toast.success('Successfully uploaded!', 'File Manager');
toast.error('Connection timed out');`}
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
        {`import { ToastComponent, ToastService } from '@mayvio-ui/angular/toast';

// Place container in your app component HTML:
<mv-toast-container placement="top-right"></mv-toast-container>

// Inject service to trigger toasts:
constructor(private toast: ToastService) {}

showToast() {
  this.toast.success('Successfully uploaded!', 'File Manager');
}`}
      </pre>

      <h2 className="section-title">Props</h2>
      <PropsTable props={toastProps} />
    </>
  );
}
