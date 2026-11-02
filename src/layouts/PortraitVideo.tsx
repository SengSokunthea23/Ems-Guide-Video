import React from 'react';
import {AbsoluteFill, Audio, staticFile, useCurrentFrame} from 'remotion';
import {FPS} from '../lib/anim';
import {Background} from '../stage/Background';
import {HeaderP, ProgressP} from '../stage/portrait/HeaderP';
import {CheckInP, ClosingP, OpeningP, SheetP, VerifyP} from '../stage/portrait/ScenesP';
import {ViewportLayer} from '../stage/portrait/ViewportLayer';
import {Wipe} from '../stage/Wipe';
import {useTheme} from '../theme/ThemeContext';

/** 1080x1920: title and step caption on top, phone-sized app below. Same timeline as the landscape cut. */
export const PortraitVideo: React.FC = () => {
  const {stage} = useTheme();
  const t = useCurrentFrame() / FPS;
  return (
    <AbsoluteFill style={{background: stage.bg0}}>
      <Background t={t} />
      <ViewportLayer t={t} />
      <VerifyP t={t} />
      <CheckInP t={t} />
      <SheetP t={t} />
      <OpeningP t={t} />
      <HeaderP t={t} />
      <ProgressP t={t} />
      <Wipe t={t} T={33.39} n="03" kh="ផ្ទាំងគ្រប់គ្រង" en="Dashboard" />
      <Wipe t={t} T={93.91} n="07" kh="វត្តមាន" en="Attendance" />
      <Wipe t={t} T={110.61} n="08" kh="ចុះវត្តមានតាម QR" en="QR check-in" />
      <ClosingP t={t} />
      <Audio src={staticFile('music.wav')} />
    </AbsoluteFill>);
};
