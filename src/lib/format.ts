import {E, P} from './anim';
export const KD = '០១២៣៤៥៦៧៨៩';
export const kh = (n: number | string) => String(n).replace(/\d/g, (d) => KD[+d]);
export const cnt = (t: number, at: number, v: number, d = 1.2) => Math.round(v * P(t, at, d, E.out));
