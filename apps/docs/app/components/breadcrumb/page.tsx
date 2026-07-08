import type { Metadata } from 'next';
import { ComponentHeader } from '@/components/ComponentHeader';
import { PropsTable } from '@/components/PropsTable';
import { LiveDemo } from '@/components/LiveDemo';

export const metadata: Metadata = {
  title: 'Breadcrumb',
  description:
    'Provide navigational context and hierarchical orientation with the Mayvio UI Breadcrumb component.',
};

const breadcrumbProps = [
  {
    name: 'items',
    type: 'BreadcrumbItem[]',
    default: '[]',
    description: 'The array of breadcrumb items { label, href, active }.',
  },
  {
    name: 'separator',
    type: 'ReactNode',
    default: "'/'",
    description: 'Custom separator between breadcrumb items.',
  },
];

export default function BreadcrumbPage() {
  return (
    <>
      <ComponentHeader
        name="Breadcrumb"
        description="Indicates the current page's location within a navigational hierarchy."
      />

      <h2 className="section-title">Demo 1 — Basic Breadcrumb</h2>
      <LiveDemo
        componentName="Basic Breadcrumb"
        code={`<nav class="mv-breadcrumb" aria-label="Breadcrumb">
  <ol class="mv-breadcrumb__list">
    <li class="mv-breadcrumb__item">
      <a href="#" class="mv-breadcrumb__link">Home</a>
      <span class="mv-breadcrumb__separator" aria-hidden="true">/</span>
    </li>
    <li class="mv-breadcrumb__item">
      <a href="#" class="mv-breadcrumb__link">Dashboard</a>
      <span class="mv-breadcrumb__separator" aria-hidden="true">/</span>
    </li>
    <li class="mv-breadcrumb__item mv-breadcrumb__item--active" aria-current="page">
      <span class="mv-breadcrumb__link">Settings</span>
    </li>
  </ol>
</nav>`}
        editorHeight={250}
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
        {`import { Breadcrumb } from '@mayvio-ui/react/Breadcrumb';

const items = [
  { label: 'Home', href: '/' },
  { label: 'Users', href: '/users' },
  { label: 'Profile' }
];

<Breadcrumb items={items} />
<Breadcrumb items={items} separator=">" />`}
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
        {`import { BreadcrumbComponent } from '@mayvio-ui/angular/breadcrumb';

items = [
  { label: 'Home', href: '/' },
  { label: 'Users', href: '/users' },
  { label: 'Profile' }
];

<mv-breadcrumb [items]="items"></mv-breadcrumb>
<mv-breadcrumb [items]="items" separator=">"></mv-breadcrumb>`}
      </pre>

      <h2 className="section-title">Props</h2>
      <PropsTable props={breadcrumbProps} />
    </>
  );
}
