import React from 'react';
import {P, pr} from '../../lib/anim';
import {cnt} from '../../lib/format';
import {Icon} from '../../ui/Icon';
import {QRG} from '../../ui/QRCode';
import {useTh} from '../../theme/ThemeContext';
import {Btn} from '../../app/primitives/Btn';
import {Card} from '../../app/primitives/Card';
import {Field} from '../../app/primitives/Field';
import {Kpi} from '../../app/charts/Kpi';
import {PageTitle} from '../../app/primitives/PageTitle';
import {Pill} from '../../app/primitives/Pill';
import {Table} from '../../app/primitives/Table';
export const EventDetailPage: React.FC<{t: number; copyAt: number}> = ({t, copyAt}) => {
  const th = useTh();
  return (<>
    <PageTitle t={t} at={.1} title="កិច្ចប្រជុំប្រចាំខែ ពិនិត្យវឌ្ឍនភាពការងារ" sub="ចុះឈ្មោះជាបញ្ជី ព្រឹត្តិការណ៍, ២ វិច្ឆិកា ២០២៦, ០៨:០០ ព្រឹក - ១២:០០ រសៀល" />
    <Btn x={1216} y={28} icon="back">ត្រឡប់ក្រោយ</Btn>
    <div style={{position: 'absolute', left: 28, top: 92, display: 'flex', gap: 8, opacity: P(t, .4, .5)}}><Pill c="pri">QR តែមួយ</Pill><Pill c="ok">បានផ្សព្វផ្សាយ</Pill><Pill c="ok">កំពុងដំណើរការ</Pill><Pill c="warn">មិនត្រូវការទីតាំង</Pill></div>
    <Kpi x={28} y={130} w={320} label="អ្នកប្រើទាំងអស់" value={String(cnt(t, .6, 30))} sub="៦ មិនទាន់ចូលរួម" c={th.pri} p={P(t, .5, .6)} seed={2} />
    <Kpi x={360} y={130} w={320} label="បានចូលរួម" value={String(cnt(t, .7, 24))} sub="គ្របដណ្តប់ ៨០%" c="#0f766e" p={P(t, .6, .6)} seed={3} />
    <Kpi x={692} y={130} w={320} label="ចូលរួមគ្រប់វេន" value={String(cnt(t, .8, 24))} sub="បានចូលរួមគ្រប់វេន ២៤" c="#7c3aed" p={P(t, .7, .6)} seed={4} />
    <Kpi x={1024} y={130} w={320} label="ចុះវត្តមានសរុប" value={String(cnt(t, .9, 24))} sub="គិតតាមវេនទាំងអស់" c="#e11d48" p={P(t, .8, .6)} seed={5} />
    <Card x={28} y={256} w={640} h={300} p={P(t, 1.0, .6)}>
      <div style={{fontSize: 15, fontWeight: 700}}>ព័ត៌មានព្រឹត្តិការណ៍</div>
      {[['ការពិពណ៌នា', 'កិច្ចប្រជុំប្រចាំខែ ពិនិត្យវឌ្ឍនភាពការងាររបស់នាយកដ្ឋាន'], ['ទីកន្លែង', 'សាលប្រជុំអង្គរវត្ត'], ['ក្រោមអធិបតីភាព', 'ឯកឧត្តម ប្រធាននាយកដ្ឋាន'], ['កាលវិភាគ', '២ វិច្ឆិកា ២០២៦, ០៨:០០ ព្រឹក - ១២:០០ រសៀល']].map(([k, v], i) =>
        <div key={i} style={{marginTop: 14, opacity: P(t, 1.2 + i * .12, .5)}}><div style={{fontSize: 12.5, color: th.mut}}>{k}</div><div style={{fontSize: 14.5, fontWeight: 600}}>{v}</div></div>)}
    </Card>
    <Card x={680} y={256} w={320} h={300} p={P(t, 1.15, .6)} style={{textAlign: 'center'}}>
      <div style={{fontSize: 15, fontWeight: 700, textAlign: 'left'}}>QR ព្រឹត្តិការណ៍</div>
      <div style={{display: 'inline-block', marginTop: 10, padding: 8, borderRadius: 10, border: `1px solid ${th.bd}`, background: '#fff'}}><QRG size={150} /></div>
      <div style={{fontSize: 11.5, color: th.mut, marginTop: 6, fontFamily: 'ui-monospace,monospace'}}>Ev7Qm2xK9pLs4TnB8wRc</div>
      <div style={{position: 'absolute', left: 82, bottom: 14, height: 34, padding: '0 14px', borderRadius: 9, border: `1.5px solid ${t > copyAt ? th.ok : th.bd}`, color: t > copyAt ? th.ok : th.fg, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, fontWeight: 600, transform: `scale(${1 - .06 * pr(t, copyAt)})`}}><Icon n={t > copyAt ? 'check' : 'copy'} s={14} />ចម្លង URL</div>
    </Card>
    <Card x={1012} y={256} w={332} h={300} p={P(t, 1.3, .6)}>
      <div style={{fontSize: 15, fontWeight: 700}}>ប្រវត្តិសំណើ</div>
      <div style={{fontSize: 12.5, color: th.mut, marginTop: 4, lineHeight: 1.6}}>រាល់សំណើទីតាំង ការពិនិត្យ ការបដិសេធ និងការដាក់ស្នើម្ដងទៀត ត្រូវបានរក្សាទុក</div>
      {[['បានស្នើ', '១ វិច្ឆិកា ២០២៦, ០៩:១២ ព្រឹក', th.pri], ['បានអនុម័ត', '១ វិច្ឆិកា ២០២៦, ១០:០៤ ព្រឹក', th.ok]].map(([a, b, c], i) => { const q = P(t, 6.2 + i * .6, .6); return (
        <div key={i} style={{display: 'flex', gap: 12, marginTop: 16, opacity: q, transform: `translateX(${(1 - q) * 16}px)`}}>
          <div style={{width: 26, height: 26, borderRadius: 13, background: c as string, display: 'grid', placeItems: 'center', flex: 'none'}}><Icon n={i ? 'check' : 'send'} s={13} c="#fff" sw={2.6} /></div>
          <div><div style={{fontSize: 14, fontWeight: 700}}>{a}</div><div style={{fontSize: 12.5, color: th.mut}}>{b}</div></div></div>); })}
    </Card>
    <Card x={28} y={568} w={1316} h={260} p={P(t, 1.5, .6)} pad={0}>
      <div style={{display: 'flex', alignItems: 'center', padding: '14px 18px', gap: 10}}><b style={{fontSize: 15}}>អ្នកប្រើទាំងអស់ក្នុងព្រឹត្តិការណ៍នេះ</b><Pill c="mut">30 អ្នកប្រើ</Pill></div>
      <Btn x={1196} y={10} icon="download">ទាញយក</Btn>
      {['ផ្នែកទាំងអស់', 'តួនាទីទាំងអស់', 'ភេទទាំងអស់', 'វេនទាំងអស់', 'គ្រប់ស្ថានភាពទាំងអស់', 'ប្រភពទាំងអស់'].map((v, i) => <Field key={i} x={18 + i * 214} y={60} w={204} value={v} drop />)}
      <Table x={0} y={112} w={1316} t={t} at={1.8} rh={44} cols={[['អ្នកប្រើ', 2.4], ['ស្ថាប័ន/អង្គភាព', 2], ['តំណែង', 2], ['ភេទ', .8], ['វេន', 1.2], ['បានចូលរួម', 1.4]]}
        rows={[['សុខ ចាន់ណា', 'នាយកដ្ឋានរដ្ឋបាល', 'មន្ត្រី', 'ស្រី', 'ព្រឹក', <Pill c="ok">1/1 បានចូលរួម</Pill>], ['ចាន់ វិបុល', 'នាយកដ្ឋានផែនការ', 'អនុប្រធាន', 'ប្រុស', 'ព្រឹក', <Pill c="ok">1/1 បានចូលរួម</Pill>], ['លី សុភ័ក្រ', 'នាយកដ្ឋានរដ្ឋបាល', 'មន្ត្រី', 'ស្រី', 'ព្រឹក', <Pill c="warn">មិនទាន់ចូលរួម</Pill>]]} />
    </Card>
  </>);
};
