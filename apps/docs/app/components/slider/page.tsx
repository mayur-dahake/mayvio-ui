import { ComponentHeader } from '../../../components/ComponentHeader';
import { PropsTable } from '../../../components/PropsTable';
import { LiveDemo } from '../../../components/LiveDemo';

export const metadata = {
  title: 'Slider - Mayvio UI',
  description: 'An input where the user selects a value from within a given range.',
};

export default function SliderPage() {
  return (
    <div className="space-y-12">
      <ComponentHeader
        name="Slider"
        description="An input where the user selects a value from within a given range."
        npm="@mayvio-ui/react"
      />

      <section>
        <h2 className="text-2xl font-bold mb-6">Usage</h2>
        <LiveDemo
          code={`import { Slider } from '@mayvio-ui/react';\n\nexport default function App() {\n  return <Slider value={50} min={0} max={100} />;\n}`}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Props</h2>
        <PropsTable
          props={[
            { name: 'value', type: 'number', default: '0', description: 'The current value of the slider' },
            { name: 'min', type: 'number', default: '0', description: 'The minimum value' },
            { name: 'max', type: 'number', default: '100', description: 'The maximum value' },
            { name: 'step', type: 'number', default: '1', description: 'The step amount' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the slider is disabled' },
          ]}
        />
      </section>
    </div>
  );
}
