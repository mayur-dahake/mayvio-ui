import { ComponentHeader } from '../../../components/ComponentHeader';
import { PropsTable } from '../../../components/PropsTable';
import { LiveDemo } from '../../../components/LiveDemo';

export const metadata = {
  title: 'Input - Mayvio UI',
  description: 'A basic widget for getting the user input is a text field.',
};

export default function InputPage() {
  return (
    <div className="space-y-12">
      <ComponentHeader
        name="Input"
        description="A basic widget for getting the user input is a text field."
        npm="@mayvio-ui/react"
      />

      <section>
        <h2 className="text-2xl font-bold mb-6">Usage</h2>
        <LiveDemo
          code={`import { Input } from '@mayvio-ui/react';\n\nexport default function App() {\n  return <Input placeholder="Enter your name" />;\n}`}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Props</h2>
        <PropsTable
          props={[
            { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'The size of the input' },
            { name: 'error', type: 'boolean', default: 'false', description: 'Whether the input is in an error state' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the input is disabled' },
          ]}
        />
      </section>
    </div>
  );
}
