import React from 'react';
import {P} from '../../lib/anim';
import {useTh} from '../../theme/ThemeContext';
/** simple table: header + rows (strings or nodes), with staggered row reveal */
export const Table: React.FC<{x: number; y: number; w: number; cols: [string, number][]; rows: React.ReactNode[][]; t: number; at: number; rh?: number; hi?: number}> = ({x, y, w, cols, rows, t, at, rh = 46, hi = -1}) => {
  const th = useTh(); const tot = cols.reduce((a, c) => a + c[1], 0);
  return <div style={{position: 'absolute', left: x, top: y, width: w}}>
    <div style={{display: 'flex', height: 38, alignItems: 'center', borderBottom: `1px solid ${th.bd}`, background: th.headBg, fontSize: 12.5, fontWeight: 600, color: th.mut, padding: '0 12px'}}>
      {cols.map(([l, f], i) => <div key={i} style={{width: `${(f / tot) * 100}%`}}>{l}</div>)}</div>
    {rows.map((r, i) => { const q = P(t, at + i * .07, .5); return (
      <div key={i} style={{display: 'flex', height: rh, alignItems: 'center', borderBottom: `1px solid ${th.rowBd}`, fontSize: 13.5, padding: '0 12px', opacity: q, transform: `translateY(${(1 - q) * 10}px)`, background: i === hi ? `${th.pri}14` : 'transparent'}}>
        {r.map((c, j) => <div key={j} style={{width: `${(cols[j][1] / tot) * 100}%`, paddingRight: 10, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{c}</div>)}</div>); })}
  </div>;
};
