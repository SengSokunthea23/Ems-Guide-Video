import React from 'react';
import {E, P} from '../lib/anim';
import {Cursor} from '../app/Cursor';
import {Window} from '../app/Window';
import {W} from '../app/metrics';
import {LoginPage} from '../pages/desktop/LoginPage';
import {useTheme} from '../theme/ThemeContext';
import type {Th} from '../theme/types';
import {CLICKS, PATH, SHOW, pose} from '../timeline/timeline';
import {AppAt, urlAt} from './AppTimeline';
import {DgkModal} from './DgkModal';
export const WindowLayer: React.FC<{t: number}> = ({t}) => {
  const {stage: st, app} = useTheme();
  const ps = pose(t);
  if (ps.o <= .001 || t < 9.45) return null;
  // theme reveals: dashboard (theme button) and settings (appearance control)
  const rDash = 2100 * (P(t, 46.1, 1.3, E.inOut) - P(t, 50.3, 1.0, E.inOut));
  const rSet = 2100 * P(t, 153.1, 1.3, E.inOut);
  const isLogin = t < 33.39;
  const content = (th: Th) => isLogin ? <LoginPage t={t - 9.45} /> : <AppAt t={t} th={th} />;
  const reveal = !isLogin && (rDash > 0 || rSet > 0);
  const cx = rSet > 0 ? 577 : 1515, cy = rSet > 0 ? 556 : 28, r = Math.max(rDash, rSet);
  return (
    <div style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, overflow: 'hidden', perspective: 2200, opacity: ps.o}}>
      <div style={{position: 'absolute', left: -24, top: 108, width: 1688, height: 1124, transformOrigin: `${ps.fx + 24}px ${ps.fy + 20}px`,
        transform: `translate(${ps.sx - ps.fx}px, ${ps.sy - 128 - ps.fy}px) rotateX(${ps.rx}deg) scale(${ps.s})`}}>
        <div style={{position: 'absolute', left: 0, top: 0, width: 1648, height: 1124, transform: 'scale(.86)', transformOrigin: `${ps.fx + 24}px ${ps.fy + 20}px`}}>
          <div style={{position: 'absolute', left: 0, top: 0, width: 1648, height: 984, borderRadius: 30, background: 'linear-gradient(145deg,#303846,#090d14 42%,#1b2028 76%,#05070b)', boxShadow: `0 ${50 / ps.s}px ${120 / ps.s}px ${st.shadow}, inset 0 0 0 1px ${st.windowLine}`}}>
            <div style={{position: 'absolute', inset: 12, borderRadius: 21, background: '#05070b', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.2)'}} />
            <div style={{position: 'absolute', left: 808, top: 5, width: 8, height: 4, borderRadius: 3, background: '#252a31'}} />
          </div>
          <div style={{position: 'absolute', left: 24, top: 20, width: W, height: 944, overflow: 'hidden', borderRadius: 18, boxShadow: `0 0 0 ${1.5 / ps.s}px ${st.windowLine}`}}>
            <Window url={urlAt(t)} urlP={t < 11 ? P(t, 6.8, 1.3, E.lin) : 1} dark={r > 1400}>
              {t > 9.45 && content(app.light)}
              {reveal && <div style={{position: 'absolute', inset: 0, clipPath: `circle(${r}px at ${cx}px ${cy}px)`}}>{content(app.dark)}</div>}
              {t > 22.9 && t < 33.5 && <DgkModal t={t} />}
              {SHOW.filter(([a, b]) => t >= a && t <= b).map(([a, b]) => <Cursor key={a} t={t} path={PATH} clicks={CLICKS} show={[a, b]} />)}
            </Window>
          </div>
          <div style={{position: 'absolute', left: -40, top: 984, width: 1728, height: 140, borderRadius: '4px 4px 38px 38px', background: 'linear-gradient(180deg,#c8cbd0 0%,#747b84 7%,#303741 15%,#aeb3ba 22%,#717881 77%,#c2c5ca 93%,#3b4149 100%)', boxShadow: '0 22px 42px rgba(0,0,0,.4)'}}>
            <div style={{position: 'absolute', left: '12%', right: '12%', top: 19, height: 53, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transform: 'perspective(300px) rotateX(-7deg)'}}>
              {[0, 1, 2].map((row) => <div key={row} style={{display: 'flex', justifyContent: 'center', gap: 7}}>
                {Array.from({length: row === 1 ? 17 : 18}, (_, i) => <i key={i} style={{width: row === 1 && (i === 0 || i === 16) ? 58 : 49, height: 12, borderRadius: '3px 3px 5px 5px', background: 'linear-gradient(180deg,#252b33,#10151c)', boxShadow: '0 1px 0 rgba(255,255,255,.22)', display: 'block'}} />)}
              </div>)}
            </div>
            <div style={{position: 'absolute', left: '42%', bottom: 10, width: '16%', height: 42, borderRadius: 8, background: 'linear-gradient(145deg,#858c95,#d2d5d9 50%,#747b84)', boxShadow: '0 2px 6px rgba(0,0,0,.32), inset 0 0 0 1px rgba(255,255,255,.32)'}} />
          </div>
        </div>
      </div>
    </div>);
};
