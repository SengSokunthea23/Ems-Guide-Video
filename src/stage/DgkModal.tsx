import React from 'react';
import {E, P} from '../lib/anim';
import {useTheme} from '../theme/ThemeContext';
import {Icon} from '../ui/Icon';
import {QRG} from '../ui/QRCode';
/* MOC DGKey QR shown after pressing the login button (S2) */
export const DgkModal: React.FC<{t: number}> = ({t}) => {
  const li = useTheme().app.light;
  const p = P(t, 23.1, .6, E.out);
  return (
    <div className="app" style={{position: 'absolute', inset: 0, background: `rgba(7,18,43,${.5 * p})`, display: 'grid', placeItems: 'center'}}>
      <div style={{width: 520, padding: 34, borderRadius: 22, background: '#fff', textAlign: 'center', color: li.fg, transform: `scale(${.92 + .08 * p})`, opacity: p}}>
        <div style={{display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 24, fontWeight: 700}}><Icon n="key" s={24} c={li.pri} />MOC DGKey</div>
        <div style={{fontSize: 17, color: li.mut, marginTop: 6}}>ស្កេនកូដ QR</div>
        <div style={{position: 'relative', display: 'inline-block', marginTop: 18, padding: 14, borderRadius: 16, border: `1px solid ${li.bd}`}}>
          <QRG size={300} seed={21} />
          {t > 29.4 && <div style={{position: 'absolute', inset: 0, borderRadius: 16, background: `rgba(60,175,135,${.9 * P(t, 29.4, .4)})`, display: 'grid', placeItems: 'center'}}><Icon n="check" s={120} sw={3} c="#fff" /></div>}
        </div>
      </div>
    </div>);
};
