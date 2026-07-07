import type { Metadata } from 'next';
import { ComponentHeader } from '@/components/ComponentHeader';
import { PropsTable } from '@/components/PropsTable';
import { LiveDemo } from '@/components/LiveDemo';

export const metadata: Metadata = {
  title: 'Badge',
  description: 'Display status indicators, labels, and counts with the Mayvio UI Badge component.',
};

const badgeProps = [
  {
    name: 'variant',
    type: "'success' | 'error' | 'warning' | 'info'",
    default: "'info'",
    description: 'Controls the colour theme of the badge.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Sets the padding and font size.',
  },
  {
    name: 'dot',
    type: 'boolean',
    default: 'false',
    description: 'Prepends a small colour dot before the text.',
  },
  {
    name: 'outline',
    type: 'boolean',
    default: 'false',
    description: 'Renders a border-only (transparent fill) style.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    required: true,
    description: 'The badge label content.',
  },
  {
    name: '...props',
    type: 'React.HTMLAttributes<HTMLSpanElement>',
    description: 'Any additional span HTML attributes.',
  },
];

export default function BadgePage() {
  return (
    <>
      <ComponentHeader
        name="Badge"
        description="Small visual labels for status, categories, or counts. Supports multiple variants, sizes, and style modifiers."
      />

      <h2 className="section-title">Demo 1 — Variants</h2>
      <LiveDemo
        componentName="Badge Variants"
        code={`<>
  <span class="mv-badge mv-badge--md mv-badge--success">Success</span>
  <span class="mv-badge mv-badge--md mv-badge--error">Error</span>
  <span class="mv-badge mv-badge--md mv-badge--warning">Warning</span>
  <span class="mv-badge mv-badge--md mv-badge--info">Info</span>
</>`}
        editorHeight={140}
      />

      <h2 className="section-title">Demo 2 — Sizes</h2>
      <LiveDemo
        componentName="Badge Sizes"
        code={`<>
  <span class="mv-badge mv-badge--sm mv-badge--info">Small</span>
  <span class="mv-badge mv-badge--md mv-badge--info">Medium</span>
  <span class="mv-badge mv-badge--lg mv-badge--info">Large</span>
</>`}
        editorHeight={120}
      />

      <h2 className="section-title">Demo 3 — Dot &amp; Outline Modifiers</h2>
      <LiveDemo
        componentName="Badge Modifiers"
        code={`<>
  <span class="mv-badge mv-badge--md mv-badge--success mv-badge--dot">Active</span>
  <span class="mv-badge mv-badge--md mv-badge--error mv-badge--dot">Offline</span>
  <span class="mv-badge mv-badge--md mv-badge--info mv-badge--outline">Outlined</span>
  <span class="mv-badge mv-badge--md mv-badge--warning mv-badge--outline mv-badge--dot">Pending</span>
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
        {`import { Badge } from '@mayvio-ui/react/Badge';

<Badge variant="success">Active</Badge>
<Badge variant="error" size="sm">Error</Badge>
<Badge variant="info" dot outline>Pending</Badge>`}
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
        {`import { BadgeComponent } from '@mayvio-ui/angular/badge';

<mv-badge variant="success">Active</mv-badge>
<mv-badge variant="error" size="sm">Error</mv-badge>
<mv-badge variant="info" [dot]="true" [outline]="true">Pending</mv-badge>`}
      </pre>

      <h2 className="section-title">Props</h2>
      <PropsTable props={badgeProps} />
    </>
  );
}
