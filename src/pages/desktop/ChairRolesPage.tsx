import React from 'react';
import {P} from '../../lib/anim';
import {useTh} from '../../theme/ThemeContext';
import {Card} from '../../app/primitives/Card';
import {PageTitle} from '../../app/primitives/PageTitle';
import {Table} from '../../app/primitives/Table';
export const ChairRolesPage: React.FC<{t: number}> = ({t}) => {
  const th = useTh();
  return (<>
    <PageTitle t={t} at={.1} title="តួនាទីអធិបតី" sub="បញ្ជីតួនាទីដែលអាចប្រើឡើងវិញសម្រាប់កំណត់អធិបតីក្នុងព្រឹត្តិការណ៍។" />
    <Card x={28} y={96} w={1316} h={330} p={P(t, .3, .6)} pad={0}>
      <Table x={0} y={0} w={1316} t={t} at={.5} rh={70} cols={[['តួនាទីអធិបតីជាភាសាខ្មែរ', 1], ['តួនាទីអធិបតីជាភាសាអង់គ្លេស', 1]]}
        rows={[['ប្រធានអង្គប្រជុំ', 'Chaired by'], ['ដឹកនាំដោយ', 'Directed by'], ['ក្រោមអធិបតីភាព', 'Presided by']].map((r) => [<b style={{fontWeight: 700, fontSize: 16}}>{r[0]}</b>, <span style={{color: th.mut, fontSize: 15}}>{r[1]}</span>])} />
    </Card>
  </>);
};
