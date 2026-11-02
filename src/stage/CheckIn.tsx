import React from 'react';
import {E, P, clamp, life} from '../lib/anim';
import {useTheme} from '../theme/ThemeContext';
import {Icon} from '../ui/Icon';
import {QRG} from '../ui/QRCode';
import {Phone} from './Phone';
import {ScanScreen} from './ScanScreen';
import {Stepper} from './Stepper';
/* S8: QR check-in */
export const CheckIn: React.FC<{t: number}> = ({t}) => {
  const {stage: st, app: {light: li}} = useTheme();
  const p = life(t, 111.0, 120.45, .9, .55); if (p <= 0) return null;
  const out = P(t, 119.9, .8, E.in);
  return (
    <div style={{position: 'absolute', inset: 0, transform: `translateX(${-out * 300}px)`}}>
      <div className="app" style={{position: 'absolute', left: 170, top: 250, width: 460, padding: 30, borderRadius: 26, background: '#fff', color: li.fg, textAlign: 'center', boxShadow: '0 40px 90px rgba(0,0,0,.4)', opacity: P(t, 111.2, .8), transform: `translateY(${(1 - P(t, 111.2, .8)) * 40}px)`}}>
        <div style={{fontSize: 20, fontWeight: 700, textAlign: 'left'}}>QR ព្រឹត្តិការណ៍</div>
        <div style={{fontSize: 14, color: li.mut, textAlign: 'left', lineHeight: 1.6}}>កិច្ចប្រជុំប្រចាំខែ ពិនិត្យវឌ្ឍនភាពការងារ</div>
        <div style={{display: 'inline-block', marginTop: 16, padding: 12, borderRadius: 14, border: `1px solid ${li.bd}`}}><QRG size={300} /></div>
        <div style={{fontSize: 13, color: li.mut, marginTop: 10, fontFamily: 'ui-monospace,monospace'}}>Ev7Qm2xK9pLs4TnB8wRc</div>
      </div>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0, opacity: life(t, 112.4, 116.0, .5, .4)}}><path d="M 640 560 C 720 560, 740 540, 800 540" fill="none" stroke={st.accent2} strokeWidth={3} strokeDasharray="6 10" strokeDashoffset={-t * 60} /></svg>
      <Phone x={810} y={240} p={P(t, 112.0, .9)}>
        {t < 116 ? <ScanScreen t={t} a={112.4} title="ស្កេនចុះវត្តមាន" seed={5} /> : (
          <div style={{position: 'absolute', inset: 0, padding: '58px 20px 20px'}}>
            <div style={{fontSize: 16, fontWeight: 700}}>ពិនិត្យព័ត៌មាន</div>
            <div style={{marginTop: 14, padding: 16, borderRadius: 16, background: '#fff', border: `1px solid ${li.line}`, textAlign: 'center'}}>
              <div style={{width: 64, height: 64, borderRadius: 32, background: li.sec, color: li.secFg, display: 'grid', placeItems: 'center', margin: '0 auto', fontWeight: 700, fontSize: 22}}>ល</div>
              <div style={{fontSize: 17, fontWeight: 700, marginTop: 10}}>លី សុភ័ក្រ</div><div style={{fontSize: 13, color: li.mut}}>នាយកដ្ឋានរដ្ឋបាល · មន្ត្រី</div>
            </div>
            <div style={{marginTop: 12, padding: 14, borderRadius: 14, background: '#fff', border: `1px solid ${li.line}`, fontSize: 13, lineHeight: 1.7}}><div style={{color: li.mut}}>ព្រឹត្តិការណ៍</div><b>កិច្ចប្រជុំប្រចាំខែ ពិនិត្យវឌ្ឍនភាពការងារ</b><div style={{color: li.mut, marginTop: 6}}>វេន</div><b>ព្រឹក</b></div>
            <div style={{position: 'absolute', left: 20, right: 20, bottom: 26, height: 48, borderRadius: 12, background: li.pri, color: li.onPri, display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 16, transform: `scale(${1 - .05 * clamp(1 - Math.abs(t - 119.0) / .14)})`}}>ចុះវត្តមាន</div>
            {t > 119.3 && <div style={{position: 'absolute', inset: 0, background: `rgba(7,18,43,${.45 * P(t, 119.3, .3)})`, display: 'grid', placeItems: 'center'}}>
              <div style={{width: 220, padding: 24, borderRadius: 18, background: '#fff', textAlign: 'center', color: '#073451', transform: `scale(${.8 + .2 * P(t, 119.35, .5, E.back)})`}}>
                <div style={{width: 72, height: 72, borderRadius: 36, background: li.ok, display: 'grid', placeItems: 'center', margin: '0 auto'}}><Icon n="check" s={38} sw={3} c="#fff" /></div>
                <div style={{fontSize: 17, fontWeight: 700, marginTop: 12}}>បានចុះវត្តមាន</div></div></div>}
          </div>)}
      </Phone>
      {t > 119.4 && [0, .35, .7].map((d, i) => { const k = clamp((t - 119.45 - d) / 1.4); return k > 0 ? <div key={i} style={{position: 'absolute', left: 960 - 260, top: 550 - 260, width: 520, height: 520, borderRadius: '50%', border: `${3 - i * .6}px solid ${st.green}`, opacity: (1 - k) * .8, transform: `scale(${.5 + k * .8})`}} /> : null; })}
      <Stepper t={t} x={1260} y={360} p={P(t, 111.6, .9)} items={[['scan', 'ស្កេនកូដ QR', 'Scan the event QR', 112.6], ['user', 'ពិនិត្យព័ត៌មាន', 'Review details', 116.0], ['check', 'បានចុះវត្តមាន', 'Checked in', 119.4]]} />
    </div>);
};
