import React from 'react';
import {Img, staticFile} from 'remotion';
import {P, pr} from '../../lib/anim';
import {kh} from '../../lib/format';
import {Icon} from '../../ui/Icon';
import {useTheme} from '../../theme/ThemeContext';
import {Logo} from '../../ui/Logo';
export const LoginPage: React.FC<{t: number; stepAt: number[]; pressAt: number}> = ({t, stepAt, pressAt}) => {
  const li = useTheme().app.light;
  const a = P(t, 2.3, 1.0), b = P(t, 2.6, 1.0);
  const feats: [string, string, string][] = [['shield', 'មានសុវត្ថិភាពខ្ពស់', 'ការពារទិន្នន័យ និងគណនីរបស់អ្នក'], ['bolt', 'រហ័ស និងងាយស្រួល', 'ចូលប្រើដោយមិនចាំបាច់ចងចាំពាក្យសម្ងាត់'], ['phone', 'ប្រើតែទូរសព្ទដៃ', 'ផ្ទៀងផ្ទាត់ដោយកម្មវិធី MOC DGKey']];
  const steps = ['ទាញយកកម្មវិធី MOC Officer ពី Android ឬ iOS។', 'ចូលគណនី AAS តាមកម្មវិធីទូរស័ព្ទដៃ MOC Officer។', 'ចុចចូលប្រើជាមួយ MOC DGKey រួចស្កេនកូដ QR។', 'អ្នកនឹងត្រូវបានបញ្ជូនទៅកាន់ប្រព័ន្ធដោយស្វ័យប្រវត្តិ។'];
  const cur = stepAt.reduce((k, s, i) => (t >= s ? i : k), -1);
  const press = pr(t, pressAt), loading = t > pressAt + .1;
  return (
    <div className="app" style={{position: 'absolute', inset: 0, background: li.bg, color: li.fg, opacity: P(t, 2.1, .5)}}>
      {/* <div style={{position: 'absolute', left: 0, top: 0, width: 760, height: 900, background: `linear-gradient(160deg,${li.grad[0]} 0%,${li.grad[1]} 55%,${li.grad[2]} 100%)`, color: '#fff', padding: '90px 70px', overflow: 'hidden'}}>
        <div style={{position: 'absolute', right: -160, top: -160, width: 520, height: 520, borderRadius: '50%', background: 'rgba(255,255,255,.07)'}} />
        <div style={{position: 'absolute', left: -120, bottom: -180, width: 460, height: 460, borderRadius: '50%', background: 'rgba(255,255,255,.05)'}} />
        <div style={{opacity: a, transform: `translateY(${(1 - a) * 20}px)`}}>
          <div style={{display: 'flex', gap: 12, alignItems: 'center'}}><div style={{background: '#fff', borderRadius: 12, padding: 8}}><Logo k={1.2} /></div><div style={{fontWeight: 700, fontSize: 20}}>EMS</div></div>
          <div style={{fontSize: 40, fontWeight: 700, lineHeight: 1.5, marginTop: 50}}>ចូលប្រើប្រាស់<br />ដោយសុវត្ថិភាព</div>
          <div style={{fontSize: 17, opacity: .85, marginTop: 10, maxWidth: 520, lineHeight: 1.7}}>ផ្ទៀងផ្ទាត់អត្តសញ្ញាណបានរហ័ស និងមានសុវត្ថិភាពជាមួយ MOC DGKey</div>
        </div>
        <div style={{marginTop: 48}}>
          {feats.map(([ic, h, s], i) => { const q = P(t, 3.6 + i * .35, .7); return (
            <div key={i} style={{display: 'flex', gap: 16, alignItems: 'center', marginTop: 22, opacity: q, transform: `translateX(${(1 - q) * -30}px)`}}>
              <div style={{width: 50, height: 50, borderRadius: 14, background: 'rgba(255,255,255,.14)', display: 'grid', placeItems: 'center'}}><Icon n={ic} s={22} c="#fff" /></div>
              <div><div style={{fontWeight: 700, fontSize: 17}}>{h}</div><div style={{fontSize: 14.5, opacity: .8}}>{s}</div></div></div>); })}
        </div>
      </div> */}
      <Img src={staticFile('shots/login-hero.png')} style={{position: 'absolute', left: -80, top: 0, height: 900, width: 'auto', maxWidth: 'none'}} />
      <div style={{position: 'absolute', left: 1000, top: 130, width: 540, padding: '36px 40px', borderRadius: 20, background: '#fff', boxShadow: '0 30px 70px rgba(7,52,81,.12)', textAlign: 'center', opacity: b, transform: `translateY(${(1 - b) * 30}px)`}}>
        {/* <div style={{display: 'inline-block', padding: 14, borderRadius: 20, background: li.soft}}><Logo k={1.8} /></div>
        <div style={{fontSize: 27, fontWeight: 700, marginTop: 16, lineHeight: 1.5}}>ចូលប្រើប្រព័ន្ធ</div>
        <div style={{fontSize: 15, color: li.mut}}>ចូលប្រើប្រព័ន្ធគ្រប់គ្រងព្រឹត្តិការណ៍</div>
        <div style={{marginTop: 26, height: 52, borderRadius: 12, background: li.pri, color: li.onPri, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontSize: 17, fontWeight: 700, transform: `scale(${1 - .04 * press})`, boxShadow: loading ? '0 0 0 4px rgba(43,128,183,.25)' : 'none'}}>
          {loading ? <svg width={20} height={20} viewBox="0 0 24 24" style={{transform: `rotate(${t * 400}deg)`}}><circle cx={12} cy={12} r={9} fill="none" stroke="rgba(255,255,255,.35)" strokeWidth={3} /><path d="M12 3a9 9 0 0 1 9 9" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" /></svg> : <Icon n="key" s={19} c="#fff" />}
          ចូលប្រើជាមួយ MOC DGKey</div>
        <div style={{textAlign: 'left', marginTop: 24}}>
          {steps.map((s, i) => { const on = i === cur, done = i < cur; return (
            <div key={i} style={{display: 'flex', gap: 12, alignItems: 'flex-start', padding: '9px 12px', borderRadius: 10, background: on ? li.tint : 'transparent', fontSize: 14.5, lineHeight: 1.6, transition: 'none'}}>
              <span style={{width: 24, height: 24, borderRadius: 12, flex: 'none', display: 'grid', placeItems: 'center', fontSize: 12.5, fontWeight: 700, background: on || done ? li.pri : li.line, color: on || done ? li.onPri : li.mut, marginTop: 1}}>{done ? <Icon n="check" s={13} sw={3} c="#fff" /> : kh(i + 1)}</span>
              <span style={{color: on ? li.fg : li.mut, fontWeight: on ? 600 : 400}}>{s}</span></div>); })}
        </div> */}
        <Img src={staticFile('shots/login-card.png')} style={{width: '100%', height: 'auto'}} />
      </div>
    </div>);
};
