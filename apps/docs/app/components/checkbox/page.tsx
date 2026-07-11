import { ComponentHeader } from '../../../components/ComponentHeader';
import { PropsTable } from '../../../components/PropsTable';
import { LiveDemo } from '../../../components/LiveDemo';

export const metadata = {
  title: 'Checkbox - Mayvio UI',
  description: 'A control that allows the user to toggle between checked and not checked.',
};

export default function CheckboxPage() {
  return (
    <div className="space-y-12">
      <ComponentHeader
        name="Checkbox"
        description="A control that allows the user to toggle between checked and not checked."
        npm="@mayvio-ui/react"
      />

      <section>
        <h2 className="text-2xl font-bold mb-6">Usage</h2>
        <LiveDemo
          code={`import { Checkbox } from '@mayvio-ui/react';\n\nexport default function App() {\n  return <Checkbox label="Accept terms and conditions" />;\n}`}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Props</h2>
        <PropsTable
          props={[
            { name: 'label', type: 'ReactNode', default: '-', description: 'The text label for the checkbox' },
            { name: 'checked', type: 'boolean', default: 'false', description: 'Whether the checkbox is checked' },
            { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Whether the checkbox is in an indeterminate state' },
            { name: 'error', type: 'boolean', default: 'false', description: 'Whether the checkbox is in an error state' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the checkbox is disabled' },
          ]}
        />
      </section>
    </div>
  );
}
