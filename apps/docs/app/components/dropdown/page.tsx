import { ComponentHeader } from '@/components/ComponentHeader';
import { LiveDemo } from '@/components/LiveDemo';
import { PropsTable } from '@/components/PropsTable';

const basicUsageCode = `import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@mayvio-ui/react';

export default function App() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button>Open Menu</Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem>Profile</DropdownItem>
        <DropdownItem>Settings</DropdownItem>
        <DropdownItem>Billing</DropdownItem>
        <DropdownItem disabled>Support (Unavailable)</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
`;

const alignedUsageCode = `import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@mayvio-ui/react';

export default function App() {
  return (
    <div className="flex gap-4">
      <Dropdown align="left">
        <DropdownTrigger>
          <Button>Left Align (Default)</Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Item 1</DropdownItem>
          <DropdownItem>Item 2</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      
      <Dropdown align="right">
        <DropdownTrigger>
          <Button>Right Align</Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Item 1</DropdownItem>
          <DropdownItem>Item 2</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
`;

export default function DropdownPage() {
  return (
    <div className="space-y-12 pb-24">
      <ComponentHeader
        name="Dropdown Menu"
        description="Displays a menu to the user—such as a set of actions or functions—triggered by a button."
        npm="@mayvio-ui/react"
      />

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">Usage</h2>
        <LiveDemo code={basicUsageCode} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">Alignment</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          You can align the dropdown menu to the{' '}
          <code className="text-sm bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">left</code>,{' '}
          <code className="text-sm bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">center</code>
          , or{' '}
          <code className="text-sm bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">right</code>{' '}
          of the trigger element.
        </p>
        <LiveDemo code={alignedUsageCode} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">
          Dropdown Props
        </h2>
        <PropsTable
          props={[
            {
              name: 'align',
              type: '"left" | "center" | "right"',
              description: 'The alignment of the dropdown menu relative to the trigger.',
              default: '"left"',
            },
            {
              name: 'isOpen',
              type: 'boolean',
              description: 'Whether the dropdown is currently open (for controlled state).',
            },
            {
              name: 'defaultIsOpen',
              type: 'boolean',
              description: 'Whether the dropdown is open initially (for uncontrolled state).',
              default: 'false',
            },
            {
              name: 'onOpenChange',
              type: '(isOpen: boolean) => void',
              description: 'Callback fired when the open state changes.',
            },
          ]}
        />
      </section>
    </div>
  );
}
