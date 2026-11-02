import React from 'react';
export const Spark: React.FC<{c: string; p: number; w?: number; h?: number; seed?: number}> = ({c, p, w = 62, h = 22, seed = 1}) => {
  const v = [3, 4, 3.6, 5, 4.6, 6, 7].map((x, i) => x + Math.sin(i * seed) * .6);
  const pts = v.map((y, i) => `${(i / 6) * w},${h - (y / 8) * h}`).join(' ');
  return <svg width={w} height={h} style={{overflow: 'visible'}}><defs><linearGradient id={`sg${c.slice(1)}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={c} stopOpacity={.3} /><stop offset="1" stopColor={c} stopOpacity={0} /></linearGradient></defs>
    <polygon points={`0,${h} ${pts} ${w},${h}`} fill={`url(#sg${c.slice(1)})`} opacity={p} /><polyline points={pts} fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" pathLength={1} strokeDasharray={`${p} 1`} /></svg>;
};
