import React from 'react';
import {clamp} from '../../lib/anim';
import {useTh} from '../../theme/ThemeContext';
export const Legend: React.FC<{items: [string, string, string][]; p?: number}> = ({items, p = 1}) => {
  const th = useTh();
  return <div>{items.map(([c, l, v], i) => <div key={i} style={{display: 'flex', alignItems: 'center', gap: 9, height: 28, fontSize: 13, opacity: clamp(p * 3 - i * .4)}}><i style={{width: 9, height: 9, borderRadius: 5, background: c}} /><span style={{flex: 1, color: th.mut}}>{l}</span><b style={{fontWeight: 700}}>{v}</b></div>)}</div>;
};
