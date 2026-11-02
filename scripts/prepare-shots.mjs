// Builds public/shots/*.png from the original EMS screenshots (two folders above this project).
// Usage: npm run shots        (re-run after replacing a source screenshot)
// The project path has spaces and the sources have Khmer names, which a shelled-out ffmpeg can't take,
// so ffmpeg only ever sees ASCII temp paths.
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const root = path.resolve(project, '..', '..');
const LP = path.join(root, 'Logo, profile, something');
const AS = path.join(root, 'All Screen');
const out = path.join(project, 'public', 'shots');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ems-shots-'));
fs.mkdirSync(out, {recursive: true});

const PAGE_W = 3200; // 1920 CSS px at 1.667x: enough for a 1.7x camera zoom on a 1600px wide window
const PHONE_W = 900;
const VID = path.join(root, 'Demo EMS Full Options.mp4');
const V02 = path.join(AS, 'IMG_9002.MP4');
const V04 = path.join(AS, '២IMG_9004.MP4');
/** [output name, source file, output width] */
const SHOTS = [
  ['dash', path.join(LP, 'Html → Body after login.png'), PAGE_W],
  ['dash-dark', path.join(LP, 'Html → Body after login dark color.png'), PAGE_W],
  ['dash-skel', path.join(LP, 'Html → Body after login1.png'), PAGE_W],
  ['events', path.join(LP, 'ព្រឹត្តិការណ Sidebar.png'), PAGE_W],
  ...Array.from({length: 10}, (_, i) => [`events-h${i + 1}`, path.join(LP, 'ព្រឹត្តិការណ៍', `Html → Body${i + 1}.png`), PAGE_W]),
  ['detail', path.join(LP, 'កិច្ចប្រជុំតាមដានវឌ្ឍនភាពប្រចាំខែរបស់អគ្គនាយកដ្ឋានក្នុងប្រទេស.png'), PAGE_W],
  ['venues', path.join(LP, 'ទីកន្លែង.png'), PAGE_W],
  ['chairs', path.join(LP, 'អធិបតី.png'), PAGE_W],
  ['chair-roles', path.join(LP, 'តួនាទីអធិបតី.png'), PAGE_W],
  ['docs', path.join(LP, 'បញ្ជីឯកសារ.png'), PAGE_W],
  ['docs-list', path.join(LP, 'បញ្ជីឯកសារ View list.png'), PAGE_W],
  ['attendance', path.join(LP, 'វត្តមាន All list.png'), PAGE_W],
  ['attendance-detail', path.join(LP, 'វត្តមាន All list detail.png'), PAGE_W],
  ['users', path.join(LP, 'អ្នកប្រើប្រាស់.png'), PAGE_W],
  ['roles', path.join(LP, 'តួនាទី និងសិទ្ធិ.png'), PAGE_W],
  ['requests', path.join(LP, 'សំណើ.png'), PAGE_W],
  ['activity', path.join(LP, 'កំណត់ត្រាសកម្មភាព.png'), PAGE_W],
  ['activity-detail', path.join(LP, 'ព័ត៌មានលម្អិតសកម្មភាព.png'), PAGE_W],
  ['settings', path.join(LP, 'ការកំណត់.png'), PAGE_W],
  ['tg-modal', path.join(LP, 'ការកំណត់ with Telegram.png'), PAGE_W],
  ['login-hero', path.join(LP, 'Html → Body → Main.png'), PAGE_W],
  ['phone-scan', path.join(AS, 'Digikey Scan QR.png'), PHONE_W],
  ['phone-consent', path.join(AS, 'Scan Success.png'), PHONE_W],
  ['qr-login', path.join(AS, 'QR Code.png'), 800],
];
/** the Telegram modal is a flat-grey capture: keep only the modal (746x828 at 3200 wide) */
const CROPS = [['event-qr', path.join(LP, 'កិច្ចប្រជុំតាមដានវឌ្ឍនភាពប្រចាំខែរបស់អគ្គនាយកដ្ឋានក្នុងប្រទេស.png'), 'scale=3200:-1:flags=lanczos,crop=250:250:452:2268'],
  ['tg-modal-crop', path.join(LP, 'ការកំណត់ with Telegram.png'), 'scale=3200:-1:flags=lanczos,crop=746:828:1227:586']];
/** [name, video, seconds, filter]: real frames of screen recordings (login card; MOC Officer check-in flow on the phone) */
const FRAMES = [
  ['login-card', VID, 12, 'crop=712:744:642:166'],
  ['ph-home', V04, 13, 'scale=700:-1:flags=lanczos'],
  ['ph-scan', V02, 9, 'scale=700:-1:flags=lanczos'],
  ['ph-review', V04, 5, 'scale=700:-1:flags=lanczos'],
  ['ph-done', V04, 9, 'scale=700:-1:flags=lanczos'],
];

const ffmpeg = (args) => execFileSync('npx', ['remotion', 'ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', ...args], {cwd: project, shell: true, stdio: ['ignore', 'inherit', 'inherit']});
let ok = 0;
for (const [name, src, w] of SHOTS) {
  if (!fs.existsSync(src)) { console.warn(`missing: ${src}`); continue; }
  const tin = path.join(tmp, `${name}.png`);
  fs.copyFileSync(src, tin);
  const tout = path.join(tmp, `${name}.out.png`);
  ffmpeg(['-i', tin, '-vf', `scale=${w}:-1:flags=lanczos`, tout]);
  fs.copyFileSync(tout, path.join(out, `${name}.png`));
  ok++;
}
for (const [name, src, vf] of CROPS) {
  const tin = path.join(tmp, `${name}.png`), tout = path.join(tmp, `${name}.out.png`);
  fs.copyFileSync(src, tin);
  ffmpeg(['-i', tin, '-vf', vf, tout]);
  fs.copyFileSync(tout, path.join(out, `${name}.png`));
  ok++;
}
const copied = new Map();
for (const [name, src, sec, vf] of FRAMES) {
  if (!copied.has(src)) { const t = path.join(tmp, `v${copied.size}.mp4`); fs.copyFileSync(src, t); copied.set(src, t); }
  const tout = path.join(tmp, `${name}.out.png`);
  ffmpeg(['-ss', String(sec), '-i', copied.get(src), '-frames:v', '1', '-vf', vf, tout]);
  fs.copyFileSync(tout, path.join(out, `${name}.png`));
  ok++;
}
fs.rmSync(tmp, {recursive: true, force: true});
console.log(`${ok}/${SHOTS.length + CROPS.length + FRAMES.length} shots -> ${path.relative(project, out)}`);
