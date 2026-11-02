import React from 'react';
import {z} from 'zod';
import {LandscapeVideo} from './layouts/LandscapeVideo';
import {PortraitVideo} from './layouts/PortraitVideo';
import {THEMES} from './theme';
import {ThemeCtx} from './theme/ThemeContext';

/** props editable in Remotion Studio's side panel (and via --props when rendering) */
export const videoSchema = z.object({
  themeId: z.enum(['navy', 'ocean', 'royal']),
  orientation: z.enum(['landscape', 'portrait']),
});
export type VideoProps = z.infer<typeof videoSchema>;

export const Video: React.FC<VideoProps> = ({themeId, orientation}) => (
  <ThemeCtx.Provider value={THEMES[themeId]}>
    {orientation === 'portrait' ? <PortraitVideo /> : <LandscapeVideo />}
  </ThemeCtx.Provider>
);
