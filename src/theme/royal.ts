import type {StageTh, Theme, Th} from './types';

const SHARED = {grad: ['#4a3aa7', '#372a86', '#241a5c'], avatar: ['#4a3aa7', '#e1af4a'], soft: '#f0edfb', tint: '#ebe7fa', line: '#e9e5f5'} satisfies Partial<Th>;
const light: Th = {...SHARED, bg: '#f6f4fc', card: '#fffefe', fg: '#241a5c', mut: '#5b5288', pri: '#4a3aa7', sec: '#e8e3fa', secFg: '#3a2c8c', bd: '#d9d3ef', inp: '#f7f5fc', side: '#fffefe', sideBd: '#e9e5f5', ok: '#3caf87', warn: '#c98f1e', bad: '#d9304a', dark: false, onPri: '#fff',
  cardBd: '#ebe8f6', rowBd: '#f0edf8', headBg: '#f8f6fd', track: '#e9e5f5', ring: '#f0edf8', win: '#fff', chrome: '#efecf8', chromeBd: '#e0dbf0', url: '#fff', urlFg: '#5b5288'};
const dark: Th = {...SHARED, bg: '#110d33', card: '#1a1547', fg: '#efeafc', mut: '#a69fcc', pri: '#e1af4a', sec: '#2d2466', secFg: '#f2cf85', bd: '#332a6b', inp: '#15103c', side: '#140f3b', sideBd: '#2a2259', ok: '#3caf87', warn: '#e1af4a', bad: '#ef5a6f', dark: true, onPri: '#241602',
  cardBd: '#332a6b', rowBd: '#332a6b', headBg: 'transparent', track: '#2a2259', ring: '#2a2259', win: '#110d33', chrome: '#181243', chromeBd: '#2a2259', url: '#110d33', urlFg: '#b3acd6'};
const stage: StageTh = {bg0: '#160F45', bg1: '#2C1F73', bg2: '#0D0A2E', bg3: '#3A2A8C', fg: '#fff', mut: '#A9A2D0', sky: '#F2CF85', accent: '#E1AF4A', accent2: '#F2CF85', onAccent: '#241602', soft: '#D9D4F0', soft2: '#E6E1F7', stepAct: '#C4BEE3', stepIdle: '#6F67A0',
  glass: 'rgba(255,255,255,.08)', glass2: 'rgba(255,255,255,.07)', glassLine: 'rgba(255,255,255,.14)', glassLine2: 'rgba(255,255,255,.12)', divider: 'rgba(255,255,255,.2)', track: 'rgba(255,255,255,.12)', grid: 'rgba(255,255,255,.035)',
  glowA: ['rgba(225,175,74,.2)', 'rgba(225,175,74,0)'], glowB: ['rgba(124,92,255,.22)', 'rgba(124,92,255,0)'], shadow: 'rgba(6,3,28,.6)', windowLine: 'rgba(255,255,255,.16)', fade: '#000', green: '#3CAF87'};
export const ROYAL: Theme = {id: 'royal', name: 'Royal', stage, app: {light, dark}};
