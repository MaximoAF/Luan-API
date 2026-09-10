import StockGauge from "./StockGauge";
import { stockLevel, levelLabel } from "../utils/stock";
import { fmt, waLinkForPerfume } from "../utils/format";
import type { Perfume } from "../types";
import { imageSrc } from "../api";

interface ProductModalProps {
  perfume: Perfume | null;
  onClose: () => void;
}

export default function ProductModal({ perfume, onClose }: ProductModalProps) {
  if (!perfume) return null;
  const level = stockLevel(perfume);

  return (
    <div
      className="modal-backdrop active"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="product-modal">
        <div className={`pm-media fam-${perfume.fam}`}>
          {imageSrc(perfume.imageUrl) && (
            <img
              src={imageSrc(perfume.imageUrl)!}
              alt={perfume.name}
              className="pm-media-img"
            />
          )}
          <StockGauge perfume={perfume} size={80} />
        </div>
        <div className="pm-info">
          <button className="pm-close" onClick={onClose} aria-label="Cerrar">
            ×
          </button>
          <span className="family">{perfume.family}</span>
          <h2>{perfume.name}</h2>
          <p className="desc">{perfume.description}</p>

          <div className="pyramid">
            <div className="pyramid-row">
              <b>Salida</b>
              <span>{perfume.topNotes}</span>
            </div>
            <div className="pyramid-row">
              <b>Corazón</b>
              <span>{perfume.heartNotes}</span>
            </div>
            <div className="pyramid-row">
              <b>Fondo</b>
              <span>{perfume.baseNotes}</span>
            </div>
          </div>

          <div className="pm-price-row">
            {perfume.offerPrice ? (
              <>
                <span className="now mono">{fmt(perfume.offerPrice)}</span>
                <span className="before mono">{fmt(perfume.price)}</span>
              </>
            ) : (
              <span className="now mono">{fmt(perfume.price)}</span>
            )}
          </div>

          <div className="pm-stock-line">
            <StockGauge perfume={perfume} size={16} />
            {levelLabel[level]} · {perfume.stock} unidades en stock
          </div>

          <a
            className="wa-btn"
            href={waLinkForPerfume(perfume.name)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.1s-.8 1-.9 1.2c-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.2-.4.1-.2 0-.3 0-.5s-.7-1.7-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.1.2 2.2 3.4 5.3 4.7.7.3 1.3.5 1.8.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3z" />
              <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.6 1.4 5.1L2 22l5-1.3C8.5 21.5 10.2 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.2-.4-4.6-1.3l-.3-.2-3 .8.8-2.9-.2-.3C3.9 15 3.4 13.5 3.4 12c0-4.7 3.9-8.6 8.6-8.6s8.6 3.9 8.6 8.6-3.9 8.6-8.6 8.6z" />
            </svg>
            Consultar por WhatsApp
          </a>
          <span className="wa-disclaimer">
            Te redirige a WhatsApp con un mensaje ya redactado.
          </span>
        </div>
      </div>
    </div>
  );
}
