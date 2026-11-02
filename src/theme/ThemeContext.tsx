import React from 'react';
import {LIGHT, NAVY} from './navy';
import type {Th, Theme} from './types';

/** the video-wide theme */
export const ThemeCtx = React.createContext<Theme>(NAVY);
export const useTheme = () => React.useContext(ThemeCtx);
/** the active product palette: AppShell switches it between light and dark */
export const ThCtx = React.createContext<Th>(LIGHT);
export const useTh = () => React.useContext(ThCtx);
