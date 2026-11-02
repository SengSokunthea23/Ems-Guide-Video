import React from 'react';
import {P} from '../../lib/anim';
import {Card} from '../../app/primitives/Card';
import {Field} from '../../app/primitives/Field';
import {PageTitle} from '../../app/primitives/PageTitle';
import {Table} from '../../app/primitives/Table';
export const ChairsPage: React.FC<{t: number}> = ({t}) => (<>
  <PageTitle t={t} at={.1} title="អធិបតី" sub="អធិបតីអាចប្រើឡើងវិញសម្រាប់រៀបចំកិច្ចប្រជុំ។" />
  <Card x={28} y={96} w={1316} h={730} p={P(t, .3, .6)} pad={0}>
    <Field x={18} y={18} w={500} value="ស្វែងរកអធិបតី" icon="search" />
    <Field x={530} y={18} w={260} value="តួនាទីទាំងអស់" drop />
    <Field x={802} y={18} w={300} value="អង្គភាព/ស្ថាប័នទាំងអស់" drop />
    <Table x={0} y={74} w={1316} t={t} at={.5} rh={60} cols={[['ឈ្មោះ', 3], ['តំណែង', 3], ['ស្ថាប័ន/អង្គភាព', 3]]}
      rows={[['ឯកឧត្តម ប្រធាននាយកដ្ឋាន', 'ប្រធាននាយកដ្ឋាន', 'នាយកដ្ឋានរដ្ឋបាល'], ['លោកជំទាវ អនុប្រធាន', 'អនុប្រធាននាយកដ្ឋាន', 'នាយកដ្ឋានផែនការ'], ['ឯកឧត្តម អគ្គនាយក', 'អគ្គនាយក', 'អគ្គនាយកដ្ឋាន'], ['លោក ប្រធានការិយាល័យ', 'ប្រធានការិយាល័យ', 'នាយកដ្ឋានរដ្ឋបាល']].map((r) => [<b style={{fontWeight: 600}}>{r[0]}</b>, r[1], r[2]])} />
  </Card>
</>);
