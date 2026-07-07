import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import './globals.css';

export const metadata: Metadata = {
  title: { template: '%s — Mayvio UI', default: 'Mayvio UI — React & Angular Component Library' },
  description:
    'A premium, accessible UI component library for React and Angular with a world-class docs site featuring live in-browser editing.',
  keywords: [
    'UI library',
    'React components',
    'Angular components',
    'component library',
    'Mayvio UI',
  ],
  openGraph: {
    siteName: 'Mayvio UI',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem>
          <div className="docs-layout">
            <Sidebar />
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <TopBar />
              <main className="docs-main">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
