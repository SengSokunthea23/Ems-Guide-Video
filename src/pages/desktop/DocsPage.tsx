import React from 'react';
import {P, pr} from '../../lib/anim';
import {Icon} from '../../ui/Icon';
import {useTh} from '../../theme/ThemeContext';
import {Btn} from '../../app/primitives/Btn';
import {Card} from '../../app/primitives/Card';
import {Field} from '../../app/primitives/Field';
import {PageTitle} from '../../app/primitives/PageTitle';
export const DocsPage: React.FC<{t: number; dlAt: number}> = ({t, dlAt}) => {
  const th = useTh();
  return (<>
    <PageTitle t={t} at={.2} title="បញ្ជីឯកសារ" sub="បញ្ចូលឯកសារ Excel ដែលអាចប្រើឡើងវិញ ដាច់ដោយឡែកសម្រាប់អ្នកចូលរួមព្រឹត្តិការណ៍ និងអ្នកចូលរួមកិច្ចប្រជុំ។" />
    <Btn x={1252} y={28} icon="sliders">តម្រង</Btn>
    <Card x={28} y={100} w={420} h={300} p={P(t, .4, .6)}>
      <div style={{fontSize: 15, fontWeight: 700}}>គំរូ Excel</div>
      <div style={{marginTop: 14, padding: 16, borderRadius: 12, border: `1px solid ${th.bd}`}}>
        <div style={{display: 'flex', gap: 12}}><div style={{width: 40, height: 40, borderRadius: 10, background: th.sec, color: th.pri, display: 'grid', placeItems: 'center', flex: 'none'}}><Icon n="file" s={20} /></div>
          <div><div style={{fontSize: 14.5, fontWeight: 700}}>អ្នកចូលរួមព្រឹត្តិការណ៍</div><div style={{fontSize: 12.5, color: th.mut, lineHeight: 1.6}}>ឈ្មោះជាអង់គ្លេស ឈ្មោះជាខ្មែរ ភេទ តួនាទី អង្គភាព និងលេខទូរស័ព្ទ។</div></div></div>
        <div style={{marginTop: 14, height: 36, borderRadius: 9, border: `1.5px solid ${t > dlAt ? th.pri : th.bd}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 13.5, fontWeight: 600, transform: `scale(${1 - .06 * pr(t, dlAt)})`, color: t > dlAt ? th.pri : th.fg}}><Icon n="download" s={15} />គំរូបញ្ជីអ្នកចូលរួមព្រឹត្តិការណ៍</div>
      </div>
    </Card>
    <Card x={28} y={412} w={204} h={96} p={P(t, .6, .6)}><div style={{fontSize: 13, color: th.mut}}>ឯកសារព្រឹត្តិការណ៍</div><div style={{fontSize: 26, fontWeight: 700}}>0</div></Card>
    <Card x={244} y={412} w={204} h={96} p={P(t, .7, .6)}><div style={{fontSize: 13, color: th.mut}}>អ្នកចូលរួមព្រឹត្តិការណ៍</div><div style={{fontSize: 26, fontWeight: 700}}>0</div></Card>
    <Card x={460} y={100} w={884} h={260} p={P(t, .5, .6)} pad={0}>
      <div style={{display: 'flex', alignItems: 'center', padding: '14px 18px', borderBottom: `1px solid ${th.bd}`}}><b style={{fontSize: 15, flex: 1}}>ឯកសារចុះឈ្មោះជាមុន</b></div>
      <Field x={640} y={8} w={180} value="គ្រប់ប្រភេទ" drop />
      <div style={{position: 'absolute', left: 0, right: 0, top: 70, textAlign: 'center', color: th.mut}}>
        <div style={{display: 'inline-grid', placeItems: 'center', width: 52, height: 52, borderRadius: 14, background: th.sec, color: th.pri}}><Icon n="inbox" s={24} /></div>
        <div style={{fontSize: 15, fontWeight: 700, color: th.fg, marginTop: 10}}>មិនទាន់មានឯកសារ Excel</div>
        <div style={{fontSize: 13, marginTop: 4, lineHeight: 1.7, padding: '0 120px'}}>បញ្ចូលឯកសារអ្នកចូលរួមព្រឹត្តិការណ៍ ឬអ្នកចូលរួមកិច្ចប្រជុំ ហើយវានឹងបង្ហាញក្នុង wizard បង្កើតដែលត្រូវគ្នា។</div>
      </div>
    </Card>
  </>);
};
