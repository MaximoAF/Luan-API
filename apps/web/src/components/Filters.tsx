interface FiltersProps {
  families: string[];
  active: string;
  onChange: (family: string) => void;
}

export default function Filters({ families, active, onChange }: FiltersProps) {
  return (
    <div className="filters">
      <button className={`chip ${active === 'all' ? 'active' : ''}`} onClick={() => onChange('all')}>
        Todos
      </button>
      {families.map((f) => (
        <button
          key={f}
          className={`chip ${active === f ? 'active' : ''}`}
          onClick={() => onChange(f)}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
