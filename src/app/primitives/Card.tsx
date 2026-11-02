import React from 'react';
import {clamp} from '../../lib/anim';
import {useTh} from '../../theme/ThemeContext';
export const Card: React.FC<{x: number; y: number; w: number; h: number; p?: number; children?: React.ReactNode; style?: React.CSSProperties; pad?: number}> = ({x, y, w, h, p = 1, children, style, pad = 18}) => {
  const th = useTh();
  return <div style={{position: 'absolute', left: x, top: y, width: w, height: h, padding: pad, borderRadius: 12, background: th.card, border: `1px solid ${th.cardBd}`, boxShadow: th.dark ? 'none' : '0 1px 2px rgba(7,52,81,.05)', opacity: clamp(p * 1.4), transform: `translateY(${(1 - p) * 24}px)`, ...style}}>{children}</div>;
};
