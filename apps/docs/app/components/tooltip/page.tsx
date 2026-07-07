import type { Metadata } from 'next';
import { ComponentHeader } from '@/components/ComponentHeader';
import { PropsTable } from '@/components/PropsTable';
import { LiveDemo } from '@/components/LiveDemo';

export const metadata: Metadata = {
  title: 'Tooltip',
  description: 'Provide contextual helper information with the Mayvio UI Tooltip component.',
};

const tooltipProps = [
  {
    name: 'content',
    type: 'string',
    required: true,
    description: 'The text message shown inside the tooltip overlay.',
  },
  {
    name: 'placement',
    type: "'top' | 'bottom' | 'left' | 'right'",
    default: "'top'",
    description: 'Sets the direction the tooltip opens.',
  },
  {
    name: 'delay',
    type: 'number',
    default: '0',
    description: 'Sets the hover opening delay time in milliseconds.',
  },
  {
    name: 'children',
    type: 'React.ReactElement',
    required: true,
    description: 'The target element trigger.',
  },
  {
    name: '...props',
    type: 'React.HTMLAttributes<HTMLDivElement>',
    description: 'Any container div HTML attributes.',
  },
];

export default function TooltipPage() {
  return (
    <>
      <ComponentHeader
        name="Tooltip"
        description="Helper label popup providing contextual descriptions when hovering or focusing interactive elements."
      />

      <h2 className="section-title">Demo 1 — Placements</h2>
      <LiveDemo
        componentName="Tooltip Placements"
        code={`<div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', padding: 40, justifyContent: 'center' }}>
  <div class="mv-tooltip-container">
    <button class="mv-button mv-button--md mv-button--primary">Top Trigger</button>
    <div class="mv-tooltip mv-tooltip--top mv-tooltip--visible" role="tooltip">Top Tooltip</div>
  </div>
  <div class="mv-tooltip-container">
    <button class="mv-button mv-button--md mv-button--primary">Bottom Trigger</button>
    <div class="mv-tooltip mv-tooltip--bottom mv-tooltip--visible" role="tooltip">Bottom Tooltip</div>
  </div>
  <div class="mv-tooltip-container">
    <button class="mv-button mv-button--md mv-button--primary">Left Trigger</button>
    <div class="mv-tooltip mv-tooltip--left mv-tooltip--visible" role="tooltip">Left Tooltip</div>
  </div>
  <div class="mv-tooltip-container">
    <button class="mv-button mv-button--md mv-button--primary">Right Trigger</button>
    <div class="mv-tooltip mv-tooltip--right mv-tooltip--visible" role="tooltip">Right Tooltip</div>
  </div>
</div>`}
        editorHeight={240}
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
        {`import { Tooltip } from '@mayvio-ui/react/Tooltip';

<Tooltip content="Helper text info" placement="top">
  <button>Hover me</button>
</Tooltip>`}
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
        {`import { TooltipDirective } from '@mayvio-ui/angular/tooltip';

<button [mvTooltip]="'Helper text info'" placement="top">Hover me</button>`}
      </pre>

      <h2 className="section-title">Props</h2>
      <PropsTable props={tooltipProps} />
    </>
  );
}
