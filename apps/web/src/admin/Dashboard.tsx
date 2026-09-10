import StockGauge from "../components/StockGauge";
import { pct, stockLevel, levelLabel } from "../utils/stock";
import { fmt } from "../utils/format";
import type { Perfume, ProximoIngreso } from "../types";
import { imageSrc } from "../api";

interface DashboardProps {
  perfumes: Perfume[];
  upcoming: ProximoIngreso[];
}

export default function Dashboard({ perfumes, upcoming }: DashboardProps) {
  const valor = perfumes.reduce((s, p) => s + p.price * p.stock, 0);
  const bajo = perfumes.filter((p) => pct(p) <= 20).length;
  const ofertas = perfumes.filter((p) => p.offerPrice).length;
  const sorted = [...perfumes].sort((a, b) => pct(a) - pct(b)).slice(0, 5);

  return (
    <section className="admin-panel active">
      <div className="stat-row">
        <div className="stat-card">
          <div className="label">Valor total de stock</div>
          <div className="value">{fmt(valor)}</div>
          <div className="sub">precio de lista × stock</div>
        </div>
        <div className="stat-card">
          <div className="label">Productos</div>
          <div className="value">{perfumes.length}</div>
          <div className="sub">en catálogo activo</div>
        </div>
        <div className="stat-card warn">
          <div className="label">Stock bajo</div>
          <div className="value">{bajo}</div>
          <div className="sub">≤ 20% de capacidad</div>
        </div>
        <div className="stat-card">
          <div className="label">Ofertas activas</div>
          <div className="value">{ofertas}</div>
          <div className="sub">con precio promocional</div>
        </div>
      </div>

      <div className="panel-header">
        <h2>Últimos movimientos de stock</h2>
      </div>
      <div className="table-scroll">
        <table className="inv-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Stock</th>
              <th>Precio</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((p) => {
              const level = stockLevel(p);
              return (
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
                      {p.name}
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
                  <td className="table-price now">
                    {fmt(p.offerPrice || p.price)}
                  </td>
                  <td>
                    <span className={`pill ${level === "good" ? "off" : "on"}`}>
                      {levelLabel[level]}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {upcoming.length > 0 && (
        <p className="dashboard-note">
          Además, hay <b>{upcoming.length}</b> perfume
          {upcoming.length !== 1 ? "s" : ""} cargados en "Próximos ingresos" que
          todavía no suman stock.
        </p>
      )}
    </section>
  );
}
