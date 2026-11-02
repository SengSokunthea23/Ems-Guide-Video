import React from 'react';
import {useTh} from '../../theme/ThemeContext';
export const Att: React.FC<{v: number; lab: string}> = ({v, lab}) => { const th = useTh(); return <div style={{width: 130}}><div style={{fontSize: 12.5, marginBottom: 4}}>{lab}</div><div style={{height: 6, borderRadius: 3, background: th.track}}><div style={{height: 6, width: `${v * 100}%`, borderRadius: 3, background: th.pri}} /></div></div>; };
