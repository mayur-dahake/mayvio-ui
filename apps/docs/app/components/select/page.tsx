import { ComponentHeader } from '../../../components/ComponentHeader';
import { PropsTable } from '../../../components/PropsTable';
import { LiveDemo } from '../../../components/LiveDemo';

export const metadata = {
  title: 'Select - Mayvio UI',
  description: 'Displays a list of options for the user to pick from.',
};

export default function SelectPage() {
  return (
    <div className="space-y-12">
      <ComponentHeader
        name="Select"
        description="Displays a list of options for the user to pick from."
        npm="@mayvio-ui/react"
      />

      <section>
        <h2 className="text-2xl font-bold mb-6">Usage</h2>
        <LiveDemo
          code={`import { Select } from '@mayvio-ui/react';\n\nexport default function App() {\n  return (\n    <Select\n      options={[\n        { label: 'Apple', value: 'apple' },\n        { label: 'Banana', value: 'banana' },\n        { label: 'Blueberry', value: 'blueberry' },\n      ]}\n    />\n  );\n}`}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Props</h2>
        <PropsTable
          props={[
            { name: 'options', type: 'SelectOption[]', default: '[]', description: 'The options to render inside the select' },
            { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'The size of the select' },
            { name: 'error', type: 'boolean', default: 'false', description: 'Whether the select is in an error state' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the select is disabled' },
          ]}
        />
      </section>
    </div>
  );
}
