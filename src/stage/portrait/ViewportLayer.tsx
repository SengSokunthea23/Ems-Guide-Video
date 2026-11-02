import React from 'react';
import {E, P} from '../../lib/anim';
import {MH, MW, THEME_BTN} from '../../app/mobile/mobile';
import {MLoginPage} from '../../pages/mobile/CorePages';
import {useTheme} from '../../theme/ThemeContext';
import type {Th} from '../../theme/types';
import {Icon} from '../../ui/Icon';
import {QRG} from '../../ui/QRCode';
import {DRAWER_TAPS, MobileAppAt} from './MobileApp';
import {Touch} from './Touch';

/** camera for the phone-sized viewport: m = scale multiplier, dy = vertical offset */
type MPose = {m: number; dy: number; o: number};
const MCAM: {at: number; d: number; to: Partial<MPose>}[] = [
  {at: 0, d: .01, to: {dy: 900, o: 0}}, {at: 6.9, d: 1.4, to: {dy: 0, o: 1}},
  {at: 22.96, d: 1.0, to: {m: .5}},
  {at: 33.4, d: .01, to: {m: .9, dy: 50}}, {at: 34.0, d: 1.8, to: {m: 1, dy: 0}},
  {at: 110.62, d: .01, to: {o: 0, dy: 60}}, {at: 120.35, d: 1.0, to: {o: 1, dy: 0}},
  {at: 160.7, d: 1.0, to: {m: .7, o: 0}},
];
export const mpose = (t: number): MPose => {
  const st: MPose = {m: 1, dy: 0, o: 1};
  for (const c of MCAM) { if (t < c.at) break; const k = P(t, c.at, c.d, E.inOut); const to = {...st, ...c.to}; (Object.keys(st) as (keyof MPose)[]).forEach((key) => { st[key] = st[key] + (to[key] - st[key]) * k; }); }
  return st;
};
export const VP_SCALE = 2.2, VP_TOP = 410;
const EXTRA_TAPS: [number, number, number][] = [[46.0, ...THEME_BTN], [50.2, ...THEME_BTN]];
const TAPS = [...DRAWER_TAPS, ...EXTRA_TAPS];

const DgkModalM: React.FC<{t: number}> = ({t}) => {
  const li = useTheme().app.light;
  const p = P(t, 23.1, .6, E.out);
  return (
    <div className="app" style={{position: 'absolute', inset: 0, background: `rgba(7,18,43,${.5 * p})`, display: 'grid', placeItems: 'center', zIndex: 40}}>
      <div style={{width: 340, padding: 22, borderRadius: 20, background: '#fff', textAlign: 'center', color: li.fg, transform: `scale(${.92 + .08 * p})`, opacity: p}}>
        <div style={{display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 21, fontWeight: 700}}><Icon n="key" s={22} c={li.pri} />MOC DGKey</div>
        <div style={{fontSize: 15, color: li.mut, marginTop: 4}}>ស្កេនកូដ QR</div>
        <div style={{position: 'relative', display: 'inline-block', marginTop: 14, padding: 10, borderRadius: 14, border: `1px solid ${li.bd}`}}>
          <QRG size={220} seed={21} />
          {t > 29.4 && <div style={{position: 'absolute', inset: 0, borderRadius: 14, background: `rgba(60,175,135,${.9 * P(t, 29.4, .4)})`, display: 'grid', placeItems: 'center'}}><Icon n="check" s={90} sw={3} c="#fff" /></div>}
        </div>
      </div>
    </div>);
};

export const ViewportLayer: React.FC<{t: number}> = ({t}) => {
  const {stage: st, app} = useTheme();
  const ps = mpose(t);
  if (ps.o <= .001) return null;
  const rDash = 1100 * (P(t, 46.1, 1.3, E.inOut) - P(t, 50.3, 1.0, E.inOut));
  const rSet = 1100 * P(t, 153.1, 1.3, E.inOut);
  const isLogin = t < 33.39;
  const content = (th: Th) => isLogin ? <MLoginPage t={t - 8.35} stepAt={[5.0, 6.6, 8.2, 9.8]} pressAt={11.6} /> : <MobileAppAt t={t} th={th} />;
  const reveal = !isLogin && (rDash > 0 || rSet > 0);
  const cx = rSet > 0 ? 215 : THEME_BTN[0], cy = rSet > 0 ? 330 : THEME_BTN[1], r = Math.max(rDash, rSet);
  const s = VP_SCALE * ps.m, left = (1080 - MW * s) / 2, top = VP_TOP + ps.dy;
  return (
    <div style={{position: 'absolute', left, top, width: MW, height: MH, transformOrigin: '0 0', transform: `scale(${s})`, opacity: ps.o, borderRadius: 20, overflow: 'hidden', background: r > 700 ? app.dark.bg : app.light.bg,
      boxShadow: `0 24px 60px ${st.shadow}`, outline: `${1.5 / s}px solid ${st.windowLine}`}}>
      {t > 8.3 && content(app.light)}
      {reveal && <div style={{position: 'absolute', inset: 0, clipPath: `circle(${r}px at ${cx}px ${cy}px)`}}>{content(app.dark)}</div>}
      {t > 22.9 && t < 33.5 && <DgkModalM t={t} />}
      {t > 37 && <Touch t={t} taps={TAPS} />}
    </div>);
};
