import { useState } from "react";
import StockGauge from "../components/StockGauge";
import { fmt } from "../utils/format";
import EditModal from "./EditModal";
import CreatePerfumeModal from "./CreatePerfumeModal";
import type { Perfume } from "../types";
import { imageSrc } from "../api";

interface InventoryTableProps {
  perfumes: Perfume[];
  reload: () => void;
}

export default function InventoryTable({
  perfumes,
  reload,
}: InventoryTableProps) {
  const [editing, setEditing] = useState<Perfume | null>(null);
  const [creating, setCreating] = useState(false);

  return (
    <section className="admin-panel active">
      <div className="panel-header">
        <h2>Inventario completo</h2>
        <div className="panel-header-actions">
          <span className="panel-hint">
            Click en "Editar" para modificar precio, stock u oferta
          </span>
          <button className="btn-primary" onClick={() => setCreating(true)}>
            + Agregar perfume
          </button>
        </div>
      </div>
      <div className="table-scroll">
        <table className="inv-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Stock</th>
              <th>Precio</th>
              <th>Oferta</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {perfumes.map((p) => (
              <tr key={p.id}>
                <td>
                  <div className="prod-cell">
                    {imageSrc(p.imageUrl) ? (
                      <img
                        src={imageSrc(p.imageUrl)!}
                        alt={p.name}
                        className="mini-swatch-img"
                      />
                    ) : (
                      <div className={`mini-swatch fam-${p.fam}`}></div>
                    )}
                    <div>
                      <div>{p.name}</div>
                      <div className="sku">
                        {p.sku} · {p.family}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="stock-cell">
                    <StockGauge perfume={p} size={16} />
                    <span className="num">
                      {p.stock}/{p.maxStock}
                    </span>
                  </div>
                </td>
                <td className="table-price">
                  {p.offerPrice ? (
                    <>
                      <span className="before">{fmt(p.price)}</span>
                      <span className="now">{fmt(p.offerPrice)}</span>
                    </>
                  ) : (
                    <span className="now">{fmt(p.price)}</span>
                  )}
                </td>
                <td>
                  <span className={`pill ${p.offerPrice ? "on" : "off"}`}>
                    {p.offerPrice ? "Activa" : "Sin oferta"}
                  </span>
                </td>
                <td>
                  <button className="btn-edit" onClick={() => setEditing(p)}>
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <EditModal
          perfume={editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            reload();
          }}
        />
      )}

      {creating && (
        <CreatePerfumeModal
          onClose={() => setCreating(false)}
          onCreated={() => reload()}
        />
      )}
    </section>
  );
}
