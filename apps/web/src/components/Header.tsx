import { useState } from 'react';
import { waLinkForContact } from '../utils/format';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="client-header">
      <a href="/" className="logo">
        <img src="../assets/luanLogo.png" className='logo'  />
        <div>
          <span className="logo-main">LuAn</span>
          <small>ESSENCE</small>
        </div>
      </a>

      <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
        <a href="#catalogo">Catálogo</a>
        <a href="#proximos-ingresos">Próximos ingresos</a>
        <a onClick={()=>waLinkForContact()} >Contacto</a>
      </nav>

      <button className="burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Abrir menú">
        ☰
      </button>
    </header>
  );
}
