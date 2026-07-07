'use client';

export function openStackBlitz(componentName: string, code: string) {
  const files: Record<string, string> = {
    'index.html': `<!DOCTYPE html>
<html>
<head>
  <title>${componentName} — Mayvio UI</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="./index.tsx"></script>
</body>
</html>`,
    'index.tsx': `import React from 'react';
import { createRoot } from 'react-dom/client';
import './node_modules/@mayvio-ui/react/dist/index.css';
import App from './App';

const root = createRoot(document.getElementById('root')!);
root.render(<App />);`,
    'App.tsx': `import React from 'react';
${code}`,
    'package.json': JSON.stringify(
      {
        name: `mayvio-ui-${componentName.toLowerCase()}-demo`,
        version: '0.0.1',
        scripts: { start: 'vite' },
        dependencies: {
          react: '^18.2.0',
          'react-dom': '^18.2.0',
          '@mayvio-ui/react': 'latest',
        },
        devDependencies: {
          '@vitejs/plugin-react': '^4.0.0',
          vite: '^5.0.0',
          typescript: '^5.0.0',
        },
      },
      null,
      2
    ),
    'vite.config.ts': `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({ plugins: [react()] });`,
    'tsconfig.json': JSON.stringify(
      { compilerOptions: { jsx: 'react-jsx', strict: true } },
      null,
      2
    ),
  };

  // POST form to StackBlitz
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = 'https://stackblitz.com/run';
  form.target = '_blank';

  Object.entries(files).forEach(([path, content]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = `project[files][${path}]`;
    input.value = content;
    form.appendChild(input);
  });

  ['project[title]', 'project[description]', 'project[template]'].forEach((name, i) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = [
      `${componentName} — Mayvio UI Demo`,
      `Live demo of the ${componentName} component from Mayvio UI`,
      'node',
    ][i];
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}

export function openCodeSandbox(componentName: string, code: string) {
  const files: Record<string, { content: string; isBinary: boolean }> = {
    'src/App.tsx': { content: code, isBinary: false },
    'src/index.tsx': {
      content: `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root')!);
root.render(<React.StrictMode><App /></React.StrictMode>);`,
      isBinary: false,
    },
    'public/index.html': {
      content: `<!DOCTYPE html><html><body><div id="root"></div></body></html>`,
      isBinary: false,
    },
    'package.json': {
      content: JSON.stringify({
        name: `${componentName.toLowerCase()}-demo`,
        dependencies: { react: '^18.2.0', 'react-dom': '^18.2.0', '@mayvio-ui/react': 'latest' },
      }),
      isBinary: false,
    },
  };

  const params = { files };

  fetch('https://codesandbox.io/api/v1/sandboxes/define?json=1', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(params),
  })
    .then((r) => r.json())
    .then(({ sandbox_id }: { sandbox_id: string }) => {
      window.open(`https://codesandbox.io/s/${sandbox_id}`, '_blank');
    })
    .catch(() => {
      alert('Failed to open CodeSandbox. Please try again.');
    });
}
