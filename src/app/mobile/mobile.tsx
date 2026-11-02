import React from 'react';
import {E, P, clamp} from '../../lib/anim';
import {ThCtx, useTh, useTheme} from '../../theme/ThemeContext';
import type {Th} from '../../theme/types';
import {Icon} from '../../ui/Icon';
import {Logo} from '../../ui/Logo';
import {Flag} from '../Flag';
import {NAV} from '../metrics';
import {Spark} from '../charts/Spark';

/** mobile viewport (logical px) — the portrait video scales it up */
export const MW = 430, MH = 640, MTOP = 56, MPAD = 16;
export const THEME_BTN: [number, number] = [357, 28];
export const MENU_BTN: [number, number] = [31, 28];
export const navTap = (i: number): [number, number] => [150, 92 + i * 40 + 18];

/** piecewise eased scroll: [time, target, duration?] */
export const sc = (t: number, keys: [number, number, number?][], start = 0) => {
  let v = start;
  for (const [at, to, d = .9] of keys) { if (t < at) break; v += (to - v) * P(t, at, d, E.inOut); }
  return v;
};

/* ---------------- shell ---------------- */
export const MobileShell: React.FC<{th: Th; active: number; drawer?: number; flash?: number; children?: React.ReactNode}> = ({th, active, drawer = 0, flash = 0, children}) => (
  <ThCtx.Provider value={th}>
    <div className="app" style={{position: 'absolute', inset: 0, background: th.bg, color: th.fg, overflow: 'hidden', zIndex: 0}}>
      <div style={{position: 'absolute', left: 0, top: 0, right: 0, height: MTOP, display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', background: th.side, borderBottom: `1px solid ${th.sideBd}`, zIndex: 5}}>
        <div style={{width: 34, height: 34, borderRadius: 9, border: `1px solid ${th.bd}`, display: 'grid', placeItems: 'center', color: th.mut}}><Icon n="panel" s={17} /></div>
        <div style={{fontWeight: 700, fontSize: 16, whiteSpace: 'nowrap'}}>នាយកដ្ឋានរដ្ឋបាល</div>
        <div style={{flex: 1}} />
        <div style={{width: 34, height: 34, borderRadius: 9, border: `1.5px solid ${th.pri}`, display: 'grid', placeItems: 'center', color: th.pri}}><Icon n={th.dark ? 'moon' : 'sun'} s={16} /></div>
        <div style={{width: 34, height: 34, borderRadius: 9, border: `1.5px solid ${th.pri}`, display: 'grid', placeItems: 'center'}}><Flag /></div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: MTOP, bottom: 0, overflow: 'hidden'}}>{children}</div>
      {drawer > 0 && <div style={{position: 'absolute', inset: 0, zIndex: 30}}>
        <div style={{position: 'absolute', inset: 0, background: `rgba(7,18,43,${.5 * drawer})`}} />
        <div style={{position: 'absolute', left: -300 + 300 * drawer, top: 0, width: 300, height: MH, background: th.side, borderRight: `1px solid ${th.sideBd}`, boxShadow: '12px 0 40px rgba(0,0,0,.25)'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', height: 72}}>
            <Logo k={1.05} /><div><div style={{fontWeight: 700, fontSize: 15}}>EMS</div><div style={{fontSize: 11.5, color: th.mut}}>ប្រព័ន្ធគ្រប់គ្រងព្រឹត្តិការណ៍</div></div>
          </div>
          {NAV.map(([ic, l], i) => { const on = i === active; return (
            <div key={i} style={{position: 'absolute', left: 10, top: 92 + i * 40, width: 280, height: 36, borderRadius: 9, display: 'flex', alignItems: 'center', gap: 10, padding: '0 12px', fontSize: 14.5,
              background: on ? th.sec : 'transparent', color: on ? th.secFg : th.fg, fontWeight: on ? 600 : 400, transform: `scale(${1 - .04 * (on ? flash : 0)})`}}><Icon n={ic} s={16} sw={1.9} />{l}</div>); })}
        </div>
      </div>}
    </div>
  </ThCtx.Provider>
);

/* ---------------- flow primitives ---------------- */
export const Scroll: React.FC<{y: number; children: React.ReactNode}> = ({y, children}) => (
  <div style={{position: 'absolute', left: 0, right: 0, top: 0, padding: `14px ${MPAD}px 60px`, transform: `translateY(${-y}px)`}}>{children}</div>
);
export const MTitle: React.FC<{t: number; at?: number; title: string; sub?: string}> = ({t, at = .1, title, sub}) => {
  const th = useTh(); const p = P(t, at, .6);
  return <div style={{marginBottom: 12, opacity: p, transform: `translateY(${(1 - p) * 10}px)`}}>
    <div style={{fontSize: 21, fontWeight: 700, lineHeight: 1.5}}>{title}</div>{sub && <div style={{fontSize: 12.5, color: th.mut, lineHeight: 1.6}}>{sub}</div>}</div>;
};
export const MCard: React.FC<{p?: number; children?: React.ReactNode; style?: React.CSSProperties; pad?: number}> = ({p = 1, children, style, pad = 14}) => {
  const th = useTh();
  return <div style={{position: 'relative', borderRadius: 12, background: th.card, border: `1px solid ${th.cardBd}`, boxShadow: th.dark ? 'none' : '0 1px 2px rgba(7,52,81,.05)', padding: pad, marginBottom: 12, opacity: clamp(p * 1.4), transform: `translateY(${(1 - p) * 20}px)`, ...style}}>{children}</div>;
};
export const MH2: React.FC<{children: React.ReactNode}> = ({children}) => <div style={{fontSize: 14.5, fontWeight: 700, marginBottom: 10}}>{children}</div>;
export const MField: React.FC<{label?: string; value: string; icon?: string; drop?: boolean; focus?: number; style?: React.CSSProperties}> = ({label, value, icon, drop, focus = 0, style}) => {
  const th = useTh();
  return <div style={{minWidth: 0, ...style}}>
    {label && <div style={{fontSize: 12, fontWeight: 600, marginBottom: 4}}>{label}</div>}
    <div style={{height: 40, borderRadius: 9, border: `1.5px solid ${focus > 0 ? th.pri : th.bd}`, boxShadow: focus > 0 ? `0 0 0 ${3 * focus}px ${th.pri}33` : 'none', background: th.inp, display: 'flex', alignItems: 'center', padding: '0 10px', gap: 6, fontSize: 13, color: th.fg}}>
      {icon && <span style={{color: th.mut}}><Icon n={icon} s={15} /></span>}
      <span style={{flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{value}</span>{drop && <span style={{color: th.mut}}><Icon n="chev" s={15} /></span>}
    </div></div>;
};
export const Grid2: React.FC<{children: React.ReactNode; gap?: number; style?: React.CSSProperties}> = ({children, gap = 10, style}) => <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap, marginBottom: 12, ...style}}>{children}</div>;
export const MKpi: React.FC<{label: string; value: string; sub: string; c: string; p: number; seed?: number}> = ({label, value, sub, c, p, seed}) => {
  const th = useTh();
  return <MCard p={p} pad={12} style={{marginBottom: 0}}>
    <div style={{fontSize: 12.5, fontWeight: 600, whiteSpace: 'nowrap'}}>{label}</div>
    <div style={{fontSize: 28, fontWeight: 700, color: c, lineHeight: 1.35}}>{value}</div>
    <div style={{fontSize: 11, color: th.mut, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{sub}</div>
    <div style={{position: 'absolute', right: 12, top: 38}}><Spark c={c} p={p} seed={seed} w={46} h={20} /></div>
  </MCard>;
};
/** table row replacement: title + sub line on the left, node on the right */
export const MRow: React.FC<{t: number; at: number; i: number; title: React.ReactNode; sub?: React.ReactNode; right?: React.ReactNode; hi?: boolean; lead?: React.ReactNode; style?: React.CSSProperties}> = ({t, at, i, title, sub, right, hi, lead, style}) => {
  const th = useTh(); const q = P(t, at + i * .08, .5);
  return <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '11px 12px', marginBottom: 8, borderRadius: 11, background: hi ? `${th.pri}14` : th.card, border: `1px solid ${hi ? th.pri : th.cardBd}`, opacity: q, transform: `translateY(${(1 - q) * 10}px)`, ...style}}>
    {lead}<div style={{flex: 1, minWidth: 0}}><div style={{fontSize: 13.5, fontWeight: 600, lineHeight: 1.55}}>{title}</div>{sub && <div style={{fontSize: 11.5, color: th.mut, lineHeight: 1.6}}>{sub}</div>}</div>{right}
  </div>;
};
export const Avatar: React.FC<{name: string}> = ({name}) => {
  const th = useTh();
  return <span style={{width: 34, height: 34, borderRadius: 17, flex: 'none', background: th.sec, color: th.secFg, display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 700}}>{name.slice(0, 1)}</span>;
};
export const MBtn: React.FC<{children: React.ReactNode; icon?: string; solid?: boolean; press?: number; done?: boolean; style?: React.CSSProperties}> = ({children, icon, solid, press = 0, done, style}) => {
  const th = useTh();
  return <div style={{height: 38, borderRadius: 9, padding: '0 14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 13, fontWeight: 600, background: solid ? th.pri : th.card, color: solid ? th.onPri : done ? th.pri : th.fg,
    border: `1.5px solid ${solid || done ? th.pri : th.bd}`, transform: `scale(${1 - .06 * press})`, whiteSpace: 'nowrap', ...style}}>{icon && <Icon n={icon} s={15} />}{children}</div>;
};
/** bottom sheet replacing the desktop dropdowns */
export const BottomSheet: React.FC<{title: string; items: string[]; open: [number, number]; t: number; hi?: number}> = ({title, items, open, t, hi = -1}) => {
  const th = useTh(); const p = P(t, open[0], .35) * (1 - P(t, open[1], .25));
  if (p <= 0) return null;
  return <div style={{position: 'absolute', inset: 0, zIndex: 20}}>
    <div style={{position: 'absolute', inset: 0, background: `rgba(7,18,43,${.4 * p})`}} />
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: '10px 16px 22px', borderRadius: '20px 20px 0 0', background: th.card, boxShadow: '0 -20px 50px rgba(0,0,0,.25)', transform: `translateY(${(1 - p) * 100}%)`}}>
      <div style={{width: 40, height: 4, borderRadius: 2, background: th.bd, margin: '0 auto 12px'}} />
      <div style={{fontSize: 14.5, fontWeight: 700, marginBottom: 8}}>{title}</div>
      {items.map((it, i) => <div key={i} style={{height: 38, borderRadius: 8, padding: '0 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13.5, background: i === hi ? th.sec : 'transparent', color: i === hi ? th.secFg : th.fg, opacity: clamp(p * 3 - i * .15)}}>{it}{i === hi && <Icon n="check" s={15} />}</div>)}
    </div>
  </div>;
};
export const useAccent = () => useTheme().stage.accent;
