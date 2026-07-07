import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mayvio UI — React & Angular Component Library',
  description:
    'A premium, accessible UI component library for React and Angular. Build beautiful UIs faster with our battle-tested, fully typed, and beautifully documented components.',
};

const components = [
  {
    name: 'Badge',
    desc: 'Display status, labels, and metadata',
    href: '/components/badge',
    icon: '🏷️',
  },
  {
    name: 'Alert',
    desc: 'Provide feedback and notifications',
    href: '/components/alert',
    icon: '🔔',
  },
  {
    name: 'Avatar',
    desc: 'Display user profile images or initials',
    href: '/components/avatar',
    icon: '👤',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <div className="hero">
        <h1 className="hero-title">
          Build beautiful UIs,
          <br />
          faster than ever.
        </h1>
        <p className="hero-subtitle">
          A multi-framework component library for <strong>React</strong> and{' '}
          <strong>Angular</strong> — beautifully designed, fully typed, and accessible out of the
          box.
        </p>
        <div className="hero-install">
          $ <strong>npm install @mayvio-ui/react</strong>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 12,
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: 48,
          }}
        >
          <Link
            href="/getting-started"
            id="get-started-btn"
            style={{
              background: 'var(--mv-color-primary)',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: 'var(--mv-radius-full)',
              fontWeight: 600,
              fontSize: '0.95rem',
            }}
          >
            Get Started →
          </Link>
          <Link
            href="/components/badge"
            id="browse-components-btn"
            style={{
              border: '1px solid var(--mv-color-border)',
              padding: '12px 24px',
              borderRadius: 'var(--mv-radius-full)',
              fontWeight: 500,
              fontSize: '0.95rem',
              color: 'var(--mv-color-text)',
            }}
          >
            Browse Components
          </Link>
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'flex',
            gap: 40,
            justifyContent: 'center',
            color: 'var(--mv-color-text-muted)',
            fontSize: '0.875rem',
            marginBottom: 48,
          }}
        >
          {[
            ['3', 'PoC Components'],
            ['48', 'Planned Components'],
            ['React + Angular', 'Framework Support'],
            ['100%', 'TypeScript'],
          ].map(([num, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--mv-color-text)' }}>
                {num}
              </div>
              <div>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{ marginBottom: 48 }}>
        <h2 className="section-title">Available Components</h2>
        <div className="hero-cards">
          {components.map((c) => (
            <Link
              key={c.name}
              href={c.href}
              id={`home-card-${c.name.toLowerCase()}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="feature-card">
                <div className="feature-card-icon">{c.icon}</div>
                <div className="feature-card-title">{c.name}</div>
                <div className="feature-card-desc">{c.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Why Mayvio */}
      <div>
        <h2 className="section-title">Why Mayvio UI?</h2>
        <div className="hero-cards">
          {[
            {
              icon: '⚡',
              title: 'Dual Framework',
              desc: "First-class React AND Angular support — something MUI, Chakra, and shadcn don't offer.",
            },
            {
              icon: '🎨',
              title: 'Design Tokens',
              desc: 'CSS custom properties for every color, spacing, radius, and shadow. Dark mode included.',
            },
            {
              icon: '♿',
              title: 'Accessible',
              desc: 'ARIA attributes, keyboard navigation, and axe testing baked into every component.',
            },
            {
              icon: '📦',
              title: 'Tree Shakeable',
              desc: 'Import only what you need. Subpath exports for Badge, Alert, Avatar.',
            },
            {
              icon: '🧪',
              title: 'TDD-First',
              desc: 'Every component built with tests written first. Red → Green → Refactor.',
            },
            {
              icon: '🔷',
              title: 'TypeScript',
              desc: 'Strict mode. No any. No @ts-nocheck. Full type safety guaranteed.',
            },
          ].map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-card-icon">{f.icon}</div>
              <div className="feature-card-title">{f.title}</div>
              <div className="feature-card-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
