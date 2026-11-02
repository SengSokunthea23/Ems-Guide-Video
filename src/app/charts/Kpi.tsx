import React from 'react';
import {useTh} from '../../theme/ThemeContext';
import {Card} from '../primitives/Card';
import {Spark} from './Spark';
export const Kpi: React.FC<{x: number; y: number; w: number; label: string; value: string; sub: string; c: string; p: number; seed?: number}> = ({x, y, w, label, value, sub, c, p, seed}) => {
  const th = useTh();
  return <Card x={x} y={y} w={w} h={112} p={p}>
    <div style={{fontSize: 13.5, fontWeight: 600}}>{label}</div>
    <div style={{fontSize: 30, fontWeight: 700, color: c, lineHeight: 1.35, marginTop: 4}}>{value}</div>
    <div style={{position: 'absolute', left: 18, bottom: 14, fontSize: 12.5, color: th.mut}}>{sub}</div>
    <div style={{position: 'absolute', right: 16, bottom: 14}}><Spark c={c} p={p} seed={seed} /></div>
  </Card>;
};
