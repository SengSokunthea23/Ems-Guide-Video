import React from 'react';
import {P, pr} from '../../lib/anim';
import {Icon} from '../../ui/Icon';
import {useTh} from '../../theme/ThemeContext';
import {Card} from '../../app/primitives/Card';
import {Field} from '../../app/primitives/Field';
import {Kpi} from '../../app/charts/Kpi';
import {Menu} from '../../app/primitives/Menu';
import {PageTitle} from '../../app/primitives/PageTitle';
import {Pill} from '../../app/primitives/Pill';
import {Table} from '../../app/primitives/Table';
import {PEOPLE} from '../data';
export const AttendancePage: React.FC<{t: number; evOpen: [number, number]; stOpen: [number, number]; pickSt: number; srcOpen: [number, number]; dlAt: number; newCheck?: number}> = ({t, evOpen, stOpen, pickSt, srcOpen, dlAt, newCheck = 1e9}) => {
  const th = useTh();
  const only = t > pickSt;
  const ppl = PEOPLE.map((p, i) => (i === 2 && t > newCheck ? [p[0], p[1], p[2], p[3], p[4], true] as typeof p : p)).filter((p) => !only || p[5]);
  const att = PEOPLE.filter((p) => p[5]).length + (t > newCheck ? 1 : 0);
  return (<>
    <PageTitle t={t} at={.2} title="វត្តមាន" sub="ពិនិត្យការចុះវត្តមានព្រឹត្តិការណ៍ ពេលស្កេន និងស្ថានភាពអ្នកចូលរួម។" />
    <Kpi x={28} y={96} w={320} label="អ្នកប្រើទាំងអស់" value="30" sub="កិច្ចប្រជុំប្រចាំខែ ពិនិត្យវឌ្ឍនភាព" c={th.pri} p={P(t, .4, .6)} seed={1} />
    <Kpi x={360} y={96} w={320} label="បានចូលរួម" value={String(20 + att)} sub={`${Math.round(((20 + att) / 30) * 100)}%`} c={th.ok} p={P(t, .5, .6)} seed={2} />
    <Kpi x={692} y={96} w={320} label="មិនទាន់ចូលរួម" value={String(10 - att)} sub="គ្រប់ស្ថានភាពទាំងអស់" c={th.warn} p={P(t, .6, .6)} seed={3} />
    <Kpi x={1024} y={96} w={320} label="ព្រឹត្តិការណ៍សរុប" value="២" sub="២ វិច្ឆិកា ២០២៦" c={th.bad} p={P(t, .7, .6)} seed={4} />
    <Card x={28} y={220} w={1316} h={150} p={P(t, .8, .6)}>
      {([['ប្រភេទព្រឹត្តិការណ៍', 'រៀបចំព្រឹត្តិការណ៍គ្រប់ប្រភេទ', 0, 250], ['តម្រងកាលបរិច្ឆេទ', '02/11/2026', 262, 170], ['ព្រឹត្តិការណ៍', 'កិច្ចប្រជុំប្រចាំខែ ពិនិត្យវឌ្ឍនភាព…', 444, 330], ['វេន', 'វេនទាំងអស់', 786, 220], ['ស្វែងរកឈ្មោះខ្មែរ ឬអង់គ្លេស', 'ស្វែងរកឈ្មោះខ្មែរ ឬអង់គ្លេស', 1018, 262]] as [string, string, number, number][]).map(([l, v, x, w], i) =>
        <Field key={i} x={18 + x} y={14} w={w} label={l} value={v} drop={i !== 1 && i !== 4} icon={i === 4 ? 'search' : i === 1 ? 'cal' : undefined} focus={i === 2 && t > evOpen[0] && t < evOpen[1] ? 1 : 0} />)}
      {([['ស្ថាប័ន/អង្គភាព', 'ផ្នែកទាំងអស់'], ['តំណែង', 'តួនាទីទាំងអស់'], ['ភេទ', 'ភេទទាំងអស់'], ['ស្ថានភាពចូលរួម', only ? 'បានចូលរួម' : 'គ្រប់ស្ថានភាពទាំងអស់'], ['ប្រភព', 'ប្រភពទាំងអស់']] as [string, string][]).map(([l, v], i) =>
        <Field key={i} x={18 + i * 258} y={80} w={248} label={l} value={v} drop focus={(i === 3 && t > stOpen[0] && t < stOpen[1]) || (i === 4 && t > srcOpen[0] && t < srcOpen[1]) ? 1 : 0} style={{transform: 'scale(.98)'}} />)}
    </Card>
    <Card x={28} y={382} w={1316} h={446} p={P(t, 1.0, .6)} pad={0}>
      <div style={{display: 'flex', alignItems: 'center', padding: '14px 18px'}}><b style={{fontSize: 15, flex: 1}}>កិច្ចប្រជុំប្រចាំខែ ពិនិត្យវឌ្ឍនភាពការងារ</b><span style={{fontSize: 13, color: th.mut, marginRight: 150}}>{ppl.length} អ្នកប្រើ</span></div>
      <div style={{position: 'absolute', right: 18, top: 8, height: 36, padding: '0 14px', borderRadius: 9, border: `1.5px solid ${t > dlAt ? th.pri : th.bd}`, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, fontWeight: 600, color: t > dlAt ? th.pri : th.fg, transform: `scale(${1 - .06 * pr(t, dlAt)})`}}><Icon n="download" s={15} />ទាញយកវត្តមាន</div>
      <Table x={0} y={52} w={1316} t={t} at={only ? pickSt + .05 : 1.2} rh={50} hi={t > newCheck && t < newCheck + 2.5 ? 2 : -1}
        cols={[['អ្នកប្រើ', 2.2], ['ស្ថាប័ន/អង្គភាព', 2.2], ['តំណែង', 1.4], ['ភេទ', .8], ['ប្រភេទ', 1.2], ['ប្រភព', 1.8], ['បានចូលរួម', 1.6], ['សកម្មភាព', 1]]}
        rows={ppl.map((p) => [<span style={{display: 'flex', alignItems: 'center', gap: 10}}><span style={{width: 30, height: 30, borderRadius: 15, background: th.sec, color: th.secFg, display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 700}}>{p[0].slice(0, 1)}</span><b style={{fontWeight: 600}}>{p[0]}</b></span>, p[1], p[2], p[3], <Pill c="pri">កិច្ចប្រជុំ</Pill>, p[4],
          p[5] ? <Pill c="ok">1/1 បានចូលរួម</Pill> : <Pill c="warn">មិនទាន់ចូលរួម</Pill>, <span style={{display: 'flex', gap: 6, color: th.mut}}><Icon n="file" s={16} /><Icon n="qr" s={16} /></span>])} />
    </Card>
    <Menu x={490} y={290} w={330} items={['កិច្ចប្រជុំប្រចាំខែ ពិនិត្យវឌ្ឍនភាពការងារ', 'សិក្ខាសាលាស្តីពីការកសាងសមត្ថភាពឌីជីថល']} p={P(t, evOpen[0], .3) * (1 - P(t, evOpen[1], .2))} hi={0} />
    <Menu x={820} y={356} w={248} items={['គ្រប់ស្ថានភាពទាំងអស់', 'បានចូលរួម', 'មិនទាន់ចូលរួម']} p={P(t, stOpen[0], .3) * (1 - P(t, stOpen[1], .2))} hi={t > pickSt - .5 ? 1 : -1} />
    <Menu x={1078} y={356} w={248} items={['ប្រភពទាំងអស់', 'មន្ត្រីផ្ទៃក្នុង', 'អ្នកចូលរួមខាងក្រៅ']} p={P(t, srcOpen[0], .3) * (1 - P(t, srcOpen[1], .2))} />
  </>);
};
