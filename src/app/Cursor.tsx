import React from 'react';
import {E, P, clamp} from '../lib/anim';
import {useTheme} from '../theme/ThemeContext';
import {CH} from './metrics';
export type Mv = [number, number, number, number?]; // time, x, y, duration
export const Cursor: React.FC<{t: number; path: Mv[]; clicks: number[]; show?: [number, number]}> = ({t, path, clicks, show = [-1, 1e9]}) => {
  const {accent} = useTheme().stage;
  if (t < show[0] || t > show[1] || !path.length) return null;
  let x = path[0][1], y = path[0][2];
  for (const [at, tx, ty, d = .8] of path) { if (t < at) break; const k = P(t, at, d, E.inOut); x += (tx - x) * k; y += (ty - y) * k; }
  const vis = P(t, show[0], .3) * (1 - P(t, show[1] - .3, .3));
  const press = clicks.reduce((a, c) => Math.max(a, clamp(1 - Math.abs(t - c) / .12)), 0);
  // path points are in window px (browser bar included) but the cursor is drawn inside the app area below the bar
  return <div style={{position: 'absolute', left: 0, top: -CH, width: 0, height: 0}}>
    {clicks.map((c, i) => { const k = (t - c) / .55; if (k < 0 || k > 1) return null; return <div key={i} style={{position: 'absolute', left: x - 22, top: y - 22, width: 44, height: 44, borderRadius: 22, border: `2.5px solid ${accent}`, opacity: (1 - k) * vis, transform: `scale(${.4 + k})`, zIndex: 40}} />; })}
    <svg width={25} height={25} viewBox="0 0 24 24" style={{position: 'absolute', left: x - 4, top: y - 2, zIndex: 41, opacity: vis, transform: `scale(${1 - .12 * press})`, filter: 'drop-shadow(0 3px 5px rgba(0,0,0,.3))'}}>
      <path d="M4 2l15 9.5l-6.6 1.4l3.8 7.3l-2.7 1.4l-3.8-7.3L4 19z" fill="#0b1b3a" stroke="#fff" strokeWidth={1.4} strokeLinejoin="round" /></svg>
  </div>;
};
