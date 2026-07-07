'use client';

import { useState } from 'react';

interface ComponentHeaderProps {
  name: string;
  description: string;
  npm?: string;
}

export function ComponentHeader({
  name,
  description,
  npm = '@mayvio-ui/react',
}: ComponentHeaderProps) {
  const [copied, setCopied] = useState(false);
  const installCmd = `npm install ${npm}`;

  const copy = async () => {
    await navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
      <h1 className="component-page-title">{name}</h1>
      <p className="component-page-desc">{description}</p>
      <div className="install-bar">
        <code>{installCmd}</code>
        <button
          className="install-copy-btn"
          onClick={copy}
          id={`copy-install-${name.toLowerCase()}`}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
