/** colours of the EMS product UI (one set for light mode, one for dark) */
export type Th = {bg: string; card: string; fg: string; mut: string; pri: string; sec: string; secFg: string; bd: string; inp: string; side: string; sideBd: string; ok: string; warn: string; bad: string; dark: boolean;
  onPri: string; grad: [string, string, string]; avatar: [string, string]; soft: string; tint: string; line: string; cardBd: string; rowBd: string; headBg: string; track: string; ring: string;
  win: string; chrome: string; chromeBd: string; url: string; urlFg: string};

/** colours of everything around the product UI: backdrop, titles, wipes, opening and closing */
export type StageTh = {bg0: string; bg1: string; bg2: string; bg3: string; fg: string; mut: string; sky: string; accent: string; accent2: string; onAccent: string; soft: string; soft2: string; stepAct: string; stepIdle: string;
  glass: string; glass2: string; glassLine: string; glassLine2: string; divider: string; track: string; grid: string; glowA: [string, string]; glowB: [string, string]; shadow: string; windowLine: string; fade: string; green: string};

export type ThemeId = 'navy' | 'ocean' | 'royal';
export type Theme = {id: ThemeId; name: string; stage: StageTh; app: {light: Th; dark: Th}};
export type Orientation = 'landscape' | 'portrait';
