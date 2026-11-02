import React from 'react';
import {E, P} from '../../lib/anim';
import {cnt, kh} from '../../lib/format';
import {useTh} from '../../theme/ThemeContext';
import {Card} from '../../app/primitives/Card';
import {Donut} from '../../app/charts/Donut';
import {Field} from '../../app/primitives/Field';
import {Kpi} from '../../app/charts/Kpi';
import {Legend} from '../../app/charts/Legend';
import {PageTitle} from '../../app/primitives/PageTitle';
import {Table} from '../../app/primitives/Table';
import {VEN} from '../data';
export const VenuesPage: React.FC<{t: number}> = ({t}) => {
  const th = useTh();
  return (<>
    <PageTitle t={t} at={.2} title="ទីកន្លែង" sub="ទីកន្លែងអាចប្រើឡើងវិញសម្រាប់ព្រឹត្តិការណ៍ និងកិច្ចប្រជុំ។" />
    <Kpi x={28} y={100} w={320} label="ព្រឹត្តិការណ៍" value={kh(cnt(t, .5, 10))} sub="១០០% ព្រឹត្តិការណ៍" c={th.pri} p={P(t, .4, .6)} seed={1} />
    <Kpi x={360} y={100} w={320} label="កំពុងដំណើរការ" value="០" sub="០% ព្រឹត្តិការណ៍" c={th.ok} p={P(t, .5, .6)} seed={2} />
    <Kpi x={692} y={100} w={320} label="ជិតមកដល់" value={kh(cnt(t, .6, 1))} sub="១០% ព្រឹត្តិការណ៍" c={th.fg} p={P(t, .6, .6)} seed={3} />
    <Kpi x={1024} y={100} w={320} label="បានបិទ" value={kh(cnt(t, .7, 9))} sub="៩០% ព្រឹត្តិការណ៍" c={th.bad} p={P(t, .7, .6)} seed={4} />
    <Card x={28} y={226} w={880} h={360} p={P(t, .9, .6)}>
      <div style={{fontSize: 15, fontWeight: 700}}>ព្រឹត្តិការណ៍តាមទីកន្លែង</div>
      <div style={{position: 'absolute', left: 40, right: 24, top: 60, bottom: 46, display: 'flex', alignItems: 'flex-end', gap: 28, borderBottom: `1px solid ${th.bd}`}}>
        {VEN.map(([n, v], i) => <div key={i} style={{flex: 1, height: `${(v / 4) * 100 * P(t, 1.2 + i * .1, .8, E.back)}%`, borderRadius: '6px 6px 0 0', background: i === 0 ? th.pri : `${th.pri}aa`}} />)}
      </div>
      <div style={{position: 'absolute', left: 40, right: 24, bottom: 14, display: 'flex', gap: 28, fontSize: 11.5, color: th.mut}}>{VEN.map(([n], i) => <div key={i} style={{flex: 1, textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden'}}>{n}</div>)}</div>
    </Card>
    <Card x={920} y={226} w={424} h={360} p={P(t, 1.0, .6)}>
      <div style={{fontSize: 15, fontWeight: 700}}>ការប្រើប្រាស់ទីកន្លែង</div>
      <div style={{position: 'absolute', left: 122, top: 52}}><Donut size={180} p={P(t, 1.4, 1.2, E.inOut)} center={kh(10)} sub="ទីកន្លែង" segs={[{v: 5, c: th.ok}, {v: 5, c: th.warn}]} /></div>
      <div style={{position: 'absolute', left: 18, right: 18, top: 250}}><Legend p={P(t, 1.8, .6)} items={[[th.ok, 'ទីកន្លែងមានព្រឹត្តិការណ៍', '៥ (៥០%)'], [th.warn, 'ទីកន្លែងមិនមានព្រឹត្តិការណ៍', '៥ (៥០%)']]} /></div>
    </Card>
    <Card x={28} y={598} w={1316} h={230} p={P(t, 1.2, .6)} pad={0}>
      <div style={{fontSize: 15, fontWeight: 700, padding: '14px 18px'}}>ទីកន្លែង</div>
      <Field x={18} y={54} w={860} value="ស្វែងរកទីកន្លែង" icon="search" />
      <Table x={0} y={104} w={1316} t={t} at={1.6} rh={40} cols={[['ឈ្មោះ', 3], ['ការពិពណ៌នា', 4], ['ព្រឹត្តិការណ៍', 1], ['អ្នកចូលរួម', 1]]}
        rows={VEN.slice(0, 3).map(([n, v]) => [<b style={{fontWeight: 600}}>{n}</b>, 'សាលប្រជុំ ក្រសួងពាណិជ្ជកម្ម', String(v), String(v * 22)])} />
    </Card>
  </>);
};
