import React from 'react';
import {useTh} from '../../theme/ThemeContext';
import {Icon} from '../../ui/Icon';
export const Btn: React.FC<{x: number; y: number; children: React.ReactNode; icon?: string; solid?: boolean; press?: number; w?: number}> = ({x, y, children, icon, solid, press = 0, w}) => {
  const th = useTh();
  return <div style={{position: 'absolute', left: x, top: y, width: w, height: 38, borderRadius: 9, padding: '0 14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 13.5, fontWeight: 600,
    background: solid ? th.pri : th.card, color: solid ? th.onPri : th.fg, border: `1.5px solid ${solid ? th.pri : th.bd}`, transform: `scale(${1 - .06 * press})`, whiteSpace: 'nowrap'}}>{icon && <Icon n={icon} s={15} />}{children}</div>;
};
