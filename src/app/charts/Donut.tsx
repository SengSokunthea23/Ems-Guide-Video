import React from 'react';
import {useTh} from '../../theme/ThemeContext';
export const Donut: React.FC<{size: number; segs: {v: number; c: string}[]; p: number; center: string; sub: string}> = ({size, segs, p, center, sub}) => {
  const th = useTh(); const tot = segs.reduce((a, s) => a + s.v, 0) || 1; let acc = 0; const r = size / 2 - 16;
  return <div style={{position: 'relative', width: size, height: size}}>
    <svg width={size} height={size} style={{transform: 'rotate(-90deg)'}}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={th.ring} strokeWidth={30} />
      {segs.map((s, i) => { const f = s.v / tot; const st = acc; acc += f; const len = Math.max(0, Math.min(f, p - st));
        return len > 0 ? <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={s.c} strokeWidth={30} pathLength={1} strokeDasharray={`${len} 1`} strokeDashoffset={-st} /> : null; })}
    </svg>
    <div style={{position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center'}}><div><div style={{fontSize: 30, fontWeight: 700, lineHeight: 1.2}}>{center}</div><div style={{fontSize: 12, color: th.mut}}>{sub}</div></div></div>
  </div>;
};
