import { ComponentHeader } from '@/components/ComponentHeader';
import { LiveDemo } from '@/components/LiveDemo';
import { PropsTable } from '@/components/PropsTable';

const basicUsageCode = `import { useState } from 'react';
import { NotificationCenter } from '@mayvio-ui/react';

export default function App() {
  const [notifications, setNotifications] = useState([
    { id: '1', title: 'Welcome', message: 'Thanks for signing up!', read: false, date: new Date() },
    { id: '2', title: 'Update Available', message: 'v1.2.0 is out now.', read: true, date: new Date(Date.now() - 86400000) }
  ]);

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem' }}>
      <NotificationCenter 
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onClearAll={handleClearAll}
      />
    </div>
  );
}
`;

export default function NotificationCenterPage() {
  return (
    <div className="space-y-12 pb-24">
      <ComponentHeader
        name="NotificationCenter"
        description="A dropdown panel to display and manage user notifications."
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
              name: 'notifications',
              type: 'NotificationConfig[]',
              description: 'List of notification objects to display.',
              required: true,
            },
            {
              name: 'onMarkAsRead',
              type: '(id: string) => void',
              description: 'Callback fired when a single notification is marked as read.',
            },
            {
              name: 'onClearAll',
              type: '() => void',
              description: 'Callback fired when "Clear All" is clicked.',
            },
          ]}
        />
      </section>
    </div>
  );
}
