import React from 'react';
import {E, P} from '../../lib/anim';
import {kh} from '../../lib/format';
import {Icon} from '../../ui/Icon';
import {useTh} from '../../theme/ThemeContext';
import {Area} from '../../app/charts/Area';
import {Card} from '../../app/primitives/Card';
import {Donut} from '../../app/charts/Donut';
import {Field} from '../../app/primitives/Field';
import {Legend} from '../../app/charts/Legend';
import {Menu} from '../../app/primitives/Menu';
import {PageTitle} from '../../app/primitives/PageTitle';
import {Pill} from '../../app/primitives/Pill';
import {Table} from '../../app/primitives/Table';
export const RequestsPage: React.FC<{t: number; typeOpen: [number, number]; approveAt: number}> = ({t, typeOpen, approveAt}) => {
  const th = useTh(); const ok = t > approveAt;
  return (<>
    <PageTitle t={t} at={.1} title="សំណើ" sub="ពិនិត្យសំណើដែលបានស្នើសុំ។" />
    <Field x={990} y={46} w={150} value="27/10/2026" /><Field x={1150} y={46} w={150} value="02/11/2026" />
    <div style={{position: 'absolute', left: 1306, top: 46, width: 38, height: 38, borderRadius: 9, background: th.pri, display: 'grid', placeItems: 'center'}}><Icon n="sliders" s={17} c={th.onPri} /></div>
    <Card x={28} y={100} w={880} h={300} p={P(t, .3, .6)}>
      <div style={{fontSize: 15, fontWeight: 700}}>និន្នាការសំណើ</div>
      <div style={{position: 'absolute', left: 8, top: 48}}><Area id="rq" w={856} h={236} vals={[0, 2, 0, 1, 3, 0, 1]} max={4} p={P(t, .6, 1.5, E.inOut)} labels={['២៧ តុលា', '២៨ តុលា', '២៩ តុលា', '៣០ តុលា', '៣១ តុលា', '១ វិច្ឆិកា', '២ វិច្ឆិកា']} /></div>
    </Card>
    <Card x={920} y={100} w={424} h={300} p={P(t, .4, .6)}>
      <div style={{fontSize: 15, fontWeight: 700}}>ស្ថានភាពសំណើ</div>
      <div style={{position: 'absolute', left: 132, top: 42}}><Donut size={160} p={P(t, .8, 1.2, E.inOut)} center={kh(7)} sub="សំណើ" segs={[{v: ok ? 0 : 1, c: th.warn}, {v: ok ? 7 : 6, c: th.ok}, {v: 0, c: th.bad}]} /></div>
      <div style={{position: 'absolute', left: 18, right: 18, top: 206}}><Legend items={[[th.warn, 'កំពុងរង់ចាំ', ok ? '០ (០%)' : '១ (១៤%)'], [th.ok, 'បានអនុម័ត', ok ? '៧ (១០០%)' : '៦ (៨៦%)'], [th.bad, 'បានបដិសេធ', '០ (០%)']]} /></div>
    </Card>
    <Card x={28} y={412} w={1316} h={416} p={P(t, .5, .6)} pad={0}>
      <div style={{display: 'flex', alignItems: 'center', padding: '14px 18px'}}><b style={{fontSize: 15, flex: 1}}>សំណើ</b><Pill c="warn">សំណើ 7</Pill></div>
      <Field x={18} y={54} w={480} value="ស្វែងរកសំណើ ឬស្ថាប័ន" icon="search" />
      <Field x={510} y={54} w={380} value="គ្រប់ស្ថានភាព" drop />
      <Field x={902} y={54} w={380} value="ប្រភេទសំណើទាំងអស់" drop focus={t > typeOpen[0] && t < typeOpen[1] ? 1 : 0} />
      <Table x={0} y={104} w={1316} t={t} at={.8} rh={48} hi={t > approveAt - .6 && t < approveAt + 2 ? 0 : -1} cols={[['ប្រភេទ', 1.8], ['ស្ថាប័ន/អង្គភាព', 1.8], ['បានស្នើដោយ', 1.4], ['បានអនុម័តដោយ', 1.4], ['បានស្នើ', 2.2], ['ស្ថានភាព', 1.3]]}
        rows={[
          [<Pill c="pri">សំណើកក់ទីកន្លែង</Pill>, 'នាយកដ្ឋានរដ្ឋបាល', 'សុខ ចាន់ណា', ok ? 'Demo Admin' : '—', '២ វិច្ឆិកា ២០២៦, ១១:៥៧ ព្រឹក', ok ? <Pill c="ok" style={{transform: `scale(${.9 + .1 * P(t, approveAt, .4, E.back)})`}}>បានអនុម័ត</Pill> : <Pill c="warn">កំពុងរង់ចាំ</Pill>],
          [<Pill c="pri">សំណើកក់ទីកន្លែង</Pill>, 'នាយកដ្ឋានរដ្ឋបាល', 'ចាន់ វិបុល', 'Demo Admin', '១ វិច្ឆិកា ២០២៦, ០៩:១២ ព្រឹក', <Pill c="ok">បានអនុម័ត</Pill>],
          [<Pill c="pri">សំណើចូលប្រើអង្គភាព</Pill>, 'នាយកដ្ឋានផែនការ', 'លី សុភ័ក្រ', 'Demo Admin', '៣១ តុលា ២០២៦, ០៤:២០ រសៀល', <Pill c="ok">បានអនុម័ត</Pill>],
          [<Pill c="pri">សំណើកក់ទីកន្លែង</Pill>, 'នាយកដ្ឋានរដ្ឋបាល', 'សុខ ចាន់ណា', 'Demo Admin', '៣០ តុលា ២០២៦, ០២:១០ រសៀល', <Pill c="ok">បានអនុម័ត</Pill>]]} />
      <Menu x={902} y={96} w={380} items={['ប្រភេទសំណើទាំងអស់', 'សំណើចូលប្រើអង្គភាព', 'សំណើកក់ទីកន្លែង']} p={P(t, typeOpen[0], .3) * (1 - P(t, typeOpen[1], .2))} />
    </Card>
  </>);
};
