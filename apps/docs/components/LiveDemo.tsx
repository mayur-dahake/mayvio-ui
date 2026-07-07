'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { openStackBlitz, openCodeSandbox } from '@/lib/openSandbox';

// Monaco is loaded client-side only (heavy)
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

// Babel standalone for in-browser JSX compilation
declare global {
  interface Window {
    Babel: {
      transform: (code: string, opts: object) => { code: string };
    };
  }
}

interface LiveDemoProps {
  code: string;
  componentName?: string;
  editorHeight?: number;
  imports?: string; // extra import lines to prepend for preview only
}

// Load Babel standalone once
let babelLoaded = false;
function loadBabel(): Promise<void> {
  if (babelLoaded) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@babel/standalone/babel.min.js';
    script.onload = () => {
      babelLoaded = true;
      resolve();
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export function LiveDemo({
  code,
  componentName = 'Component',
  editorHeight = 200,
  imports = '',
}: LiveDemoProps) {
  const [editorCode, setEditorCode] = useState(code);
  const [error, setError] = useState('');
  const [babelReady, setBabelReady] = useState(false);

  useEffect(() => {
    loadBabel()
      .then(() => setBabelReady(true))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!babelReady) return;
    try {
      window.Babel.transform(editorCode, {
        presets: ['react', 'typescript'],
        filename: 'demo.tsx',
      });
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }, [editorCode, babelReady]);

  const fullCode = `import React from 'react';\n${imports}\nexport default function App() {\n  return (\n    <>\n      ${editorCode}\n    </>\n  );\n}`;

  return (
    <div className="live-demo" id={`live-demo-${componentName.toLowerCase().replace(/\s/g, '-')}`}>
      {/* Preview */}
      <div className="live-demo__preview">
        {error ? (
          <div className="live-demo__error">{error}</div>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: '' }} suppressHydrationWarning>
            {/* Preview rendered via iframe approach below */}
          </div>
        )}
        {/* Static preview: render the JSX as-is in an iframe */}
        <iframe
          srcDoc={buildPreviewHtml(editorCode)}
          style={{ width: '100%', minHeight: 100, border: 'none', background: 'transparent' }}
          title={`${componentName} preview`}
          sandbox="allow-scripts allow-same-origin"
        />
      </div>

      {/* Toolbar */}
      <div className="live-demo__toolbar">
        <span className="live-demo__toolbar-label">Live Editor</span>
        <div className="live-demo__toolbar-actions">
          <button
            id={`open-stackblitz-${componentName.toLowerCase()}`}
            className="demo-action-btn"
            onClick={() => openStackBlitz(componentName, fullCode)}
          >
            ⚡ StackBlitz
          </button>
          <button
            id={`open-codesandbox-${componentName.toLowerCase()}`}
            className="demo-action-btn"
            onClick={() => openCodeSandbox(componentName, fullCode)}
          >
            📦 CodeSandbox
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="live-demo__editor">
        <MonacoEditor
          height={editorHeight}
          language="typescript"
          theme="vs-dark"
          value={editorCode}
          onChange={(v) => setEditorCode(v ?? '')}
          options={{
            minimap: { enabled: false },
            lineNumbers: 'off',
            scrollBeyondLastLine: false,
            fontSize: 13,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            padding: { top: 16, bottom: 16 },
            wordWrap: 'on',
          }}
        />
      </div>
    </div>
  );
}

// Build a self-contained HTML document for iframe preview using CDN builds
function buildPreviewHtml(code: string): string {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', sans-serif; padding: 24px; background: transparent; }
  :root {
    --mv-color-primary: #3b82f6; --mv-color-success: #22c55e;
    --mv-color-error: #ef4444; --mv-color-warning: #f59e0b;
    --mv-color-info: #3b82f6; --mv-color-text: #111827;
    --mv-color-text-muted: #64748b; --mv-color-border: #e5e7eb;
    --mv-color-card: #ffffff; --mv-color-bg: #ffffff;
    --mv-font-family: 'Inter', sans-serif;
    --mv-font-size-xs: 0.75rem; --mv-font-size-sm: 0.875rem;
    --mv-font-size-md: 1rem; --mv-font-size-lg: 1.125rem;
    --mv-font-weight-normal: 400; --mv-font-weight-medium: 500;
    --mv-font-weight-semibold: 600; --mv-font-weight-bold: 700;
    --mv-line-height-tight: 1.2; --mv-line-height-normal: 1.6;
    --mv-space-1: 4px; --mv-space-2: 8px; --mv-space-3: 12px;
    --mv-space-4: 16px; --mv-space-5: 20px; --mv-space-6: 24px;
    --mv-radius-xs: 2px; --mv-radius-sm: 4px; --mv-radius-md: 8px;
    --mv-radius-lg: 12px; --mv-radius-full: 9999px;
    --mv-transition-fast: 150ms ease; --mv-transition-normal: 250ms ease;
  }
</style>
<script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
<div id="root"></div>
<script type="text/babel" data-presets="react,typescript">
const { useState, useEffect } = React;
${code}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(React.Fragment, null, 
  ${extractJSXForPreview()}
));
</script>
</body>
</html>`;
}

function extractJSXForPreview(): string {
  // Simple heuristic: return the code as-is wrapped in a fragment for the iframe
  return `React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' } })`;
}
