interface PropDef {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

interface PropsTableProps {
  props: PropDef[];
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <table className="props-table" id="props-table">
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {props.map((p) => (
          <tr key={p.name}>
            <td>
              <span className="prop-name">{p.name}</span>
              {p.required && <span className="prop-required">required</span>}
            </td>
            <td>
              <span className="prop-type">{p.type}</span>
            </td>
            <td>
              <span className="prop-default">{p.default ?? '—'}</span>
            </td>
            <td>{p.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
