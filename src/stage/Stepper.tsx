import React from 'react';
import {E, P} from '../lib/anim';
import {useTheme} from '../theme/ThemeContext';
import {Icon} from '../ui/Icon';
export const Stepper: React.FC<{t: number; x: number; y: number; items: [string, string, string, number][]; p: number}> = ({t, x, y, items, p}) => {
  const {stage: st} = useTheme();
  return (
  <div className="f" style={{position: 'absolute', left: x, top: y, width: 440, color: st.fg, opacity: p, transform: `translateX(${(1 - p) * 50}px)`}}>
    <div style={{position: 'absolute', left: 25, top: 30, width: 2, height: (items.length - 1) * 120, background: st.track}} />
    {items.map(([ic, kh, en, at], i) => { const act = t >= at, fin = i < items.length - 1 ? t >= items[i + 1][3] : t >= at + .4; const col = i === items.length - 1 && act ? st.green : st.accent; const pop = P(t, at, .5, E.back);
      return <div key={i} style={{display: 'flex', gap: 22, alignItems: 'center', height: 120}}>
        <div style={{position: 'relative', width: 52, height: 52, flex: 'none'}}>
          {act && !fin && <div style={{position: 'absolute', inset: -10, borderRadius: 40, border: `2px solid ${col}`, opacity: .7 - ((t - at) % 1.2) / 1.8, transform: `scale(${1 + ((t - at) % 1.2) * .3})`}} />}
          <div style={{position: 'absolute', inset: 0, borderRadius: 26, display: 'grid', placeItems: 'center', background: act ? col : st.glass, boxShadow: `0 0 0 7px ${st.bg0}${act ? `, 0 10px 30px ${col}66` : ''}`, transform: `scale(${act ? .88 + .12 * pop : 1})`}}><Icon n={fin ? 'check' : ic} s={24} sw={2.3} c={!act ? st.fg : i === items.length - 1 ? '#fff' : st.onAccent} /></div>
        </div>
        <div><div style={{fontSize: 27, fontWeight: 700, lineHeight: 1.45, opacity: act ? 1 : .4}}>{kh}</div><div style={{fontSize: 17, color: act ? st.stepAct : st.stepIdle}}>{en}</div></div>
      </div>; })}
  </div>);
};
