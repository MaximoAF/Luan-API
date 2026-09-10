import { useId } from 'react';
import { pct, stockLevel, levelColorOf } from '../utils/stock';
import type { Perfume } from '../types';

interface StockGaugeProps {
  perfume: Perfume;
  size?: number;
}

export default function StockGauge({ perfume, size = 40 }: StockGaugeProps) {
  const id = `gauge-clip-${useId()}`;
  const per = Math.max(pct(perfume), 0) / 100;
  const bodyTop = 17;
  const bodyBottom = 72;
  const bodyH = bodyBottom - bodyTop;
  const fillH = bodyH * per;
  const fillY = bodyBottom - fillH;
  const color = levelColorOf(stockLevel(perfume));
  const strokeColor = per <= 0 ? '#5a5348' : '#C6A15B';

  return (
    <svg className="gauge" viewBox="0 0 44 74" style={{ width: size }}>
      <defs>
        <clipPath id={id}>
          <path d="M10 17 L34 17 L38 27 L38 68 Q38 72 34 72 L10 72 Q6 72 6 68 L6 27 Z" />
        </clipPath>
      </defs>
      <rect
        x="6"
        y={fillY.toFixed(1)}
        width="32"
        height={fillH.toFixed(1)}
        fill={color}
        clipPath={`url(#${id})`}
      />
      <path
        d="M10 17 L34 17 L38 27 L38 68 Q38 72 34 72 L10 72 Q6 72 6 68 L6 27 Z"
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
      />
      <rect x="16" y="2" width="12" height="9" rx="1.5" fill="none" stroke={strokeColor} strokeWidth="2" />
      <rect x="19" y="11" width="6" height="6" fill="none" stroke={strokeColor} strokeWidth="2" />
    </svg>
  );
}
