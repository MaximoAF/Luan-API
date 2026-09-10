import StockGauge from "./StockGauge";
import { stockLevel, levelLabel } from "../utils/stock";
import { fmt } from "../utils/format";
import type { Perfume } from "../types";
import { imageSrc } from "../api";

interface ProductCardProps {
  perfume: Perfume;
  onClick: (perfume: Perfume) => void;
}

export default function ProductCard({ perfume, onClick }: ProductCardProps) {
  const level = stockLevel(perfume);

  return (
    <div className="card" onClick={() => onClick(perfume)}>
      <div className={`card-media fam-${perfume.fam}`}>
        {imageSrc(perfume.imageUrl) && (
          <img
            src={imageSrc(perfume.imageUrl)!}
            alt={perfume.name}
            className="card-media-img"
          />
        )}
        {perfume.offerPrice ? (
          <span className="offer-badge">OFERTA</span>
        ) : null}
        <span className={`stock-badge ${level}`}>{levelLabel[level]}</span>
        <StockGauge perfume={perfume} size={40} />
      </div>
      <div className="card-body">
        <span className="family">{perfume.family}</span>
        <h3>{perfume.name}</h3>
        <div className="notes">{perfume.heartNotes}</div>
        <div className="price-row">
          {perfume.offerPrice ? (
            <>
              <span className="now mono">{fmt(perfume.offerPrice)}</span>
              <span className="before mono">{fmt(perfume.price)}</span>
            </>
          ) : (
            <span className="now mono">{fmt(perfume.price)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
