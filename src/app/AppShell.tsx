import React from 'react';
import {P} from '../lib/anim';
import {ThCtx} from '../theme/ThemeContext';
import type {Th} from '../theme/types';
import {Icon} from '../ui/Icon';
import {Logo} from '../ui/Logo';
import {Flag} from './Flag';
import {CH, H, NAV, SIDE, TOPH, navXY} from './metrics';
export const AppShell: React.FC<{th: Th; active: number; children?: React.ReactNode; navP?: number}> = ({th, active, children, navP = 1}) => (
  <ThCtx.Provider value={th}>
    <div className="app" style={{position: 'absolute', inset: 0, background: th.bg, color: th.fg}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: SIDE, height: H, background: th.side, borderRight: `1px solid ${th.sideBd}`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', height: 64}}>
          <Logo k={1.05} />
          <div><div style={{fontWeight: 700, fontSize: 15}}>EMS</div><div style={{fontSize: 11.5, color: th.mut, opacity: .85}}>ប្រព័ន្ធគ្រប់គ្រងព្រឹត្តិការណ៍</div></div>
        </div>
        <div style={{position: 'absolute', left: 18, top: 100, fontSize: 12, color: th.mut}}>ម៉ឺនុយ</div>
        <div style={{position: 'absolute', left: 18, top: 404, fontSize: 12, color: th.mut}}>ប្រព័ន្ធ</div>
        {NAV.map(([ic, l], i) => { const y = navXY(i).y - CH - 17; const on = i === active; const q = P(navP * 10, i * .25, 1.5);
          return (
            <div key={i} style={{position: 'absolute', left: 10, top: y, width: SIDE - 20, height: 34, borderRadius: 9, display: 'flex', alignItems: 'center', gap: 10, padding: '0 10px', fontSize: 14.5,
              background: on ? th.sec : 'transparent', color: on ? th.secFg : th.fg, fontWeight: on ? 600 : 400, opacity: q, transform: `translateX(${(1 - q) * -16}px)`}}>
              <Icon n={ic} s={16} sw={1.9} />{l}</div>); })}
        <div style={{position: 'absolute', left: 14, bottom: 14, display: 'flex', alignItems: 'center', gap: 10}}>
          <div style={{width: 34, height: 34, borderRadius: 17, background: `linear-gradient(135deg,${th.avatar[0]},${th.avatar[1]})`, color: th.onPri, display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 700}}>DA</div>
          <div><div style={{fontSize: 13.5, fontWeight: 600}}>Demo Admin</div><div style={{fontSize: 11.5, color: th.mut}}>បានចូលប្រើ</div></div>
        </div>
      </div>
      <div style={{position: 'absolute', left: SIDE, top: 0, right: 0, height: TOPH, borderBottom: `1px solid ${th.sideBd}`, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 14, background: th.dark ? th.bg : 'rgba(255,255,255,.6)'}}>
        <div style={{width: 30, height: 30, borderRadius: 7, border: `1px solid ${th.bd}`, display: 'grid', placeItems: 'center', color: th.mut}}><Icon n="panel" s={15} /></div>
        <div style={{fontWeight: 700, fontSize: 17}}>នាយកដ្ឋានរដ្ឋបាល</div>
        <div style={{flex: 1}} />
        <div style={{width: 34, height: 34, borderRadius: 8, border: `1.5px solid ${th.pri}`, display: 'grid', placeItems: 'center', color: th.pri}}><Icon n={th.dark ? 'moon' : 'sun'} s={16} /></div>
        <div style={{width: 34, height: 34, borderRadius: 8, border: `1.5px solid ${th.pri}`, display: 'grid', placeItems: 'center'}}><Flag /></div>
      </div>
      <div style={{position: 'absolute', left: SIDE, top: TOPH, right: 0, bottom: 0, overflow: 'hidden'}}>{children}</div>
    </div>
  </ThCtx.Provider>
);
