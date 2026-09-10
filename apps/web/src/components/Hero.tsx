interface HeroProps {
  perfumeCount: number;
  offerCount: number;
  upcomingCount: number;
}

export default function Hero({ perfumeCount, offerCount, upcomingCount }: HeroProps) {
  return (
    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow">Stock real · sin pasarela de pago</span>
        <h1>Fragancias con carácter, disponibilidad a la vista.</h1>
        <p>
          Catálogo curado de perfumes por familia olfativa. Mirá el stock disponible de cada
          frasco y consultanos directo por WhatsApp para coordinar tu compra.
        </p>
        <div className="hero-stats">
          <div>
            <b>{perfumeCount}</b>
            <span>perfumes en catálogo</span>
          </div>
          <div>
            <b>{offerCount}</b>
            <span>con oferta activa</span>
          </div>
          <div>
            <b>{upcomingCount}</b>
            <span>próximos ingresos</span>
          </div>
        </div>
      </div>
      <div className="hero-visual">
        <div className="big-gauge">
          <svg className="gauge" viewBox="0 0 44 74" style={{ width: 56 }}>
            <defs>
              <clipPath id="hero-clip">
                <path d="M10 17 L34 17 L38 27 L38 68 Q38 72 34 72 L10 72 Q6 72 6 68 L6 27 Z" />
              </clipPath>
            </defs>
            <rect x="6" y="30" width="32" height="42" fill="#7C8A66" clipPath="url(#hero-clip)" />
            <path
              d="M10 17 L34 17 L38 27 L38 68 Q38 72 34 72 L10 72 Q6 72 6 68 L6 27 Z"
              fill="none" stroke="#C6A15B" strokeWidth="2"
            />
            <rect x="16" y="2" width="12" height="9" rx="1.5" fill="none" stroke="#C6A15B" strokeWidth="2" />
            <rect x="19" y="11" width="6" height="6" fill="none" stroke="#C6A15B" strokeWidth="2" />
          </svg>
          <span>NIVEL DE STOCK</span>
        </div>
      </div>
    </section>
  );
}
