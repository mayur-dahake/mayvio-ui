import { ComponentHeader } from '../../../components/ComponentHeader';
import { PropsTable } from '../../../components/PropsTable';
import { LiveDemo } from '../../../components/LiveDemo';

export const metadata = {
  title: 'RadioGroup - Mayvio UI',
  description: 'A set of checkable buttons, known as radio buttons, where no more than one of the buttons can be checked at a time.',
};

export default function RadioGroupPage() {
  return (
    <div className="space-y-12">
      <ComponentHeader
        name="Radiogroup"
        description="A set of checkable buttons, known as radio buttons, where no more than one of the buttons can be checked at a time."
        npm="@mayvio-ui/react"
      />

      <section>
        <h2 className="text-2xl font-bold mb-6">Usage</h2>
        <LiveDemo
          code={`import { RadioGroup } from '@mayvio-ui/react';\n\nexport default function App() {\n  return (\n    <RadioGroup\n      name="contact"\n      options={[\n        { label: 'Email', value: 'email' },\n        { label: 'Phone', value: 'phone' },\n        { label: 'Mail', value: 'mail' },\n      ]}\n    />\n  );\n}`}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Props</h2>
        <PropsTable
          props={[
            { name: 'options', type: 'RadioOption[]', default: '[]', description: 'The options for the radio group' },
            { name: 'orientation', type: '"vertical" | "horizontal"', default: '"vertical"', description: 'The layout orientation' },
            { name: 'value', type: 'string', default: '-', description: 'The currently selected value' },
            { name: 'error', type: 'boolean', default: 'false', description: 'Whether the radio group is in an error state' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the radio group is disabled' },
          ]}
        />
      </section>
    </div>
  );
}
