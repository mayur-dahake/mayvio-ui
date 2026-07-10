import { ComponentHeader } from '@/components/ComponentHeader';
import { LiveDemo } from '@/components/LiveDemo';
import { PropsTable } from '@/components/PropsTable';

const basicUsageCode = `import { useState } from 'react';
import { FileUpload } from '@mayvio-ui/react';

export default function App() {
  const [files, setFiles] = useState<File[]>([]);
  
  return (
    <div style={{ maxWidth: 400 }}>
      <FileUpload 
        onFilesSelected={(selectedFiles) => setFiles(selectedFiles)}
        accept="image/*,.pdf"
        multiple={true}
        maxSize={5 * 1024 * 1024} // 5MB
      />
      {files.length > 0 && (
        <ul style={{ marginTop: '1rem', fontSize: '0.875rem' }}>
          {files.map(f => <li key={f.name}>{f.name} ({(f.size/1024).toFixed(1)} KB)</li>)}
        </ul>
      )}
    </div>
  );
}
`;

export default function FileUploadPage() {
  return (
    <div className="space-y-12 pb-24">
      <ComponentHeader
        name="FileUpload"
        description="A drag-and-drop file upload zone with validation."
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
              name: 'onFilesSelected',
              type: '(files: File[]) => void',
              description: 'Callback fired when files are selected or dropped.',
            },
            {
              name: 'accept',
              type: 'string',
              description: 'Comma-separated list of allowed file types (e.g. "image/*,.pdf").',
            },
            {
              name: 'multiple',
              type: 'boolean',
              description: 'Whether multiple files can be uploaded.',
            },
            {
              name: 'maxSize',
              type: 'number',
              description: 'Maximum allowed file size in bytes.',
            },
            {
              name: 'disabled',
              type: 'boolean',
              description: 'Whether the file upload is disabled.',
            },
          ]}
        />
      </section>
    </div>
  );
}
