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
      { label: 'Button', href: '/components/button' },
      { label: 'Tooltip', href: '/components/tooltip' },
      { label: 'Toast', href: '/components/toast' },
      { label: 'Skeleton', href: '/components/skeleton' },
      { label: 'ProgressBar', href: '/components/progress-bar' },
      { label: 'Breadcrumb', href: '/components/breadcrumb' },
      { label: 'Tabs', href: '/components/tabs' },
      { label: 'Accordion', href: '/components/accordion' },
      { label: 'ThemeToggle', href: '/components/theme-toggle' },
    ],
  },
  {
    section: 'Tier 3 — Interaction',
    links: [
      { label: 'Modal', href: '/components/modal' },
      { label: 'Dropdown', href: '/components/dropdown' },
      { label: 'MultiSelect', href: '/components/multiselect' },
      { label: 'DatePicker', href: '/components/date-picker' },
      { label: 'FileUpload', href: '/components/file-upload' },
      { label: 'CommandPalette', href: '/components/command-palette' },
      { label: 'Sidebar', href: '/components/sidebar' },
      { label: 'NotificationCenter', href: '/components/notification-center' },
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
