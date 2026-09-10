import { useState, type FormEvent } from "react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";
import { fmt } from "../utils/format";
import type { Perfume } from "../types";

interface OffersPanelProps {
  perfumes: Perfume[];
  reload: () => void;
}

export default function OffersPanel({ perfumes, reload }: OffersPanelProps) {
  const { token } = useAuth();
  const [busyId, setBusyId] = useState<number | null>(null);
  const active = perfumes.filter((p) => p.offerPrice);
  const withoutOffer = perfumes.filter((p) => !p.offerPrice);

  const [selectedId, setSelectedId] = useState<number | "">("");
  const [offerPrice, setOfferPrice] = useState<number | "">("");
  const [applying, setApplying] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function removeOffer(id: number) {
    setBusyId(id);
    try {
      await api.updatePerfume(id, { offerPrice: null }, token);
      reload();
    } finally {
      setBusyId(null);
    }
  }

  async function handleApply(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (selectedId === "" || offerPrice === "") return;

    const perfume = perfumes.find((p) => p.id === selectedId);
    if (perfume && Number(offerPrice) >= perfume.price) {
      setFormError("El precio con oferta tiene que ser menor al precio de lista.");
      return;
    }

    setApplying(true);
    try {
      await api.updatePerfume(Number(selectedId), { offerPrice: Number(offerPrice) }, token);
      setSelectedId("");
      setOfferPrice("");
      reload();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "No se pudo aplicar la oferta");
    } finally {
      setApplying(false);
    }
  }

  return (
    <section className="admin-panel active">
      <div className="panel-header">
        <h2>Ofertas</h2>
      </div>

      <form className="new-offer-box" onSubmit={handleApply}>
        <div className="field grow">
          <label>PERFUME SIN OFERTA</label>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value === "" ? "" : Number(e.target.value))}
            required
          >
            <option value="" disabled>Elegir perfume…</option>
            {withoutOffer.map((p) => (
              <option key={p.id} value={p.id}>{p.name} — {fmt(p.price)}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>PRECIO CON OFERTA ($)</label>
          <input
            type="number" className="mono" placeholder="0"
            value={offerPrice}
            onChange={(e) => setOfferPrice(e.target.value === "" ? "" : Number(e.target.value))}
            required
          />
        </div>
        <button className="btn-primary" type="submit" disabled={applying || withoutOffer.length === 0}>
          {applying ? "Aplicando…" : "Aplicar oferta"}
        </button>
      </form>
      {formError && <p className="login-error">{formError}</p>}
      {withoutOffer.length === 0 && (
        <p className="empty-msg">Todos los perfumes ya tienen una oferta activa.</p>
      )}

      {active.length === 0 ? (
        <p className="empty-msg">No hay ofertas activas todavía.</p>
      ) : (
        <div className="offers-grid">
          {active.map((p) => {
            const discount = Math.round((1 - (p.offerPrice as number) / p.price) * 100);
            return (
              <div key={p.id} className="offer-card">
                <div className="top">
                  <h4>{p.name}</h4>
                  <span className="discount">-{discount}%</span>
                </div>
                <div className="prices">
                  <span className="before">{fmt(p.price)}</span>
                  <span className="now">{fmt(p.offerPrice as number)}</span>
                </div>
                <div className="offer-meta">{p.sku} · {p.family}</div>
                <button
                  className="remove-offer"
                  onClick={() => removeOffer(p.id)}
                  disabled={busyId === p.id}
                >
                  {busyId === p.id ? "Quitando…" : "Quitar oferta"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}