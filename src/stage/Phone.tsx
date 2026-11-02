import React from 'react';
import {clamp} from '../lib/anim';
import {useTheme} from '../theme/ThemeContext';
export const Phone: React.FC<{x: number; y: number; p: number; children: React.ReactNode}> = ({x, y, p, children}) => {
  const li = useTheme().app.light;
  return (
  <div style={{position: 'absolute', left: x, top: y, width: 300, height: 620, borderRadius: 48, background: '#0b1324', padding: 10, boxShadow: '0 50px 100px rgba(0,0,0,.5), inset 0 0 0 2px rgba(255,255,255,.12)', opacity: clamp(p * 1.4), transform: `translateY(${(1 - p) * 80}px)`}}>
    <div className="app" style={{position: 'relative', width: 280, height: 600, borderRadius: 38, overflow: 'hidden', background: li.bg, color: li.fg}}>
      {children}
      <div style={{position: 'absolute', left: 100, top: 10, width: 80, height: 24, borderRadius: 12, background: '#0b1324'}} />
    </div>
  </div>);
};
