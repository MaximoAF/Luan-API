import { useState, type FormEvent } from "react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";
import { FAMILIES } from "./families";
import CreatePerfumeModal from "./CreatePerfumeModal";
import type { ProximoIngreso } from "../types";

interface FormState {
  name: string;
  familyIdx: number;
  eta: string;
  description: string;
}

const EMPTY_FORM: FormState = {
  name: "",
  familyIdx: 0,
  eta: "",
  description: "",
};

interface UpcomingAdminPanelProps {
  upcoming: ProximoIngreso[];
  reload: () => void;
}

export default function UpcomingAdminPanel({
  upcoming,
  reload,
}: UpcomingAdminPanelProps) {
  const { token } = useAuth();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [arriving, setArriving] = useState<ProximoIngreso | null>(null);

  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const { family, fam } = FAMILIES[form.familyIdx];
    try {
      await api.createIngreso(
        {
          name: form.name,
          family,
          fam,
          eta: form.eta,
          description: form.description,
        },
        token,
      );
      setForm(EMPTY_FORM);
      reload();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No se pudo cargar el ingreso",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleRemove(id: number) {
    setBusyId(id);
    try {
      await api.deleteIngreso(id, token);
      reload();
    } finally {
      setBusyId(null);
    }
  }

  return (
    <section className="admin-panel active">
      <div className="panel-header">
        <h2>Próximos ingresos</h2>
      </div>

      <form className="new-offer-box" onSubmit={handleAdd}>
        <div className="field">
          <label>NOMBRE</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Ej: Vainilla Bourbon"
            required
          />
        </div>
        <div className="field">
          <label>FAMILIA</label>
          <select
            value={form.familyIdx}
            onChange={(e) =>
              setForm({ ...form, familyIdx: Number(e.target.value) })
            }
          >
            {FAMILIES.map((f, idx) => (
              <option key={f.fam} value={idx}>
                {f.family}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>LLEGADA ESTIMADA</label>
          <input
            value={form.eta}
            onChange={(e) => setForm({ ...form, eta: e.target.value })}
            placeholder="Ej: Mediados de agosto"
            required
          />
        </div>
        <div className="field grow">
          <label>DESCRIPCIÓN BREVE</label>
          <input
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Una línea que lo describa"
            required
          />
        </div>
        <button className="btn-primary" type="submit" disabled={saving}>
          {saving ? "Cargando…" : "Agregar a próximos ingresos"}
        </button>
      </form>
      {error && <p className="login-error">{error}</p>}

      {upcoming.length === 0 ? (
        <p className="empty-msg">No hay próximos ingresos cargados.</p>
      ) : (
        <div className="offers-grid">
          {upcoming.map((item) => (
            <div key={item.id} className="offer-card upcoming-admin-card">
              <div className="top">
                <h4>{item.name}</h4>
                <span className="discount eta">{item.eta}</span>
              </div>
              <div className="offer-meta">{item.family}</div>
              <p className="upcoming-admin-desc">{item.description}</p>
              <div className="upcoming-admin-actions">
                <button
                  className="btn-primary small"
                  onClick={() => setArriving(item)}
                >
                  Llegó
                </button>
                <button
                  className="remove-offer"
                  onClick={() => handleRemove(item.id)}
                  disabled={busyId === item.id}
                >
                  {busyId === item.id ? "Quitando…" : "Quitar"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {arriving && (
        <CreatePerfumeModal
          prefill={{
            name: arriving.name,
            fam: arriving.fam,
            description: arriving.description,
          }}
          onClose={() => setArriving(null)}
          afterCreate={async () => {
            await api.deleteIngreso(arriving.id, token);
          }}
          onCreated={() => reload()}
        />
      )}
    </section>
  );
}
