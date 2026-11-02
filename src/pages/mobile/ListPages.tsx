import React from 'react';
import {E, P, pr} from '../../lib/anim';
import {cnt, kh} from '../../lib/format';
import {Donut} from '../../app/charts/Donut';
import {Legend} from '../../app/charts/Legend';
import {Pill} from '../../app/primitives/Pill';
import {Avatar, BottomSheet, Grid2, MBtn, MCard, MField, MH2, MKpi, MRow, MTitle, Scroll, sc} from '../../app/mobile/mobile';
import {useTh} from '../../theme/ThemeContext';
import {Icon} from '../../ui/Icon';
import {PEOPLE, ROLES, VEN} from '../data';

/* =============================== VENUES / CHAIRS =============================== */
export const MVenuesPage: React.FC<{t: number}> = ({t}) => {
  const th = useTh();
  const y = sc(t, [[2.4, 0], [3.2, 360, 1.0]]);
  return (<Scroll y={y}>
    <MTitle t={t} at={.2} title="ទីកន្លែង" sub="ទីកន្លែងអាចប្រើឡើងវិញសម្រាប់ព្រឹត្តិការណ៍ និងកិច្ចប្រជុំ។" />
    <Grid2>
      <MKpi label="ព្រឹត្តិការណ៍" value={kh(cnt(t, .5, 10))} sub="១០០% ព្រឹត្តិការណ៍" c={th.pri} p={P(t, .4, .6)} seed={1} />
      <MKpi label="កំពុងដំណើរការ" value="០" sub="០% ព្រឹត្តិការណ៍" c={th.ok} p={P(t, .5, .6)} seed={2} />
      <MKpi label="ជិតមកដល់" value={kh(cnt(t, .6, 1))} sub="១០% ព្រឹត្តិការណ៍" c={th.fg} p={P(t, .6, .6)} seed={3} />
      <MKpi label="បានបិទ" value={kh(cnt(t, .7, 9))} sub="៩០% ព្រឹត្តិការណ៍" c={th.bad} p={P(t, .7, .6)} seed={4} />
    </Grid2>
    <MCard p={P(t, .9, .6)}>
      <MH2>ព្រឹត្តិការណ៍តាមទីកន្លែង</MH2>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 12, height: 170, borderBottom: `1px solid ${th.bd}`}}>
        {VEN.map(([, v], i) => <div key={i} style={{flex: 1, height: `${(v / 4) * 100 * P(t, 1.2 + i * .1, .8, E.back)}%`, borderRadius: '5px 5px 0 0', background: i === 0 ? th.pri : `${th.pri}aa`}} />)}
      </div>
      <div style={{display: 'flex', gap: 12, marginTop: 6}}>{VEN.map(([n], i) => <div key={i} style={{flex: 1, fontSize: 9.5, color: th.mut, textAlign: 'center', lineHeight: 1.4, overflow: 'hidden', height: 28}}>{n.replace('សាលប្រជុំ', '').replace('បន្ទប់ប្រជុំ', '')}</div>)}</div>
    </MCard>
    <MCard p={P(t, 1.0, .6)}>
      <MH2>ការប្រើប្រាស់ទីកន្លែង</MH2>
      <div style={{display: 'flex', justifyContent: 'center'}}><Donut size={160} p={P(t, 1.4, 1.2, E.inOut)} center={kh(10)} sub="ទីកន្លែង" segs={[{v: 5, c: th.ok}, {v: 5, c: th.warn}]} /></div>
      <Legend p={P(t, 1.8, .6)} items={[[th.ok, 'ទីកន្លែងមានព្រឹត្តិការណ៍', '៥ (៥០%)'], [th.warn, 'ទីកន្លែងមិនមានព្រឹត្តិការណ៍', '៥ (៥០%)']]} />
    </MCard>
    <MH2>ទីកន្លែង</MH2>
    {VEN.map(([n, v], i) => <MRow key={i} t={t} at={1.6} i={i} lead={<Icon n="pin" s={18} c={th.pri} />} title={n} sub="សាលប្រជុំ ក្រសួងពាណិជ្ជកម្ម" right={<Pill c="mut">{v} ព្រឹត្តិការណ៍</Pill>} />)}
  </Scroll>);
};
export const MChairsPage: React.FC<{t: number}> = ({t}) => (
  <Scroll y={0}>
    <MTitle t={t} at={.1} title="អធិបតី" sub="អធិបតីអាចប្រើឡើងវិញសម្រាប់រៀបចំកិច្ចប្រជុំ។" />
    <MField value="ស្វែងរកអធិបតី" icon="search" style={{marginBottom: 8}} />
    <Grid2 gap={8}><MField value="តួនាទីទាំងអស់" drop /><MField value="អង្គភាពទាំងអស់" drop /></Grid2>
    {[['ឯកឧត្តម ប្រធាននាយកដ្ឋាន', 'ប្រធាននាយកដ្ឋាន', 'នាយកដ្ឋានរដ្ឋបាល'], ['លោកជំទាវ អនុប្រធាន', 'អនុប្រធាននាយកដ្ឋាន', 'នាយកដ្ឋានផែនការ'], ['ឯកឧត្តម អគ្គនាយក', 'អគ្គនាយក', 'អគ្គនាយកដ្ឋាន'], ['លោក ប្រធានការិយាល័យ', 'ប្រធានការិយាល័យ', 'នាយកដ្ឋានរដ្ឋបាល']].map((r, i) =>
      <MRow key={i} t={t} at={.5} i={i} lead={<Avatar name={r[0].replace(/^(ឯកឧត្តម|លោកជំទាវ|លោក) /, '')} />} title={r[0]} sub={`${r[1]} · ${r[2]}`} />)}
  </Scroll>);
export const MChairRolesPage: React.FC<{t: number}> = ({t}) => {
  const th = useTh();
  return (<Scroll y={0}>
    <MTitle t={t} at={.1} title="តួនាទីអធិបតី" sub="បញ្ជីតួនាទីសម្រាប់កំណត់អធិបតីក្នុងព្រឹត្តិការណ៍។" />
    {[['ប្រធានអង្គប្រជុំ', 'Chaired by'], ['ដឹកនាំដោយ', 'Directed by'], ['ក្រោមអធិបតីភាព', 'Presided by']].map((r, i) =>
      <MRow key={i} t={t} at={.5} i={i} title={<span style={{fontSize: 16, fontWeight: 700}}>{r[0]}</span>} sub={<span style={{color: th.mut, fontSize: 13}}>{r[1]}</span>} style={{padding: '16px 14px'}} />)}
  </Scroll>);
};

/* =============================== DOCUMENTS =============================== */
export const MDocsPage: React.FC<{t: number; dlAt: number}> = ({t, dlAt}) => {
  const th = useTh();
  return (<Scroll y={0}>
    <MTitle t={t} at={.2} title="បញ្ជីឯកសារ" sub="ឯកសារ Excel សម្រាប់អ្នកចូលរួមព្រឹត្តិការណ៍ និងកិច្ចប្រជុំ។" />
    <MCard p={P(t, .4, .6)}>
      <MH2>គំរូ Excel</MH2>
      <div style={{padding: 12, borderRadius: 12, border: `1px solid ${th.bd}`}}>
        <div style={{display: 'flex', gap: 10}}><div style={{width: 38, height: 38, borderRadius: 10, background: th.sec, color: th.pri, display: 'grid', placeItems: 'center', flex: 'none'}}><Icon n="file" s={19} /></div>
          <div><div style={{fontSize: 14, fontWeight: 700}}>អ្នកចូលរួមព្រឹត្តិការណ៍</div><div style={{fontSize: 12, color: th.mut, lineHeight: 1.6}}>ឈ្មោះជាអង់គ្លេស ឈ្មោះជាខ្មែរ ភេទ តួនាទី អង្គភាព និងលេខទូរស័ព្ទ។</div></div></div>
        <MBtn icon="download" press={pr(t, dlAt)} done={t > dlAt} style={{marginTop: 12}}>គំរូបញ្ជីអ្នកចូលរួម</MBtn>
      </div>
    </MCard>
    <Grid2>
      <MCard p={P(t, .6, .6)} style={{marginBottom: 0}}><div style={{fontSize: 12, color: th.mut}}>ឯកសារព្រឹត្តិការណ៍</div><div style={{fontSize: 26, fontWeight: 700}}>0</div></MCard>
      <MCard p={P(t, .7, .6)} style={{marginBottom: 0}}><div style={{fontSize: 12, color: th.mut}}>អ្នកចូលរួម</div><div style={{fontSize: 26, fontWeight: 700}}>0</div></MCard>
    </Grid2>
    <MCard p={P(t, .5, .6)} style={{textAlign: 'center', padding: '24px 16px'}}>
      <div style={{display: 'inline-grid', placeItems: 'center', width: 52, height: 52, borderRadius: 14, background: th.sec, color: th.pri}}><Icon n="inbox" s={24} /></div>
      <div style={{fontSize: 14.5, fontWeight: 700, marginTop: 10}}>មិនទាន់មានឯកសារ Excel</div>
      <div style={{fontSize: 12, color: th.mut, marginTop: 4, lineHeight: 1.7}}>បញ្ចូលឯកសារ ហើយវានឹងបង្ហាញក្នុង wizard បង្កើតដែលត្រូវគ្នា។</div>
    </MCard>
  </Scroll>);
};

/* =============================== ATTENDANCE =============================== */
export const MAttendancePage: React.FC<{t: number; evOpen: [number, number]; stOpen: [number, number]; pickSt: number; srcOpen: [number, number]; dlAt: number; newCheck?: number}> = ({t, evOpen, stOpen, pickSt, srcOpen, dlAt, newCheck = 1e9}) => {
  const th = useTh();
  const only = t > pickSt;
  const ppl = PEOPLE.map((p, i) => (i === 2 && t > newCheck ? [p[0], p[1], p[2], p[3], p[4], true] as typeof p : p)).filter((p) => !only || p[5]);
  const att = PEOPLE.filter((p) => p[5]).length + (t > newCheck ? 1 : 0);
  return (<>
    <Scroll y={0}>
      <MTitle t={t} at={.2} title="វត្តមាន" sub="ពិនិត្យការចុះវត្តមាន ពេលស្កេន និងស្ថានភាពអ្នកចូលរួម។" />
      <Grid2>
        <MKpi label="អ្នកប្រើទាំងអស់" value="30" sub="កិច្ចប្រជុំប្រចាំខែ" c={th.pri} p={P(t, .4, .6)} seed={1} />
        <MKpi label="បានចូលរួម" value={String(20 + att)} sub={`${Math.round(((20 + att) / 30) * 100)}%`} c={th.ok} p={P(t, .5, .6)} seed={2} />
      </Grid2>
      <MCard p={P(t, .8, .6)} pad={12}>
        <MField label="ព្រឹត្តិការណ៍" value="កិច្ចប្រជុំប្រចាំខែ ពិនិត្យវឌ្ឍនភាព…" drop focus={t > evOpen[0] && t < evOpen[1] ? 1 : 0} style={{marginBottom: 8}} />
        <Grid2 gap={8} style={{marginBottom: 0}}>
          <MField label="ស្ថានភាពចូលរួម" value={only ? 'បានចូលរួម' : 'ទាំងអស់'} drop focus={t > stOpen[0] && t < stOpen[1] ? 1 : 0} />
          <MField label="ប្រភព" value="ប្រភពទាំងអស់" drop focus={t > srcOpen[0] && t < srcOpen[1] ? 1 : 0} />
        </Grid2>
      </MCard>
      <div style={{display: 'flex', alignItems: 'center', marginBottom: 8}}><b style={{fontSize: 14, flex: 1}}>{ppl.length} អ្នកប្រើ</b><MBtn icon="download" press={pr(t, dlAt)} done={t > dlAt} style={{height: 34}}>ទាញយកវត្តមាន</MBtn></div>
      {ppl.map((p, i) => <MRow key={p[0]} t={t} at={only ? pickSt + .05 : 1.2} i={i} hi={t > newCheck && t < newCheck + 2.5 && p[0] === 'លី សុភ័ក្រ'} lead={<Avatar name={p[0]} />} title={p[0]} sub={`${p[1]} · ${p[4]}`}
        right={p[5] ? <Pill c="ok">1/1</Pill> : <Pill c="warn">មិនទាន់</Pill>} />)}
    </Scroll>
    <BottomSheet title="ព្រឹត្តិការណ៍" items={['កិច្ចប្រជុំប្រចាំខែ ពិនិត្យវឌ្ឍនភាពការងារ', 'សិក្ខាសាលាស្តីពីការកសាងសមត្ថភាពឌីជីថល']} open={evOpen} t={t} hi={0} />
    <BottomSheet title="ស្ថានភាពចូលរួម" items={['គ្រប់ស្ថានភាពទាំងអស់', 'បានចូលរួម', 'មិនទាន់ចូលរួម']} open={stOpen} t={t} hi={t > pickSt - .5 ? 1 : -1} />
    <BottomSheet title="ប្រភព" items={['ប្រភពទាំងអស់', 'មន្ត្រីផ្ទៃក្នុង', 'អ្នកចូលរួមខាងក្រៅ']} open={srcOpen} t={t} />
  </>);
};

/* =============================== USERS / ROLES =============================== */
export const MUsersPage: React.FC<{t: number}> = ({t}) => (
  <Scroll y={0}>
    <MTitle t={t} at={.2} title="អ្នកប្រើប្រាស់" sub="បានផ្ទុកអ្នកប្រើប្រាស់ 4 នាក់ពីមូលដ្ឋានទិន្នន័យ។" />
    {([['Demo Admin', 'admin@ems.demo', 'នាយកដ្ឋានរដ្ឋបាល', 'Admin', 'ok'], ['សុខ ចាន់ណា', 'operator@ems.demo', 'នាយកដ្ឋានរដ្ឋបាល', 'Operator', 'pri'], ['ចាន់ វិបុល', 'admin2@ems.demo', 'នាយកដ្ឋានផែនការ', 'Admin', 'ok'], ['លី សុភ័ក្រ', 'viewer@ems.demo', 'នាយកដ្ឋានរដ្ឋបាល', 'Viewer', 'mut']] as const).map((r, i) =>
      <MRow key={i} t={t} at={.6} i={i} lead={<Avatar name={r[0]} />} title={r[0]} sub={<>{r[1]}<br />{r[2]}</>} right={<Pill c={r[4]}>{r[3]}</Pill>} style={{padding: '14px 12px'}} />)}
  </Scroll>);
export const MRolesPage: React.FC<{t: number}> = ({t}) => {
  const th = useTh();
  return (<Scroll y={0}>
    <MTitle t={t} at={.1} title="តួនាទី និងសិទ្ធិ" sub="ពិនិត្យការពិពណ៌នាតួនាទី សមាជិក និងសិទ្ធិ។" />
    {ROLES.map(([n, d, u, ps], i) => (
      <MCard key={i} p={P(t, .5 + i * .12, .6)}>
        <div style={{display: 'flex', alignItems: 'center', gap: 8}}><b style={{fontSize: 15, flex: 1}}>{n}</b><Pill c="ok">សកម្ម</Pill><Pill c="mut">{u} អ្នកប្រើ</Pill></div>
        <div style={{fontSize: 12, color: th.mut, margin: '4px 0 10px'}}>{d}</div>
        <div style={{display: 'flex', gap: 6, flexWrap: 'wrap'}}>{ps.map((p, j) => <span key={j} style={{fontSize: 11.5, padding: '4px 9px', borderRadius: 7, border: `1px solid ${th.bd}`, opacity: P(t, 1.4 + i * .2 + j * .1, .4), transform: `scale(${.85 + .15 * P(t, 1.4 + i * .2 + j * .1, .4, E.back)})`}}>{p}</span>)}
          <span style={{fontSize: 11.5, padding: '4px 9px', borderRadius: 7, background: th.sec, color: th.secFg}}>+9 more</span></div>
      </MCard>))}
  </Scroll>);
};
