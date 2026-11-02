import React from 'react';
import {E, P, pr, tw} from '../../lib/anim';
import {cnt, kh} from '../../lib/format';
import {Icon} from '../../ui/Icon';
import {useTh} from '../../theme/ThemeContext';
import {Area} from '../../app/charts/Area';
import {Att} from '../../app/primitives/Att';
import {Card} from '../../app/primitives/Card';
import {Donut} from '../../app/charts/Donut';
import {Field} from '../../app/primitives/Field';
import {Kpi} from '../../app/charts/Kpi';
import {Legend} from '../../app/charts/Legend';
import {PageTitle} from '../../app/primitives/PageTitle';
import {Pill} from '../../app/primitives/Pill';
import {Table} from '../../app/primitives/Table';
import {TREND} from '../data';
export const DashboardPage: React.FC<{t: number; refreshAt: number; d1: number; d2: number; fbPress: number}> = ({t, refreshAt, d1, d2, fbPress}) => {
  const th = useTh();
  const r = t > refreshAt ? refreshAt + .1 : 1.2; // charts re-animate after filter
  const kp = (i: number) => P(t, 1.0 + i * .12, .7);
  const kv = (i: number, v: number) => kh(t > refreshAt ? cnt(t, refreshAt + .1, v, .8) : cnt(t, 1.1 + i * .12, v));
  return (<>
    <PageTitle t={t} at={.6} title="ទិដ្ឋភាពប្រតិបត្តិការ" sub="សង្ខេបបច្ចុប្បន្នសម្រាប់ព្រឹត្តិការណ៍ ការចុះវត្តមាន ការចុះឈ្មោះ និងវឌ្ឍនភាពវត្តមាន។" />
    <div style={{opacity: P(t, .9, .6)}}>
      <div style={{position: 'absolute', left: 990, top: 24, fontSize: 12.5, fontWeight: 600}}>ថ្ងៃចាប់ផ្តើម</div>
      <div style={{position: 'absolute', left: 1150, top: 24, fontSize: 12.5, fontWeight: 600}}>ថ្ងៃបញ្ចប់</div>
      <Field x={990} y={46} w={150} value={t > d1 ? '01/10/2026' : '27/10/2026'} focus={pr(t, d1) > 0 || (t > d1 - .1 && t < d1 + .6) ? 1 : 0} />
      <Field x={1150} y={46} w={150} value="02/11/2026" focus={t > d2 - .1 && t < d2 + .6 ? 1 : 0} />
      <div style={{position: 'absolute', left: 1306, top: 46, width: 38, height: 38, borderRadius: 9, background: th.pri, display: 'grid', placeItems: 'center', color: th.onPri, transform: `scale(${1 - .1 * fbPress})`}}><Icon n="sliders" s={17} c={th.onPri} /></div>
    </div>
    <Kpi x={28} y={110} w={320} label="ព្រឹត្តិការណ៍សរុប" value={kv(0, 10)} sub="១០០% ព្រឹត្តិការណ៍សរុប" c={th.pri} p={kp(0)} seed={1} />
    <Kpi x={360} y={110} w={320} label="កំពុងដំណើរការ" value={kv(1, 0)} sub="០% ព្រឹត្តិការណ៍សរុប" c={th.ok} p={kp(1)} seed={2} />
    <Kpi x={692} y={110} w={320} label="ជិតមកដល់" value={kv(2, 1)} sub="១០% ព្រឹត្តិការណ៍សរុប" c={th.fg} p={kp(2)} seed={3} />
    <Kpi x={1024} y={110} w={320} label="បានបិទ" value={kv(3, 9)} sub="៩០% ព្រឹត្តិការណ៍សរុប" c={th.bad} p={kp(3)} seed={4} />
    <Card x={28} y={236} w={880} h={330} p={P(t, 1.5, .7)}>
      <div style={{fontSize: 15, fontWeight: 700}}>និន្នាការព្រឹត្តិការណ៍</div>
      <div style={{position: 'absolute', left: 8, top: 52}}><Area id={`dt${th.dark ? 1 : 0}`} w={856} h={262} vals={TREND} max={4} p={P(t, r + .6, 1.6, E.inOut)} labels={['២៧ តុលា', '២៨ តុលា', '២៩ តុលា', '៣០ តុលា', '៣១ តុលា', '១ វិច្ឆិកា', '២ វិច្ឆិកា', '']} /></div>
    </Card>
    <Card x={920} y={236} w={424} h={330} p={P(t, 1.7, .7)}>
      <div style={{fontSize: 15, fontWeight: 700}}>ព្រឹត្តិការណ៍</div>
      <div style={{position: 'absolute', left: 122, top: 46}}><Donut size={180} p={P(t, r + .8, 1.3, E.inOut)} center={kh(10)} sub="ព្រឹត្តិការណ៍សរុប" segs={[{v: 0, c: th.ok}, {v: 1, c: th.warn}, {v: 9, c: th.bad}]} /></div>
      <div style={{position: 'absolute', left: 18, right: 18, top: 236}}><Legend p={P(t, r + 1, .8)} items={[[th.ok, 'កំពុងដំណើរការ', '០ (០%)'], [th.warn, 'ជិតមកដល់', '១ (១០%)'], [th.bad, 'បានបិទ', '៩ (៩០%)']]} /></div>
    </Card>
    <Card x={28} y={578} w={1316} h={250} p={P(t, 2.0, .7)} pad={0}>
      <div style={{fontSize: 15, fontWeight: 700, padding: '14px 18px'}}>តាមដានព្រឹត្តិការណ៍</div>
      <Table x={0} y={50} w={1316} t={t} at={2.4} cols={[['ឈ្មោះ', 5], ['ប្រភេទ', 1.3], ['ទីកន្លែង / សាល / បន្ទប់', 2], ['កាលវិភាគ', 1.4], ['វត្តមាន', 1.6], ['ស្ថានភាព', 1.4]]}
        rows={[
          ['កិច្ចប្រជុំប្រចាំខែ ពិនិត្យវឌ្ឍនភាពការងារ', <Pill c="pri">កិច្ចប្រជុំ</Pill>, 'សាលប្រជុំអង្គរវត្ត', '២ វិច្ឆិកា ២០២៦', <Att v={tw(t, 3, 1.5, 0, 24 / 30)} lab="24/30" />, <Pill c="ok">កំពុងដំណើរការ</Pill>],
          ['សិក្ខាសាលាស្តីពីការកសាងសមត្ថភាពឌីជីថល', <Pill c="pri">សិក្ខាសាលា</Pill>, 'សាលប្រជុំបាយ័ន', '៣ វិច្ឆិកា ២០២៦', <Att v={0} lab="0/45" />, <Pill c="warn">ជិតមកដល់</Pill>],
          ['វគ្គបណ្តុះបណ្តាលការប្រើប្រាស់ប្រព័ន្ធ EMS', <Pill c="pri">វគ្គបណ្តុះបណ្តាល</Pill>, 'បន្ទប់ប្រជុំបឹងមាលា', '៣១ តុលា ២០២៦', <Att v={tw(t, 3.2, 1.5, 0, 1)} lab="20/20" />, <Pill c="bad">បានបិទ</Pill>],
        ]} />
    </Card>
  </>);
};
