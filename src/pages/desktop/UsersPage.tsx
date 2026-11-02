import React from 'react';
import {P} from '../../lib/anim';
import {Card} from '../../app/primitives/Card';
import {PageTitle} from '../../app/primitives/PageTitle';
import {Pill} from '../../app/primitives/Pill';
import {Table} from '../../app/primitives/Table';
export const UsersPage: React.FC<{t: number}> = ({t}) => (<>
  <PageTitle t={t} at={.2} title="អ្នកប្រើប្រាស់" sub="បានផ្ទុកអ្នកប្រើប្រាស់ 4 នាក់ពីមូលដ្ឋានទិន្នន័យ។" />
  <Card x={28} y={96} w={1316} h={380} p={P(t, .4, .6)} pad={0}>
    <div style={{fontSize: 15, fontWeight: 700, padding: '16px 18px'}}>បញ្ជីអ្នកប្រើប្រាស់</div>
    <Table x={0} y={54} w={1316} t={t} at={.6} rh={64} cols={[['ឈ្មោះពេញ', 2.4], ['អ៊ីមែល', 2.6], ['តំណែង', 2.2], ['ស្ថាប័ន/អង្គភាព', 2], ['តួនាទី', 1.2]]}
      rows={([['Demo Admin', 'admin@ems.demo', 'ប្រធានការិយាល័យ', 'នាយកដ្ឋានរដ្ឋបាល', 'Admin', 'ok'], ['សុខ ចាន់ណា', 'operator@ems.demo', 'មន្ត្រី', 'នាយកដ្ឋានរដ្ឋបាល', 'Operator', 'pri'], ['ចាន់ វិបុល', 'admin2@ems.demo', 'អនុប្រធាន', 'នាយកដ្ឋានផែនការ', 'Admin', 'ok'], ['លី សុភ័ក្រ', 'viewer@ems.demo', 'មន្ត្រី', 'នាយកដ្ឋានរដ្ឋបាល', 'Viewer', 'mut']] as const).map((r) => [<b style={{fontWeight: 600}}>{r[0]}</b>, r[1], r[2], r[3], <Pill c={r[5]}>{r[4]}</Pill>])} />
  </Card>
</>);
