import React from 'react';
const BRAND = {ems: '#2B80B7', amber: '#E1AF4A'};
/** EMS logo exactly as the product renders it (3 circles in a 32px box) */
export const Logo: React.FC<{k?: number; p?: number[]}> = ({k = 1, p = [1, 1, 1]}) => (
  <div style={{position: 'relative', width: 32 * k, height: 32 * k, flex: 'none'}}>
    <span style={{position: 'absolute', left: 0, top: 0, width: 16 * k, height: 16 * k, borderRadius: '50%', background: BRAND.ems, transform: `scale(${p[0]})`}} />
    <span style={{position: 'absolute', left: 6 * k, bottom: 0, width: 16 * k, height: 16 * k, borderRadius: '50%', background: BRAND.ems, transform: `scale(${p[1]})`}} />
    <span style={{position: 'absolute', right: 0, top: 10 * k, width: 16 * k, height: 16 * k, borderRadius: '50%', background: BRAND.amber, transform: `scale(${p[2]})`}} />
  </div>
);
