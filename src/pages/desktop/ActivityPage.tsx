import React from 'react';
import {P} from '../../lib/anim';
import {kh} from '../../lib/format';
import {useTh} from '../../theme/ThemeContext';
import {Card} from '../../app/primitives/Card';
import {Field} from '../../app/primitives/Field';
import {Menu} from '../../app/primitives/Menu';
import {PageTitle} from '../../app/primitives/PageTitle';
import {Pill} from '../../app/primitives/Pill';
import {Table} from '../../app/primitives/Table';
export const ActivityPage: React.FC<{t: number; resOpen: [number, number]; actOpen: [number, number]}> = ({t, resOpen, actOpen}) => {
  const th = useTh();
  const L: [string, string, string, string, 'pri' | 'ok' | 'warn'][] = [['Demo Admin login', 'POST /auth/login', 'Demo Admin', 'Auth', 'pri'], ['Demo Admin create events', 'POST /api/v1/events', 'Demo Admin', 'Events', 'ok'], ['Demo Admin update requests', 'PATCH /api/v1/requests/…/approve', 'Demo Admin', 'Requests', 'warn'], ['សុខ ចាន់ណា login', 'POST /auth/login', 'សុខ ចាន់ណា', 'Auth', 'pri'], ['សុខ ចាន់ណា create events', 'POST /api/v1/events', 'សុខ ចាន់ណា', 'Events', 'ok'], ['Demo Admin logout', 'POST /auth/logout', 'Demo Admin', 'Auth', 'pri']];
  return (<>
    <PageTitle t={t} at={.1} title="កំណត់ត្រាសកម្មភាព" sub="តាមដានសកម្មភាពអ្នកប្រើក្នុងអង្គភាពតាមថ្ងៃម៉ោង។" />
    <Card x={28} y={96} w={1316} h={730} p={P(t, .3, .6)} pad={0}>
      <Field x={18} y={18} w={760} value="ស្វែងរកតាមអ្នកប្រើ ឬសកម្មភាព" icon="search" />
      <Field x={790} y={18} w={250} value="ធនធានទាំងអស់" drop focus={t > resOpen[0] && t < resOpen[1] ? 1 : 0} />
      <Field x={1052} y={18} w={250} value="សកម្មភាពទាំងអស់" drop focus={t > actOpen[0] && t < actOpen[1] ? 1 : 0} />
      <Table x={0} y={74} w={1316} t={t} at={.5} rh={62} cols={[['សកម្មភាព', 4], ['អ្នកប្រើ', 1.8], ['ធនធាន', 1.2], ['ថ្ងៃ និងម៉ោង', 2]]}
        rows={L.map((l, i) => [<div><b style={{fontWeight: 600}}>{l[0]}</b><div style={{fontSize: 12, color: th.mut, fontFamily: 'ui-monospace,monospace'}}>{l[1]}</div></div>, l[2], <Pill c={l[4]}>{l[3]}</Pill>, `២ វិច្ឆិកា ២០២៦, ${kh(10 - Math.floor(i / 2))}:${kh(42 - i * 7)} ព្រឹក`])} />
      <Menu x={790} y={60} w={250} items={['ធនធានទាំងអស់', 'Auth', 'Events', 'Requests']} p={P(t, resOpen[0], .3) * (1 - P(t, resOpen[1], .2))} />
      <Menu x={1052} y={60} w={250} items={['សកម្មភាពទាំងអស់', 'ចូលប្រើ', 'ចាកចេញ', 'បង្កើត', 'កែប្រែ', 'លុប']} p={P(t, actOpen[0], .3) * (1 - P(t, actOpen[1], .2))} />
    </Card>
  </>);
};
