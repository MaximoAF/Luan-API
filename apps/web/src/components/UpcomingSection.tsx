import { waLinkForUpcoming } from '../utils/format';
import type { ProximoIngreso } from '../types';

interface UpcomingSectionProps {
  items: ProximoIngreso[];
}

export default function UpcomingSection({ items }: UpcomingSectionProps) {
  if (!items.length) return null;

  return (
    <section id="proximos-ingresos" className="upcoming-section">
      <div className="section-heading">
        <span className="eyebrow">Muy pronto</span>
        <h2>Próximos ingresos</h2>
        <p>Perfumes que ya vienen en camino. Pedí que te avisemos apenas lleguen.</p>
      </div>
      <div className="upcoming-grid">
        {items.map((item) => (
          <div key={item.id} className={`upcoming-card fam-${item.fam}`}>
            <div className="upcoming-media">
              <span className="eta-badge">Llega: {item.eta}</span>
            </div>
            <div className="upcoming-body">
              <span className="family">{item.family}</span>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <a className="wa-btn ghost" href={waLinkForUpcoming(item.name)} target="_blank" rel="noopener noreferrer">
                Avisarme por WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
