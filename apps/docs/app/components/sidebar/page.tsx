import { ComponentHeader } from '@/components/ComponentHeader';
import { LiveDemo } from '@/components/LiveDemo';
import { PropsTable } from '@/components/PropsTable';

const basicUsageCode = `import { useState } from 'react';
import { Sidebar } from '@mayvio-ui/react';

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  
  const links = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div style={{ display: 'flex', height: '400px', border: '1px solid #ccc' }}>
      <Sidebar 
        links={links}
        collapsed={collapsed}
        onToggleCollapse={setCollapsed}
        onLinkClick={(link) => console.log('Clicked', link.href)}
      />
      <div style={{ flex: 1, padding: '2rem' }}>
        <h2>Main Content Area</h2>
        <p>Sidebar is {collapsed ? 'collapsed' : 'expanded'}.</p>
      </div>
    </div>
  );
}
`;

export default function SidebarPage() {
  return (
    <div className="space-y-12 pb-24">
      <ComponentHeader
        name="Sidebar"
        description="A responsive navigation sidebar with collapsible state."
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
              name: 'links',
              type: 'SidebarLinkConfig[]',
              description: 'Array of link configuration objects (href, label, icon).',
              required: true,
            },
            {
              name: 'collapsed',
              type: 'boolean',
              description: 'Whether the sidebar is in collapsed state.',
            },
            {
              name: 'onToggleCollapse',
              type: '(collapsed: boolean) => void',
              description: 'Callback fired when the toggle button is clicked.',
            },
            {
              name: 'onLinkClick',
              type: '(link: SidebarLinkConfig) => void',
              description: 'Callback fired when a link is clicked.',
            },
            {
              name: 'mobileOpen',
              type: 'boolean',
              description: 'Whether the sidebar is open on mobile views.',
            },
            {
              name: 'onMobileClose',
              type: '() => void',
              description: 'Callback fired when the mobile sidebar wants to close.',
            },
          ]}
        />
      </section>
    </div>
  );
}
