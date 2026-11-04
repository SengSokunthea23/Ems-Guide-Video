import React from 'react';
import {AbsoluteFill, Audio, staticFile, useCurrentFrame} from 'remotion';
import {FPS} from '../lib/anim';
import {Background} from '../stage/Background';
import {CheckIn} from '../stage/CheckIn';
import {Closing} from '../stage/Closing';
import {ComputerIntro} from '../stage/ComputerIntro';
import {Header} from '../stage/Header';
import {Opening} from '../stage/Opening';
import {Progress} from '../stage/Progress';
import {Sheet} from '../stage/Sheet';
import {Verify} from '../stage/Verify';
import {Wipe} from '../stage/Wipe';
import {WindowLayer} from '../stage/WindowLayer';
import {useTheme} from '../theme/ThemeContext';

export const LandscapeVideo: React.FC = () => {
  const {stage} = useTheme();
  const t = useCurrentFrame() / FPS;
  return (
    <AbsoluteFill style={{background: stage.bg0}}>
      <Background t={t} />
      <WindowLayer t={t} />
      <ComputerIntro t={t} />
      <Opening t={t - 8.15} compact />
      <Verify t={t} />
      <CheckIn t={t} />
      <Sheet t={t} />
      {t >= 10.6 && <Header t={t} />}
      {t >= 10.6 && <Progress t={t} />}
      <Wipe t={t} T={33.39} n="03" kh="ផ្ទាំងគ្រប់គ្រង" en="Dashboard" />
      <Wipe t={t} T={93.91} n="07" kh="វត្តមាន" en="Attendance" />
      <Wipe t={t} T={110.61} n="08" kh="ចុះវត្តមានតាម QR" en="QR check-in" />
      <Closing t={t} />
      <Audio src={staticFile('music.wav')} />
    </AbsoluteFill>);
};
