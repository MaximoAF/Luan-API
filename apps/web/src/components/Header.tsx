import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="client-header">
      <a href="/" className="logo">
        <svg viewBox="0 0 44 74">
          <path
            d="M10 17 L34 17 L38 27 L38 68 Q38 72 34 72 L10 72 Q6 72 6 68 L6 27 Z"
            fill="none" stroke="#C6A15B" strokeWidth="2.5"
          />
          <rect x="16" y="2" width="12" height="9" rx="1.5" fill="none" stroke="#C6A15B" strokeWidth="2.5" />
          <rect x="19" y="11" width="6" height="6" fill="none" stroke="#C6A15B" strokeWidth="2.5" />
        </svg>
        <div>
          <span className="logo-main">LuAn</span>
          <small>ESSENCE</small>
        </div>
      </a>

      <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
        <a href="#catalogo">Catálogo</a>
        <a href="#proximos-ingresos">Próximos ingresos</a>
        <a href="#nosotros">Nosotros</a>
        <a href="#contacto">Contacto</a>
      </nav>

      <button className="burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Abrir menú">
        ☰
      </button>
    </header>
  );
}
