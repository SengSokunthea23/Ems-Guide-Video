import React from 'react';
import {E, P, clamp} from '../../lib/anim';
import {useTheme} from '../../theme/ThemeContext';
import {CHAP, STEPS} from '../../timeline/timeline';
import {Icon} from '../../ui/Icon';
import {Logo} from '../../ui/Logo';

/** big chapter title + current step caption, pinned to the top of the portrait frame */
export const HeaderP: React.FC<{t: number}> = ({t}) => {
  const {stage: st} = useTheme();
  const vis = P(t, 8.0, .8) * (1 - P(t, 160.5, .5, E.in));
  if (vis <= 0) return null;
  let si = -1; STEPS.forEach((s, i) => { if (t >= s[0]) si = i; });
  return (
    <div className="f" style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 400, opacity: vis, color: st.fg}}>
      <div style={{position: 'absolute', left: 60, top: 50, display: 'flex', alignItems: 'center', gap: 18}}>
        <Logo k={1.15} /><div style={{fontWeight: 800, fontSize: 28}}>EMS</div><div style={{width: 1.5, height: 32, background: st.divider}} />
        <div style={{fontSize: 19, fontWeight: 500, color: st.mut}}>Event Management System</div>
      </div>
      <div style={{position: 'absolute', left: 60, top: 118, width: 960, height: 150}}>
        {CHAP.map((c, i) => { const a = c[0], b = CHAP[i + 1]?.[0] ?? 999; if (t < a - .1 || t > b + .6) return null; const pin = P(t, a, .7), pout = P(t, b, .45, E.in);
          return <div key={i} style={{position: 'absolute', left: 0, top: 0, width: 960, height: 150, overflow: 'hidden'}}>
            <div style={{display: 'flex', alignItems: 'baseline', gap: 14, height: 40, transform: `translateY(${(1 - pin) * 50 - pout * 50}px)`, opacity: pin * (1 - pout)}}>
              <span style={{fontSize: 24, fontWeight: 700, color: st.accent2}}>{String(i + 1).padStart(2, '0')}</span><span style={{fontSize: 21, fontWeight: 500, color: st.mut, letterSpacing: 2, textTransform: 'uppercase'}}>{c[2]}</span></div>
            <div style={{fontSize: 68, fontWeight: 700, lineHeight: 1.5, whiteSpace: 'nowrap', transform: `translateY(${(1 - P(t, a + .06, .7)) * 90 - pout * 90}px)`, opacity: 1 - pout}}>{c[1]}</div></div>; })}
      </div>
      <div style={{position: 'absolute', left: 60, right: 60, top: 292, height: 78}}>
        {STEPS.map((s, i) => { if (Math.abs(i - si) > 1) return null; const a = s[0], b = STEPS[i + 1]?.[0] ?? 160.4; const pin = P(t, a, .5), pout = P(t, b, .3, E.in); if (pin <= 0 || pout >= 1) return null;
          return <div key={i} style={{position: 'absolute', left: 0, top: 0, maxWidth: 960, height: 78, padding: '0 34px 0 14px', borderRadius: 39, display: 'flex', alignItems: 'center', gap: 18, whiteSpace: 'nowrap',
            background: st.glass, backdropFilter: 'blur(14px)', boxShadow: `inset 0 0 0 2px ${st.glassLine}`, fontSize: 32, fontWeight: 600, opacity: pin * (1 - pout), transform: `translateY(${(1 - pin) * -16 + pout * 16}px)`}}>
            <div style={{width: 52, height: 52, borderRadius: 26, background: st.accent, display: 'grid', placeItems: 'center', flex: 'none'}}><Icon n="check" s={26} sw={2.6} c={st.onAccent} /></div><span style={{lineHeight: 1.5}}>{s[1]}</span></div>; })}
      </div>
    </div>);
};
export const ProgressP: React.FC<{t: number}> = ({t}) => {
  const {stage: st} = useTheme();
  const vis = P(t, 8.0, .8) * (1 - P(t, 160.5, .5, E.in)); if (vis <= 0) return null;
  return <div style={{position: 'absolute', left: 60, top: 1860, width: 960, height: 5, display: 'flex', gap: 5, opacity: vis}}>
    {CHAP.map((c, i) => { const a = c[0], b = CHAP[i + 1]?.[0] ?? 160.7; return <div key={i} style={{flex: b - a, height: 5, borderRadius: 3, background: st.track, overflow: 'hidden'}}><div style={{height: 5, width: `${clamp((t - a) / (b - a)) * 100}%`, background: st.accent}} /></div>; })}
  </div>;
};
