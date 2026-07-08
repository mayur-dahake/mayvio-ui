import { ComponentHeader } from '@/components/ComponentHeader';
import { LiveDemo } from '@/components/LiveDemo';
import { PropsTable } from '@/components/PropsTable';

const basicUsageCode = `import { ThemeToggle } from '@mayvio-ui/react';

export default function App() {
  return <ThemeToggle />;
}
`;

const controlledUsageCode = `import { useState, useEffect } from 'react';
import { ThemeToggle } from '@mayvio-ui/react';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    // Note: In controlled mode, you're responsible for updating the document element class!
  };
  
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="flex items-center space-x-4">
      <ThemeToggle theme={theme} onToggleTheme={handleToggle} />
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
        Current Theme: {theme}
      </span>
    </div>
  );
}
`;

export default function ThemeTogglePage() {
  return (
    <div className="space-y-12 pb-24">
      <ComponentHeader
        name="ThemeToggle"
        description="A button to switch between light and dark modes. It handles the logic automatically or can be controlled via props."
        npm="@mayvio-ui/react"
      />

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">Usage</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          By default, the <code>ThemeToggle</code> component works out of the box in uncontrolled
          mode. It automatically detects the current theme by checking for the <code>dark</code>{' '}
          class on the document root, and toggles it when clicked.
        </p>
        <LiveDemo code={basicUsageCode} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">
          Controlled Mode
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          You can also control the theme externally by providing the <code>theme</code> and{' '}
          <code>onToggleTheme</code> props. This is useful when you need to sync the theme with an
          external store or context.
        </p>
        <LiveDemo code={controlledUsageCode} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">Props</h2>
        <PropsTable
          props={[
            {
              name: 'theme',
              type: "'light' | 'dark'",
              description:
                'The current theme (controlled mode). If omitted, the component manages the theme automatically.',
            },
            {
              name: 'onToggleTheme',
              type: '() => void',
              description: 'Callback fired when the toggle is clicked.',
            },
          ]}
        />
      </section>
    </div>
  );
}
