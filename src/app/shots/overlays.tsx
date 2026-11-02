import React from 'react';
import {E, P, clamp} from '../../lib/anim';
import {LIGHT} from '../../theme/navy';
import {Icon} from '../../ui/Icon';
import {Menu} from '../primitives/Menu';
import {Pill} from '../primitives/Pill';

/* Small code-drawn states drawn over a real screenshot (light-palette tokens, they follow the page into dark mode via its filter). */
const th = LIGHT;

/** focus ring around a field (window px) */
export const Ring: React.FC<{x: number; y: number; w: number; h: number; p?: number; r?: number}> = ({x, y, w, h, p = 1, r = 9}) =>
  p <= 0 ? null : <div style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: r, border: `1.5px solid ${th.pri}`, boxShadow: `0 0 0 ${3 * p}px ${th.pri}33`, opacity: clamp(p * 2), pointerEvents: 'none'}} />;
/** expanding click ripple on a control (e.g. a button that was pressed) */
export const Pulse: React.FC<{x: number; y: number; w: number; h: number; t: number; at: number; r?: number}> = ({x, y, w, h, t, at, r = 9}) => {
  const k = (t - at) / .7; if (k < 0 || k > 1) return null;
  return <div style={{position: 'absolute', left: x - 6 * k, top: y - 6 * k, width: w + 12 * k, height: h + 12 * k, borderRadius: r + 4 * k, border: `2px solid ${th.pri}`, opacity: (1 - k) * .9, pointerEvents: 'none'}} />;
};
/** dropdown list under a field, open between open[0] and open[1] */
export const Dropdown: React.FC<{t: number; open: [number, number]; x: number; y: number; w: number; items: string[]; hi?: number}> = ({t, open, x, y, w, items, hi}) =>
  <Menu x={x} y={y} w={w} items={items} p={P(t, open[0], .3) * (1 - P(t, open[1], .2))} hi={hi} />;
/** row highlight band */
export const Band: React.FC<{x: number; y: number; w: number; h: number; p?: number}> = ({x, y, w, h, p = 1}) =>
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, background: `${th.pri}1a`, boxShadow: `inset 3px 0 0 ${th.pri}`, opacity: p, pointerEvents: 'none'}} />;
/** replaces the text of a field (white patch with new text) */
export const Patch: React.FC<{x: number; y: number; w: number; h: number; children: React.ReactNode; bg?: string; align?: 'left' | 'center'}> = ({x, y, w, h, children, bg = '#fff', align = 'left'}) =>
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, background: bg, display: 'flex', alignItems: 'center', justifyContent: align === 'center' ? 'center' : 'flex-start', padding: align === 'left' ? '0 12px' : 0, fontSize: 13.5, color: th.fg, whiteSpace: 'nowrap'}}>{children}</div>;
export const OkPill: React.FC<{x: number; y: number; p: number; children: React.ReactNode}> = ({x, y, p, children}) =>
  p <= 0 ? null : <div style={{position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${.8 + .2 * E.back(p)})`, opacity: clamp(p * 2), background: '#fff', borderRadius: 8, padding: 2}}><Pill c="ok" style={{fontSize: 13}}>{children}</Pill></div>;
export const CopiedButton: React.FC<{x: number; y: number; w: number; h: number; p: number}> = ({x, y, w, h, p}) =>
  p <= 0 ? null : <div style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 8, background: '#fff', border: `1.5px solid ${th.ok}`, color: th.ok, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 13, fontWeight: 600, opacity: clamp(p * 2)}}><Icon n="check" s={14} sw={2.6} />ចម្លងរួច</div>;
