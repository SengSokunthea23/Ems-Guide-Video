import React from 'react';
import {clamp} from '../../lib/anim';
import {useTheme} from '../../theme/ThemeContext';

/** finger tap marker: [time, x, y] in viewport coordinates */
export const Touch: React.FC<{t: number; taps: [number, number, number][]}> = ({t, taps}) => {
  const {accent} = useTheme().stage;
  return <>{taps.map(([c, x, y], i) => {
    const k = (t - c) / .55; const dot = clamp(1 - Math.abs(t - c + .05) / .5);
    if (k < -.8 || k > 1) return null;
    return <React.Fragment key={i}>
      {k >= 0 && <div style={{position: 'absolute', left: x - 22, top: y - 22, width: 44, height: 44, borderRadius: 22, border: `2.5px solid ${accent}`, opacity: 1 - k, transform: `scale(${.4 + k})`, zIndex: 60}} />}
      <div style={{position: 'absolute', left: x - 13, top: y - 13, width: 26, height: 26, borderRadius: 13, background: `${accent}55`, border: `2px solid ${accent}`, opacity: dot, transform: `scale(${1 - .25 * clamp(1 - Math.abs(t - c) / .12)})`, zIndex: 61}} />
    </React.Fragment>;
  })}</>;
};
