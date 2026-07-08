import { ComponentHeader } from '@/components/ComponentHeader';
import { LiveDemo } from '@/components/LiveDemo';
import { PropsTable } from '@/components/PropsTable';

const basicUsageCode = `import { Accordion } from '@mayvio-ui/react';

export default function App() {
  const items = [
    {
      id: 'section-1',
      title: 'Is it accessible?',
      content: 'Yes. It adheres to the WAI-ARIA design pattern.'
    },
    {
      id: 'section-2',
      title: 'Is it styled?',
      content: 'Yes. It comes with default styles that matches the other components\\' aesthetic.'
    },
    {
      id: 'section-3',
      title: 'Is it animated?',
      content: 'Yes. It is animated by default, but you can disable it if you prefer.'
    },
    {
      id: 'section-4',
      title: 'Can it be disabled?',
      content: 'Yes, just add disabled: true to the item object.',
      disabled: true
    }
  ];

  return <Accordion items={items} />;
}
`;

const multipleUsageCode = `import { Accordion } from '@mayvio-ui/react';

export default function App() {
  const items = [
    {
      id: 'section-1',
      title: 'First Section',
      content: 'You can expand this...'
    },
    {
      id: 'section-2',
      title: 'Second Section',
      content: '...and expand this at the same time!'
    },
    {
      id: 'section-3',
      title: 'Third Section',
      content: 'Try it out.'
    }
  ];

  return <Accordion items={items} allowMultiple defaultExpandedIds={['section-1']} />;
}
`;

export default function AccordionPage() {
  return (
    <div className="space-y-12 pb-24">
      <ComponentHeader
        name="Accordion"
        description="A vertically stacked set of interactive headings that each reveal a section of content."
        npm="@mayvio-ui/react"
      />

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">Usage</h2>
        <LiveDemo code={basicUsageCode} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">
          Allow Multiple
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          By default, only one section can be open at a time. Set{' '}
          <code className="text-sm bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">
            allowMultiple
          </code>{' '}
          to true to allow multiple sections to be open.
        </p>
        <LiveDemo code={multipleUsageCode} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">Props</h2>
        <PropsTable
          props={[
            {
              name: 'items',
              type: 'AccordionItem[]',
              description: 'Array of items containing id, title, content, and optionally disabled.',
              required: true,
            },
            {
              name: 'allowMultiple',
              type: 'boolean',
              description: 'If true, multiple sections can be expanded at the same time.',
              default: 'false',
            },
            {
              name: 'defaultExpandedIds',
              type: 'string[]',
              description: 'The ids of the initially expanded items (uncontrolled mode).',
            },
            {
              name: 'expandedIds',
              type: 'string[]',
              description: 'The ids of the currently expanded items (controlled mode).',
            },
            {
              name: 'onChange',
              type: '(expandedIds: string[]) => void',
              description: 'Callback fired when the expanded items change.',
            },
          ]}
        />
      </section>
    </div>
  );
}
