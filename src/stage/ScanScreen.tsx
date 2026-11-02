import React from 'react';
import {useTheme} from '../theme/ThemeContext';
import {QRG} from '../ui/QRCode';
export const ScanScreen: React.FC<{t: number; a: number; title: string; seed: number}> = ({t, a, title, seed}) => {
  const {stage: st} = useTheme();
  const laser = st.fg === '#fff' ? st.accent2 : st.accent;
  return (
  <div style={{position: 'absolute', inset: 0, background: '#0d1b2a'}}>
    <div style={{position: 'absolute', top: 48, left: 0, right: 0, textAlign: 'center', color: '#fff', fontSize: 16, fontWeight: 700}}>{title}</div>
    <div style={{position: 'absolute', left: 40, top: 170, width: 200, height: 200, opacity: .9, filter: 'blur(.4px)'}}><div style={{padding: 10, background: '#fff', borderRadius: 8}}><QRG size={180} seed={seed} /></div></div>
    {[[0, 0], [1, 0], [0, 1], [1, 1]].map(([i, j], k) => <div key={k} style={{position: 'absolute', left: 26 + i * 200, top: 156 + j * 200, width: 28, height: 28, borderColor: laser, borderStyle: 'solid', borderWidth: `${j ? 0 : 4}px ${i ? 4 : 0}px ${j ? 4 : 0}px ${i ? 0 : 4}px`, borderRadius: 6}} />)}
    <div style={{position: 'absolute', left: 36, width: 208, top: 170 + ((t - a) % 1.4) / 1.4 * 196, height: 3, background: laser, boxShadow: `0 0 16px 4px ${st.glowA[0].replace(/,[^,]*\)$/, ',.7)')}`}} />
    <div style={{position: 'absolute', bottom: 70, left: 0, right: 0, textAlign: 'center', color: '#c7d6ea', fontSize: 14}}>ស្កេនកូដ QR</div>
  </div>);
};
