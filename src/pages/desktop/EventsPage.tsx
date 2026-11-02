import React from 'react';
import {P} from '../../lib/anim';
import {Icon} from '../../ui/Icon';
import {useTh} from '../../theme/ThemeContext';
import {Card} from '../../app/primitives/Card';
import {Field} from '../../app/primitives/Field';
import {Menu} from '../../app/primitives/Menu';
import {PageTitle} from '../../app/primitives/PageTitle';
import {Pill} from '../../app/primitives/Pill';
import {Table} from '../../app/primitives/Table';
import {EV, TYPES} from '../data';
export const EventsPage: React.FC<{t: number; typeOpen: [number, number]; pickType: number; statusOpen: [number, number]; rowHover: number}> = ({t, typeOpen, pickType, statusOpen, rowHover}) => {
  const th = useTh();
  const filtered = t > pickType;
  const rows = EV.filter((e) => !filtered || e[1] === 'កិច្ចប្រជុំ');
  return (<>
    <PageTitle t={t} at={.3} title="ព្រឹត្តិការណ៍" sub="មានព្រឹត្តិការណ៍ 47 ក្នុងមូលដ្ឋានទិន្នន័យ, 3 ជិតមកដល់, 43 បានបិទ។" />
    <Card x={28} y={96} w={1316} h={730} p={P(t, .5, .7)} pad={0}>
      <div style={{fontSize: 15, fontWeight: 700, padding: '16px 18px'}}>បញ្ជីព្រឹត្តិការណ៍</div>
      <Field x={18} y={58} w={380} value="ស្វែងរកព្រឹត្តិការណ៍" icon="search" style={{color: th.mut}} />
      <Field x={410} y={58} w={250} value={filtered ? 'កិច្ចប្រជុំ' : 'គ្រប់ប្រភេទ'} drop focus={t > typeOpen[0] && t < typeOpen[1] ? 1 : 0} />
      <Field x={672} y={58} w={250} value="គ្រប់ស្ថានភាពកាលវិភាគ" drop />
      <Field x={934} y={58} w={250} value="គ្រប់ស្ថានភាព" drop focus={t > statusOpen[0] && t < statusOpen[1] ? 1 : 0} />
      <div style={{position: 'absolute', left: 1196, top: 58, width: 38, height: 38, borderRadius: 9, border: `1.5px solid ${th.bd}`, display: 'grid', placeItems: 'center', color: th.mut}}><Icon n="refresh" s={15} /></div>
      <Table x={0} y={112} w={1316} t={t} at={filtered ? pickType + .05 : .9} rh={54} hi={t > rowHover ? 0 : -1}
        cols={[['ឈ្មោះ', 4.4], ['ប្រភេទ', 1.6], ['កាលបរិច្ឆេទ', 2.6], ['ទីកន្លែង / សាល / បន្ទប់', 2], ['ស្ថានភាពកាលវិភាគ', 1.6], ['អ្នកប្រើសរុប', 1], ['បានចុះវត្តមាន', 1.1], ['ស្ថានភាព', 1.4]]}
        rows={rows.map((e) => [<b style={{fontWeight: 600}}>{e[0]}</b>, <Pill c="pri">{e[1]}</Pill>, e[2], e[3], <Pill c={e[4]}>{e[5]}</Pill>, String(e[6]), String(e[7]), <Pill c="ok">បានផ្សព្វផ្សាយ</Pill>])} />
      <Menu x={410} y={100} w={250} items={TYPES} p={P(t, typeOpen[0], .3) * (1 - P(t, typeOpen[1], .2))} hi={t > pickType - .5 ? 1 : -1} />
      <Menu x={934} y={100} w={250} items={['គ្រប់ស្ថានភាព', 'បានផ្សព្វផ្សាយ', 'រង់ចាំការអនុម័ត', 'បានបដិសេធ', 'បានបោះបង់']} p={P(t, statusOpen[0], .3) * (1 - P(t, statusOpen[1], .2))} />
    </Card>
  </>);
};
