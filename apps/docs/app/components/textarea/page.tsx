import { ComponentHeader } from '../../../components/ComponentHeader';
import { PropsTable } from '../../../components/PropsTable';
import { LiveDemo } from '../../../components/LiveDemo';

export const metadata = {
  title: 'Textarea - Mayvio UI',
  description: 'A multiline text input component.',
};

export default function TextareaPage() {
  return (
    <div className="space-y-12">
      <ComponentHeader
        name="Textarea"
        description="A multiline text input component."
        npm="@mayvio-ui/react"
      />

      <section>
        <h2 className="text-2xl font-bold mb-6">Usage</h2>
        <LiveDemo
          code={`import { Textarea } from '@mayvio-ui/react';\n\nexport default function App() {\n  return <Textarea placeholder="Type your message here." />;\n}`}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Props</h2>
        <PropsTable
          props={[
            { name: 'autoResize', type: 'boolean', default: 'false', description: 'Whether the textarea should automatically adjust its height' },
            { name: 'error', type: 'boolean', default: 'false', description: 'Whether the textarea is in an error state' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the textarea is disabled' },
          ]}
        />
      </section>
    </div>
  );
}
