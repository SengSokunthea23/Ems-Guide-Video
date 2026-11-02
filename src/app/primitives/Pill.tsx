import React from 'react';
import {useTh} from '../../theme/ThemeContext';
export const Pill: React.FC<{c: 'ok' | 'warn' | 'bad' | 'pri' | 'mut'; children: React.ReactNode; style?: React.CSSProperties}> = ({c, children, style}) => {
  const th = useTh(); const col = c === 'ok' ? th.ok : c === 'warn' ? th.warn : c === 'bad' ? th.bad : c === 'pri' ? th.pri : th.mut;
  return <span style={{display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 10px', borderRadius: 7, fontSize: 12.5, fontWeight: 600, color: col, background: `${col}1f`, border: `1px solid ${col}40`, whiteSpace: 'nowrap', ...style}}>{children}</span>;
};
