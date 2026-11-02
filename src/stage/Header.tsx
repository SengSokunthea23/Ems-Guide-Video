import React from 'react';
import {E, P} from '../lib/anim';
import {useTheme} from '../theme/ThemeContext';
import {CHAP, STEPS} from '../timeline/timeline';
import {Icon} from '../ui/Icon';
import {Logo} from '../ui/Logo';
export const Header: React.FC<{t: number}> = ({t}) => {
  const {stage: st} = useTheme();
  const vis = P(t, 8.0, .8) * (1 - P(t, 160.5, .5, E.in));
  if (vis <= 0) return null;
  let si = -1; STEPS.forEach((s, i) => { if (t >= s[0]) si = i; });
  return (
    <div className="f" style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 140, opacity: vis, color: st.fg}}>
      <div style={{position: 'absolute', left: 120, top: 36, height: 70, display: 'flex', alignItems: 'center', gap: 20}}>
        <Logo k={1.15} /><div style={{fontWeight: 800, fontSize: 24}}>EMS</div><div style={{width: 1.5, height: 34, background: st.divider}} />
        <div style={{position: 'relative', width: 800, height: 70}}>
          {CHAP.map((c, i) => { const a = c[0], b = CHAP[i + 1]?.[0] ?? 999; if (t < a - .1 || t > b + .6) return null; const pin = P(t, a, .7), pout = P(t, b, .45, E.in);
            return <div key={i} style={{position: 'absolute', left: 0, top: 0, height: 70, display: 'flex', alignItems: 'center', gap: 16, overflow: 'hidden'}}>
              <div style={{fontSize: 18, fontWeight: 600, color: st.accent2, transform: `translateY(${(1 - pin) * 40 - pout * 40}px)`, opacity: pin * (1 - pout)}}>{String(i + 1).padStart(2, '0')}</div>
              <div style={{fontSize: 29, fontWeight: 700, lineHeight: 1.5, transform: `translateY(${(1 - P(t, a + .06, .7)) * 60 - pout * 60}px)`, opacity: 1 - pout}}>{c[1]}</div>
              <div style={{fontSize: 17, fontWeight: 500, color: st.mut, transform: `translateY(${(1 - P(t, a + .14, .7)) * 60 - pout * 60}px)`, opacity: P(t, a + .14, .7) * (1 - pout)}}>{c[2]}</div></div>; })}
        </div>
      </div>
      <div style={{position: 'absolute', right: 120, top: 46}}>
        {STEPS.map((s, i) => { if (Math.abs(i - si) > 1) return null; const a = s[0], b = STEPS[i + 1]?.[0] ?? 160.4; const pin = P(t, a, .5), pout = P(t, b, .3, E.in); if (pin <= 0 || pout >= 1) return null;
          return <div key={i} style={{position: 'absolute', right: 0, top: 0, height: 50, padding: '0 22px 0 8px', borderRadius: 25, display: 'flex', alignItems: 'center', gap: 12, whiteSpace: 'nowrap',
            background: st.glass, backdropFilter: 'blur(14px)', boxShadow: `inset 0 0 0 1.5px ${st.glassLine}`, fontSize: 20, fontWeight: 600, opacity: pin * (1 - pout), transform: `translateY(${(1 - pin) * -14 + pout * 14}px)`}}>
            <div style={{width: 34, height: 34, borderRadius: 17, background: st.accent, display: 'grid', placeItems: 'center'}}><Icon n="check" s={17} sw={2.6} c={st.onAccent} /></div><span style={{lineHeight: 1.4}}>{s[1]}</span></div>; })}
      </div>
    </div>);
};
