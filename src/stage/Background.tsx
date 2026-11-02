import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {useTheme} from '../theme/ThemeContext';
export const Background: React.FC<{t: number}> = ({t}) => {
  const {stage: st} = useTheme();
  const {width: vw, height: vh} = useVideoConfig();
  const portrait = vh > vw, cx = vw / 2;
  return (
  <AbsoluteFill style={{background: `radial-gradient(120% 90% at 50% 0%, ${st.bg1} 0%, ${st.bg0} 60%, ${st.bg2} 100%)`}}>
    <div style={{position: 'absolute', left: cx + Math.cos(t * .11) * (portrait ? 220 : 520) - 700, top: -300 + Math.sin(t * .09) * 120, width: 1400, height: 900, borderRadius: '50%', background: `radial-gradient(closest-side, ${st.glowA[0]}, ${st.glowA[1]})`}} />
    <div style={{position: 'absolute', left: cx + Math.sin(t * .07 + 2) * (portrait ? 200 : 600) - 500, top: (portrait ? 1250 : 620) + Math.cos(t * .08) * 80, width: 1000, height: 700, borderRadius: '50%', background: `radial-gradient(closest-side, ${st.glowB[0]}, ${st.glowB[1]})`}} />
    <svg width={vw} height={vh} style={{position: 'absolute', inset: 0, opacity: .5}}>
      <defs><pattern id="g" width={48} height={48} patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke={st.grid} strokeWidth={1} /></pattern>
        <radialGradient id="fade"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#fff" stopOpacity={0} /></radialGradient><mask id="m"><rect width={vw} height={vh} fill="url(#fade)" /></mask></defs>
      <rect width={vw} height={vh} fill="url(#g)" mask="url(#m)" />
    </svg>
  </AbsoluteFill>);
};
