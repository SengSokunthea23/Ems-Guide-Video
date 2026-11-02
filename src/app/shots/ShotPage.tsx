import React from 'react';
import {Img, staticFile} from 'remotion';
import {CH, H, W} from '../metrics';
import {K, RESTORE_CONTENT, RESTORE_FIXED, SIDE_END_PX, SIDE_PX, TOP_PX} from './manifest';
import type {ShotId} from './manifest';

/** dark look for pages that have no real dark capture */
export const DARK_FILTER = 'invert(1) hue-rotate(180deg) brightness(1.1) contrast(.94)';
const shot = (id: string) => staticFile(`shots/${id}.png`);

const Crop: React.FC<{src: string; x: number; y: number; w: number; h: number; dx?: number; dy?: number; filter?: string; round?: boolean}> = ({src, x, y, w, h, dx = 0, dy = 0, filter, round}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, overflow: 'hidden', filter, borderRadius: round ? '50%' : 0}}>
    <Img src={src} style={{position: 'absolute', left: -x + dx, top: -y + dy, width: W}} />
  </div>
);

/**
 * One real product page: fixed sidebar + top bar over a content area that scrolls (scroll in CSS px).
 * `dark` swaps in the real dark capture when there is one, otherwise filters the light capture.
 * `children` (overlays) are positioned in window px and share the dark filter.
 */
export const ShotPage: React.FC<{id: ShotId; scroll?: number; dark?: boolean; children?: React.ReactNode}> = ({id, scroll = 0, dark = false, children}) => {
  const realDark = dark && id === 'dash';
  const filtered = dark && !realDark;
  const src = shot(realDark ? 'dash-dark' : id);
  const filter = filtered ? DARK_FILTER : undefined;
  const sy = scroll * K;
  const restore = filtered ? RESTORE_FIXED.map(([x, y, w, h]) => [x * K, y * K, w * K, h * K] as const) : [];
  const restoreC = filtered ? (RESTORE_CONTENT[id] ?? []).map(([x, y, w, h]) => [x * K, y * K - sy, w * K, h * K] as const) : [];
  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden', background: realDark ? '#0b1622' : '#f4f7fb'}}>
      <div style={{position: 'absolute', inset: 0, filter}}>
        <Crop src={src} x={SIDE_PX} y={TOP_PX} w={W - SIDE_PX} h={H - TOP_PX} dy={-sy} />
        <div style={{position: 'absolute', left: 0, top: 0, width: SIDE_PX, height: H, background: realDark ? '#0e1a27' : '#fefefe', borderRight: `1px solid ${realDark ? '#1b2c3e' : '#e3e9f1'}`}} />
        <Crop src={src} x={0} y={0} w={SIDE_PX} h={SIDE_END_PX} />
        <Crop src={src} x={SIDE_PX} y={0} w={W - SIDE_PX} h={TOP_PX} />
        {restore.map(([x, y, w, h], i) => <Crop key={`f${i}`} src={src} x={x} y={y} w={w} h={h} filter={DARK_FILTER} round />)}
        {restoreC.map(([x, y, w, h], i) => <div key={`c${i}`} style={{position: 'absolute', left: x, top: y, width: w, height: h, overflow: 'hidden', filter: DARK_FILTER, borderRadius: '50%'}}>
          <Img src={src} style={{position: 'absolute', left: -x, top: -y - sy, width: W}} /></div>)}
        <div style={{position: 'absolute', left: 0, top: -CH, width: W, height: H + CH}}>{children}</div>
      </div>
    </div>);
};
