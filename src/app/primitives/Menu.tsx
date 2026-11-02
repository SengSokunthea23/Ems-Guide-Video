import React from 'react';
import {clamp} from '../../lib/anim';
import {useTh} from '../../theme/ThemeContext';
/** dropdown list popping under a field */
export const Menu: React.FC<{x: number; y: number; w: number; items: string[]; p: number; hi?: number}> = ({x, y, w, items, p, hi = -1}) => {
  const th = useTh(); if (p <= 0) return null;
  return <div style={{position: 'absolute', left: x, top: y, width: w, padding: 6, borderRadius: 11, background: th.card, border: `1px solid ${th.bd}`, boxShadow: '0 18px 40px rgba(7,52,81,.18)', zIndex: 20, opacity: clamp(p * 1.5), transform: `translateY(${(1 - p) * -8}px) scale(${.97 + .03 * p})`, transformOrigin: '50% 0'}}>
    {items.map((it, i) => <div key={i} style={{height: 32, borderRadius: 7, padding: '0 10px', display: 'flex', alignItems: 'center', fontSize: 13.5, background: i === hi ? th.sec : 'transparent', color: i === hi ? th.secFg : th.fg, opacity: clamp(p * 3 - i * .15)}}>{it}</div>)}
  </div>;
};
