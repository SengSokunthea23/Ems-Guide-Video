import React from 'react';
import {Img, staticFile} from 'remotion';
import {E, P, typed} from '../lib/anim';

const BraveMark: React.FC = () => (
  <svg width={38} height={38} viewBox="0 0 40 40">
    <path d="M12 5h16l8 9-4 18-12 5L8 32 4 14z" fill="#fb542b" />
    <path d="m12 13 8 3 8-3 5 5-5 8-8 7-8-7-5-8z" fill="#fff" />
    <path d="m14 18 5 2-1 3-4-1m12-4-5 2 1 3 4-1m-9 5 3-2 3 2-3 2z" fill="#fb542b" />
  </svg>
);

const DesktopIcon: React.FC<{name: string; color: string; glyph: string; brave?: boolean}> = ({name, color, glyph, brave}) => (
  <div style={{width: 92, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, color: '#fff', fontSize: 13, textShadow: '0 1px 5px #07152d'}}>
    <div style={{width: 58, height: 58, display: 'grid', placeItems: 'center', borderRadius: 16, background: brave ? '#fff' : `linear-gradient(145deg, ${color}, ${color}bb)`, boxShadow: '0 8px 20px rgba(0,0,0,.25)'}}>
      {brave ? <BraveMark /> : <span style={{fontWeight: 800, fontSize: 25}}>{glyph}</span>}
    </div>
    <span>{name}</span>
  </div>
);

const icons = [
  ['Finder', '#2785d7', '⌕'], ['Mail', '#55a8ed', '✉'], ['Photos', '#ef6888', '✿'], ['Calendar', '#ee5b5b', '4'],
  ['Maps', '#55bd91', '⌖'], ['Brave', '#fb542b', 'B'], ['Music', '#bd5bd0', '♪'], ['Notes', '#e7b944', '≡'],
  ['Files', '#e2ba55', '▰'], ['Messages', '#4ebd81', '…'], ['Settings', '#939fb4', '⚙'], ['Trash', '#91a4b8', '⌑'],
];

export const ComputerIntro: React.FC<{t: number}> = ({t}) => {
  const open = P(t, .2, 1.15, E.back);
  const zoom = P(t, 1.65, 1.35, E.inOut);
  const browser = P(t, 3.55, .55);
  const page = P(t, 4.55, .55);
  const card = P(t, 6.15, .7, E.back);
  const out = P(t, 7.35, .8, E.in);
  const url = 'https://ems-admin.moc.gov.kh/km';
  const desktopOpacity = 1 - P(t, 3.55, .45);
  const typing = P(t, 3.7, .9, E.lin);
  const cursorX = 300 + P(t, 3.0, .7) * 294;

  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 72%, rgba(52,129,183,.22), transparent 55%)'}} />
      <div style={{position: 'absolute', left: 140, top: 850, width: 1640, height: 150, borderRadius: '5px 5px 36px 36px', background: 'linear-gradient(180deg,#c7cbd0 0%,#8c929a 7%,#343b45 14%,#a7acb3 22%,#69717b 78%,#b5b9be 92%,#303741 100%)', boxShadow: '0 25px 45px rgba(0,0,0,.42)'}}>
        <div style={{position: 'absolute', left: '12%', right: '12%', top: 22, height: 64, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transform: 'perspective(280px) rotateX(-7deg)'}}>
          {[0, 1, 2].map((row) => <div key={row} style={{display: 'flex', justifyContent: 'center', gap: 7}}>
            {Array.from({length: row === 1 ? 17 : 18}, (_, i) => <i key={i} style={{width: row === 1 && (i === 0 || i === 16) ? 58 : 49, height: 13, borderRadius: '3px 3px 5px 5px', background: 'linear-gradient(180deg,#252b33,#10151c)', boxShadow: '0 1px 0 rgba(255,255,255,.22)', display: 'block'}} />)}
          </div>)}
        </div>
        <div style={{position: 'absolute', left: '42%', bottom: 15, width: '16%', height: 43, borderRadius: 8, background: 'linear-gradient(145deg,#888f98,#d1d4d8 50%,#747b84)', boxShadow: '0 2px 6px rgba(0,0,0,.32), inset 0 0 0 1px rgba(255,255,255,.3)'}} />
      </div>
      <div style={{position: 'absolute', left: 180, top: 95, width: 1560, height: 790, padding: 18, borderRadius: 28, background: 'linear-gradient(145deg,#364354,#090e17 38%,#161d27 75%,#06090e)', boxShadow: '0 44px 100px rgba(0,0,0,.52), inset 0 0 0 1px rgba(255,255,255,.3)', transformOrigin: '50% 100%', transform: `perspective(1900px) rotateX(${(1 - open) * -78}deg)`}}>
        <div style={{position: 'relative', width: '100%', height: '100%', borderRadius: 14, overflow: 'hidden', background: '#101b35'}}>
          <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 45%, #245788 0%, #142849 52%, #0c1930 100%)', transform: `scale(${1 + .4 * zoom})`, transformOrigin: '50% 50%', opacity: desktopOpacity}}>
            <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 30, background: 'rgba(5,13,28,.62)', display: 'flex', alignItems: 'center', padding: '0 18px', color: '#fff', fontSize: 12, gap: 12}}>
              <span>●</span><span>File</span><span>Edit</span><span>View</span><span>Window</span><span>Help</span><span style={{marginLeft: 'auto'}}>Tue 9:41 AM</span>
            </div>
            <div style={{position: 'absolute', inset: '46px 80px 38px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(3, 1fr)', alignItems: 'center', justifyItems: 'center'}}>
              {icons.map(([name, color, glyph], i) => {
                const isBrave = name === 'Brave';
                const selected = isBrave ? P(t, 3.05, .35) : 0;
                return <div key={name} style={{transform: isBrave ? `scale(${1 + .2 * selected})` : undefined, filter: isBrave && selected ? 'drop-shadow(0 0 16px rgba(255,125,62,.9))' : undefined}}>
                  <DesktopIcon name={name} color={color} glyph={glyph} brave={isBrave} />
                </div>;
              })}
            </div>
            <div style={{position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)', height: 56, display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', borderRadius: 18, background: 'rgba(230,242,255,.22)', border: '1px solid rgba(255,255,255,.3)', boxShadow: '0 8px 26px rgba(0,0,0,.24)', backdropFilter: 'blur(14px)'}}>
              {icons.slice(0, 8).map(([name, color, glyph]) => (
                <div key={name} title={name} style={{width: 40, height: 40, display: 'grid', placeItems: 'center', borderRadius: 12, background: name === 'Brave' ? '#fff' : `linear-gradient(145deg,${color},${color}bb)`, boxShadow: '0 3px 8px rgba(0,0,0,.28)'}}>
                  {name === 'Brave' ? <BraveMark /> : <span style={{color: '#fff', fontSize: 20, fontWeight: 800}}>{glyph}</span>}
                </div>
              ))}
            </div>
            <div style={{position: 'absolute', left: 560, top: 348, width: 64, height: 64, border: '2px solid rgba(255,255,255,.9)', borderRadius: '50%', opacity: P(t, 3.35, .12) * (1 - P(t, 3.75, .3)), transform: `scale(${.7 + .6 * P(t, 3.35, .12)})`, boxShadow: '0 0 22px rgba(255,255,255,.7)'}} />
          </div>
          {desktopOpacity > 0 && <div style={{position: 'absolute', left: cursorX, top: 355, opacity: 1 - P(t, 3.5, .25), transform: `translate(${t > 3.0 ? 0 : 80}px, ${t > 3.0 ? 0 : 50}px)`}}>
            <svg width={30} height={38} viewBox="0 0 30 38"><path d="M3 2v27l7-7 6 13 5-2-6-12 11-1z" fill="#fff" stroke="#101827" strokeWidth="2" /></svg>
          </div>}
          {browser > 0 && <div style={{position: 'absolute', inset: 0, opacity: browser, transform: `scale(${1.06 - .06 * browser})`, transformOrigin: '50% 50%', overflow: 'hidden', borderRadius: 12, background: '#fff', boxShadow: '0 25px 80px rgba(0,0,0,.4)'}}>
            <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 54, display: 'flex', alignItems: 'center', gap: 12, padding: '0 18px', background: '#f3f5f8', borderBottom: '1px solid #dfe4eb'}}>
              <div style={{display: 'flex', gap: 7}}>{['#ff5f57', '#febc2e', '#28c840'].map((c) => <i key={c} style={{width: 12, height: 12, borderRadius: 6, background: c}} />)}</div>
              <div style={{width: 32, height: 32, borderRadius: 10, display: 'grid', placeItems: 'center', background: '#fff'}}><BraveMark /></div>
              <div style={{flex: 1, height: 34, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', color: '#425065', background: '#fff', border: '1px solid #dfe4eb', fontSize: 14}}>
                <span style={{color: '#38a36f'}}>●</span>{typed(url, typing)}{typing < 1 && <span style={{height: 18, width: 1, background: '#2785d7'}} />}
              </div>
              <span style={{color: '#5e6a7c', fontSize: 18}}>⋯</span>
            </div>
            {page > 0 && <div style={{position: 'absolute', left: 0, right: 0, top: 54, bottom: 0, opacity: page}}>
              <Img src={staticFile('shots/login-hero.png')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover'}} />
              <div style={{position: 'absolute', left: '62.5%', top: '12%', width: '33.75%', opacity: card, transform: `translateY(${(1 - card) * 30}px) scale(${.92 + .08 * card})`, transformOrigin: '50% 0', filter: 'drop-shadow(0 18px 30px rgba(7,52,81,.16))'}}>
                <Img src={staticFile('shots/login-card.png')} style={{width: '100%', height: 'auto'}} />
              </div>
            </div>}
          </div>}
        </div>
      </div>
    </div>
  );
};
