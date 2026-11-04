# EMS Guide Video — Remotion (React + TypeScript)

A step-by-step product video for **EMS · ប្រព័ន្ធគ្រប់គ្រងព្រឹត្តិការណ៍**, built entirely in React with [Remotion](https://www.remotion.dev).
Output: **1920×1080 · 30 fps · 5035 frames (2:47.8)** with music and UI sound effects.

## Quick start
```bash
npm install
npm run studio      # live preview + timeline scrubbing in the browser
npm run render      # -> out/EMS_Guide.mp4
```
Requires Node 18+. Keep TypeScript on **5.x** — TypeScript 7 breaks Remotion's bundler.
If Remotion cannot download its Chrome, add `--browser-executable=/path/to/chrome` to the render command.

## Project structure
| File | What it contains |
|---|---|
| `src/index.ts`, `src/Root.tsx` | Registers the `EMS` composition and waits for fonts before rendering |
| `src/Main.tsx` | **The timeline**: chapters, step labels, camera moves (`CAM`), cursor path (`PATH`) and clicks (`CLICKS`), page schedule (`PAGES`), wipes, opening, MOC DGKey and QR check-in scenes, closing |
| `src/pages.tsx` | Recreated EMS screens: Login, Dashboard, Events, Event detail, Venues, Chairpersons, Chair roles, Documents, Attendance, Users, Roles, Requests, Activity log, Settings |
| `src/shell.tsx` | Browser window, app shell (sidebar/top bar), product design tokens (light/dark), cards, KPIs, charts, tables, dropdown menus, cursor |
| `src/kit.tsx` | Easing, tween helpers (`P`, `tw`, `life`), icons, EMS logo, word-by-word text reveal |
| `src/fonts.css`, `src/fonts/` | Inter (English) + Kantumruy Pro (Khmer) |
| `public/music.wav` | Soundtrack + sound effects (generated) |
| `music.py` | Regenerates `public/music.wav` from the timings in `Main.tsx` (Python 3, numpy, scipy) |

## Editing tips
- All timings are in **seconds** (`t = frame / 30`). Chapter starts sit on music bars (115 BPM, 1 bar = 2.087 s).
- Change a step label: edit `STEPS` in `Main.tsx`.
- Change camera zooms: edit `CAM` (`fx/fy` = point in the browser window, `s` = scale).
- Change a click: update both `PATH` (cursor position) and `CLICKS` (time), plus the matching page prop (e.g. `typeOpen`, `dlAt`).
- After changing click/step/wipe timings, run `npm run music` so the sound effects follow.
- Use a different Khmer font: drop the `.woff2` in `src/fonts/` and change the `KH` / `KP` `@font-face` rules in `fonts.css`.

All names, emails and figures shown are sample data.
