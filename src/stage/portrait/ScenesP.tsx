import React from 'react';
import {AbsoluteFill} from 'remotion';
import {E, P, clamp, life, tw} from '../../lib/anim';
import {NAV} from '../../app/metrics';
import {COLS, ROWS} from '../../pages/data';
import {useTheme} from '../../theme/ThemeContext';
import {Icon} from '../../ui/Icon';
import {Logo} from '../../ui/Logo';
import {QRG} from '../../ui/QRCode';
import {Words} from '../../ui/Words';
import {Phone} from '../Phone';
import {ScanScreen} from '../ScanScreen';
import {Stepper} from '../Stepper';

/* S2: MOC DGKey verification (viewport shrinks to the top, phone + steps below) */
export const VerifyP: React.FC<{t: number}> = ({t}) => {
  const {stage: st, app: {light: li}} = useTheme();
  const p = life(t, 23.4, 33.3, .9, .4); if (p <= 0) return null;
  const scanning = t < 27.6, ok = t > 29.4;
  return (<>
    <Phone x={130} y={1170} p={P(t, 23.6, .9)}>
      {scanning ? <ScanScreen t={t} a={24} title="MOC Officer" seed={21} /> :
        <div style={{position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center', background: ok ? '#eafaf3' : li.bg}}>
          <div>{ok ? <div style={{width: 110, height: 110, borderRadius: 55, background: li.ok, display: 'grid', placeItems: 'center', margin: '0 auto', transform: `scale(${P(t, 29.4, .5, E.back)})`}}><Icon n="check" s={58} sw={3} c="#fff" /></div>
            : <svg width={70} height={70} viewBox="0 0 24 24" style={{transform: `rotate(${t * 360}deg)`}}><circle cx={12} cy={12} r={9} fill="none" stroke={li.sec} strokeWidth={2.5} /><path d="M12 3a9 9 0 0 1 9 9" fill="none" stroke={li.pri} strokeWidth={2.5} strokeLinecap="round" /></svg>}
            <div style={{fontSize: 19, fontWeight: 700, marginTop: 20}}>MOC DGKey</div><div style={{fontSize: 14, color: li.mut, marginTop: 4}}>{ok ? 'EMS' : 'ផ្ទៀងផ្ទាត់'}</div></div>
        </div>}
    </Phone>
    <Stepper t={t} x={520} y={1200} p={p} items={[['scan', 'ស្កេនកូដ QR', 'Scan with MOC Officer', 23.6], ['shield', 'ផ្ទៀងផ្ទាត់', 'MOC DGKey', 27.6], ['check', 'ចូលប្រព័ន្ធ', 'Signed in to EMS', 30.5]]} />
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: life(t, 24.2, 27.8, .5, .4)}}><path d="M 540 1120 C 540 1140, 280 1130, 280 1170" fill="none" stroke={st.accent2} strokeWidth={3} strokeDasharray="6 10" strokeDashoffset={-t * 60} /></svg>
  </>);
};

/* S8: QR check-in */
export const CheckInP: React.FC<{t: number}> = ({t}) => {
  const {stage: st, app: {light: li}} = useTheme();
  const p = life(t, 111.0, 120.45, .9, .55); if (p <= 0) return null;
  const out = P(t, 119.9, .8, E.in);
  return (
    <div style={{position: 'absolute', inset: 0, transform: `translateX(${-out * 300}px)`}}>
      <div className="app" style={{position: 'absolute', left: 290, top: 440, width: 500, padding: 28, borderRadius: 26, background: li.card, color: li.fg, textAlign: 'center', boxShadow: '0 40px 90px rgba(0,0,0,.35)', opacity: P(t, 111.2, .8), transform: `translateY(${(1 - P(t, 111.2, .8)) * 40}px)`}}>
        <div style={{fontSize: 22, fontWeight: 700, textAlign: 'left'}}>QR ព្រឹត្តិការណ៍</div>
        <div style={{fontSize: 14, color: li.mut, textAlign: 'left', lineHeight: 1.6}}>កិច្ចប្រជុំប្រចាំខែ ពិនិត្យវឌ្ឍនភាពការងារ</div>
        <div style={{display: 'inline-block', marginTop: 14, padding: 12, borderRadius: 14, border: `1px solid ${li.bd}`, background: '#fff'}}><QRG size={300} /></div>
        <div style={{fontSize: 13, color: li.mut, marginTop: 10, fontFamily: 'ui-monospace,monospace'}}>Ev7Qm2xK9pLs4TnB8wRc</div>
      </div>
      <Phone x={100} y={1090} p={P(t, 112.0, .9)}>
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
      {t > 119.4 && [0, .35, .7].map((d, i) => { const k = clamp((t - 119.45 - d) / 1.4); return k > 0 ? <div key={i} style={{position: 'absolute', left: 540 - 300, top: 1080 - 300, width: 600, height: 600, borderRadius: '50%', border: `${3 - i * .6}px solid ${st.green}`, opacity: (1 - k) * .8, transform: `scale(${.5 + k * .8})`}} /> : null; })}
      <Stepper t={t} x={480} y={1160} p={P(t, 111.6, .9)} items={[['scan', 'ស្កេនកូដ QR', 'Scan the event QR', 112.6], ['user', 'ពិនិត្យព័ត៌មាន', 'Review details', 116.0], ['check', 'បានចុះវត្តមាន', 'Checked in', 119.4]]} />
    </div>);
};

/* S6 overlay: the Excel template, column by column */
export const SheetP: React.FC<{t: number}> = ({t}) => {
  const li = useTheme().app.light;
  const p = life(t, 84.3, 90.2, .8, .6); if (p <= 0) return null;
  const fly = P(t, 89.4, .8, E.in);
  return (
    <div className="f" style={{position: 'absolute', left: 80, top: 520, width: 920, borderRadius: 22, overflow: 'hidden', background: '#fff', boxShadow: '0 50px 110px rgba(0,0,0,.45)', opacity: p * (1 - fly), transform: `translate(${fly * 200}px, ${(1 - p) * 60 - fly * 120}px) scale(${1 - fly * .5})`}}>
      <div style={{height: 64, background: '#1D7A4C', color: '#fff', display: 'flex', alignItems: 'center', gap: 12, padding: '0 24px', fontSize: 22, fontWeight: 600}}><Icon n="file" s={26} c="#fff" />គំរូបញ្ជីអ្នកចូលរួមព្រឹត្តិការណ៍.xlsx</div>
      {COLS.map(([c, opt], i) => { const q = P(t, 84.8 + i * .22, .5), v = P(t, 86.2 + i * .12, .4); return (
        <div key={i} style={{display: 'flex', alignItems: 'center', gap: 16, padding: '14px 24px', borderBottom: '1px solid #e6ece8', color: li.fg, fontSize: 26, opacity: q, transform: `translateY(${(1 - q) * -14}px)`, background: i % 2 ? '#fff' : '#f7fbf9'}}>
          <div style={{width: 300, fontWeight: 700}}>{c}{opt && <div style={{fontSize: 16, fontWeight: 600, color: '#B26B00', opacity: P(t, 87.6 + i * .05, .5)}}>អាចទុកទទេបាន</div>}</div>
          <div style={{flex: 1, opacity: v, color: ROWS[0][i] === '' ? '#B26B00' : li.fg}}>{ROWS[0][i] || '—'}</div></div>); })}
      <div style={{padding: '16px 24px', fontSize: 20, color: li.mut, opacity: P(t, 88.0, .6)}}>ប្រើឈ្មោះខ្មែរនៅពេលឈ្មោះអង់គ្លេសទទេ។</div>
    </div>);
};

/* opening & closing */
export const OpeningP: React.FC<{t: number}> = ({t}) => {
  const {stage: st, app: {light: li}} = useTheme();
  const out = P(t, 6.6, .8, E.in); if (out >= 1) return null;
  const sweep = tw(t, .4, 2.6, -40, 140, E.soft);
  const mini = (i: number) => P(t, 2.4 + i * .3, .9);
  const card: React.CSSProperties = {position: 'absolute', padding: 24, borderRadius: 22, background: li.card, color: li.fg, boxShadow: '0 40px 80px rgba(0,0,0,.35)'};
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out, transform: `translateY(${-out * 80}px)`}}>
      <div className="f" style={{position: 'absolute', left: 70, top: 380, width: 940, color: st.fg}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, opacity: P(t, .3, .8)}}><Logo k={1.2} p={[P(t, .3, .6, E.back), P(t, .4, .6, E.back), P(t, .5, .6, E.back)]} /><span style={{fontSize: 20, fontWeight: 600, letterSpacing: 3, color: st.sky}}>MINISTRY OF COMMERCE · EMS</span></div>
        <Words t={t} at={.6} gap={.25} words={['ស្វែងយល់', 'អំពី', 'ការប្រើប្រាស់']} style={{fontSize: 62, fontWeight: 700, lineHeight: 1.55, marginTop: 30}} />
        <Words t={t} at={1.1} stagger={.12} gap={.25} words={['ប្រព័ន្ធគ្រប់គ្រង', 'ព្រឹត្តិការណ៍']} style={{fontSize: 80, fontWeight: 700, lineHeight: 1.5}}
          inner={{backgroundImage: `linear-gradient(100deg, ${st.sky} 0%, ${st.fg} ${sweep - 30}%, ${st.accent2} ${sweep}%, ${st.fg} ${sweep + 30}%)`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', paddingTop: '.1em'}} />
        <div style={{fontSize: 28, fontWeight: 500, color: st.soft, marginTop: 14, opacity: P(t, 1.6, 1)}}>Event Management System · Step-by-step guide</div>
        <div style={{marginTop: 30, display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 24px', borderRadius: 99, background: st.glass, boxShadow: `inset 0 0 0 1.5px ${st.glassLine}`, fontSize: 22, opacity: P(t, 2.2, .7)}}><Icon n="globe" s={22} c={st.accent2} />ems-admin.moc.gov.kh</div>
      </div>
      <div className="app" style={{...card, left: 80, top: 1190, width: 380, opacity: mini(0), transform: `translateY(${(1 - mini(0)) * 60 + Math.sin(t * 1.2) * 6}px) rotate(-3deg)`}}>
        <div style={{fontSize: 18, fontWeight: 600}}>ព្រឹត្តិការណ៍សរុប</div><div style={{fontSize: 56, fontWeight: 700, color: li.pri}}>១០</div><div style={{fontSize: 15, color: li.mut}}>១០០% ព្រឹត្តិការណ៍សរុប</div></div>
      <div className="app" style={{...card, left: 560, top: 1250, width: 330, textAlign: 'center', opacity: mini(1), transform: `translateY(${(1 - mini(1)) * 60 + Math.sin(t * 1.2 + 1) * 6}px) rotate(2deg)`}}>
        <div style={{fontSize: 18, fontWeight: 700, textAlign: 'left'}}>QR ព្រឹត្តិការណ៍</div><div style={{marginTop: 10, display: 'inline-block'}}><QRG size={170} /></div></div>
      <div className="app" style={{...card, left: 200, top: 1560, width: 640, opacity: mini(2), transform: `translateY(${(1 - mini(2)) * 60 + Math.sin(t * 1.2 + 2) * 6}px) rotate(-1deg)`}}>
        <div style={{fontSize: 18, fontWeight: 700}}>វត្តមាន</div>
        {['សុខ ចាន់ណា', 'ចាន់ វិបុល'].map((n, i) => <div key={i} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, fontSize: 18}}><span>{n}</span><span style={{fontSize: 15, fontWeight: 600, color: li.ok, background: `${li.ok}1f`, padding: '4px 12px', borderRadius: 8}}>1/1 បានចូលរួម</span></div>)}
      </div>
    </div>);
};
export const ClosingP: React.FC<{t: number}> = ({t}) => {
  const {stage: st} = useTheme();
  const a = 161.0; if (t < a - .1) return null;
  const end = P(t, 167.1, .73, E.inOut);
  return (
    <AbsoluteFill className="f" style={{alignItems: 'center', color: st.fg}}>
      <div style={{position: 'absolute', top: 520, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, transform: `translateY(${(1 - P(t, a, 1.2)) * 30}px)`}}>
        <Logo k={4.4} p={[P(t, a, .7, E.back), P(t, a + .12, .7, E.back), P(t, a + .24, .7, E.back)]} />
        <Words t={t} at={a + .3} words={['EMS']} style={{fontSize: 130, fontWeight: 800, letterSpacing: -2, lineHeight: 1.1, justifyContent: 'center'}} />
        <Words t={t} at={a + .5} gap={.25} words={['ប្រព័ន្ធគ្រប់គ្រង', 'ព្រឹត្តិការណ៍']} style={{fontSize: 52, fontWeight: 600, lineHeight: 1.6, color: st.soft2, justifyContent: 'center'}} />
      </div>
      <div style={{position: 'absolute', top: 1120, width: 940, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12}}>
        {NAV.map(([ic, l], i) => { const q = P(t, a + 1.0 + i * .06, .5); return <div key={i} style={{display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 99, background: st.glass2, boxShadow: `inset 0 0 0 1.5px ${st.glassLine2}`, fontSize: 19, opacity: q, transform: `translateY(${(1 - q) * 14}px)`}}><Icon n={ic} s={18} c={st.accent2} />{l}</div>; })}
      </div>
      <div style={{position: 'absolute', top: 1480, display: 'flex', alignItems: 'center', gap: 12, padding: '14px 28px', borderRadius: 99, background: st.accent, color: st.onAccent, fontSize: 26, fontWeight: 600, opacity: P(t, a + 2.0, .8)}}><Icon n="globe" s={24} c={st.onAccent} />ems-admin.moc.gov.kh</div>
      <div style={{position: 'absolute', inset: 0, background: st.fade, opacity: end}} />
    </AbsoluteFill>);
};
