import React from 'react';
import {E, P} from '../../lib/anim';
import {useTh} from '../../theme/ThemeContext';
import {Card} from '../../app/primitives/Card';
import {PageTitle} from '../../app/primitives/PageTitle';
import {Pill} from '../../app/primitives/Pill';
import {Table} from '../../app/primitives/Table';
import {ROLES} from '../data';
export const RolesPage: React.FC<{t: number}> = ({t}) => {
  const th = useTh();
  return (<>
    <PageTitle t={t} at={.1} title="តួនាទី និងសិទ្ធិ" sub="ពិនិត្យការពិពណ៌នាតួនាទី សមាជិកដែលបានកំណត់ និងសិទ្ធិដែលបានផ្ទុកពីមូលដ្ឋានទិន្នន័យ។" />
    <Card x={28} y={96} w={1316} h={330} p={P(t, .3, .6)} pad={0}>
      <div style={{fontSize: 15, fontWeight: 700, padding: '16px 18px'}}>តួនាទីដែលអ្នកប្រើអាចប្រើ</div>
      <Table x={0} y={54} w={1316} t={t} at={.5} rh={78} cols={[['ឈ្មោះតួនាទី', 3.4], ['ស្ថានភាពតួនាទី', 1.2], ['ចំនួនអ្នកប្រើ', 1.2], ['ផ្នែកសិទ្ធិ', 4]]}
        rows={ROLES.map(([n, d, u, ps], i) => [<div><b style={{fontSize: 15}}>{n}</b><div style={{fontSize: 12.5, color: th.mut}}>{d}</div></div>, <Pill c="ok">សកម្ម</Pill>, <Pill c="mut">{u} អ្នកប្រើ</Pill>,
          <span style={{display: 'flex', gap: 6}}>{ps.map((p, j) => <span key={j} style={{fontSize: 12, padding: '4px 9px', borderRadius: 7, border: `1px solid ${th.bd}`, opacity: P(t, 1.4 + i * .2 + j * .1, .4), transform: `scale(${.85 + .15 * P(t, 1.4 + i * .2 + j * .1, .4, E.back)})`}}>{p}</span>)}<span style={{fontSize: 12, padding: '4px 9px', borderRadius: 7, background: th.sec, color: th.secFg}}>+9 more</span></span>])} />
    </Card>
  </>);
};
