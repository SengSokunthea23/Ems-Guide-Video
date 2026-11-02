import React from 'react';
import {E, P, pr} from '../../lib/anim';
import {MobileShell, navTap} from '../../app/mobile/mobile';
import type {Th} from '../../theme/types';
import {CLICKS} from '../../timeline/timeline';
import {MActivityPage, MRequestsPage, MSettingsPage} from '../../pages/mobile/OpsPages';
import {MAttendancePage, MChairRolesPage, MChairsPage, MDocsPage, MRolesPage, MUsersPage, MVenuesPage} from '../../pages/mobile/ListPages';
import {MDashboardPage, MEventDetailPage, MEventsPage} from '../../pages/mobile/CorePages';

/** same schedule as the desktop PAGES, rendered with the mobile pages */
type MPg = {at: number; nav: number; ps: number; drawer: boolean; r: (lt: number, th: Th, t: number) => React.ReactNode};
export const MPAGES: MPg[] = [
  {at: 33.39, nav: 0, ps: 34.0, drawer: false, r: (lt, th, t) => <MDashboardPage t={lt} refreshAt={7.25} d1={5.4} d2={6.4} fbPress={Math.max(0, 1 - Math.abs(t - 41.2) / .14)} />},
  {at: 52.17, nav: 1, ps: 52.17, drawer: true, r: (lt) => <MEventsPage t={lt} typeOpen={[2.4, 4.45]} pickType={4.4} statusOpen={[5.4, 6.9]} rowHover={7.4} />},
  {at: 60.67, nav: 1, ps: 60.67, drawer: false, r: (lt) => <MEventDetailPage t={lt} copyAt={4.6} />},
  {at: 68.87, nav: 2, ps: 68.87, drawer: true, r: (lt) => <MVenuesPage t={lt} />},
  {at: 74.3, nav: 3, ps: 74.3, drawer: true, r: (lt) => <MChairsPage t={lt} />},
  {at: 77.9, nav: 4, ps: 77.9, drawer: true, r: (lt) => <MChairRolesPage t={lt} />},
  {at: 81.39, nav: 5, ps: 81.39, drawer: true, r: (lt) => <MDocsPage t={lt} dlAt={2.6} />},
  {at: 93.91, nav: 6, ps: 94.4, drawer: true, r: (lt) => <MAttendancePage t={lt} evOpen={[3.6, 5.2]} stOpen={[6.4, 7.85]} pickSt={7.8} srcOpen={[9.4, 11.0]} dlAt={12.8} newCheck={27.0} />},
  {at: 125.22, nav: 7, ps: 125.22, drawer: true, r: (lt) => <MUsersPage t={lt} />},
  {at: 130.3, nav: 8, ps: 130.3, drawer: true, r: (lt) => <MRolesPage t={lt} />},
  {at: 137.74, nav: 9, ps: 137.74, drawer: true, r: (lt) => <MRequestsPage t={lt} typeOpen={[1.8, 3.4]} approveAt={4.6} />},
  {at: 144.6, nav: 10, ps: 144.6, drawer: true, r: (lt) => <MActivityPage t={lt} resOpen={[1.4, 2.8]} actOpen={[3.2, 4.8]} />},
  {at: 150.26, nav: 11, ps: 150.26, drawer: true, r: (lt, th, t) => <MSettingsPage t={lt} mode={P(t, 153.06, .4, E.inOut)} langOpen={[4.6, 6.0]} tgAt={7.2} />},
];
/** the click that opens a page from the drawer: the last click before the page starts */
const tapFor = (at: number) => CLICKS.filter((c) => c <= at).reduce((a, c) => Math.max(a, c), 0);
export const DRAWER_TAPS = MPAGES.filter((p) => p.drawer).map((p) => [tapFor(p.at), ...navTap(p.nav)] as [number, number, number]);

export const MobileAppAt: React.FC<{t: number; th: Th}> = ({t, th}) => {
  let i = 0; MPAGES.forEach((p, k) => { if (t >= p.at) i = k; });
  const cur = MPAGES[i], prev = MPAGES[i - 1], nxt = MPAGES[i + 1];
  const x = P(t, cur.at, .45, E.out);
  let drawer = 0, flash = 0, active = cur.nav;
  if (nxt?.drawer) { const tap = tapFor(nxt.at); drawer = P(t, tap - 1.1, .45, E.out) * (1 - P(t, tap + .12, .4, E.in)); active = nxt.nav; flash = pr(t, tap); }
  return (
    <MobileShell th={th} active={active} drawer={drawer} flash={flash}>
      {prev && x < 1 && <div style={{position: 'absolute', inset: 0, opacity: 1 - x}}>{prev.r(t - prev.ps, th, t)}</div>}
      <div style={{position: 'absolute', inset: 0, opacity: x, transform: `translateY(${(1 - x) * 14}px)`}}>{cur.r(t - cur.ps, th, t)}</div>
    </MobileShell>);
};
