import React from 'react';
import {E, P, life} from '../lib/anim';
import {COLS, ROWS} from '../pages/data';
import {useTheme} from '../theme/ThemeContext';
import {Icon} from '../ui/Icon';
export const Sheet: React.FC<{t: number}> = ({t}) => {
  const li = useTheme().app.light;
  const p = life(t, 84.3, 90.2, .8, .6); if (p <= 0) return null;
  const fly = P(t, 89.4, .8, E.in);
  return (
    <div className="f" style={{position: 'absolute', left: 260, top: 300, width: 1400, borderRadius: 22, overflow: 'hidden', background: '#fff', boxShadow: '0 50px 110px rgba(0,0,0,.5)', opacity: p * (1 - fly), transform: `translate(${fly * 300}px, ${(1 - p) * 60 - fly * 60}px) scale(${1 - fly * .5})`}}>
      <div style={{height: 54, background: '#1D7A4C', color: '#fff', display: 'flex', alignItems: 'center', gap: 12, padding: '0 22px', fontSize: 18, fontWeight: 600}}><Icon n="file" s={22} c="#fff" />គំរូបញ្ជីអ្នកចូលរួមព្រឹត្តិការណ៍.xlsx</div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', fontSize: 17, color: li.fg}}>
        {COLS.map(([c, opt], i) => { const q = P(t, 84.8 + i * .22, .5); return (
          <div key={i} style={{padding: '14px 16px', background: '#eef6f1', borderRight: '1px solid #d7e6dc', borderBottom: '2px solid #1D7A4C', fontWeight: 700, opacity: q, transform: `translateY(${(1 - q) * -14}px)`, position: 'relative'}}>
            {c}{opt && <div style={{fontSize: 12.5, fontWeight: 600, color: '#B26B00', marginTop: 4, opacity: P(t, 87.6 + i * .05, .5)}}>អាចទុកទទេបាន</div>}</div>); })}
        {ROWS.flatMap((r, j) => r.map((v, i) => { const q = P(t, 86.2 + j * .35 + i * .06, .4); return <div key={`${j}-${i}`} style={{padding: '14px 16px', borderRight: '1px solid #e6ece8', borderBottom: '1px solid #e6ece8', minHeight: 52, opacity: q, background: v === '' && t > 87.6 ? '#fff8ec' : '#fff'}}>{v}</div>; }))}
      </div>
      <div style={{padding: '14px 22px', fontSize: 15, color: li.mut, opacity: P(t, 88.0, .6)}}>ប្រើឈ្មោះខ្មែរនៅពេលឈ្មោះអង់គ្លេសទទេ។</div>
    </div>);
};
