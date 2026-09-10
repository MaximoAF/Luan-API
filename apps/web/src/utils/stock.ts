import type { Perfume, StockLevel } from '../types';

export function pct(p: Perfume): number {
  if (!p.maxStock) return 0;
  return Math.round((p.stock / p.maxStock) * 100);
}

export function stockLevel(p: Perfume): StockLevel {
  const per = pct(p);
  if (per <= 0) return 'empty';
  if (per <= 15) return 'critical';
  if (per <= 40) return 'low';
  return 'good';
}

export const levelLabel: Record<StockLevel, string> = {
  empty: 'Agotado',
  critical: 'Últimas unidades',
  low: 'Stock bajo',
  good: 'Disponible',
};

const levelColor: Record<StockLevel, string> = {
  empty: '#5a5348',
  critical: '#93503E',
  low: '#C6A15B',
  good: '#7C8A66',
};

export function levelColorOf(level: StockLevel): string {
  return levelColor[level];
}
