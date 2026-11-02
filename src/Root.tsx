import React, {useEffect, useState} from 'react';
import {Composition, Folder, continueRender, delayRender} from 'remotion';
import {Video, videoSchema} from './Video';
import type {VideoProps} from './Video';
import {FPS, DUR} from './lib/anim';
import {THEMES} from './theme';
import type {Orientation, ThemeId} from './theme/types';
import './fonts.css';

const FontGate: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [h] = useState(() => delayRender('fonts'));
  useEffect(() => {
    const fs = ['400 20px Inter', '500 20px Inter', '600 20px Inter', '700 20px Inter', '800 20px Inter', '500 20px KH', '600 20px KH', '500 20px KP', '700 20px KP', '700 20px KH'];
    Promise.all(fs.map((f) => document.fonts.load(f, 'ក Aa0')))
      .then(() => document.fonts.ready)
      .then(() => continueRender(h));
  }, [h]);
  return <>{children}</>;
};
const Gated: React.FC<VideoProps> = (p) => (
  <FontGate>
    <Video {...p} />
  </FontGate>
);

const SIZE: Record<Orientation, [number, number]> = {landscape: [1920, 1080], portrait: [1080, 1920]};
const ORIENTATIONS: VideoProps['orientation'][] = ['landscape', 'portrait'];
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

export const RemotionRoot: React.FC = () => (
  <>
    {(Object.keys(THEMES) as ThemeId[]).map((themeId) => (
      <Folder key={themeId} name={THEMES[themeId].name}>
        {ORIENTATIONS.map((o) => (
          <Composition
            key={o}
            id={`EMS-${cap(themeId)}-${cap(o)}`}
            component={Gated}
            schema={videoSchema}
            defaultProps={{themeId, orientation: o}}
            durationInFrames={DUR}
            fps={FPS}
            width={SIZE[o][0]}
            height={SIZE[o][1]}
          />
        ))}
      </Folder>
    ))}
  </>
);
