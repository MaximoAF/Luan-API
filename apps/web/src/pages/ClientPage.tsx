import { useEffect, useMemo, useState } from 'react';
import { api } from '../api';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Filters from '../components/Filters';
import ProductGrid from '../components/ProductGrid';
import ProductModal from '../components/ProductModal';
import UpcomingSection from '../components/UpcomingSection';
import Footer from '../components/Footer';
import type { Perfume, ProximoIngreso } from '../types';

export default function ClientPage() {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [upcoming, setUpcoming] = useState<ProximoIngreso[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [family, setFamily] = useState('all');
  const [selected, setSelected] = useState<Perfume | null>(null);

  useEffect(() => {
    Promise.all([api.getPerfumes(), api.getIngresos()])
      .then(([p, i]) => {
        setPerfumes(p);
        setUpcoming(i);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const families = useMemo(
    () => [...new Set(perfumes.map((p) => p.family))],
    [perfumes],
  );

  const filtered = useMemo(
    () => (family === 'all' ? perfumes : perfumes.filter((p) => p.family === family)),
    [perfumes, family],
  );

  if (loading) return <div className="page-status">Cargando catálogo…</div>;
  if (error) return <div className="page-status error">No pudimos cargar el catálogo: {error}</div>;

  return (
    <>
      <Header />
      <Hero
        perfumeCount={perfumes.length}
        offerCount={perfumes.filter((p) => p.offerPrice).length}
        upcomingCount={upcoming.length}
      />
      <Filters families={families} active={family} onChange={setFamily} />
      <ProductGrid perfumes={filtered} onSelect={setSelected} />
      <UpcomingSection items={upcoming} />
      <Footer />
      <ProductModal perfume={selected} onClose={() => setSelected(null)} />
    </>
  );
}
