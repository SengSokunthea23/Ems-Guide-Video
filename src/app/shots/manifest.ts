import {CH} from '../metrics';

/**
 * Real EMS screenshots (public/shots/*.png, built by `npm run shots`).
 * Every page is a 1920 CSS px wide capture of ems-admin.moc.gov.kh; the app area of the video window is 1600 px wide,
 * so CSS px -> window px is K. Anchors below were measured on the 2000 px wide previews of those captures
 * and converted with D(): window px = 0.8 * preview px (+ CH for the browser bar).
 */
export const K = 1600 / 1920;
/** sidebar width / top bar height of the product, in window px; the sidebar column of a capture ends at 1125 CSS px */
export const SIDE_PX = 200 * K, TOP_PX = 68 * K, SIDE_END_PX = 1125 * K;

export type ShotId =
  | 'dash' | 'dash-dark' | 'dash-skel' | 'events' | 'detail' | 'venues' | 'chairs' | 'chair-roles' | 'docs' | 'docs-list' | 'attendance' | 'attendance-detail'
  | 'users' | 'roles' | 'requests' | 'activity' | 'activity-detail' | 'settings' | 'tg-modal' | `events-h${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10}`;

/** window point from a point on the 2000 px wide preview of a viewport-sized capture */
export const D = (x: number, y: number): [number, number] => [x * .8, y * .8 + CH];
/** window point from CSS px of a (possibly scrolled) capture */
export const C = (x: number, y: number, scroll = 0): [number, number] => [x * K, (y - scroll) * K + CH];

/** product photos must not be colour-inverted by the dark filter: CSS px rects [x, y, w, h] re-drawn with the opposite filter */
export const RESTORE_FIXED: [number, number, number, number][] = [[20, 1030, 32, 32]]; // sidebar avatar (round)
export const RESTORE_CONTENT: Partial<Record<ShotId, [number, number, number, number][]>> = {settings: [[242, 193, 60, 60]]}; // profile photo (round);

/** nav item order = sidebar order */
const NAV_Y = [125, 162, 200, 237, 274, 312, 350, 441, 479, 516, 554, 591];
export const ROW_Y = [391, 452, 505, 558, 611, 664, 725, 792, 853, 906]; // events list rows (preview px)

export const A = {
  nav: NAV_Y.map((y) => D(100, y)),
  topbar: {sun: D(1840, 33), moon: D(1878, 33), sys: D(1915, 33)},
  dash: {dateStart: D(1608, 136), dateEnd: D(1818, 136), filter: D(1952, 136), table: D(1100, 940), kpis: D(1100, 265)},
  events: {type: D(430, 271), sched: D(810, 271), status: D(1190, 271), row: ROW_Y.map((y) => D(470, y))},
  venues: {chart: D(800, 560), table: D(1100, 1180)},
  docs: {template: D(415, 383), type: D(1820, 209), list: D(1300, 400), download: D(1941, 324)},
  attendance: {event: D(1100, 422), status: D(1445, 510), source: D(1790, 510), download: D(1890, 583), row3: D(1500, 833), pill3: D(1666, 833)},
  roles: {perms: D(1540, 380)},
  requests: {status: D(485, 717), type: D(985, 717), pill1: D(1657, 830), table: D(1100, 900)},
  activity: {resource: D(1595, 214), action: D(1840, 214)},
  settings: {light: D(371, 668), dark: D(657, 668), sys: D(934, 668), lang: D(657, 752), telegram: D(1895, 232)},
};
/** the event-detail capture is 3068 CSS px tall: positions in CSS px, scrolled by the page */
export const DETAIL = {qr: [345, 1431] as const, copy: [302, 1557] as const, history: [1073, 2950] as const, maxScroll: 3068 - 1200};
/** real login: hero (left 55%) + the card recorded from the product, placed on the blank right panel */
export const LOGIN = {cardW: 440, cardLeft: 1141, cardTop: 270, k: 440 / 712};
export const loginPt = (cx: number, cy: number): [number, number] => [LOGIN.cardLeft + cx * LOGIN.k, LOGIN.cardTop + cy * LOGIN.k];
