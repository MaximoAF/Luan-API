import { useCallback, useEffect, useState } from 'react';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';
import AdminLogin from '../admin/AdminLogin';
import AdminLayout from '../admin/AdminLayout';
import type { Perfume, ProximoIngreso } from '../types';

export default function AdminPage() {
  const { isAuthenticated } = useAuth();
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [upcoming, setUpcoming] = useState<ProximoIngreso[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(() => {
    setLoading(true);
    Promise.all([api.getPerfumes(), api.getIngresos()])
      .then(([p, i]) => {
        setPerfumes(p);
        setUpcoming(i);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (isAuthenticated) reload();
  }, [isAuthenticated, reload]);

  if (!isAuthenticated) return <AdminLogin />;
  if (loading) return <div className="page-status">Cargando panel…</div>;

  return <AdminLayout perfumes={perfumes} upcoming={upcoming} reload={reload} />;
}
