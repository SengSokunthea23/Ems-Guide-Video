import React from 'react';
import {E, P, pr, tw} from '../../lib/anim';
import {cnt, kh} from '../../lib/format';
import {Area} from '../../app/charts/Area';
import {Donut} from '../../app/charts/Donut';
import {Legend} from '../../app/charts/Legend';
import {Att} from '../../app/primitives/Att';
import {Pill} from '../../app/primitives/Pill';
import {Avatar, BottomSheet, Grid2, MBtn, MCard, MField, MH2, MKpi, MRow, MTitle, Scroll, sc} from '../../app/mobile/mobile';
import {useTh, useTheme} from '../../theme/ThemeContext';
import {Icon} from '../../ui/Icon';
import {Logo} from '../../ui/Logo';
import {QRG} from '../../ui/QRCode';
import {EV, TREND, TYPES} from '../data';

/* =============================== LOGIN =============================== */
export const MLoginPage: React.FC<{t: number; stepAt: number[]; pressAt: number}> = ({t, stepAt, pressAt}) => {
  const li = useTheme().app.light;
  const a = P(t, 2.3, 1.0), b = P(t, 2.6, 1.0);
  const steps = ['ទាញយកកម្មវិធី MOC Officer ពី Android ឬ iOS។', 'ចូលគណនី AAS តាមកម្មវិធីទូរស័ព្ទដៃ MOC Officer។', 'ចុចចូលប្រើជាមួយ MOC DGKey រួចស្កេនកូដ QR។', 'អ្នកនឹងត្រូវបានបញ្ជូនទៅកាន់ប្រព័ន្ធដោយស្វ័យប្រវត្តិ។'];
  const cur = stepAt.reduce((k, s, i) => (t >= s ? i : k), -1);
  const press = pr(t, pressAt), loading = t > pressAt + .1;
  return (
    <div className="app" style={{position: 'absolute', inset: 0, background: li.bg, color: li.fg, opacity: P(t, 2.1, .5), overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 230, background: `linear-gradient(160deg,${li.grad[0]} 0%,${li.grad[1]} 55%,${li.grad[2]} 100%)`, color: '#fff', padding: '34px 24px', overflow: 'hidden'}}>
        <div style={{position: 'absolute', right: -90, top: -90, width: 260, height: 260, borderRadius: '50%', background: 'rgba(255,255,255,.07)'}} />
        <div style={{opacity: a, transform: `translateY(${(1 - a) * 16}px)`}}>
          <div style={{display: 'flex', gap: 10, alignItems: 'center'}}><div style={{background: '#fff', borderRadius: 10, padding: 6}}><Logo k={.9} /></div><div style={{fontWeight: 700, fontSize: 17}}>EMS</div></div>
          <div style={{fontSize: 27, fontWeight: 700, lineHeight: 1.5, marginTop: 22}}>ចូលប្រើប្រាស់ដោយសុវត្ថិភាព</div>
          <div style={{fontSize: 13, opacity: .85, marginTop: 4, lineHeight: 1.7}}>ផ្ទៀងផ្ទាត់អត្តសញ្ញាណបានរហ័សជាមួយ MOC DGKey</div>
        </div>
      </div>
      <div style={{position: 'absolute', left: 16, right: 16, top: 200, padding: '22px 20px', borderRadius: 18, background: '#fff', boxShadow: '0 20px 50px rgba(7,52,81,.14)', textAlign: 'center', opacity: b, transform: `translateY(${(1 - b) * 24}px)`}}>
        <div style={{display: 'inline-block', padding: 10, borderRadius: 16, background: li.soft}}><Logo k={1.3} /></div>
        <div style={{fontSize: 21, fontWeight: 700, marginTop: 8, lineHeight: 1.5}}>ចូលប្រើប្រព័ន្ធ</div>
        <div style={{fontSize: 12.5, color: li.mut}}>ចូលប្រើប្រព័ន្ធគ្រប់គ្រងព្រឹត្តិការណ៍</div>
        <div style={{marginTop: 16, height: 46, borderRadius: 11, background: li.pri, color: li.onPri, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 15, fontWeight: 700, transform: `scale(${1 - .04 * press})`, boxShadow: loading ? `0 0 0 4px ${li.pri}40` : 'none'}}>
          {loading ? <svg width={18} height={18} viewBox="0 0 24 24" style={{transform: `rotate(${t * 400}deg)`}}><circle cx={12} cy={12} r={9} fill="none" stroke="rgba(255,255,255,.35)" strokeWidth={3} /><path d="M12 3a9 9 0 0 1 9 9" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" /></svg> : <Icon n="key" s={17} c={li.onPri} />}
          ចូលប្រើជាមួយ MOC DGKey</div>
        <div style={{textAlign: 'left', marginTop: 14}}>
          {steps.map((s, i) => { const on = i === cur, done = i < cur; return (
            <div key={i} style={{display: 'flex', gap: 10, alignItems: 'flex-start', padding: '7px 8px', borderRadius: 9, background: on ? li.tint : 'transparent', fontSize: 12.5, lineHeight: 1.65}}>
              <span style={{width: 22, height: 22, borderRadius: 11, flex: 'none', display: 'grid', placeItems: 'center', fontSize: 11.5, fontWeight: 700, background: on || done ? li.pri : li.line, color: on || done ? li.onPri : li.mut, marginTop: 1}}>{done ? <Icon n="check" s={12} sw={3} c={li.onPri} /> : kh(i + 1)}</span>
              <span style={{color: on ? li.fg : li.mut, fontWeight: on ? 600 : 400}}>{s}</span></div>); })}
        </div>
      </div>
    </div>);
};

/* =============================== DASHBOARD =============================== */
export const MDashboardPage: React.FC<{t: number; refreshAt: number; d1: number; d2: number; fbPress: number}> = ({t, refreshAt, d1, d2, fbPress}) => {
  const th = useTh();
  const r = t > refreshAt ? refreshAt + .1 : 1.2;
  const kp = (i: number) => P(t, 1.0 + i * .12, .7);
  const kv = (i: number, v: number) => kh(t > refreshAt ? cnt(t, refreshAt + .1, v, .8) : cnt(t, 1.1 + i * .12, v));
  const y = sc(t, [[8.3, 960, 1.1], [10.4, 0, 1.0]]);
  return (<Scroll y={y}>
    <MTitle t={t} at={.6} title="ទិដ្ឋភាពប្រតិបត្តិការ" sub="សង្ខេបបច្ចុប្បន្នសម្រាប់ព្រឹត្តិការណ៍ ការចុះវត្តមាន និងវឌ្ឍនភាពវត្តមាន។" />
    <div style={{display: 'flex', gap: 8, alignItems: 'flex-end', marginBottom: 12, opacity: P(t, .9, .6)}}>
      <MField label="ថ្ងៃចាប់ផ្តើម" value={t > d1 ? '01/10/2026' : '27/10/2026'} focus={t > d1 - .1 && t < d1 + .6 ? 1 : 0} style={{flex: 1}} />
      <MField label="ថ្ងៃបញ្ចប់" value="02/11/2026" focus={t > d2 - .1 && t < d2 + .6 ? 1 : 0} style={{flex: 1}} />
      <div style={{width: 40, height: 40, borderRadius: 9, background: th.pri, display: 'grid', placeItems: 'center', transform: `scale(${1 - .1 * fbPress})`}}><Icon n="sliders" s={17} c={th.onPri} /></div>
    </div>
    <Grid2>
      <MKpi label="ព្រឹត្តិការណ៍សរុប" value={kv(0, 10)} sub="១០០% ព្រឹត្តិការណ៍សរុប" c={th.pri} p={kp(0)} seed={1} />
      <MKpi label="កំពុងដំណើរការ" value={kv(1, 0)} sub="០% ព្រឹត្តិការណ៍សរុប" c={th.ok} p={kp(1)} seed={2} />
      <MKpi label="ជិតមកដល់" value={kv(2, 1)} sub="១០% ព្រឹត្តិការណ៍សរុប" c={th.fg} p={kp(2)} seed={3} />
      <MKpi label="បានបិទ" value={kv(3, 9)} sub="៩០% ព្រឹត្តិការណ៍សរុប" c={th.bad} p={kp(3)} seed={4} />
    </Grid2>
    <MCard p={P(t, 1.5, .7)}>
      <MH2>និន្នាការព្រឹត្តិការណ៍</MH2>
      <div style={{marginLeft: -8}}><Area id={`mdt${th.dark ? 1 : 0}`} w={376} h={190} vals={TREND} max={4} p={P(t, r + .6, 1.6, E.inOut)} labels={['២៧', '២៨', '២៩', '៣០', '៣១', '១', '២', '']} /></div>
    </MCard>
    <MCard p={P(t, 1.7, .7)}>
      <MH2>ព្រឹត្តិការណ៍</MH2>
      <div style={{display: 'flex', justifyContent: 'center'}}><Donut size={170} p={P(t, r + .8, 1.3, E.inOut)} center={kh(10)} sub="ព្រឹត្តិការណ៍សរុប" segs={[{v: 0, c: th.ok}, {v: 1, c: th.warn}, {v: 9, c: th.bad}]} /></div>
      <div style={{marginTop: 8}}><Legend p={P(t, r + 1, .8)} items={[[th.ok, 'កំពុងដំណើរការ', '០ (០%)'], [th.warn, 'ជិតមកដល់', '១ (១០%)'], [th.bad, 'បានបិទ', '៩ (៩០%)']]} /></div>
    </MCard>
    <MH2>តាមដានព្រឹត្តិការណ៍</MH2>
    {EV.filter((_, i) => [0, 1, 4].includes(i)).map((e, i) => (
      <MRow key={i} t={t} at={2.4} i={i} title={e[0]} sub={`${e[2].split(',')[0]} · ${e[3]}`} right={<Pill c={e[4]}>{e[5]}</Pill>}
        lead={undefined} style={{flexWrap: 'wrap'}} />))}
    <div style={{height: 4}} />
    <MCard p={P(t, 3.0, .6)} pad={12}><div style={{fontSize: 12.5, marginBottom: 6}}>វត្តមាន 24/30</div><Att v={tw(t, 3, 1.5, 0, 24 / 30)} lab="" /></MCard>
  </Scroll>);
};

/* =============================== EVENTS =============================== */
export const MEventsPage: React.FC<{t: number; typeOpen: [number, number]; pickType: number; statusOpen: [number, number]; rowHover: number}> = ({t, typeOpen, pickType, statusOpen, rowHover}) => {
  const th = useTh();
  const filtered = t > pickType;
  const rows = EV.filter((e) => !filtered || e[1] === 'កិច្ចប្រជុំ');
  return (<>
    <Scroll y={0}>
      <MTitle t={t} at={.3} title="ព្រឹត្តិការណ៍" sub="មានព្រឹត្តិការណ៍ 47 ក្នុងមូលដ្ឋានទិន្នន័យ, 3 ជិតមកដល់, 43 បានបិទ។" />
      <MCard p={P(t, .5, .6)} pad={12}>
        <MField value="ស្វែងរកព្រឹត្តិការណ៍" icon="search" style={{color: th.mut, marginBottom: 8}} />
        <Grid2 gap={8} style={{marginBottom: 0}}>
          <MField value={filtered ? 'កិច្ចប្រជុំ' : 'គ្រប់ប្រភេទ'} drop focus={t > typeOpen[0] && t < typeOpen[1] ? 1 : 0} />
          <MField value="គ្រប់ស្ថានភាព" drop focus={t > statusOpen[0] && t < statusOpen[1] ? 1 : 0} />
        </Grid2>
      </MCard>
      {rows.map((e, i) => (
        <MRow key={e[0]} t={t} at={filtered ? pickType + .05 : .9} i={i} hi={t > rowHover && i === 0} title={e[0]} sub={`${e[2]} · ${e[3]}`}
          right={<div style={{display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end'}}><Pill c={e[4]}>{e[5]}</Pill><span style={{fontSize: 11, color: th.mut}}>{e[7]}/{e[6]}</span></div>} />))}
    </Scroll>
    <BottomSheet title="ប្រភេទព្រឹត្តិការណ៍" items={TYPES.slice(0, 6)} open={typeOpen} t={t} hi={t > pickType - .5 ? 1 : -1} />
    <BottomSheet title="ស្ថានភាព" items={['គ្រប់ស្ថានភាព', 'បានផ្សព្វផ្សាយ', 'រង់ចាំការអនុម័ត', 'បានបដិសេធ', 'បានបោះបង់']} open={statusOpen} t={t} hi={0} />
  </>);
};

export const MEventDetailPage: React.FC<{t: number; copyAt: number}> = ({t, copyAt}) => {
  const th = useTh();
  const y = sc(t, [[1.6, 0], [2.3, 330, 1.0], [4.9, 600, 1.0], [8.0, 0, 1.0]]);
  return (<Scroll y={y}>
    <MTitle t={t} at={.1} title="កិច្ចប្រជុំប្រចាំខែ ពិនិត្យវឌ្ឍនភាពការងារ" sub="២ វិច្ឆិកា ២០២៦, ០៨:០០ ព្រឹក - ១២:០០ រសៀល" />
    <div style={{display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12, opacity: P(t, .4, .5)}}><Pill c="pri">QR តែមួយ</Pill><Pill c="ok">បានផ្សព្វផ្សាយ</Pill><Pill c="ok">កំពុងដំណើរការ</Pill></div>
    <Grid2>
      <MKpi label="អ្នកប្រើទាំងអស់" value={String(cnt(t, .6, 30))} sub="៦ មិនទាន់ចូលរួម" c={th.pri} p={P(t, .5, .6)} seed={2} />
      <MKpi label="បានចូលរួម" value={String(cnt(t, .7, 24))} sub="គ្របដណ្តប់ ៨០%" c="#0f766e" p={P(t, .6, .6)} seed={3} />
    </Grid2>
    <MCard p={P(t, 1.0, .6)}>
      <MH2>ព័ត៌មានព្រឹត្តិការណ៍</MH2>
      {[['ទីកន្លែង', 'សាលប្រជុំអង្គរវត្ត'], ['ក្រោមអធិបតីភាព', 'ឯកឧត្តម ប្រធាននាយកដ្ឋាន'], ['កាលវិភាគ', '២ វិច្ឆិកា ២០២៦, ០៨:០០ ព្រឹក']].map(([k, v], i) =>
        <div key={i} style={{marginTop: i ? 10 : 0, opacity: P(t, 1.2 + i * .12, .5)}}><div style={{fontSize: 11.5, color: th.mut}}>{k}</div><div style={{fontSize: 13.5, fontWeight: 600}}>{v}</div></div>)}
    </MCard>
    <MCard p={P(t, 1.15, .6)} style={{textAlign: 'center'}}>
      <MH2><span style={{display: 'block', textAlign: 'left'}}>QR ព្រឹត្តិការណ៍</span></MH2>
      <div style={{display: 'inline-block', padding: 8, borderRadius: 10, border: `1px solid ${th.bd}`, background: '#fff'}}><QRG size={170} /></div>
      <div style={{fontSize: 11, color: th.mut, margin: '6px 0 10px', fontFamily: 'ui-monospace,monospace'}}>Ev7Qm2xK9pLs4TnB8wRc</div>
      <MBtn icon={t > copyAt ? 'check' : 'copy'} press={pr(t, copyAt)} done={t > copyAt} style={{height: 36, width: 140, margin: '0 auto'}}>ចម្លង URL</MBtn>
    </MCard>
    <MCard p={P(t, 1.3, .6)}>
      <MH2>ប្រវត្តិសំណើ</MH2>
      {[['បានស្នើ', '១ វិច្ឆិកា ២០២៦, ០៩:១២ ព្រឹក', th.pri], ['បានអនុម័ត', '១ វិច្ឆិកា ២០២៦, ១០:០៤ ព្រឹក', th.ok]].map(([a, b, c], i) => { const q = P(t, 5.0 + i * .6, .6); return (
        <div key={i} style={{display: 'flex', gap: 10, marginTop: i ? 12 : 0, opacity: q, transform: `translateX(${(1 - q) * 16}px)`}}>
          <div style={{width: 26, height: 26, borderRadius: 13, background: c, display: 'grid', placeItems: 'center', flex: 'none'}}><Icon n={i ? 'check' : 'send'} s={13} c="#fff" sw={2.6} /></div>
          <div><div style={{fontSize: 13.5, fontWeight: 700}}>{a}</div><div style={{fontSize: 11.5, color: th.mut}}>{b}</div></div></div>); })}
    </MCard>
    <MH2>អ្នកប្រើទាំងអស់ក្នុងព្រឹត្តិការណ៍នេះ</MH2>
    {[['សុខ ចាន់ណា', 'នាយកដ្ឋានរដ្ឋបាល', 'ok'], ['ចាន់ វិបុល', 'នាយកដ្ឋានផែនការ', 'ok'], ['លី សុភ័ក្រ', 'នាយកដ្ឋានរដ្ឋបាល', 'warn']].map(([n, u, s], i) =>
      <MRow key={i} t={t} at={1.8} i={i} lead={<Avatar name={n} />} title={n} sub={u} right={<Pill c={s as 'ok' | 'warn'}>{s === 'ok' ? '1/1' : 'មិនទាន់'}</Pill>} />)}
  </Scroll>);
};
