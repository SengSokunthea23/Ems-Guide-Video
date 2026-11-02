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
  if (ps.o <= .001) return null;
  // theme reveals: dashboard (theme button) and settings (appearance control)
  const rDash = 2100 * (P(t, 46.1, 1.3, E.inOut) - P(t, 50.3, 1.0, E.inOut));
  const rSet = 2100 * P(t, 153.1, 1.3, E.inOut);
  const isLogin = t < 33.39;
  const content = (th: Th) => isLogin ? <LoginPage t={t - 8.35} stepAt={[5.0, 6.6, 8.2, 9.8]} pressAt={11.6} /> : <AppAt t={t} th={th} />;
  const reveal = !isLogin && (rDash > 0 || rSet > 0);
  const cx = rSet > 0 ? 577 : 1515, cy = rSet > 0 ? 556 : 28, r = Math.max(rDash, rSet);
  return (
    <div style={{position: 'absolute', left: 0, top: 128, width: 1920, height: 906, overflow: 'hidden', perspective: 2200, opacity: ps.o,
      WebkitMaskImage: 'linear-gradient(to bottom, transparent 0px, #000 26px, #000 880px, transparent 906px)'}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: W, height: 944, transformOrigin: `${ps.fx}px ${ps.fy}px`,
        transform: `translate(${ps.sx - ps.fx}px, ${ps.sy - 128 - ps.fy}px) rotateX(${ps.rx}deg) scale(${ps.s})`,
        borderRadius: 18, boxShadow: `0 ${50 / ps.s}px ${120 / ps.s}px ${st.shadow}, 0 0 0 ${1.5 / ps.s}px ${st.windowLine}`}}>
        <Window url={urlAt(t)} urlP={t < 11 ? P(t, 8.7, 1.6, E.lin) : 1} dark={r > 1400}>
          {t > 8.3 && content(app.light)}
          {reveal && <div style={{position: 'absolute', inset: 0, clipPath: `circle(${r}px at ${cx}px ${cy}px)`}}>{content(app.dark)}</div>}
          {t > 22.9 && t < 33.5 && <DgkModal t={t} />}
          {SHOW.filter(([a, b]) => t >= a && t <= b).map(([a, b]) => <Cursor key={a} t={t} path={PATH} clicks={CLICKS} show={[a, b]} />)}
        </Window>
      </div>
    </div>);
};
