import { ComponentHeader } from '@/components/ComponentHeader';
import { LiveDemo } from '@/components/LiveDemo';
import { PropsTable } from '@/components/PropsTable';

const basicUsageCode = `import { useState } from 'react';
import { DatePicker } from '@mayvio-ui/react';

export default function App() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  return (
    <div style={{ maxWidth: 300 }}>
      <DatePicker 
        value={date}
        onChange={(val) => setDate(val)}
        placeholder="Pick a date"
        format="yyyy-MM-dd"
      />
      <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
        Selected: {date ? date.toLocaleDateString() : 'None'}
      </p>
    </div>
  );
}
`;

export default function DatePickerPage() {
  return (
    <div className="space-y-12 pb-24">
      <ComponentHeader
        name="DatePicker"
        description="A comprehensive date picking component with calendar dropdown."
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
              name: 'value',
              type: 'Date',
              description: 'The currently selected date.',
            },
            {
              name: 'onChange',
              type: '(date: Date | undefined) => void',
              description: 'Callback fired when date is selected or cleared.',
            },
            {
              name: 'minDate',
              type: 'Date',
              description: 'The earliest selectable date.',
            },
            {
              name: 'maxDate',
              type: 'Date',
              description: 'The latest selectable date.',
            },
            {
              name: 'placeholder',
              type: 'string',
              description: 'Text to display when no date is selected.',
            },
            {
              name: 'format',
              type: 'string',
              description: 'Date format string (e.g. "yyyy-MM-dd").',
            },
            {
              name: 'disabled',
              type: 'boolean',
              description: 'Whether the date picker is disabled.',
            },
          ]}
        />
      </section>
    </div>
  );
}
