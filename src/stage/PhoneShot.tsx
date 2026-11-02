import React from 'react';
import {Img, staticFile} from 'remotion';

/** a real screen of the MOC Officer / DGKey app inside the Phone frame; `cover` hides the recording indicators of screen-recorded frames */
export const PhoneShot: React.FC<{src: string; cover?: string; light?: boolean}> = ({src, cover, light}) => (
  <div style={{position: 'absolute', inset: 0, background: '#fff'}}>
    <Img src={staticFile(`shots/${src}.png`)} style={{position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top'}} />
    {cover && <div style={{position: 'absolute', left: 0, top: 0, right: 0, height: 36, background: cover, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 22px 0 24px', fontSize: 11.5, fontWeight: 700, color: light ? '#fff' : '#111'}}>
      <span>9:41</span>
      <span style={{display: 'flex', gap: 5, alignItems: 'center'}}><i style={{width: 15, height: 8, borderRadius: 2, background: 'currentColor', opacity: .85}} /><i style={{width: 22, height: 10, borderRadius: 3, border: '1.5px solid currentColor', display: 'block'}} /></span>
    </div>}
  </div>
);
