import React from 'react';
import {E, P, clamp, pr} from '../../lib/anim';
import {kh} from '../../lib/format';
import {Area} from '../../app/charts/Area';
import {Donut} from '../../app/charts/Donut';
import {Legend} from '../../app/charts/Legend';
import {Pill} from '../../app/primitives/Pill';
import {BottomSheet, Grid2, MCard, MField, MH2, MRow, MTitle, Scroll, sc} from '../../app/mobile/mobile';
import {useTh} from '../../theme/ThemeContext';
import {Icon} from '../../ui/Icon';
import {QRG} from '../../ui/QRCode';

/* =============================== REQUESTS / ACTIVITY =============================== */
export const MRequestsPage: React.FC<{t: number; typeOpen: [number, number]; approveAt: number}> = ({t, typeOpen, approveAt}) => {
  const th = useTh(); const ok = t > approveAt;
  const y = sc(t, [[.9, 0], [1.2, 420, 1.0]]);
  return (<>
    <Scroll y={y}>
      <MTitle t={t} at={.1} title="សំណើ" sub="ពិនិត្យសំណើដែលបានស្នើសុំ។" />
      <MCard p={P(t, .3, .6)}>
        <MH2>និន្នាការសំណើ</MH2>
        <div style={{marginLeft: -8}}><Area id={`mrq${th.dark ? 1 : 0}`} w={376} h={170} vals={[0, 2, 0, 1, 3, 0, 1]} max={4} p={P(t, .6, 1.5, E.inOut)} labels={['២៧', '២៨', '២៩', '៣០', '៣១', '១', '២']} /></div>
      </MCard>
      <MCard p={P(t, .4, .6)}>
        <MH2>ស្ថានភាពសំណើ</MH2>
        <div style={{display: 'flex', justifyContent: 'center'}}><Donut size={150} p={P(t, .8, 1.2, E.inOut)} center={kh(7)} sub="សំណើ" segs={[{v: ok ? 0 : 1, c: th.warn}, {v: ok ? 7 : 6, c: th.ok}, {v: 0, c: th.bad}]} /></div>
        <Legend items={[[th.warn, 'កំពុងរង់ចាំ', ok ? '០ (០%)' : '១ (១៤%)'], [th.ok, 'បានអនុម័ត', ok ? '៧ (១០០%)' : '៦ (៨៦%)'], [th.bad, 'បានបដិសេធ', '០ (០%)']]} />
      </MCard>
      <div style={{display: 'flex', alignItems: 'center', marginBottom: 8}}><b style={{fontSize: 14.5, flex: 1}}>សំណើ</b><Pill c="warn">សំណើ 7</Pill></div>
      <Grid2 gap={8}><MField value="គ្រប់ស្ថានភាព" drop /><MField value="ប្រភេទសំណើ" drop focus={t > typeOpen[0] && t < typeOpen[1] ? 1 : 0} /></Grid2>
      {([['សំណើកក់ទីកន្លែង', 'សុខ ចាន់ណា', '២ វិច្ឆិកា ១១:៥៧ ព្រឹក', 0], ['សំណើកក់ទីកន្លែង', 'ចាន់ វិបុល', '១ វិច្ឆិកា ០៩:១២ ព្រឹក', 1], ['សំណើចូលប្រើអង្គភាព', 'លី សុភ័ក្រ', '៣១ តុលា ០៤:២០ រសៀល', 1], ['សំណើកក់ទីកន្លែង', 'សុខ ចាន់ណា', '៣០ តុលា ០២:១០ រសៀល', 1]] as const).map((r, i) =>
        <MRow key={i} t={t} at={.8} i={i} hi={i === 0 && t > approveAt - .6 && t < approveAt + 2} title={r[0]} sub={`${r[1]} · ${r[2]}`}
          right={i === 0 && !ok ? <Pill c="warn">កំពុងរង់ចាំ</Pill> : <Pill c="ok" style={i === 0 ? {transform: `scale(${.9 + .1 * P(t, approveAt, .4, E.back)})`} : undefined}>បានអនុម័ត</Pill>} />)}
    </Scroll>
    <BottomSheet title="ប្រភេទសំណើ" items={['ប្រភេទសំណើទាំងអស់', 'សំណើចូលប្រើអង្គភាព', 'សំណើកក់ទីកន្លែង']} open={typeOpen} t={t} hi={0} />
  </>);
};
export const MActivityPage: React.FC<{t: number; resOpen: [number, number]; actOpen: [number, number]}> = ({t, resOpen, actOpen}) => {
  const th = useTh();
  const L: [string, string, string, 'pri' | 'ok' | 'warn'][] = [['Demo Admin login', 'POST /auth/login', 'Auth', 'pri'], ['Demo Admin create events', 'POST /api/v1/events', 'Events', 'ok'], ['Demo Admin update requests', 'PATCH /api/v1/requests/…', 'Requests', 'warn'], ['សុខ ចាន់ណា login', 'POST /auth/login', 'Auth', 'pri'], ['សុខ ចាន់ណា create events', 'POST /api/v1/events', 'Events', 'ok'], ['Demo Admin logout', 'POST /auth/logout', 'Auth', 'pri']];
  return (<>
    <Scroll y={0}>
      <MTitle t={t} at={.1} title="កំណត់ត្រាសកម្មភាព" sub="តាមដានសកម្មភាពអ្នកប្រើក្នុងអង្គភាព។" />
      <MField value="ស្វែងរកតាមអ្នកប្រើ ឬសកម្មភាព" icon="search" style={{marginBottom: 8}} />
      <Grid2 gap={8}><MField value="ធនធានទាំងអស់" drop focus={t > resOpen[0] && t < resOpen[1] ? 1 : 0} /><MField value="សកម្មភាពទាំងអស់" drop focus={t > actOpen[0] && t < actOpen[1] ? 1 : 0} /></Grid2>
      {L.map((l, i) => <MRow key={i} t={t} at={.5} i={i} title={l[0]} sub={<><span style={{fontFamily: 'ui-monospace,monospace', fontSize: 11}}>{l[1]}</span><br />{`២ វិច្ឆិកា ២០២៦, ${kh(10 - Math.floor(i / 2))}:${kh(42 - i * 7)} ព្រឹក`}</>} right={<Pill c={l[3]}>{l[2]}</Pill>} />)}
    </Scroll>
    <BottomSheet title="ធនធាន" items={['ធនធានទាំងអស់', 'Auth', 'Events', 'Requests']} open={resOpen} t={t} hi={0} />
    <BottomSheet title="សកម្មភាព" items={['សកម្មភាពទាំងអស់', 'ចូលប្រើ', 'ចាកចេញ', 'បង្កើត', 'កែប្រែ', 'លុប']} open={actOpen} t={t} hi={0} />
  </>);
};

/* =============================== SETTINGS =============================== */
export const MSettingsPage: React.FC<{t: number; mode: number; langOpen: [number, number]; tgAt: number}> = ({t, mode, langOpen, tgAt}) => {
  const th = useTh();
  const modal = P(t, tgAt + .1, .5, E.back);
  const y = sc(t, [[1.6, 0], [2.2, 300, 1.0], [5.0, 0, 1.0]]);
  return (<>
    <Scroll y={y}>
      <MTitle t={t} at={.1} title="ការកំណត់" sub="ពិនិត្យប្រវត្តិរូប ស្ថាប័ន ភាសា រូបរាង និងចំណូលចិត្ត" />
      <MCard p={P(t, .3, .6)}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <div style={{width: 52, height: 52, borderRadius: 26, background: `linear-gradient(135deg,${th.avatar[0]},${th.avatar[1]})`, color: th.onPri, display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 18}}>DA</div>
          <div style={{flex: 1}}><div style={{fontSize: 17, fontWeight: 700}}>Demo Admin</div><Pill c="mut">admin</Pill></div>
          <div style={{height: 36, padding: '0 12px', borderRadius: 9, border: `1.5px solid ${t > tgAt ? th.pri : th.bd}`, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, transform: `scale(${1 - .06 * pr(t, tgAt)})`}}><Icon n="send" s={15} c="#2AABEE" />Telegram</div>
        </div>
        <div style={{fontSize: 12.5, color: th.mut, margin: '14px 0 8px'}}>នាយកដ្ឋានរដ្ឋបាល</div>
        {[['នាមពេញជាភាសាខ្មែរ', 'អ្នកគ្រប់គ្រង សាកល្បង'], ['នាមពេញជាភាសាអង់គ្លេស', 'Demo Admin'], ['អ៊ីមែល', 'admin@ems.demo'], ['លេខទូរស័ព្ទ', '012 000 000']].map(([l, v], i) =>
          <div key={i} style={{marginTop: 8, opacity: P(t, .6 + i * .08, .5)}}><div style={{fontSize: 11.5, color: th.mut}}>{l}</div><div style={{marginTop: 3, height: 38, borderRadius: 9, background: th.inp, border: `1px solid ${th.bd}`, padding: '0 12px', display: 'flex', alignItems: 'center', fontSize: 13.5}}>{v}</div></div>)}
      </MCard>
      <MCard p={P(t, .5, .6)}>
        <MH2>រូបរាង</MH2>
        <div style={{fontSize: 12, color: th.mut, marginBottom: 6}}>របៀប</div>
        <div style={{position: 'relative', display: 'flex', padding: 4, borderRadius: 11, background: th.inp, border: `1px solid ${th.bd}`}}>
          <div style={{position: 'absolute', top: 4, bottom: 4, left: `calc(4px + ${mode} * (100% - 8px) / 3)`, width: 'calc((100% - 8px) / 3)', borderRadius: 8, background: th.pri}} />
          {[['sun', 'ភ្លឺ'], ['moon', 'ងងឹត'], ['gear', 'ប្រព័ន្ធ']].map(([ic, l], i) => <div key={i} style={{position: 'relative', flex: 1, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: Math.round(mode) === i ? th.onPri : th.fg}}><Icon n={ic} s={14} />{l}</div>)}
        </div>
        <MField label="ប្ដូរភាសា" value="ខ្មែរ" drop focus={t > langOpen[0] && t < langOpen[1] ? 1 : 0} style={{marginTop: 12}} />
      </MCard>
      <MCard p={P(t, .6, .6)}>
        <MH2>ទីតាំង</MH2>
        <MField label="ប្រទេស" value="Cambodia" drop style={{marginBottom: 8}} /><MField label="តំបន់ម៉ោង" value="Asia/Phnom_Penh" drop />
      </MCard>
    </Scroll>
    <BottomSheet title="ភាសា" items={['អង់គ្លេស', 'ខ្មែរ']} open={langOpen} t={t} hi={1} />
    {modal > 0 && <div style={{position: 'absolute', inset: 0, background: `rgba(7,18,43,${.5 * clamp(modal)})`, zIndex: 30, display: 'grid', placeItems: 'center'}}>
      <div style={{width: 330, padding: 20, borderRadius: 16, background: th.card, boxShadow: '0 30px 70px rgba(0,0,0,.3)', transform: `scale(${.9 + .1 * modal})`, opacity: clamp(modal * 1.4), textAlign: 'center'}}>
        <div style={{fontSize: 16, fontWeight: 700, textAlign: 'left'}}>ភ្ជាប់ Telegram</div>
        <div style={{fontSize: 12, color: th.mut, textAlign: 'left', marginTop: 4, lineHeight: 1.6}}>ស្កេន QR code ឬបើកតំណ ដើម្បីភ្ជាប់គណនីទៅកាន់ Telegram bot។</div>
        <div style={{display: 'inline-block', marginTop: 12, padding: 8, borderRadius: 12, border: `1px solid ${th.bd}`, background: '#fff'}}><QRG size={160} seed={9} /></div>
        <div style={{height: 38, marginTop: 12, borderRadius: 9, background: th.pri, color: th.onPri, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 13, fontWeight: 600}}><Icon n="send" s={14} c={th.onPri} />បើក Telegram</div>
      </div></div>}
  </>);
};
