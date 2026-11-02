import type {StageTh, Theme, Th} from './types';

/* product design tokens (read from ems-admin.moc.gov.kh :root) */
const SHARED = {grad: ['#2b80b7', '#1e6a9c', '#0b5178'], avatar: ['#2b80b7', '#7cc0e8'], onPri: '#fff', soft: '#eef6fc', tint: '#e8f3fb', line: '#e3eaf3'} satisfies Partial<Th>;
export const LIGHT: Th = {...SHARED, bg: '#f4f7fb', card: '#fefefe', fg: '#073451', mut: '#2f5f78', pri: '#2b80b7', sec: '#d8edf8', secFg: '#0b5178', bd: '#cfdae8', inp: '#f6f7fa', side: '#fefefe', sideBd: '#e3e9f1', ok: '#3caf87', warn: '#e1af4a', bad: '#df2321', dark: false,
  cardBd: '#e6edf5', rowBd: '#edf2f7', headBg: '#f7f9fc', track: '#e3eaf3', ring: '#edf2f8', win: '#fff', chrome: '#eef2f7', chromeBd: '#dde4ee', url: '#fff', urlFg: '#45607a'};
export const DARK: Th = {...SHARED, bg: '#0b1622', card: '#111f2e', fg: '#e3edf7', mut: '#8fa9c0', pri: '#3b93cc', sec: '#16324a', secFg: '#b9daf0', bd: '#22364c', inp: '#0f1c29', side: '#0e1a27', sideBd: '#1b2c3e', ok: '#3caf87', warn: '#e1af4a', bad: '#ef4444', dark: true,
  cardBd: '#22364c', rowBd: '#22364c', headBg: 'transparent', track: '#1b2c3e', ring: '#1b2c3e', win: '#0b1622', chrome: '#0f1c2a', chromeBd: '#1b2c3e', url: '#0b1622', urlFg: '#9fb3c8'};
const stage: StageTh = {bg0: '#07122B', bg1: '#0B1D45', bg2: '#040A1A', bg3: '#0A2B6B', fg: '#fff', mut: '#8C9BB8', sky: '#BFD7FF', accent: '#0866FF', accent2: '#4D94FF', onAccent: '#fff', soft: '#C8D4EA', soft2: '#D7E2F5', stepAct: '#B7C3DA', stepIdle: '#5f6f8c',
  glass: 'rgba(255,255,255,.08)', glass2: 'rgba(255,255,255,.07)', glassLine: 'rgba(255,255,255,.14)', glassLine2: 'rgba(255,255,255,.12)', divider: 'rgba(255,255,255,.2)', track: 'rgba(255,255,255,.12)', grid: 'rgba(255,255,255,.035)',
  glowA: ['rgba(8,102,255,.28)', 'rgba(8,102,255,0)'], glowB: ['rgba(77,148,255,.12)', 'rgba(77,148,255,0)'], shadow: 'rgba(0,6,24,.6)', windowLine: 'rgba(255,255,255,.16)', fade: '#000', green: '#3CAF87'};
export const NAVY: Theme = {id: 'navy', name: 'Navy', stage, app: {light: LIGHT, dark: DARK}};
