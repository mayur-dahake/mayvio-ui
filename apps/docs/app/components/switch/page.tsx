import { ComponentHeader } from '../../../components/ComponentHeader';
import { PropsTable } from '../../../components/PropsTable';
import { LiveDemo } from '../../../components/LiveDemo';

export const metadata = {
  title: 'Switch - Mayvio UI',
  description: 'A control that allows the user to toggle between checked and not checked.',
};

export default function SwitchPage() {
  return (
    <div className="space-y-12">
      <ComponentHeader
        name="Switch"
        description="A control that allows the user to toggle between checked and not checked."
        npm="@mayvio-ui/react"
      />

      <section>
        <h2 className="text-2xl font-bold mb-6">Usage</h2>
        <LiveDemo
          code={`import { Switch } from '@mayvio-ui/react';\n\nexport default function App() {\n  return <Switch label="Airplane Mode" />;\n}`}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Props</h2>
        <PropsTable
          props={[
            { name: 'label', type: 'ReactNode', default: '-', description: 'The text label for the switch' },
            { name: 'checked', type: 'boolean', default: 'false', description: 'Whether the switch is checked' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the switch is disabled' },
          ]}
        />
      </section>
    </div>
  );
}
