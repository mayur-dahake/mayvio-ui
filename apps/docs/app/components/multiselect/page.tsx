import { ComponentHeader } from '@/components/ComponentHeader';
import { LiveDemo } from '@/components/LiveDemo';
import { PropsTable } from '@/components/PropsTable';

const basicUsageCode = `import { useState } from 'react';
import { MultiSelect } from '@mayvio-ui/react';

export default function App() {
  const [value, setValue] = useState<string[]>(['react', 'angular']);
  
  const options = [
    { value: 'react', label: 'React' },
    { value: 'angular', label: 'Angular' },
    { value: 'vue', label: 'Vue' },
    { value: 'svelte', label: 'Svelte' },
  ];

  return (
    <div style={{ maxWidth: 300 }}>
      <MultiSelect 
        options={options}
        value={value}
        onChange={(val) => setValue(val as string[])}
        placeholder="Select frameworks..."
      />
    </div>
  );
}
`;

export default function MultiSelectPage() {
  return (
    <div className="space-y-12 pb-24">
      <ComponentHeader
        name="MultiSelect"
        description="A dropdown component that allows users to select multiple options from a list."
        npm="@mayvio-ui/react"
      />

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">Usage</h2>
        <LiveDemo code={basicUsageCode} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">Props</h2>
        <PropsTable
          props={[
            {
              name: 'options',
              type: '{ value: string | number; label: string; disabled?: boolean; }[]',
              description: 'The list of options to select from.',
              required: true,
            },
            {
              name: 'value',
              type: '(string | number)[]',
              description: 'The currently selected values.',
            },
            {
              name: 'onChange',
              type: '(value: (string | number)[]) => void',
              description: 'Callback fired when selection changes.',
            },
            {
              name: 'placeholder',
              type: 'string',
              description: 'Text to display when no options are selected.',
            },
            {
              name: 'disabled',
              type: 'boolean',
              description: 'Whether the multiselect is disabled.',
            },
          ]}
        />
      </section>
    </div>
  );
}
