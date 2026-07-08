import type { Metadata } from 'next';
import { ComponentHeader } from '@/components/ComponentHeader';
import { PropsTable } from '@/components/PropsTable';
import { LiveDemo } from '@/components/LiveDemo';

export const metadata: Metadata = {
  title: 'Tabs',
  description:
    'Organize and navigate between different views within the same context using the Mayvio UI Tabs component.',
};

const tabsProps = [
  {
    name: 'items',
    type: 'TabItem[]',
    default: '[]',
    description: 'The array of tab items { id, label, content, disabled? }.',
  },
  {
    name: 'defaultActiveId',
    type: 'string',
    default: 'undefined',
    description: 'The id of the initially active tab (uncontrolled).',
  },
  {
    name: 'activeId',
    type: 'string',
    default: 'undefined',
    description: 'The id of the currently active tab (controlled).',
  },
  {
    name: 'onChange',
    type: '(id: string) => void',
    default: 'undefined',
    description: 'Callback fired when the active tab changes.',
  },
];

export default function TabsPage() {
  return (
    <>
      <ComponentHeader
        name="Tabs"
        description="Navigate between multiple views or contexts without leaving the current page."
      />

      <h2 className="section-title">Demo 1 — Basic Tabs</h2>
      <LiveDemo
        componentName="Basic Tabs"
        code={`<div class="mv-tabs">
  <div class="mv-tabs__list" role="tablist">
    <button type="button" role="tab" class="mv-tabs__tab mv-tabs__tab--active" aria-selected="true" aria-controls="panel-1" id="tab-1">
      General
    </button>
    <button type="button" role="tab" class="mv-tabs__tab" aria-selected="false" aria-controls="panel-2" id="tab-2">
      Security
    </button>
    <button type="button" role="tab" class="mv-tabs__tab mv-tabs__tab--disabled" aria-selected="false" aria-controls="panel-3" id="tab-3" disabled>
      Advanced
    </button>
  </div>
  
  <div role="tabpanel" id="panel-1" aria-labelledby="tab-1" class="mv-tabs__panel">
    <p>Manage your general account settings.</p>
  </div>
  <div role="tabpanel" id="panel-2" aria-labelledby="tab-2" class="mv-tabs__panel mv-tabs__panel--hidden" hidden>
    <p>Manage your security preferences and 2FA.</p>
  </div>
  <div role="tabpanel" id="panel-3" aria-labelledby="tab-3" class="mv-tabs__panel mv-tabs__panel--hidden" hidden>
    <p>Advanced configuration options.</p>
  </div>
</div>`}
        editorHeight={450}
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
        {`import { Tabs } from '@mayvio-ui/react/Tabs';

const items = [
  { id: 'tab1', label: 'General', content: <p>General settings</p> },
  { id: 'tab2', label: 'Security', content: <p>Security options</p> },
  { id: 'tab3', label: 'Advanced', content: <p>Advanced config</p>, disabled: true },
];

<Tabs items={items} defaultActiveId="tab1" />`}
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
        {`import { TabsComponent, TabComponent } from '@mayvio-ui/angular/tabs';

<mv-tabs>
  <mv-tab label="General" id="tab1">
    <p>General settings</p>
  </mv-tab>
  <mv-tab label="Security" id="tab2">
    <p>Security options</p>
  </mv-tab>
  <mv-tab label="Advanced" id="tab3" [disabled]="true">
    <p>Advanced config</p>
  </mv-tab>
</mv-tabs>`}
      </pre>

      <h2 className="section-title">Props</h2>
      <PropsTable props={tabsProps} />
    </>
  );
}
