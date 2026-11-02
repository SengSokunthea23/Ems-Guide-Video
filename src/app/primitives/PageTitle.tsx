import React from 'react';
import {P} from '../../lib/anim';
import {useTh} from '../../theme/ThemeContext';
export const PageTitle: React.FC<{t: number; at: number; title: string; sub: string}> = ({t, at, title, sub}) => {
  const th = useTh(); const p = P(t, at, .7);
  return <div style={{position: 'absolute', left: 28, top: 22, opacity: p, transform: `translateY(${(1 - p) * 12}px)`}}>
    <div style={{fontSize: 22, fontWeight: 700, lineHeight: 1.45}}>{title}</div><div style={{fontSize: 13.5, color: th.mut}}>{sub}</div></div>;
};
