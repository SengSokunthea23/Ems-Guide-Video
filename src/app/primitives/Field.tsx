import React from 'react';
import {useTh} from '../../theme/ThemeContext';
import {Icon} from '../../ui/Icon';
export const Field: React.FC<{x: number; y: number; w: number; label?: string; value: string; icon?: string; drop?: boolean; focus?: number; style?: React.CSSProperties}> = ({x, y, w, label, value, icon, drop, focus = 0, style}) => {
  const th = useTh();
  return <div style={{position: 'absolute', left: x, top: y, width: w, ...style}}>
    {label && <div style={{fontSize: 12.5, fontWeight: 600, marginBottom: 5}}>{label}</div>}
    <div style={{height: 38, borderRadius: 9, border: `1.5px solid ${focus > 0 ? th.pri : th.bd}`, boxShadow: focus > 0 ? `0 0 0 ${3 * focus}px ${th.pri}33` : 'none', background: th.inp, display: 'flex', alignItems: 'center', padding: '0 12px', gap: 8, fontSize: 13.5, color: th.fg}}>
      <span style={{flex: 1, whiteSpace: 'nowrap', overflow: 'hidden'}}>{value}</span>{icon && <span style={{color: th.mut}}><Icon n={icon} s={15} /></span>}{drop && <span style={{color: th.mut}}><Icon n="chev" s={15} /></span>}
    </div></div>;
};
