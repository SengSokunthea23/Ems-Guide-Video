import React from 'react';
export const QRG: React.FC<{size: number; seed?: number; c?: string}> = ({size, seed = 5, c = '#073451'}) => {
  const n = 25, cell = size / n; let s = seed; const rnd = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
  const cells: React.ReactNode[] = [];
  const finder = (x: number, y: number) => cells.push(<g key={`f${x}${y}`}><rect x={x * cell} y={y * cell} width={7 * cell} height={7 * cell} fill={c} /><rect x={(x + 1) * cell} y={(y + 1) * cell} width={5 * cell} height={5 * cell} fill="#fff" /><rect x={(x + 2) * cell} y={(y + 2) * cell} width={3 * cell} height={3 * cell} fill={c} /></g>);
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const inF = (x < 8 && y < 8) || (x > 16 && y < 8) || (x < 8 && y > 16); if (!inF && rnd() > .52) cells.push(<rect key={`${x}-${y}`} x={x * cell} y={y * cell} width={cell + .3} height={cell + .3} fill={c} />); }
  finder(0, 0); finder(18, 0); finder(0, 18);
  return <svg width={size} height={size}>{cells}</svg>;
};
