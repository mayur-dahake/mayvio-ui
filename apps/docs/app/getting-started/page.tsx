import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Getting Started',
  description: 'How to install and use Mayvio UI in your React or Angular project.',
};

export default function GettingStartedPage() {
  return (
    <>
      <h1 className="component-page-title">Getting Started</h1>
      <p className="component-page-desc">
        Get up and running with Mayvio UI in minutes for React or Angular.
      </p>

      <h2 className="section-title">React</h2>

      <h3 style={{ fontWeight: 600, marginBottom: 8 }}>1. Install</h3>
      <pre
        style={{
          background: 'var(--mv-color-bg-secondary)',
          border: '1px solid var(--mv-color-border)',
          borderRadius: 'var(--mv-radius-md)',
          padding: 16,
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          marginBottom: 16,
          overflowX: 'auto',
        }}
      >
        <code>npm install @mayvio-ui/react</code>
      </pre>

      <h3 style={{ fontWeight: 600, marginBottom: 8 }}>2. Import CSS tokens</h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 'var(--mv-radius-md)',
          padding: 16,
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          marginBottom: 16,
          overflowX: 'auto',
        }}
      >
        {`// In your root layout or main.tsx
import '@mayvio-ui/react/dist/index.css';`}
      </pre>

      <h3 style={{ fontWeight: 600, marginBottom: 8 }}>3. Use components</h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 'var(--mv-radius-md)',
          padding: 16,
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          marginBottom: 32,
          overflowX: 'auto',
        }}
      >
        {`import { Badge, Alert, Avatar } from '@mayvio-ui/react';

// Or tree-shake with subpath imports:
import { Badge } from '@mayvio-ui/react/Badge';
import { Alert } from '@mayvio-ui/react/Alert';
import { Avatar, AvatarGroup } from '@mayvio-ui/react/Avatar';

export default function App() {
  return (
    <>
      <Badge variant="success">Active</Badge>
      <Alert variant="info" title="Note">Hello world</Alert>
      <Avatar initials="MU" size="lg" />
    </>
  );
}`}
      </pre>

      <h2 className="section-title">Angular</h2>

      <h3 style={{ fontWeight: 600, marginBottom: 8 }}>1. Install</h3>
      <pre
        style={{
          background: 'var(--mv-color-bg-secondary)',
          border: '1px solid var(--mv-color-border)',
          borderRadius: 'var(--mv-radius-md)',
          padding: 16,
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          marginBottom: 16,
          overflowX: 'auto',
        }}
      >
        <code>npm install @mayvio-ui/angular</code>
      </pre>

      <h3 style={{ fontWeight: 600, marginBottom: 8 }}>2. Import in your component</h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 'var(--mv-radius-md)',
          padding: 16,
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          marginBottom: 16,
          overflowX: 'auto',
        }}
      >
        {`import { BadgeComponent } from '@mayvio-ui/angular/badge';
import { AlertComponent } from '@mayvio-ui/angular/alert';
import { AvatarComponent } from '@mayvio-ui/angular/avatar';

@Component({
  standalone: true,
  imports: [BadgeComponent, AlertComponent, AvatarComponent],
  template: \`
    <mv-badge variant="success">Active</mv-badge>
    <mv-alert variant="info" title="Note">Hello world</mv-alert>
    <mv-avatar initials="MU" size="lg" />
  \`
})
export class AppComponent {}`}
      </pre>

      <h2 className="section-title">Design Tokens</h2>
      <p style={{ color: 'var(--mv-color-text-muted)', marginBottom: 16 }}>
        All components use CSS custom properties for theming. Override them in your CSS:
      </p>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 'var(--mv-radius-md)',
          padding: 16,
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          overflowX: 'auto',
        }}
      >
        {`:root {
  --mv-color-primary: #7c3aed;   /* your brand color */
  --mv-color-success: #059669;
  --mv-radius-md: 12px;          /* more rounded */
}`}
      </pre>
    </>
  );
}
