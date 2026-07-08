import type { Metadata } from 'next';
import { ComponentHeader } from '@/components/ComponentHeader';
import { PropsTable } from '@/components/PropsTable';
import { LiveDemo } from '@/components/LiveDemo';

export const metadata: Metadata = {
  title: 'ProgressBar',
  description:
    'Provide visual loading progress representation with the Mayvio UI ProgressBar component.',
};

const progressProps = [
  { name: 'value', type: 'number', default: '0', description: 'The progress completion value.' },
  {
    name: 'max',
    type: 'number',
    default: '100',
    description: 'The total metric range completion limit.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Sets the progress track thickness.',
  },
  {
    name: 'indeterminate',
    type: 'boolean',
    default: 'false',
    description: 'Sets an infinite loop loading animation.',
  },
];

export default function ProgressBarPage() {
  return (
    <>
      <ComponentHeader
        name="ProgressBar"
        description="Status indicators displaying task progress percentages or active loader states."
      />

      <h2 className="section-title">Demo 1 — Sizes</h2>
      <LiveDemo
        componentName="ProgressBar Sizes"
        code={`<div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
  {/* Small track progress */}
  <div class="mv-progress-bar mv-progress-bar--sm" role="progressbar">
    <div class="mv-progress-bar__track">
      <div class="mv-progress-bar__fill" style={{ width: '40%' }}></div>
    </div>
  </div>
  
  {/* Medium track progress */}
  <div class="mv-progress-bar mv-progress-bar--md" role="progressbar">
    <div class="mv-progress-bar__track">
      <div class="mv-progress-bar__fill" style={{ width: '60%' }}></div>
    </div>
  </div>
  
  {/* Large track progress */}
  <div class="mv-progress-bar mv-progress-bar--lg" role="progressbar">
    <div class="mv-progress-bar__track">
      <div class="mv-progress-bar__fill" style={{ width: '80%' }}></div>
    </div>
  </div>
</div>`}
        editorHeight={200}
      />

      <h2 className="section-title">Demo 2 — Indeterminate Loader</h2>
      <LiveDemo
        componentName="Indeterminate Loader"
        code={`<div class="mv-progress-bar mv-progress-bar--md" role="progressbar">
  <div class="mv-progress-bar__track mv-progress-bar__track--indeterminate">
    <div class="mv-progress-bar__fill"></div>
  </div>
</div>`}
        editorHeight={100}
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
        {`import { ProgressBar } from '@mayvio-ui/react/ProgressBar';

<ProgressBar value={60} />
<ProgressBar size="sm" value={20} max={50} />
<ProgressBar indeterminate size="lg" />`}
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
        {`import { ProgressBarComponent } from '@mayvio-ui/angular/progress-bar';

<mv-progress-bar [value]="60"></mv-progress-bar>
<mv-progress-bar size="sm" [value]="20" [max]="50"></mv-progress-bar>
<mv-progress-bar indeterminate="true" size="lg"></mv-progress-bar>`}
      </pre>

      <h2 className="section-title">Props</h2>
      <PropsTable props={progressProps} />
    </>
  );
}
