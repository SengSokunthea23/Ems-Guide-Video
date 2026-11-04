import React from 'react';
import {clamp} from '../lib/anim';
import {useTheme} from '../theme/ThemeContext';
export const Phone: React.FC<{x: number; y: number; p: number; children: React.ReactNode; model?: 'iphone18ProMax'}> = ({x, y, p, children, model}) => {
  const li = useTheme().app.light;
  return (
  <div style={{position: 'absolute', left: x, top: y, width: 300, height: 620, borderRadius: 48, background: model ? 'linear-gradient(135deg,#d8d0c0,#646b74 25%,#101722 44%,#424a54 70%,#ddd4c4)' : '#0b1324', padding: 10, boxShadow: `0 50px 100px rgba(0,0,0,.5), inset 0 0 0 2px rgba(255,255,255,${model ? .22 : .12})`, opacity: clamp(p * 1.4), transform: `translateY(${(1 - p) * 80}px)`}}>
    {model && <div style={{position: 'absolute', left: -3, top: 135, width: 3, height: 38, borderRadius: '3px 0 0 3px', background: '#737b84', boxShadow: '0 52px 0 #737b84, 0 96px 0 #737b84'}} />}
    {model && <div style={{position: 'absolute', right: -3, top: 176, width: 3, height: 64, borderRadius: '0 3px 3px 0', background: '#737b84'}} />}
    <div className="app" style={{position: 'relative', width: 280, height: 600, borderRadius: 38, overflow: 'hidden', background: li.bg, color: li.fg}}>
      {children}
      <div style={{position: 'absolute', left: 100, top: model ? 8 : 10, width: 80, height: model ? 22 : 24, borderRadius: 12, background: model ? '#080b10' : '#0b1324', boxShadow: model ? 'inset 0 1px 2px rgba(255,255,255,.2)' : 'none'}} />
    </div>
  </div>);
};
