import React from 'react';
import {Img, staticFile} from 'remotion';
import {P, pr} from '../lib/anim';
import {H} from '../app/metrics';
import {LOGIN, loginPt} from '../app/shots/manifest';

/** real login: hero capture + the login card recorded from the product; step highlight and button press are drawn over the card */
const ROWS_Y = [514, 563, 612, 662]; // step rows, in card px
export const ShotLogin: React.FC<{t: number; stepAt: number[]; pressAt: number}> = ({t, stepAt, pressAt}) => {
  const a = P(t, 2.1, .6), b = P(t, 2.6, 1.0);
  const cur = stepAt.reduce((k, s, i) => (t >= s ? i : k), -1);
  const press = pr(t, pressAt), loading = t > pressAt + .1;
  const [bx, by] = loginPt(64, 376), bw = (648 - 64) * LOGIN.k, bh = (464 - 376) * LOGIN.k;
  const heroW = 3200 * H / 1568;
  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden', background: '#e7f1fa', opacity: a}}>
      <Img src={staticFile('shots/login-hero.png')} style={{position: 'absolute', left: 0, top: 0, width: heroW, height: H, maxWidth: 'none'}} />
      <div style={{position: 'absolute', left: LOGIN.cardLeft, top: LOGIN.cardTop, width: LOGIN.cardW, height: 744 * LOGIN.k, opacity: b, transform: `translateY(${(1 - b) * 30}px)`,
        borderRadius: 16, overflow: 'hidden', boxShadow: '0 30px 70px rgba(7,52,81,.18)'}}>
        <Img src={staticFile('shots/login-card.png')} style={{position: 'absolute', left: 0, top: 0, width: LOGIN.cardW, height: 744 * LOGIN.k}} />
        {cur >= 0 && <div style={{position: 'absolute', left: 14, top: ROWS_Y[cur] * LOGIN.k - 16, width: LOGIN.cardW - 28, height: 32, borderRadius: 8, background: 'rgba(43,128,183,.13)', boxShadow: 'inset 3px 0 0 #2b80b7'}} />}
        {(press > 0 || loading) && <div style={{position: 'absolute', left: bx - LOGIN.cardLeft, top: by - LOGIN.cardTop, width: bw, height: bh, borderRadius: 9, background: '#2b80b7', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          fontSize: 16, fontWeight: 700, transform: `scale(${1 - .04 * press})`, boxShadow: loading ? '0 0 0 4px rgba(43,128,183,.25)' : 'none'}}>
          {loading && <svg width={18} height={18} viewBox="0 0 24 24" style={{transform: `rotate(${t * 400}deg)`}}><circle cx={12} cy={12} r={9} fill="none" stroke="rgba(255,255,255,.35)" strokeWidth={3} /><path d="M12 3a9 9 0 0 1 9 9" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" /></svg>}
          ចូលប្រើជាមួយ MOC DGKey</div>}
      </div>
    </div>);
};
