import React from 'react';
import {useTh} from '../../theme/ThemeContext';
export const smooth = (pts: [number, number][]) => {
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) { const [x0, y0] = pts[i], [x1, y1] = pts[i + 1], mx = (x0 + x1) / 2; d += ` C${mx},${y0} ${mx},${y1} ${x1},${y1}`; }
  return d;
};
export const Area: React.FC<{w: number; h: number; vals: number[]; max: number; p: number; c?: string; labels?: string[]; id: string}> = ({w, h, vals, max, p, c, labels, id}) => {
  const th = useTh(); const col = c ?? th.pri; const pb = labels ? 24 : 4;
  const pts = vals.map((v, i) => [30 + (i / (vals.length - 1)) * (w - 40), 8 + (1 - v / max) * (h - pb - 12)] as [number, number]);
  const d = smooth(pts);
  return <svg width={w} height={h} style={{overflow: 'visible'}}>
    <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={col} stopOpacity={.22} /><stop offset="1" stopColor={col} stopOpacity={0} /></linearGradient>
      <clipPath id={`${id}c`}><rect x={0} y={0} width={30 + (w - 40) * p} height={h} /></clipPath></defs>
    {[0, 1, 2, 3, 4].map((k) => <line key={k} x1={30} x2={w - 10} y1={8 + (k / 4) * (h - pb - 12)} y2={8 + (k / 4) * (h - pb - 12)} stroke={th.bd} strokeDasharray="4 5" strokeWidth={1} />)}
    {[4, 3, 2, 1, 0].map((k, i) => <text key={k} x={14} y={12 + (i / 4) * (h - pb - 12)} fontSize={11} fill={th.mut} textAnchor="middle">{Math.round(max * k / 4)}</text>)}
    <g clipPath={`url(#${id}c)`}><path d={`${d} L${pts[pts.length - 1][0]},${h - pb} L${pts[0][0]},${h - pb} Z`} fill={`url(#${id})`} /><path d={d} fill="none" stroke={col} strokeWidth={2.6} /></g>
    {labels?.map((l, i) => <text key={i} x={30 + (i / (labels.length - 1)) * (w - 40)} y={h - 4} fontSize={11} fill={th.mut} textAnchor="middle">{l}</text>)}
  </svg>;
};
