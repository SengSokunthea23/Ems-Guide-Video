import React from 'react';
import {P, clamp} from '../lib/anim';
/** word-by-word masked reveal */
export const Words: React.FC<{words: string[]; t: number; at: number; gap?: number; stagger?: number; style?: React.CSSProperties; inner?: React.CSSProperties; d?: number}> = ({words, t, at, gap = 0, stagger = .09, style, inner, d = .8}) => (
  <div style={{display: 'flex', flexWrap: 'wrap', columnGap: `${gap}em`, ...style}}>
    {words.map((w, i) => { const p = P(t, at + i * stagger, d); return (
      <span key={i} style={{display: 'inline-block', overflow: 'hidden', paddingBottom: '.12em', marginBottom: '-.12em'}}>
        <span style={{display: 'inline-block', transform: `translateY(${(1 - p) * 105}%)`, opacity: clamp(p * 1.4), ...inner}}>{w}</span></span>); })}
  </div>
);
