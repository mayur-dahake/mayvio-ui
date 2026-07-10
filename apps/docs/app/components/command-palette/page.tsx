import { ComponentHeader } from '@/components/ComponentHeader';
import { LiveDemo } from '@/components/LiveDemo';
import { PropsTable } from '@/components/PropsTable';

const basicUsageCode = `import { useState } from 'react';
import { CommandPalette, Button } from '@mayvio-ui/react';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  
  const commands = [
    {
      group: 'Navigation',
      items: [
        { id: '1', label: 'Go to Dashboard', shortcut: 'G D' },
        { id: '2', label: 'Go to Settings', shortcut: 'G S' },
      ]
    },
    {
      group: 'Actions',
      items: [
        { id: '3', label: 'Create New Project', shortcut: 'C P' },
        { id: '4', label: 'Invite Team Member', shortcut: 'I T' },
      ]
    }
  ];

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Command Palette (Cmd+K)</Button>
      
      <CommandPalette 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        commands={commands}
        onSelect={(command) => {
          alert('Selected: ' + command.label);
          setIsOpen(false);
        }}
        placeholder="Type a command or search..."
      />
    </div>
  );
}
`;

export default function CommandPalettePage() {
  return (
    <div className="space-y-12 pb-24">
      <ComponentHeader
        name="CommandPalette"
        description="A fast, composable, unstyled command menu for React."
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
              name: 'isOpen',
              type: 'boolean',
              description: 'Whether the command palette is visible.',
              required: true,
            },
            {
              name: 'onClose',
              type: '() => void',
              description: 'Callback fired when the palette wants to close.',
              required: true,
            },
            {
              name: 'commands',
              type: 'CommandGroup[]',
              description: 'Grouped lists of command items.',
              required: true,
            },
            {
              name: 'onSelect',
              type: '(command: CommandItem) => void',
              description: 'Callback fired when an item is selected.',
            },
            {
              name: 'placeholder',
              type: 'string',
              description: 'Placeholder text for the search input.',
            },
          ]}
        />
      </section>
    </div>
  );
}
