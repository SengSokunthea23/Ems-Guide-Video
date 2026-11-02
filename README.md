# EMS Guide Video — Remotion (React + TypeScript)

A step-by-step product video for **EMS · ប្រព័ន្ធគ្រប់គ្រងព្រឹត្តិការណ៍**, built entirely in React with [Remotion](https://www.remotion.dev).
Output: **1920×1080 · 30 fps · 5035 frames (2:47.8)** with music and UI sound effects.

## Quick start
```bash
npm install
npm run studio      # live preview; edit Props (theme / orientation) in the side panel, queue renders in the Render tab
npm run render      # -> out/EMS_Guide.mp4  (EMS-Navy-Landscape)
npx remotion render src/index.ts EMS-Royal-Portrait out/royal_portrait.mp4
```
Requires Node 18+. Keep TypeScript on **5.x** and `zod` on **3.22.3** (Remotion 4.0.250).
If Remotion cannot download its Chrome, add `--browser-executable=/path/to/chrome` to the render command.

## Compositions
6 compositions `EMS-{Navy,Ocean,Royal}-{Landscape,Portrait}` (Landscape 1920x1080, Portrait 1080x1920), all 30 fps, 5035 frames, sharing one timeline and soundtrack. Props (`themeId`, `orientation`) are defined by `videoSchema` in `src/Video.tsx`.

## Real screenshots (not used right now)
An experiment replaced the coded pages with real captures of ems-admin.moc.gov.kh and was reverted: Landscape uses the coded pages again. The pieces are still in the repo, unused: `npm run shots` (builds `public/shots/` from the original screenshots), `src/app/shots/`, `src/stage/{ShotPages,ShotLogin,PhoneShot}.tsx`. Delete them together with `public/shots/` if they are not needed.

## Project structure
| Folder | What it contains |
|---|---|
| `src/Root.tsx`, `src/Video.tsx` | Registers the compositions, font gate, zod schema, theme provider |
| `src/theme/` | `navy.ts`, `ocean.ts`, `royal.ts` (stage + app light/dark tokens), types, context |
| `src/timeline/timeline.ts` | Shared timeline: chapters, steps, camera (`CAM`), cursor path, clicks, wipes |
| `src/layouts/` | `LandscapeVideo`, `PortraitVideo` |
| `src/stage/` | Landscape scenes (window, opening, verify, check-in, wipes, closing) |
| `src/stage/portrait/` | Portrait scenes: top title/step header, phone-sized viewport, tap markers, mobile page schedule |
| `src/app/`, `src/app/mobile/` | Browser window, desktop shell, primitives, charts; mobile shell, drawer, bottom sheet |
| `src/pages/desktop/`, `src/pages/mobile/` | Recreated EMS screens for each orientation; `pages/data.ts` holds the shared sample data |
| `src/lib/`, `src/ui/` | Easing/tween helpers, icons, logo, QR |
| `public/music.wav`, `music.py` | Soundtrack; `music.py` reads `src/timeline/timeline.ts` |

## Editing tips
- All timings are in **seconds** (`t = frame / 30`). Chapter starts sit on music bars (115 BPM, 1 bar = 2.087 s).
- Change a step label: edit `STEPS` in `src/timeline/timeline.ts`.
- Landscape camera zooms: edit `CAM` (`fx/fy` = point in the browser window, `s` = scale).
- Portrait: scroll positions live in each mobile page (`sc(...)`), viewport moves in `MCAM` (`ViewportLayer.tsx`), taps in `TAPS`.
- Add a theme: copy `src/theme/ocean.ts`, register it in `theme/index.ts` and add its id to `ThemeId` and `videoSchema`.
- Change a click: update both `PATH` (cursor position) and `CLICKS` (time), plus the matching page prop (e.g. `typeOpen`, `dlAt`).
- After changing click/step/wipe timings, run `npm run music` so the sound effects follow.
- Use a different Khmer font: drop the `.woff2` in `src/fonts/` and change the `KH` / `KP` `@font-face` rules in `fonts.css`.

All names, emails and figures shown are sample data.
