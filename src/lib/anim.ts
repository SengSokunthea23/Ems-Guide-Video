import {Easing, interpolate} from 'remotion';
export const FPS = 30;
export const DUR = 5035; // frames (167.83 s)
export type Ease = (x: number) => number;
export const E = {
  out: Easing.bezier(0.22, 1, 0.36, 1) as Ease,
  inOut: Easing.bezier(0.65, 0, 0.35, 1) as Ease,
  in: Easing.bezier(0.55, 0, 1, 0.45) as Ease,
  soft: Easing.bezier(0.33, 0, 0.2, 1) as Ease,
  back: Easing.out(Easing.back(1.4)) as Ease,
  lin: ((x: number) => x) as Ease,
};
export const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const P = (t: number, a: number, d: number, e: Ease = E.out) => interpolate(t, [a, a + d], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: e});
export const tw = (t: number, a: number, d: number, f: number, to: number, e: Ease = E.out) => f + (to - f) * P(t, a, d, e);
/** enter at a, exit at b (fade durations) */
export const life = (t: number, a: number, b: number, din = .6, dout = .45) => P(t, a, din) * (1 - P(t, b - dout, dout, E.in));
export const seg = new Intl.Segmenter('km', {granularity: 'grapheme'});
export const typed = (s: string, p: number) => { const g = [...seg.segment(s)].map((x) => x.segment); return g.slice(0, Math.round(g.length * clamp(p))).join(''); };
/** pressed amount of a control clicked at time c */
export const pr = (t: number, c: number) => clamp(1 - Math.abs(t - c) / .14);
/** piecewise eased scroll: [time, target, duration?]; each step eases from the previous value */
export const sc = (t: number, keys: [number, number, number?][], start = 0) => {
  let v = start;
  for (const [at, to, d = .9] of keys) { if (t < at) break; v += (to - v) * P(t, at, d, E.inOut); }
  return v;
};
