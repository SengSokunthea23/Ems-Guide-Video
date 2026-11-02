import React from 'react';
import {E, P, clamp, pr} from '../../lib/anim';
import {Icon} from '../../ui/Icon';
import {QRG} from '../../ui/QRCode';
import {useTh} from '../../theme/ThemeContext';
import {Card} from '../../app/primitives/Card';
import {Field} from '../../app/primitives/Field';
import {Menu} from '../../app/primitives/Menu';
import {PageTitle} from '../../app/primitives/PageTitle';
import {Pill} from '../../app/primitives/Pill';
export const SettingsPage: React.FC<{t: number; mode: number; langOpen: [number, number]; tgAt: number}> = ({t, mode, langOpen, tgAt}) => {
  const th = useTh();
  const modal = P(t, tgAt + .1, .5, E.back);
  return (<>
    <PageTitle t={t} at={.1} title="ការកំណត់" sub="ពិនិត្យប្រវត្តិរូប ស្ថាប័ន ភាសា រូបរាង និងចំណូលចិត្តប្រព័ន្ធ" />
    <Card x={28} y={96} w={1316} h={300} p={P(t, .3, .6)}>
      <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
        <div style={{width: 56, height: 56, borderRadius: 28, background: `linear-gradient(135deg,${th.avatar[0]},${th.avatar[1]})`, color: th.onPri, display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 19}}>DA</div>
        <div style={{flex: 1}}><div style={{fontSize: 18, fontWeight: 700}}>Demo Admin</div><Pill c="mut">admin</Pill></div>
        <div style={{height: 36, padding: '0 14px', borderRadius: 9, border: `1.5px solid ${t > tgAt ? th.pri : th.bd}`, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, fontWeight: 600, transform: `scale(${1 - .06 * pr(t, tgAt)})`}}><Icon n="send" s={15} c="#2AABEE" />Telegram</div>
      </div>
      <div style={{fontSize: 13, color: th.mut, marginTop: 18}}>នាយកដ្ឋានរដ្ឋបាល</div>
      {[['នាមពេញជាភាសាខ្មែរ', 'អ្នកគ្រប់គ្រង សាកល្បង'], ['នាមពេញជាភាសាអង់គ្លេស', 'Demo Admin'], ['ភេទ', 'ប្រុស'], ['អ៊ីមែល', 'admin@ems.demo'], ['លេខទូរស័ព្ទ', '012 000 000'], ['តំណែង', 'ប្រធានការិយាល័យ']].map(([l, v], i) =>
        <div key={i} style={{position: 'absolute', left: 18 + (i % 3) * 428, top: 130 + Math.floor(i / 3) * 78, width: 410, opacity: P(t, .6 + i * .08, .5)}}>
          <div style={{fontSize: 12.5, color: th.mut}}>{l}</div><div style={{marginTop: 4, height: 38, borderRadius: 9, background: th.inp, border: `1px solid ${th.bd}`, padding: '0 12px', display: 'flex', alignItems: 'center', fontSize: 14}}>{v}</div></div>)}
    </Card>
    <Card x={28} y={408} w={650} h={250} p={P(t, .5, .6)}>
      <div style={{fontSize: 15, fontWeight: 700}}>រូបរាង</div>
      <div style={{fontSize: 12.5, color: th.mut, marginTop: 14}}>របៀប</div>
      <div style={{position: 'relative', display: 'flex', marginTop: 6, padding: 4, borderRadius: 11, background: th.inp, border: `1px solid ${th.bd}`, width: 600}}>
        <div style={{position: 'absolute', top: 4, bottom: 4, left: 4 + mode * 197, width: 194, borderRadius: 8, background: th.pri}} />
        {[['sun', 'ភ្លឺ'], ['moon', 'ងងឹត'], ['gear', 'តាមប្រព័ន្ធ']].map(([ic, l], i) => <div key={i} style={{position: 'relative', width: 197, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: Math.round(mode) === i ? th.onPri : th.fg}}><Icon n={ic} s={15} />{l}</div>)}
      </div>
      <Field x={18} y={150} w={600} label="ប្ដូរភាសា" value="ខ្មែរ" drop focus={t > langOpen[0] && t < langOpen[1] ? 1 : 0} />
      <Menu x={18} y={226} w={600} items={['អង់គ្លេស', 'ខ្មែរ']} p={P(t, langOpen[0], .3) * (1 - P(t, langOpen[1], .2))} hi={1} />
    </Card>
    <Card x={690} y={408} w={654} h={250} p={P(t, .6, .6)}>
      <div style={{fontSize: 15, fontWeight: 700}}>ទីតាំង</div>
      <Field x={18} y={60} w={610} label="ប្រទេស" value="Cambodia" drop />
      <Field x={18} y={140} w={610} label="តំបន់ម៉ោង" value="Asia/Phnom_Penh" drop />
    </Card>
    {modal > 0 && <div style={{position: 'absolute', inset: 0, background: `rgba(7,18,43,${.45 * clamp(modal)})`, zIndex: 30}}>
      <div style={{position: 'absolute', left: 484, top: 150, width: 400, padding: 24, borderRadius: 16, background: th.card, boxShadow: '0 30px 70px rgba(0,0,0,.3)', transform: `scale(${.9 + .1 * modal})`, opacity: clamp(modal * 1.4), textAlign: 'center'}}>
        <div style={{fontSize: 17, fontWeight: 700, textAlign: 'left'}}>ភ្ជាប់ Telegram</div>
        <div style={{fontSize: 13, color: th.mut, textAlign: 'left', marginTop: 4, lineHeight: 1.6}}>ស្កេន QR code ឬបើកតំណ ដើម្បីភ្ជាប់គណនីរបស់អ្នកទៅកាន់ Telegram bot។</div>
        <div style={{display: 'inline-block', marginTop: 16, padding: 10, borderRadius: 12, border: `1px solid ${th.bd}`, background: '#fff'}}><QRG size={180} seed={9} /></div>
        <div style={{display: 'flex', gap: 10, justifyContent: 'center', marginTop: 16}}>
          <div style={{height: 36, padding: '0 14px', borderRadius: 9, border: `1.5px solid ${th.bd}`, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, fontWeight: 600}}><Icon n="refresh" s={14} />បង្កើត QR ថ្មី</div>
          <div style={{height: 36, padding: '0 14px', borderRadius: 9, background: th.pri, color: th.onPri, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, fontWeight: 600}}><Icon n="send" s={14} c={th.onPri} />បើក Telegram</div>
        </div>
      </div></div>}
  </>);
};
