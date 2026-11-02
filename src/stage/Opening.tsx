import React from 'react';
import {E, P, tw} from '../lib/anim';
import {useTheme} from '../theme/ThemeContext';
import {Icon} from '../ui/Icon';
import {Logo} from '../ui/Logo';
import {QRG} from '../ui/QRCode';
import {Words} from '../ui/Words';
export const Opening: React.FC<{t: number}> = ({t}) => {
  const {stage: st, app: {light: li}} = useTheme();
  const out = P(t, 6.6, .8, E.in); if (out >= 1) return null;
  const sweep = tw(t, .4, 2.6, -40, 140, E.soft);
  const mini = (i: number) => P(t, 2.4 + i * .3, .9);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out, transform: `translateY(${-out * 80}px)`}}>
      <div className="f" style={{position: 'absolute', left: 150, top: 290, width: 860, color: st.fg}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, opacity: P(t, .3, .8)}}><Logo k={1.1} p={[P(t, .3, .6, E.back), P(t, .4, .6, E.back), P(t, .5, .6, E.back)]} /><span style={{fontSize: 17, fontWeight: 600, letterSpacing: 3, color: st.sky}}>MINISTRY OF COMMERCE · EMS</span></div>
        <Words t={t} at={.6} words={['ស្វែងយល់', 'អំពី', 'ការប្រើប្រាស់']} style={{fontSize: 54, fontWeight: 700, lineHeight: 1.55, marginTop: 26}} />
        <Words t={t} at={1.1} stagger={.12} words={['ប្រព័ន្ធគ្រប់គ្រង', 'ព្រឹត្តិការណ៍']} style={{fontSize: 74, fontWeight: 700, lineHeight: 1.5}}
          inner={{backgroundImage: `linear-gradient(100deg, ${st.sky} 0%, ${st.fg} ${sweep - 30}%, ${st.accent2} ${sweep}%, ${st.fg} ${sweep + 30}%)`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', paddingTop: '.1em'}} />
        <div style={{fontSize: 26, fontWeight: 500, color: st.soft, marginTop: 14, letterSpacing: tw(t, 1.6, 1.4, 14, 1.5), opacity: P(t, 1.6, 1)}}>Event Management System · Step-by-step guide</div>
        <div style={{marginTop: 30, display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 20px', borderRadius: 99, background: st.glass, boxShadow: `inset 0 0 0 1.5px ${st.glassLine}`, fontSize: 19, opacity: P(t, 2.2, .7)}}><Icon n="globe" s={18} c={st.accent2} />ems-admin.moc.gov.kh</div>
      </div>
      {/* floating previews of real modules */}
      <div className="app" style={{position: 'absolute', left: 1180, top: 250, width: 330, padding: 22, borderRadius: 20, background: li.card, color: li.fg, boxShadow: '0 40px 80px rgba(0,0,0,.45)', opacity: mini(0), transform: `translateY(${(1 - mini(0)) * 60 + Math.sin(t * 1.2) * 6}px) rotate(-3deg)`}}>
        <div style={{fontSize: 15, fontWeight: 600}}>ព្រឹត្តិការណ៍សរុប</div><div style={{fontSize: 44, fontWeight: 700, color: li.pri}}>១០</div><div style={{fontSize: 13, color: li.mut}}>១០០% ព្រឹត្តិការណ៍សរុប</div></div>
      <div className="app" style={{position: 'absolute', left: 1450, top: 420, width: 300, padding: 22, borderRadius: 20, background: li.card, color: li.fg, boxShadow: '0 40px 80px rgba(0,0,0,.45)', textAlign: 'center', opacity: mini(1), transform: `translateY(${(1 - mini(1)) * 60 + Math.sin(t * 1.2 + 1) * 6}px) rotate(2deg)`}}>
        <div style={{fontSize: 15, fontWeight: 700, textAlign: 'left'}}>QR ព្រឹត្តិការណ៍</div><div style={{marginTop: 10, display: 'inline-block'}}><QRG size={150} /></div></div>
      <div className="app" style={{position: 'absolute', left: 1130, top: 600, width: 360, padding: 20, borderRadius: 20, background: li.card, color: li.fg, boxShadow: '0 40px 80px rgba(0,0,0,.45)', opacity: mini(2), transform: `translateY(${(1 - mini(2)) * 60 + Math.sin(t * 1.2 + 2) * 6}px) rotate(-1deg)`}}>
        <div style={{fontSize: 15, fontWeight: 700}}>វត្តមាន</div>
        {['សុខ ចាន់ណា', 'ចាន់ វិបុល'].map((n, i) => <div key={i} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, fontSize: 14}}><span>{n}</span><span style={{fontSize: 12, fontWeight: 600, color: li.ok, background: `${li.ok}1f`, padding: '3px 9px', borderRadius: 7}}>1/1 បានចូលរួម</span></div>)}
      </div>
    </div>);
};
