import React from 'react';
import {E, P, clamp} from '../lib/anim';
import {useTheme} from '../theme/ThemeContext';
import {CHAP} from '../timeline/timeline';
export const Progress: React.FC<{t: number}> = ({t}) => {
  const {stage: st} = useTheme();
  const vis = P(t, 8.0, .8) * (1 - P(t, 160.5, .5, E.in)); if (vis <= 0) return null;
  return <div style={{position: 'absolute', left: 120, top: 1046, width: 1680, height: 4, display: 'flex', gap: 6, opacity: vis}}>
    {CHAP.map((c, i) => { const a = c[0], b = CHAP[i + 1]?.[0] ?? 160.7; return <div key={i} style={{flex: b - a, height: 4, borderRadius: 2, background: st.track, overflow: 'hidden'}}><div style={{height: 4, width: `${clamp((t - a) / (b - a)) * 100}%`, background: st.accent}} /></div>; })}
  </div>;
};
