import React from 'react';
import {E, P} from '../lib/anim';
import {AppShell} from '../app/AppShell';
import type {Th} from '../theme/types';
import {ActivityPage} from '../pages/desktop/ActivityPage';
import {AttendancePage} from '../pages/desktop/AttendancePage';
import {ChairRolesPage} from '../pages/desktop/ChairRolesPage';
import {ChairsPage} from '../pages/desktop/ChairsPage';
import {DashboardPage} from '../pages/desktop/DashboardPage';
import {DocsPage} from '../pages/desktop/DocsPage';
import {EventDetailPage} from '../pages/desktop/EventDetailPage';
import {EventsPage} from '../pages/desktop/EventsPage';
import {RequestsPage} from '../pages/desktop/RequestsPage';
import {RolesPage} from '../pages/desktop/RolesPage';
import {SettingsPage} from '../pages/desktop/SettingsPage';
import {UsersPage} from '../pages/desktop/UsersPage';
import {VenuesPage} from '../pages/desktop/VenuesPage';
export type Pg = {at: number; nav: number; url: string; ps: number; r: (lt: number, th: Th, t: number) => React.ReactNode};
export const U = 'ems-admin.moc.gov.kh/km';
export const PAGES: Pg[] = [
  {at: 33.39, nav: 0, url: U, ps: 34.0, r: (lt, th, t) => <DashboardPage t={lt} refreshAt={7.25} d1={5.4} d2={6.4} fbPress={Math.max(0, 1 - Math.abs(t - 41.2) / .14)} />},
  {at: 52.17, nav: 1, url: `${U}/events`, ps: 52.17, r: (lt) => <EventsPage t={lt} typeOpen={[2.4, 4.45]} pickType={4.4} statusOpen={[5.4, 6.9]} rowHover={7.4} />},
  {at: 60.67, nav: 1, url: `${U}/events/9b75c242…`, ps: 60.67, r: (lt) => <EventDetailPage t={lt} copyAt={4.6} />},
  {at: 68.87, nav: 2, url: `${U}/places`, ps: 68.87, r: (lt) => <VenuesPage t={lt} />},
  {at: 74.3, nav: 3, url: `${U}/chairpersons`, ps: 74.3, r: (lt) => <ChairsPage t={lt} />},
  {at: 77.9, nav: 4, url: `${U}/chair-by-statuses`, ps: 77.9, r: (lt) => <ChairRolesPage t={lt} />},
  {at: 81.39, nav: 5, url: `${U}/registrations`, ps: 81.39, r: (lt) => <DocsPage t={lt} dlAt={2.6} />},
  {at: 93.91, nav: 6, url: `${U}/attendance`, ps: 94.4, r: (lt) => <AttendancePage t={lt} evOpen={[3.6, 5.2]} stOpen={[6.4, 7.85]} pickSt={7.8} srcOpen={[9.4, 11.0]} dlAt={12.8} newCheck={27.0} />},
  {at: 125.22, nav: 7, url: `${U}/users`, ps: 125.22, r: (lt) => <UsersPage t={lt} />},
  {at: 130.3, nav: 8, url: `${U}/roles`, ps: 130.3, r: (lt) => <RolesPage t={lt} />},
  {at: 137.74, nav: 9, url: `${U}/requests`, ps: 137.74, r: (lt) => <RequestsPage t={lt} typeOpen={[1.8, 3.4]} approveAt={4.6} />},
  {at: 144.6, nav: 10, url: `${U}/activity-logs`, ps: 144.6, r: (lt) => <ActivityPage t={lt} resOpen={[1.4, 2.8]} actOpen={[3.2, 4.8]} />},
  {at: 150.26, nav: 11, url: `${U}/settings`, ps: 150.26, r: (lt, th, t) => <SettingsPage t={lt} mode={P(t, 153.06, .4, E.inOut)} langOpen={[4.6, 6.0]} tgAt={7.2} />},
];
export const AppAt: React.FC<{t: number; th: Th}> = ({t, th}) => {
  let i = 0; PAGES.forEach((p, k) => { if (t >= p.at) i = k; });
  const cur = PAGES[i], prev = PAGES[i - 1];
  const x = P(t, cur.at, .45, E.out);
  return (
    <AppShell th={th} active={cur.nav} navP={P(t, 34.0, 1.5)}>
      {prev && x < 1 && <div style={{position: 'absolute', inset: 0, opacity: 1 - x}}>{prev.r(t - prev.ps, th, t)}</div>}
      <div style={{position: 'absolute', inset: 0, opacity: x, transform: `translateY(${(1 - x) * 14}px)`}}>{cur.r(t - cur.ps, th, t)}</div>
    </AppShell>);
};
export const urlAt = (t: number) => { if (t < 33.39) return `${U}/login`; let u = U; PAGES.forEach((p) => { if (t >= p.at) u = p.url; }); return u; };
