import type { Metadata } from 'next';
import { ComponentHeader } from '@/components/ComponentHeader';
import { PropsTable } from '@/components/PropsTable';
import { LiveDemo } from '@/components/LiveDemo';

export const metadata: Metadata = {
  title: 'Button',
  description: 'Trigger actions and navigate with the Mayvio UI Button component.',
};

const buttonProps = [
  {
    name: 'variant',
    type: "'primary' | 'secondary' | 'outline' | 'text'",
    default: "'primary'",
    description: 'Controls the display style of the button.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Sets the button dimensions.',
  },
  {
    name: 'color',
    type: "'primary' | 'success' | 'error' | 'warning'",
    default: "'primary'",
    description: 'The semantic theme color.',
  },
  {
    name: 'shape',
    type: "'rectangle' | 'square' | 'round'",
    default: "'rectangle'",
    description: 'Specifies the shape and border-radius.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables user interaction.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    required: true,
    description: 'Label or elements inside the button.',
  },
  {
    name: '...props',
    type: 'React.ButtonHTMLAttributes<HTMLButtonElement>',
    description: 'Any native HTML button attributes.',
  },
];

export default function ButtonPage() {
  return (
    <>
      <ComponentHeader
        name="Button"
        description="Interactive button component supporting multiple variants, sizes, shapes, and custom semantic colors."
      />

      <h2 className="section-title">Demo 1 — Variants</h2>
      <LiveDemo
        componentName="Button Variants"
        code={`<>
  <button class="mv-button mv-button--md mv-button--primary">Primary</button>
  <button class="mv-button mv-button--md mv-button--secondary">Secondary</button>
  <button class="mv-button mv-button--md mv-button--outline">Outline</button>
  <button class="mv-button mv-button--md mv-button--text">Text</button>
</>`}
        editorHeight={140}
      />

      <h2 className="section-title">Demo 2 — Sizes &amp; Shapes</h2>
      <LiveDemo
        componentName="Button Sizes and Shapes"
        code={`<>
  <button class="mv-button mv-button--sm mv-button--primary">Small</button>
  <button class="mv-button mv-button--md mv-button--primary">Medium</button>
  <button class="mv-button mv-button--lg mv-button--primary">Large</button>
  <button class="mv-button mv-button--md mv-button--primary mv-button--round">Rounded</button>
  <button class="mv-button mv-button--md mv-button--primary mv-button--square">Square</button>
</>`}
        editorHeight={160}
      />

      <h2 className="section-title">Demo 3 — Semantic Colors &amp; Disabled State</h2>
      <LiveDemo
        componentName="Button Modifiers"
        code={`<>
  <button class="mv-button mv-button--md mv-button--success mv-button--primary">Success</button>
  <button class="mv-button mv-button--md mv-button--error mv-button--primary">Error</button>
  <button class="mv-button mv-button--md mv-button--warning mv-button--primary">Warning</button>
  <button class="mv-button mv-button--md mv-button--primary" disabled>Disabled</button>
</>`}
        editorHeight={140}
      />

      <h2 className="section-title">React Usage</h2>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 'var(--mv-radius-md)',
          padding: 16,
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          marginBottom: 24,
          overflowX: 'auto',
        }}
      >
        {`import { Button } from '@mayvio-ui/react/Button';

<Button variant="primary">Submit</Button>
<Button variant="outline" size="sm">Cancel</Button>
<Button color="error" shape="round">Delete Account</Button>`}
      </pre>

      <h2 className="section-title">Angular Usage</h2>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 'var(--mv-radius-md)',
          padding: 16,
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          marginBottom: 24,
          overflowX: 'auto',
        }}
      >
        {`import { ButtonComponent } from '@mayvio-ui/angular/button';

<mv-button variant="primary">Submit</mv-button>
<mv-button variant="outline" size="sm">Cancel</mv-button>
<mv-button color="error" shape="round">Delete Account</mv-button>`}
      </pre>

      <h2 className="section-title">Props</h2>
      <PropsTable props={buttonProps} />
    </>
  );
}
