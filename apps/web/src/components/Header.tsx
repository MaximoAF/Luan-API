import { useState } from 'react';
import { waLinkForContact } from '../utils/format';
import luanLogo from '../assets/luanLogo.png';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="client-header">
      <a href="/admin" className="logo">
        <img src={luanLogo} className="logo" alt="LuAn Essence" />

        <div>
          <span className="logo-main">LuAn</span>
          <small>ESSENCE</small>
        </div>
      </a>

      <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
        <a href="#catalogo">Catálogo</a>
        <a href="#proximos-ingresos">Próximos ingresos</a>
        <a onClick={() => waLinkForContact()}>Contacto</a>
      </nav>

      <button
        className="burger"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Abrir menú"
      >
        ☰
      </button>
    </header>
  );
}