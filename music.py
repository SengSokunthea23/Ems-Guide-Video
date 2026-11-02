"""Bright, minimal 'Meta-style' product-film music + soft UI sound design.
115 BPM, D major, beat grid aligned so bar downbeats land on the edit's big moments (35.95 s, 150.75 s)."""
import numpy as np, re
from scipy.signal import fftconvolve, butter, sosfilt
from scipy.io import wavfile
sr = 44100; DUR = 167.84; N = int(sr * DUR)
rng = np.random.default_rng(11)
BPM = 115; B = 60 / BPM; BAR = 4 * B; OFF = 0.0
def bar(k): return OFF + k * BAR
def T(d): return np.arange(int(d * sr)) / sr
def lp(x, f, o=2): return sosfilt(butter(o, f, 'low', fs=sr, output='sos'), x)
def hp(x, f, o=2): return sosfilt(butter(o, f, 'high', fs=sr, output='sos'), x)
def bp(x, a, b, o=2): return sosfilt(butter(o, [a, b], 'band', fs=sr, output='sos'), x)
def put(buf, t0, sig, g=1.0, pan=0.0):
    i = int(round(t0 * sr))
    if i >= N: return
    if i < 0: sig = sig[-i:]; i = 0
    e = min(N, i + len(sig)); sig = sig[:e - i]
    l, r = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4)
    buf[0, i:e] += sig * g * l; buf[1, i:e] += sig * g * r
mtof = lambda m: 440 * 2 ** ((m - 69) / 12)

# ---------------- instruments ----------------
def kick():
    t = T(.38); f = 48 + 70 * np.exp(-t * 32); ph = 2 * np.pi * np.cumsum(f) / sr
    return np.sin(ph) * np.exp(-t * 10) * 1.0 + lp(rng.standard_normal(len(t)), 2500) * np.exp(-t * 300) * .2
def snap():
    t = T(.22); n = bp(rng.standard_normal(len(t)), 1500, 6000)
    env = np.zeros_like(t)
    for k in (0, .008, .016): env += np.exp(-np.clip(t - k, 0, None) * 160) * (t >= k)
    env += np.exp(-t * 28) * .35
    return n * env * .55
def shaker(acc=1.0):
    t = T(.09); return hp(rng.standard_normal(len(t)), 6500) * np.sin(np.pi * np.clip(t / .09, 0, 1)) ** 2 * .22 * acc
def sub(f, d):
    t = T(d); e = np.minimum(1, t / .012) * np.minimum(1, np.clip((d - t) / .06, 0, 1)) * np.exp(-t * .9)
    return np.tanh((np.sin(2 * np.pi * f * t) + .18 * np.sin(4 * np.pi * f * t)) * 1.3) * e * .55
def marimba(f, d=.6):
    t = T(d)
    s = np.sin(2 * np.pi * f * t) * np.exp(-t * 7) + .45 * np.sin(2 * np.pi * f * 4 * t) * np.exp(-t * 26) + .15 * np.sin(2 * np.pi * f * 10 * t) * np.exp(-t * 60)
    return s * np.minimum(1, t / .002) * .35
def ep(freqs, d):  # warm electric piano chord
    t = T(d); s = np.zeros_like(t)
    for f in freqs:
        s += (np.sin(2 * np.pi * f * t + .8 * np.sin(2 * np.pi * f * t) * np.exp(-t * 4)) * np.exp(-t * 1.1))
    e = np.minimum(1, t / .01) * np.minimum(1, np.clip((d - t) / .25, 0, 1))
    return lp(s, 3200) * e * .16 / max(1, len(freqs) / 3)
def pad(freqs, d):
    t = T(d); s = np.zeros_like(t)
    for f in freqs:
        for det in (-.003, 0, .003):
            s += np.sin(2 * np.pi * f * (1 + det) * t) + .3 * np.sin(2 * np.pi * 2 * f * (1 + det) * t)
    e = np.minimum(1, t / 1.0) * np.minimum(1, np.clip((d - t) / 1.2, 0, 1))
    return lp(s, 1800) * e * .035
def bell(f, d=2.2):
    t = T(d); s = sum(a * np.sin(2 * np.pi * f * k * t) * np.exp(-t * dc) for k, a, dc in ((1, 1, 2.0), (2.0, .35, 3.0), (3.01, .15, 4.5), (4.2, .08, 7)))
    return s * np.minimum(1, t / .003) * .22
def riser(d):
    t = T(d); x = t / d
    n = bp(rng.standard_normal(len(t)), 800, 9000) * x ** 2.2
    f = 300 * np.exp(np.log(6) * x ** 1.5); tone = np.sin(2 * np.pi * np.cumsum(f) / sr) * .15 * x ** 2
    return (n * .5 + tone) * .6

# ---------------- harmony: D  A  Bm  G ----------------
PROG = [(62, [62, 66, 69, 74]), (57, [61, 64, 69, 73]), (59, [62, 66, 71, 74]), (55, [59, 62, 67, 71])]
ARP = [0, 2, 1, 3, 2, 1, 3, 2]
mus = np.zeros((2, N)); verb = np.zeros((2, N)); duck = np.ones(N)

def section(k):
    if k < 4: return 'intro'
    if k in (15, 44, 52): return 'build'
    if k >= 77: return 'outro'
    if 53 <= k < 60: return 'finale'
    if 11 <= k < 15 or 39 <= k < 44 or 30 <= k < 33: return 'light'
    if 16 <= k < 25 or 45 <= k < 52 or 72 <= k < 77: return 'full'
    return 'groove'

nb = int((DUR - OFF) / BAR) + 2
for k in range(-1, nb):
    t0 = bar(k); sec = section(k)
    root, ch = PROG[k % 4]
    cf = [mtof(m) for m in ch]
    if t0 > DUR: break
    if sec == 'outro':
        continue
    # chords
    put(mus, t0, ep(cf, BAR), 1.0); put(verb, t0, ep(cf, BAR), .5)
    if sec in ('full', 'finale', 'light', 'intro'):
        put(mus, t0, pad([f / 2 for f in cf], BAR + .6), 1.0); put(verb, t0, pad([f / 2 for f in cf], BAR + .6), .6)
    # marimba arp (8ths)
    if sec != 'build' or True:
        for i in range(8):
            if sec == 'intro' and i % 2: continue
            m = ch[ARP[i]] + 12
            g = .9 if i % 2 == 0 else .6
            put(mus, t0 + i * B / 2, marimba(mtof(m)), g * (.8 if sec == 'light' else 1), pan=(-.35 if i % 2 else .35))
            put(verb, t0 + i * B / 2, marimba(mtof(m)), .25)
    if sec == 'intro': continue
    # bass
    if sec != 'build':
        for i, (pos, dur) in enumerate([(0, 1.5), (1.5, .5), (2, 1.5), (3.5, .5)]):
            put(mus, t0 + pos * B, sub(mtof(root - 12 if i % 2 == 0 else root), dur * B), .9)
    # drums
    kick_on = sec in ('groove', 'full', 'finale')
    for beat in range(4):
        tb = t0 + beat * B
        if kick_on:
            put(mus, tb, kick(), .9)
            i = int(tb * sr); d = int(.22 * sr)
            if i < N: duck[i:i + d] = np.minimum(duck[i:i + d], 1 - .45 * np.exp(-np.arange(min(d, N - i)) / sr * 14))
        if beat in (1, 3) and sec != 'build':
            put(mus, tb, snap(), .7 if sec != 'light' else .5); put(verb, tb, snap(), .35)
        for s16 in range(4):
            if sec in ('full', 'finale', 'groove', 'light', 'build'):
                put(mus, tb + s16 * B / 4 + .006 * (s16 % 2), shaker(1.0 if s16 == 2 else .55), .8 if sec != 'build' else .5, pan=.25)

# build into the finale + finale melody
for kb in (15, 44, 52): put(mus, bar(kb) + BAR * .25, riser(BAR * .75), .8)
MEL = [(0, 78, 1), (1, 76, .5), (1.5, 74, .5), (2, 76, 1), (3, 81, 1)]
for k in range(53, 60):
    for pos, m, d in MEL:
        put(mus, bar(k) + pos * B, bell(mtof(m + (0 if k % 2 == 0 else -2))), .55, pan=.15)
        put(verb, bar(k) + pos * B, bell(mtof(m)), .3)
# outro resolve on the logo
to = bar(77) + 0.0
put(mus, to, ep([mtof(m) for m in (62, 66, 69, 74, 78)], 4.2), 1.3); put(verb, to, ep([mtof(m) for m in (62, 66, 69, 74)], 4), .8)
put(mus, to, pad([mtof(m) for m in (50, 57, 62, 66)], 4.0), 1.4)
put(mus, to, sub(mtof(38), 3.5), .9); put(mus, to, bell(mtof(74), 3.5), .7); put(mus, to + B, bell(mtof(78), 3.0), .5); put(mus, to + 2 * B, bell(mtof(81), 3.0), .45)
put(mus, bar(3), riser(BAR), .55)

# reverb
ir_t = T(2.4); ir = rng.standard_normal((2, len(ir_t))) * np.exp(-ir_t * 2.6); ir[:, :int(.02 * sr)] = 0
for c in range(2): mus[c] += fftconvolve(lp(verb[c], 6000), ir[c])[:N] * .05
mus *= duck
# gentle fade in / out
env = np.ones(N); fi = int(.8 * sr); env[:fi] = np.linspace(0, 1, fi); fo = int(1.4 * sr); env[-fo:] = np.linspace(1, 0, fo) ** 1.5
mus *= env
mus = np.tanh(mus / np.abs(mus).max() * 1.6) / np.tanh(1.6) * .78

# ---------------- Meta-style UI sound design (soft, round, tonal) ----------------
sfx = np.zeros((2, N))
def bubble(f0=900):  # round pop
    t = T(.14); f = f0 * (1 + .9 * np.exp(-t * 60)); ph = 2 * np.pi * np.cumsum(f) / sr
    return np.sin(ph) * np.exp(-t * 34) * np.minimum(1, t / .002) * .5
def tap():  # soft muted tap
    t = T(.06); return lp(np.sin(2 * np.pi * 620 * t) * np.exp(-t * 90) + .3 * rng.standard_normal(len(t)) * np.exp(-t * 400), 3000) * .6
def swish(d=.55, up=True):  # airy, band-limited
    t = T(d); x = t / d; n = rng.standard_normal(len(t))
    lo, hi = bp(n, 500, 2000), bp(n, 2000, 7000)
    w = x if up else 1 - x
    s = lo * (1 - w) + hi * w
    return s * np.sin(np.pi * x) ** 2 * .45
def chime(notes=(76, 83), gap=.09):  # positive two-note confirmation
    out = np.zeros(int(1.4 * sr))
    for i, m in enumerate(notes):
        b = bell(mtof(m), 1.2); j = int(i * gap * sr); out[j:j + len(b)] += b[:len(out) - j]
    return out * 1.6
def soft_hit():
    t = T(1.2); f = 70 + 50 * np.exp(-t * 18); s = np.sin(2 * np.pi * np.cumsum(f) / sr) * np.exp(-t * 4)
    return s * .7 + lp(rng.standard_normal(len(t)), 1200) * np.exp(-t * 30) * .15

src = open('src/timeline/timeline.ts', encoding='utf-8').read()
def arr(name):
    seg = re.search(r'export const %s[^=]*= \[(.*?)\];' % name, src, re.S).group(1)
    return [float(x) for x in re.findall(r'(?<![\w.])(\d+\.?\d*)', seg)]
clicks = arr('CLICKS'); chimes = arr('CHIMES'); wipes = arr('WIPES')
steps = [float(x) for x in re.findall(r'\[(\d+\.?\d*), \'', src[src.index('export const STEPS'):src.index('/* ======================= window camera')])]
for t in clicks: put(sfx, t, tap(), .55, pan=.1)
for t in steps: put(sfx, t, bubble(860 + rng.integers(0, 240)), .32, pan=.3)
for t in chimes: put(sfx, t, chime(), .5)
for t in wipes: put(sfx, t - .5, swish(.7, True), .8); put(sfx, t + .6, swish(.6, False), .55); put(sfx, t, soft_hit(), .5)
for t in [6.9, 22.96, 119.9, 160.7]: put(sfx, t, swish(.8), .5)
cams = [float(x) for x in re.findall(r'\{at: (\d+\.?\d*), d:', src[src.index('const CAM'):src.index('const pose')])]
for t in cams[2:]: put(sfx, t, swish(.5), .18)
put(sfx, .6, soft_hit(), .35); put(sfx, 161.0, chime((74, 78, 81), .1), .5)
mix = mus + sfx
mix = mix / max(1, np.abs(mix).max() / .95)
wavfile.write('public/music.wav', sr, (mix.T * 32767).astype(np.int16))
print('ok', np.sqrt((mix ** 2).mean()))
