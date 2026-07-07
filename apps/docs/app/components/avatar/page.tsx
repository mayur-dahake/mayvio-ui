import type { Metadata } from 'next';
import { ComponentHeader } from '@/components/ComponentHeader';
import { PropsTable } from '@/components/PropsTable';
import { LiveDemo } from '@/components/LiveDemo';

export const metadata: Metadata = {
  title: 'Avatar',
  description: 'Display user profile images or initials with the Mayvio UI Avatar component.',
};

const avatarProps = [
  { name: 'src', type: 'string', description: 'Image URL. If omitted, initials are shown.' },
  {
    name: 'alt',
    type: 'string',
    default: "''",
    description: 'Image alt text (used when src is provided).',
  },
  {
    name: 'initials',
    type: 'string',
    description: 'Text to display when no image src is provided.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg' | 'xl'",
    default: "'md'",
    description: 'Controls the avatar dimensions.',
  },
  {
    name: 'shape',
    type: "'circle' | 'square'",
    default: "'circle'",
    description: 'Circle (default) or rounded square.',
  },
  {
    name: 'status',
    type: "'online' | 'offline' | 'busy'",
    description: 'Shows a coloured dot status indicator.',
  },
];

const avatarGroupProps = [
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Uniform size applied to all avatars in the group.',
  },
  {
    name: 'limit',
    type: 'number',
    description: 'Maximum avatars to display. A "+N" pill shows the overflow count.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    required: true,
    description: 'Avatar components to render in the group.',
  },
];

export default function AvatarPage() {
  return (
    <>
      <ComponentHeader
        name="Avatar"
        description="Represent users with an image or initials fallback. Supports sizes, shapes, status indicators, and grouping with overflow."
      />

      <h2 className="section-title">Demo 1 — Sizes &amp; Shapes</h2>
      <LiveDemo
        componentName="Avatar Sizes"
        code={`<>
  <span class="mv-avatar mv-avatar--sm"><span class="mv-avatar__initials">SM</span></span>
  <span class="mv-avatar mv-avatar--md"><span class="mv-avatar__initials">MD</span></span>
  <span class="mv-avatar mv-avatar--lg"><span class="mv-avatar__initials">LG</span></span>
  <span class="mv-avatar mv-avatar--xl"><span class="mv-avatar__initials">XL</span></span>
  <span class="mv-avatar mv-avatar--lg mv-avatar--square"><span class="mv-avatar__initials">Sq</span></span>
</>`}
        editorHeight={130}
      />

      <h2 className="section-title">Demo 2 — Image &amp; Initials Fallback</h2>
      <LiveDemo
        componentName="Avatar Image"
        code={`<>
  <span class="mv-avatar mv-avatar--lg">
    <img class="mv-avatar__image" src="https://i.pravatar.cc/56?img=1" alt="Alice" />
  </span>
  <span class="mv-avatar mv-avatar--lg mv-avatar--online">
    <img class="mv-avatar__image" src="https://i.pravatar.cc/56?img=2" alt="Bob" />
  </span>
  <span class="mv-avatar mv-avatar--lg mv-avatar--busy">
    <span class="mv-avatar__initials">AB</span>
  </span>
  <span class="mv-avatar mv-avatar--lg mv-avatar--offline">
    <span class="mv-avatar__initials">CD</span>
  </span>
</>`}
        editorHeight={160}
      />

      <h2 className="section-title">Demo 3 — AvatarGroup with Overflow</h2>
      <LiveDemo
        componentName="AvatarGroup"
        code={`<div class="mv-avatar-group mv-avatar-group--md">
  <span class="mv-avatar mv-avatar--md"><img class="mv-avatar__image" src="https://i.pravatar.cc/44?img=3" alt="User 1" /></span>
  <span class="mv-avatar mv-avatar--md"><img class="mv-avatar__image" src="https://i.pravatar.cc/44?img=4" alt="User 2" /></span>
  <span class="mv-avatar mv-avatar--md"><img class="mv-avatar__image" src="https://i.pravatar.cc/44?img=5" alt="User 3" /></span>
  <span class="mv-avatar-group__overflow">+5</span>
</div>`}
        editorHeight={130}
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
        {`import { Avatar, AvatarGroup } from '@mayvio-ui/react/Avatar';

// Image avatar
<Avatar src="https://example.com/photo.jpg" alt="Alice" size="lg" />

// Initials fallback with status
<Avatar initials="AB" size="md" status="online" />

// Square shape
<Avatar initials="CD" size="lg" shape="square" />

// Group with limit
<AvatarGroup size="md" limit={3}>
  <Avatar src="https://i.pravatar.cc/44?img=1" alt="User 1" />
  <Avatar src="https://i.pravatar.cc/44?img=2" alt="User 2" />
  <Avatar src="https://i.pravatar.cc/44?img=3" alt="User 3" />
  <Avatar initials="AB" />
  <Avatar initials="CD" />
</AvatarGroup>`}
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
        {`import { AvatarComponent, AvatarGroupComponent } from '@mayvio-ui/angular/avatar';

<mv-avatar src="https://example.com/photo.jpg" alt="Alice" size="lg" />
<mv-avatar initials="AB" status="online" />
<mv-avatar-group size="md" [limit]="3">
  <mv-avatar src="https://i.pravatar.cc/44?img=1" alt="User 1" />
  <mv-avatar src="https://i.pravatar.cc/44?img=2" alt="User 2" />
  <mv-avatar initials="AB" />
</mv-avatar-group>`}
      </pre>

      <h2 className="section-title">Avatar Props</h2>
      <PropsTable props={avatarProps} />

      <h2 className="section-title">AvatarGroup Props</h2>
      <PropsTable props={avatarGroupProps} />
    </>
  );
}
