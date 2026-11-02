import React from 'react';
import {typed} from '../lib/anim';
import {useTheme} from '../theme/ThemeContext';
import {Icon} from '../ui/Icon';
import {CH, H, W} from './metrics';
export const Window: React.FC<{url: string; urlP?: number; children: React.ReactNode; dark?: boolean}> = ({url, urlP = 1, children, dark}) => {
  const {light, dark: night} = useTheme().app, c = dark ? night : light;
  return (
  <div style={{position: 'absolute', left: 0, top: 0, width: W, height: H + CH, borderRadius: 18, overflow: 'hidden', background: c.win}}>
    <div className="f" style={{position: 'absolute', left: 0, top: 0, width: W, height: CH, background: c.chrome, borderBottom: `1px solid ${c.chromeBd}`, display: 'flex', alignItems: 'center', padding: '0 18px', gap: 8}}>
      {['#ff5f57', '#febc2e', '#28c840'].map((c) => <i key={c} style={{width: 12, height: 12, borderRadius: 6, background: c, display: 'block'}} />)}
      <div style={{marginLeft: 26, flex: 1, maxWidth: 620, height: 28, borderRadius: 8, background: c.url, display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px', fontSize: 14, color: c.urlFg}}>
        <Icon n="lock" s={13} sw={2.2} />{typed(url, urlP)}{urlP < 1 && <span style={{width: 1.5, height: 16, background: light.pri}} />}
      </div>
    </div>
    <div style={{position: 'absolute', left: 0, top: CH, width: W, height: H}}>{children}</div>
  </div>);
};
