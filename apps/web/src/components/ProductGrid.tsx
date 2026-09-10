import ProductCard from './ProductCard';
import type { Perfume } from '../types';

interface ProductGridProps {
  perfumes: Perfume[];
  onSelect: (perfume: Perfume) => void;
}

export default function ProductGrid({ perfumes, onSelect }: ProductGridProps) {
  if (!perfumes.length) {
    return <p className="empty-msg">No hay perfumes en esta familia por ahora.</p>;
  }
  return (
    <div className="grid" id="catalogo">
      {perfumes.map((p) => (
        <ProductCard key={p.id} perfume={p} onClick={onSelect} />
      ))}
    </div>
  );
}
