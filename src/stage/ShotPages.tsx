import React from 'react';
import {Img, staticFile} from 'remotion';
import {E, P, clamp, sc} from '../lib/anim';
import {A, C, DETAIL, ROW_Y} from '../app/shots/manifest';
import type {ShotId} from '../app/shots/manifest';
import {Band, CopiedButton, Dropdown, OkPill, Patch, Pulse, Ring} from '../app/shots/overlays';
import {DARK_FILTER, ShotPage} from '../app/shots/ShotPage';
import {TYPES} from '../pages/data';
import {Icon} from '../ui/Icon';

/**
 * The real EMS pages. Same props/timing as the old hand-coded pages: `t` is time since the page's `ps`
 * (local), `T` is absolute video time. Everything animated (dropdowns, focus, copied, hover) is a small overlay over the capture.
 */
type Dk = {dark?: boolean};

/* ---- dashboard: click date range -> skeleton flash -> refreshed capture ---- */
export const ShotDashboard: React.FC<Dk & {t: number; refreshAt: number; d1: number; d2: number; fbPress: number}> = ({dark, t, refreshAt, d1, d2, fbPress}) => {
  const sk = P(t, refreshAt - .05, .15) * (1 - P(t, refreshAt + .5, .4));
  return (<>
    <ShotPage id="dash" dark={dark}>
      {!dark && t < d1 && <Patch x={1212} y={139} w={150} h={28}>27/09/2026</Patch>}
      <Ring x={1208} y={135} w={161} h={36} p={t > d1 - .1 && t < d1 + .7 ? 1 : 0} />
      <Ring x={1376} y={135} w={161} h={36} p={t > d2 - .1 && t < d2 + .7 ? 1 : 0} />
      <Pulse x={1544} y={135} w={36} h={36} t={t} at={refreshAt - .05} />
      <Ring x={1544} y={135} w={36} h={36} p={fbPress} />
    </ShotPage>
    {sk > 0 && !dark && <div style={{position: 'absolute', inset: 0, opacity: sk}}><ShotPage id="dash-skel" /></div>}
  </>);
};

/* ---- events ---- */
const ROW_W = ROW_Y.map((y) => y * .8 + 44);
export const ShotEvents: React.FC<Dk & {t: number; T: number; typeOpen: [number, number]; pickType: number; statusOpen: [number, number]}> = ({dark, t, T, typeOpen, pickType, statusOpen}) => {
  // hover frame follows the cursor sliding from the status filter down to the last row (59.3 -> 59.9 s)
  const y0 = 304, cy = y0 + (ROW_W[9] - y0) * E.inOut(P(T, 59.3, .6)); // cursor leaves the status menu item at y0
  let hov = -1; if (T > 59.25 && cy > ROW_W[0] - 30) ROW_W.forEach((y, i) => { if (cy >= y - 26) hov = i; });
  return (
    <ShotPage id={hov >= 0 && !dark ? (`events-h${hov + 1}` as ShotId) : 'events'} dark={dark}>
      <Ring x={193} y={248} w={296} h={36} p={t > typeOpen[0] && t < typeOpen[1] ? 1 : 0} />
      {t > pickType && <Patch x={202} y={250} w={270} h={22}>កិច្ចប្រជុំ</Patch>}
      <Dropdown t={t} open={typeOpen} x={193} y={282} w={296} items={TYPES.slice(0, 7)} hi={t > pickType - .5 ? 1 : -1} />
      <Ring x={802} y={248} w={302} h={36} p={t > statusOpen[0] && t < statusOpen[1] ? 1 : 0} />
      <Dropdown t={t} open={statusOpen} x={802} y={282} w={302} items={['គ្រប់ស្ថានភាព', 'បានផ្សព្វផ្សាយ', 'រង់ចាំការអនុម័ត', 'បានបដិសេធ', 'បានបោះបង់']} hi={0} />
    </ShotPage>);
};

/* ---- event detail (tall capture, scrolls to the QR and to the request history) ---- */
export const detailScroll = (t: number) => sc(t, [[2.0, 0], [2.3, 1100, 1.2], [5.3, DETAIL.maxScroll, 1.3]]);
export const ShotEventDetail: React.FC<Dk & {t: number; copyAt: number}> = ({dark, t, copyAt}) => {
  const s = detailScroll(t);
  const [cx, cy] = C(250, 1541, s);
  return (
    <ShotPage id="detail" scroll={s} dark={dark}>
      <CopiedButton x={cx} y={cy} w={89} h={26} p={P(t, copyAt, .25)} />
      <Pulse x={cx} y={cy} w={89} h={26} t={t} at={copyAt} />
    </ShotPage>);
};

/* ---- simple pages ---- */
export const ShotVenues: React.FC<Dk> = ({dark}) => <ShotPage id="venues" dark={dark} />;
export const ShotChairs: React.FC<Dk> = ({dark}) => <ShotPage id="chairs" dark={dark} />;
export const ShotChairRoles: React.FC<Dk> = ({dark}) => <ShotPage id="chair-roles" dark={dark} />;
export const ShotUsers: React.FC<Dk> = ({dark}) => <ShotPage id="users" dark={dark} />;
export const ShotRoles: React.FC<Dk> = ({dark}) => <ShotPage id="roles" dark={dark} />;
export const ShotDocs: React.FC<Dk & {t: number; dlAt: number}> = ({dark, t, dlAt}) => (
  <ShotPage id="docs" dark={dark}><Pulse x={250} y={338} w={163} h={26} t={t} at={dlAt} /></ShotPage>);

/* ---- attendance ---- */
export const ShotAttendance: React.FC<Dk & {t: number; evOpen: [number, number]; stOpen: [number, number]; pickSt: number; srcOpen: [number, number]; dlAt: number; newCheck: number}> = ({dark, t, evOpen, stOpen, pickSt, srcOpen, dlAt, newCheck}) => {
  const nc = P(t, newCheck, .5), band = nc * (1 - P(t, newCheck + 2.2, .4));
  return (
    <ShotPage id="attendance" dark={dark}>
      <Ring x={747} y={364} w={266} h={36} p={t > evOpen[0] && t < evOpen[1] ? 1 : 0} />
      <Dropdown t={t} open={evOpen} x={747} y={404} w={330} items={['កិច្ចប្រជុំពិភាក្សាលើករណីរារាំង បណ្តឹងកកស្ទះ', 'កិច្ចប្រជុំក្រុមការងារបូកសរុបរបាយការណ៍ និងស្ថិតិពាណិជ្ជកម្ម']} hi={0} />
      <Ring x={1024} y={434} w={266} h={36} p={t > stOpen[0] && t < stOpen[1] ? 1 : 0} />
      <Dropdown t={t} open={stOpen} x={1024} y={474} w={266} items={['គ្រប់ស្ថានភាពទាំងអស់', 'បានចូលរួម', 'មិនទាន់ចូលរួម']} hi={t > pickSt - .5 ? 1 : -1} />
      <Ring x={1300} y={434} w={266} h={36} p={t > srcOpen[0] && t < srcOpen[1] ? 1 : 0} />
      <Dropdown t={t} open={srcOpen} x={1300} y={474} w={266} items={['ប្រភពទាំងអស់', 'មន្ត្រីផ្ទៃក្នុង', 'អ្នកចូលរួមខាងក្រៅ']} hi={0} />
      <Pulse x={1456} y={498} w={110} h={26} t={t} at={dlAt} />
      <Band x={180} y={684} w={1400} h={54} p={band} />
      <OkPill x={A.attendance.pill3[0]} y={A.attendance.pill3[1]} p={nc}>1/1 បានចូលរួម</OkPill>
    </ShotPage>);
};

/* ---- requests / activity ---- */
export const ShotRequests: React.FC<Dk & {t: number; typeOpen: [number, number]; approveAt: number}> = ({dark, t, typeOpen, approveAt}) => (
  <ShotPage id="requests" dark={dark}>
    <Ring x={594} y={599} w={389} h={37} p={t > typeOpen[0] && t < typeOpen[1] ? 1 : 0} />
    <Dropdown t={t} open={typeOpen} x={594} y={640} w={389} items={['ប្រភេទសំណើទាំងអស់', 'សំណើកក់ទីកន្លែង', 'សំណើចូលប្រើអង្គភាព']} hi={0} />
    <Pulse x={1296} y={698} w={58} h={20} t={t} at={approveAt} r={6} />
  </ShotPage>);
export const ShotActivity: React.FC<Dk & {t: number; resOpen: [number, number]; actOpen: [number, number]}> = ({dark, t, resOpen, actOpen}) => (
  <ShotPage id="activity" dark={dark}>
    <Ring x={1184} y={197} w={186} h={37} p={t > resOpen[0] && t < resOpen[1] ? 1 : 0} />
    <Dropdown t={t} open={resOpen} x={1184} y={238} w={186} items={['ធនធានទាំងអស់', 'Auth', 'Events', 'Requests', 'Telegram']} hi={0} />
    <Ring x={1381} y={197} w={185} h={37} p={t > actOpen[0] && t < actOpen[1] ? 1 : 0} />
    <Dropdown t={t} open={actOpen} x={1381} y={238} w={185} items={['សកម្មភាពទាំងអស់', 'ចូលប្រើ', 'ចាកចេញ', 'បង្កើត', 'កែប្រែ', 'លុប']} hi={0} />
  </ShotPage>);

/* ---- settings (appearance buttons, language, Telegram modal composited over the page) ---- */
const SEG = {y: 562, h: 33, light: {x: 197, w: 214}, dark: {x: 418, w: 215}};
const TgModal: React.FC<{p: number; dark?: boolean}> = ({p, dark}) => {
  const src = staticFile('shots/tg-modal-crop.png'), w = 373, h = 414;
  return (
    <div style={{position: 'absolute', inset: 0, zIndex: 30, background: `rgba(7,18,43,${.45 * clamp(p)})`}}>
      <div style={{position: 'absolute', left: 800 - w / 2, top: 500 - h / 2, width: w, height: h, borderRadius: 12, overflow: 'hidden', boxShadow: '0 30px 70px rgba(0,0,0,.35)', opacity: clamp(p * 1.4), transform: `scale(${.9 + .1 * p})`}}>
        <Img src={src} style={{position: 'absolute', inset: 0, width: w, height: h}} />
        {dark && <div style={{position: 'absolute', left: 93, top: 103, width: 187, height: 186, overflow: 'hidden', filter: DARK_FILTER}}><Img src={src} style={{position: 'absolute', left: -93, top: -103, width: w, height: h}} /></div>}
      </div>
    </div>);
};
export const ShotSettings: React.FC<Dk & {t: number; mode: number; langOpen: [number, number]; tgAt: number}> = ({dark, t, mode, langOpen, tgAt}) => {
  const L = SEG.light, D = SEG.dark;
  return (
    <ShotPage id="settings" dark={dark}>
      {mode > .5 && <>
        <div style={{position: 'absolute', left: L.x, top: SEG.y, width: L.w, height: SEG.h, borderRadius: 8, background: '#fff', border: '1.5px solid #2b80b7', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 13.5, fontWeight: 600, color: '#073451'}}><Icon n="sun" s={14} />ភ្លឺ</div>
        <div style={{position: 'absolute', left: D.x, top: SEG.y, width: D.w, height: SEG.h, borderRadius: 8, background: '#d8edf8', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 13.5, fontWeight: 600, color: '#0b5178'}}><Icon n="moon" s={14} />ងងឹត</div>
      </>}
      <Pulse x={D.x} y={SEG.y} w={D.w} h={SEG.h} t={t} at={153.06 - 150.26} r={8} />
      <Ring x={197} y={628} w={658} h={37} p={t > langOpen[0] && t < langOpen[1] ? 1 : 0} />
      <Dropdown t={t} open={langOpen} x={197} y={668} w={658} items={['អង់គ្លេស', 'ខ្មែរ']} hi={1} />
      <Pulse x={1456} y={209} w={120} h={30} t={t} at={tgAt} r={8} />
      {t > tgAt + .1 && <TgModal p={P(t, tgAt + .1, .5, E.back)} dark={dark} />}
    </ShotPage>);
};
