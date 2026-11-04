import React from 'react';
import {E, P, life} from '../lib/anim';
import {useTheme} from '../theme/ThemeContext';
import {Icon} from '../ui/Icon';
import {Phone} from './Phone';
import {PhoneShot} from './PhoneShot';
import {Stepper} from './Stepper';
/* S2: MOC DGKey verification */
export const Verify: React.FC<{t: number}> = ({t}) => {
  const {stage: st, app: {light: li}} = useTheme();
  const p = life(t, 23.4, 33.3, .9, .4); if (p <= 0) return null;
  const phoneP = P(t, 23.96, .6), home = t < 24.4, scanning = t < 27.6, consent = t < 29.4, ok = t > 29.4;
  return (<>
    <svg width={1920} height={1080} style={{position: 'absolute', inset: 0, opacity: life(t, 24.2, 27.8, .5, .4)}}>
      <path d="M 700 600 C 900 600, 1000 560, 1170 560" fill="none" stroke={st.accent2} strokeWidth={3} strokeDasharray="6 10" strokeDashoffset={-t * 60} />
    </svg>
    {phoneP > 0 && <Phone x={1180} y={270} p={phoneP} model="iphone18ProMax">
      {home ? <PhoneShot src="ph-home" cover="#fff" /> :
        scanning ? <PhoneShot src="phone-scan" /> :
          consent ? <PhoneShot src="phone-consent" cover="#f8fafc" /> :
            <div style={{position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center', background: ok ? '#eafaf3' : li.bg}}>
              <div><div style={{width: 110, height: 110, borderRadius: 55, background: li.ok, display: 'grid', placeItems: 'center', margin: '0 auto', transform: `scale(${P(t, 29.4, .5, E.back)})`}}><Icon n="check" s={58} sw={3} c="#fff" /></div>
                <div style={{fontSize: 19, fontWeight: 700, marginTop: 20}}>MOC DGKey</div><div style={{fontSize: 14, color: li.mut, marginTop: 4}}>EMS</div></div>
            </div>}
    </Phone>}
    <Stepper t={t} x={1540} y={340} p={p} items={[['scan', 'ស្កេនកូដ QR', 'Scan with MOC Officer', 24.4], ['shield', 'ផ្ទៀងផ្ទាត់', 'MOC DGKey', 27.6], ['check', 'ចូលប្រព័ន្ធ', 'Signed in to EMS', 30.5]]} />
  </>);
};
