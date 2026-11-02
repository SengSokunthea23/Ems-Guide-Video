import type {StageTh, Theme, Th} from './types';

const SHARED = {grad: ['#0e7fa8', '#0b6a8e', '#074e6a'], avatar: ['#0e7fa8', '#6fd0e6'], soft: '#e8f6fa', tint: '#dff2f8', line: '#dceef4'} satisfies Partial<Th>;
const light: Th = {...SHARED, bg: '#f3fafc', card: '#ffffff', fg: '#07384a', mut: '#3a6b7f', pri: '#0e7fa8', sec: '#d4eff7', secFg: '#0a5a78', bd: '#c5e0ea', inp: '#f1f9fb', side: '#ffffff', sideBd: '#dceef4', ok: '#2ba383', warn: '#dda33a', bad: '#d93636', dark: false, onPri: '#fff',
  cardBd: '#e0eff4', rowBd: '#e7f3f7', headBg: '#f2fafc', track: '#dceef4', ring: '#e7f3f7', win: '#fff', chrome: '#e6f3f8', chromeBd: '#d3e8f0', url: '#fff', urlFg: '#3f6f83'};
const dark: Th = {...SHARED, bg: '#08202a', card: '#0e2c38', fg: '#e2f3f9', mut: '#8bb6c6', pri: '#35b3d4', sec: '#123f4f', secFg: '#b4e4f2', bd: '#1d4453', inp: '#0b2631', side: '#0a2530', sideBd: '#173a47', ok: '#2ba383', warn: '#dda33a', bad: '#ef5350', dark: true, onPri: '#06222c',
  cardBd: '#1d4453', rowBd: '#1d4453', headBg: 'transparent', track: '#173a47', ring: '#173a47', win: '#08202a', chrome: '#0b2631', chromeBd: '#173a47', url: '#08202a', urlFg: '#9cc4d2'};
const stage: StageTh = {bg0: '#DDF1F8', bg1: '#F2FAFD', bg2: '#C4E6F2', bg3: '#B4DEEC', fg: '#07384A', mut: '#4A7286', sky: '#0E7FA8', accent: '#0E7FA8', accent2: '#0B6F94', onAccent: '#fff', soft: '#2F5F72', soft2: '#2F5F72', stepAct: '#3F6F83', stepIdle: '#8FB0BD',
  glass: 'rgba(7,56,74,.06)', glass2: 'rgba(7,56,74,.06)', glassLine: 'rgba(7,56,74,.14)', glassLine2: 'rgba(7,56,74,.12)', divider: 'rgba(7,56,74,.2)', track: 'rgba(7,56,74,.12)', grid: 'rgba(7,56,74,.05)',
  glowA: ['rgba(14,127,168,.18)', 'rgba(14,127,168,0)'], glowB: ['rgba(255,255,255,.7)', 'rgba(255,255,255,0)'], shadow: 'rgba(7,56,74,.28)', windowLine: 'rgba(7,56,74,.14)', fade: '#F2FAFD', green: '#2BA383'};
export const OCEAN: Theme = {id: 'ocean', name: 'Ocean', stage, app: {light, dark}};
