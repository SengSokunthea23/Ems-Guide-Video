import React from 'react';
import {AbsoluteFill} from 'remotion';
import {E, P} from '../lib/anim';
import {useTheme} from '../theme/ThemeContext';
/* chapter wipe */
export const Wipe: React.FC<{t: number; T: number; n: string; kh: string; en: string}> = ({t, T, n, kh, en}) => {
  const {stage: st} = useTheme();
  if (t < T - .5 || t > T + 1.2) return null;
  const pin = P(t, T - .45, .45, E.inOut), pout = P(t, T + .55, .5, E.inOut);
  const x = pout > 0 ? pout * 100 : (pin - 1) * 100; const txt = P(t, T - .1, .6) * (1 - P(t, T + .45, .25, E.in));
  return (
    <AbsoluteFill style={{zIndex: 50, overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, background: `linear-gradient(110deg, ${st.bg0} 0%, ${st.bg1} 70%, ${st.bg3} 100%)`, transform: `translateX(${x}%)`}}><div style={{position: 'absolute', right: 0, top: 0, bottom: 0, width: 6, background: st.accent, boxShadow: `0 0 40px ${st.accent}`}} /></div>
      <AbsoluteFill className="f" style={{alignItems: 'center', justifyContent: 'center', color: st.fg, opacity: txt}}>
        <div style={{fontSize: 22, fontWeight: 600, letterSpacing: 6, color: st.accent2}}>{n}</div>
        <div style={{overflow: 'hidden'}}><div style={{fontSize: 96, fontWeight: 700, lineHeight: 1.5, transform: `translateY(${(1 - P(t, T - .1, .6)) * 100}%)`}}>{kh}</div></div>
        <div style={{fontSize: 26, fontWeight: 500, letterSpacing: 8, color: st.mut, textTransform: 'uppercase'}}>{en}</div>
      </AbsoluteFill>
    </AbsoluteFill>);
};
