import React from 'react';
import {AbsoluteFill} from 'remotion';
import {E, P} from '../lib/anim';
import {NAV} from '../app/metrics';
import {useTheme} from '../theme/ThemeContext';
import {Icon} from '../ui/Icon';
import {Logo} from '../ui/Logo';
import {Words} from '../ui/Words';
export const Closing: React.FC<{t: number}> = ({t}) => {
  const {stage: st} = useTheme();
  const a = 161.0; if (t < a - .1) return null;
  const end = P(t, 167.1, .73, E.inOut);
  return (
    <AbsoluteFill className="f" style={{alignItems: 'center', justifyContent: 'center', color: st.fg}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 34, marginTop: -90, transform: `translateY(${(1 - P(t, a, 1.2)) * 30}px)`}}>
        <Logo k={4.2} p={[P(t, a, .7, E.back), P(t, a + .12, .7, E.back), P(t, a + .24, .7, E.back)]} />
        <div><Words t={t} at={a + .3} words={['EMS']} style={{fontSize: 120, fontWeight: 800, letterSpacing: -2, lineHeight: 1}} />
          <Words t={t} at={a + .5} words={['ប្រព័ន្ធគ្រប់គ្រង', 'ព្រឹត្តិការណ៍']} style={{fontSize: 44, fontWeight: 600, lineHeight: 1.6, color: st.soft2}} /></div>
      </div>
      <div style={{position: 'absolute', top: 650, width: 1180, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12}}>
        {NAV.map(([ic, l], i) => { const q = P(t, a + 1.0 + i * .06, .5); return <div key={i} style={{display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 99, background: st.glass2, boxShadow: `inset 0 0 0 1.5px ${st.glassLine2}`, fontSize: 17, opacity: q, transform: `translateY(${(1 - q) * 14}px)`}}><Icon n={ic} s={16} c={st.accent2} />{l}</div>; })}
      </div>
      <div style={{position: 'absolute', top: 820, display: 'flex', alignItems: 'center', gap: 10, padding: '12px 22px', borderRadius: 99, background: st.accent, color: st.onAccent, fontSize: 21, fontWeight: 600, opacity: P(t, a + 2.0, .8)}}><Icon n="globe" s={20} c={st.onAccent} />ems-admin.moc.gov.kh</div>
      <div style={{position: 'absolute', inset: 0, background: st.fade, opacity: end}} />
    </AbsoluteFill>);
};
