import React from 'react';
import {E, P, life} from '../lib/anim';
import {useTheme} from '../theme/ThemeContext';
import {Icon} from '../ui/Icon';
import {Phone} from './Phone';
import {ScanScreen} from './ScanScreen';
import {Stepper} from './Stepper';
/* S2: MOC DGKey verification */
export const Verify: React.FC<{t: number}> = ({t}) => {
  const {stage: st, app: {light: li}} = useTheme();
  const p = life(t, 23.4, 33.3, .9, .4); if (p <= 0) return null;
  const scanning = t < 27.6, ok = t > 29.4;
  return (<>
    <svg width={1920} height={1080} style={{position: 'absolute', inset: 0, opacity: life(t, 24.2, 27.8, .5, .4)}}>
      <path d="M 700 600 C 900 600, 1000 560, 1170 560" fill="none" stroke={st.accent2} strokeWidth={3} strokeDasharray="6 10" strokeDashoffset={-t * 60} />
    </svg>
    <Phone x={1180} y={270} p={P(t, 23.6, .9)}>
      {scanning ? <ScanScreen t={t} a={24} title="MOC Officer" seed={21} /> :
        <div style={{position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center', background: ok ? '#eafaf3' : li.bg}}>
          <div>{ok ? <div style={{width: 110, height: 110, borderRadius: 55, background: li.ok, display: 'grid', placeItems: 'center', margin: '0 auto', transform: `scale(${P(t, 29.4, .5, E.back)})`}}><Icon n="check" s={58} sw={3} c="#fff" /></div>
            : <svg width={70} height={70} viewBox="0 0 24 24" style={{transform: `rotate(${t * 360}deg)`}}><circle cx={12} cy={12} r={9} fill="none" stroke={li.sec} strokeWidth={2.5} /><path d="M12 3a9 9 0 0 1 9 9" fill="none" stroke={li.pri} strokeWidth={2.5} strokeLinecap="round" /></svg>}
            <div style={{fontSize: 19, fontWeight: 700, marginTop: 20}}>MOC DGKey</div><div style={{fontSize: 14, color: li.mut, marginTop: 4}}>{ok ? 'EMS' : 'ផ្ទៀងផ្ទាត់'}</div></div>
        </div>}
    </Phone>
    <Stepper t={t} x={1540} y={340} p={p} items={[['scan', 'ស្កេនកូដ QR', 'Scan with MOC Officer', 23.6], ['shield', 'ផ្ទៀងផ្ទាត់', 'MOC DGKey', 27.6], ['check', 'ចូលប្រព័ន្ធ', 'Signed in to EMS', 30.5]]} />
  </>);
};
