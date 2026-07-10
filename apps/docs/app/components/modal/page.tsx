import { ComponentHeader } from '@/components/ComponentHeader';
import { LiveDemo } from '@/components/LiveDemo';
import { PropsTable } from '@/components/PropsTable';

const basicUsageCode = `import { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@mayvio-ui/react';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="md">
        <ModalHeader>Modal Title</ModalHeader>
        <ModalBody>
          <p>This is the body of the modal. It contains information you want to present to the user.</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={() => setIsOpen(false)}>Confirm</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
`;

const sizesCode = `import { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Button } from '@mayvio-ui/react';

export default function App() {
  const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'full' | null>(null);

  return (
    <div className="flex gap-4">
      <Button onClick={() => setSize('sm')}>Small</Button>
      <Button onClick={() => setSize('md')}>Medium</Button>
      <Button onClick={() => setSize('lg')}>Large</Button>
      <Button onClick={() => setSize('full')}>Full</Button>
      
      <Modal isOpen={!!size} onClose={() => setSize(null)} size={size || 'md'}>
        <ModalHeader>Various Sizes</ModalHeader>
        <ModalBody>
          <p>This modal is currently sized: {size}</p>
        </ModalBody>
      </Modal>
    </div>
  );
}
`;

export default function ModalPage() {
  return (
    <div className="space-y-12 pb-24">
      <ComponentHeader
        name="Modal"
        description="A dialog component that sits on top of the main content to display information or require action."
        npm="@mayvio-ui/react"
      />

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">Usage</h2>
        <LiveDemo code={basicUsageCode} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">Sizes</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Modals come in four different sizes:{' '}
          <code className="text-sm bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">sm</code>,{' '}
          <code className="text-sm bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">md</code>,{' '}
          <code className="text-sm bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">lg</code>,
          and{' '}
          <code className="text-sm bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">full</code>.
        </p>
        <LiveDemo code={sizesCode} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">Props</h2>
        <PropsTable
          props={[
            {
              name: 'isOpen',
              type: 'boolean',
              description: 'Whether the modal is currently visible.',
              required: true,
            },
            {
              name: 'onClose',
              type: '() => void',
              description:
                'Callback fired when the modal wants to close (via escape key, click outside, or close button).',
            },
            {
              name: 'size',
              type: '"sm" | "md" | "lg" | "full"',
              description: 'The maximum width of the modal.',
              default: '"md"',
            },
            {
              name: 'closeOnOutsideClick',
              type: 'boolean',
              description: 'Whether the modal closes when the user clicks the backdrop.',
              default: 'true',
            },
            {
              name: 'closeOnEscape',
              type: 'boolean',
              description: 'Whether the modal closes when the user presses the escape key.',
              default: 'true',
            },
          ]}
        />
      </section>
    </div>
  );
}
