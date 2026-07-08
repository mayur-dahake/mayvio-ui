import type { Metadata } from 'next';
import { ComponentHeader } from '@/components/ComponentHeader';
import { PropsTable } from '@/components/PropsTable';
import { LiveDemo } from '@/components/LiveDemo';

export const metadata: Metadata = {
  title: 'Skeleton',
  description: 'Provide visual loading place indicators with the Mayvio UI Skeleton component.',
};

const skeletonProps = [
  {
    name: 'variant',
    type: "'text' | 'circle' | 'rect'",
    default: "'text'",
    description: 'Sets the shape structure outline.',
  },
  {
    name: 'animation',
    type: "'shimmer' | 'pulse' | 'wave' | 'none'",
    default: "'shimmer'",
    description: 'Sets the visual loader motion.',
  },
  { name: 'width', type: 'string | number', description: 'Sets inline width configuration.' },
  { name: 'height', type: 'string | number', description: 'Sets inline height configuration.' },
];

export default function SkeletonPage() {
  return (
    <>
      <ComponentHeader
        name="Skeleton"
        description="Placeholder elements that represent raw visual boundaries before full page assets fetch."
      />

      <h2 className="section-title">Demo 1 — Skeleton Variants</h2>
      <LiveDemo
        componentName="Skeleton Variants"
        code={`<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
  {/* Text line skeleton */}
  <div class="mv-skeleton mv-skeleton--text mv-skeleton--shimmer" style={{ width: '60%' }}></div>
  
  {/* Circle profile image skeleton */}
  <div class="mv-skeleton mv-skeleton--circle mv-skeleton--shimmer"></div>
  
  {/* Large rectangular card skeleton */}
  <div class="mv-skeleton mv-skeleton--rect mv-skeleton--shimmer" style={{ height: 120 }}></div>
</div>`}
        editorHeight={240}
      />

      <h2 className="section-title">Demo 2 — Animations</h2>
      <LiveDemo
        componentName="Skeleton Animations"
        code={`<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
  {/* Shimmer animation */}
  <div class="mv-skeleton mv-skeleton--text mv-skeleton--shimmer"></div>
  
  {/* Pulse animation */}
  <div class="mv-skeleton mv-skeleton--text mv-skeleton--pulse"></div>
  
  {/* Wave animation */}
  <div class="mv-skeleton mv-skeleton--text mv-skeleton--wave"></div>
  
  {/* Static loader */}
  <div class="mv-skeleton mv-skeleton--text mv-skeleton--none"></div>
</div>`}
        editorHeight={200}
      />

      <h2 className="section-title">React Usage</h2>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 'var(--mv-radius-md)',
          padding: 16,
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          marginBottom: 24,
          overflowX: 'auto',
        }}
      >
        {`import { Skeleton } from '@mayvio-ui/react/Skeleton';

<Skeleton variant="circle" width={48} height={48} />
<Skeleton variant="text" width="60%" />
<Skeleton variant="rect" height={150} animation="pulse" />`}
      </pre>

      <h2 className="section-title">Angular Usage</h2>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 'var(--mv-radius-md)',
          padding: 16,
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          marginBottom: 24,
          overflowX: 'auto',
        }}
      >
        {`import { SkeletonComponent } from '@mayvio-ui/angular/skeleton';

<mv-skeleton variant="circle" width="48px" height="48px"></mv-skeleton>
<mv-skeleton variant="text" width="60%"></mv-skeleton>
<mv-skeleton variant="rect" height="150px" animation="pulse"></mv-skeleton>`}
      </pre>

      <h2 className="section-title">Props</h2>
      <PropsTable props={skeletonProps} />
    </>
  );
}
