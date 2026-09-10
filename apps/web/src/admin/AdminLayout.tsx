import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Dashboard from './Dashboard';
import InventoryTable from './InventoryTable';
import OffersPanel from './OffersPanel';
import UpcomingAdminPanel from './UpcomingAdminPanel';
import type { Perfume, ProximoIngreso } from '../types';

type TabId = 'dashboard' | 'inventario' | 'ofertas' | 'ingresos';

const TABS: { id: TabId; label: string }[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'inventario', label: 'Inventario' },
  { id: 'ofertas', label: 'Ofertas' },
  { id: 'ingresos', label: 'Próximos ingresos' },
];

interface AdminLayoutProps {
  perfumes: Perfume[];
  upcoming: ProximoIngreso[];
  reload: () => void;
}

export default function AdminLayout({ perfumes, upcoming, reload }: AdminLayoutProps) {
  const [tab, setTab] = useState<TabId>('dashboard');
  const { logout } = useAuth();

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="brand">
          <span className="logo-main">LuAn</span>
          <small>PANEL ADMIN</small>
        </div>
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`admin-nav-item ${tab === t.id ? 'active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
        <button className="admin-nav-item logout" onClick={logout}>
          Cerrar sesión
        </button>
      </aside>

      <main className="admin-main">
        <div className="admin-topbar">
          <h1>Panel de administración</h1>
          <div className="admin-user">
            <span>Admin · Luan Essence</span>
            <div className="dot">A</div>
          </div>
        </div>

        {tab === 'dashboard' && <Dashboard perfumes={perfumes} upcoming={upcoming} />}
        {tab === 'inventario' && <InventoryTable perfumes={perfumes} reload={reload} />}
        {tab === 'ofertas' && <OffersPanel perfumes={perfumes} reload={reload} />}
        {tab === 'ingresos' && <UpcomingAdminPanel upcoming={upcoming} reload={reload} />}
      </main>
    </div>
  );
}
