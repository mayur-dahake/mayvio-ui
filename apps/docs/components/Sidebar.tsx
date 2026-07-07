'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const nav = [
  {
    section: 'Getting Started',
    links: [
      { label: 'Introduction', href: '/' },
      { label: 'Getting Started', href: '/getting-started' },
    ],
  },
  {
    section: 'Tier 1 — PoC',
    links: [
      { label: 'Badge', href: '/components/badge' },
      { label: 'Alert', href: '/components/alert' },
      { label: 'Avatar', href: '/components/avatar' },
    ],
  },
  {
    section: 'Tier 2 — Core',
    links: [
      { label: 'Button', href: '/components/button', wip: true },
      { label: 'Tooltip', href: '/components/tooltip', wip: true },
      { label: 'Toast', href: '/components/toast', wip: true },
      { label: 'Skeleton', href: '/components/skeleton', wip: true },
      { label: 'ProgressBar', href: '/components/progress-bar', wip: true },
      { label: 'Breadcrumb', href: '/components/breadcrumb', wip: true },
      { label: 'Tabs', href: '/components/tabs', wip: true },
      { label: 'Accordion', href: '/components/accordion', wip: true },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <nav className="docs-sidebar" id="docs-sidebar">
      <div className="sidebar-logo">
        <span>⬡</span> Mayvio UI
      </div>
      {nav.map((section) => (
        <div key={section.section}>
          <div className="sidebar-section">{section.section}</div>
          {section.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`sidebar-link${pathname === link.href ? ' active' : ''}${(link as { wip?: boolean }).wip ? ' opacity-50' : ''}`}
            >
              {link.label}{' '}
              {(link as { wip?: boolean }).wip ? (
                <span style={{ fontSize: '0.6rem', opacity: 0.6 }}>soon</span>
              ) : (
                ''
              )}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
}
