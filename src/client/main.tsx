import './styles.css';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { getDailyPrompts, getNewYorkDateKey, formatDay, ROUND_SECONDS, MAX_SCORE, type Prompt } from '../shared/game';

type Entry = { promptId: string; answer: string; score: number; tier: string; note: string; signalSeed?: number };
type ReceiverPaths = { carrier: string };

function receiverFrequency(seed: number): string {
  return (88 + ((Math.floor(seed) >>> 0) % 2000) / 100).toFixed(1);
}

function buildReceiverPaths(seed: number, score: number): ReceiverPaths {
  let state = (Math.floor(seed) >>> 0) || 1;
  const random = () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };

  // Keep the carrier readable: vary its frequency and phase, not its basic shape.
  const cycles = 3.1 + random() * 2.4;
  const phase = random() * Math.PI * 2;
  const harmonicPhase = random() * Math.PI * 2;
  const harmonic = .1 + random() * .16;
  const detail = .025 + random() * .055;
  const amplitude = 10 + Math.max(0, Math.min(100, score)) * .3;

  const carrierPoints = Array.from({ length: 73 }, (_, index) => {
    const x = index * 10;
    const angle = phase + (index / 72) * cycles * Math.PI * 2;
    const wave = Math.sin(angle)
      + harmonic * Math.sin(angle * 2 + harmonicPhase)
      + detail * Math.sin(angle * 3 + phase * .7);
    const y = 90 - amplitude * wave;
    return { x, y: Math.max(14, Math.min(166, y)) };
  });
  const carrier = carrierPoints.map((point, index) =>
    `${index ? 'L' : 'M'}${point.x.toFixed(1)} ${point.y.toFixed(1)}`
  ).join(' ');

  return { carrier };
}
type RunState = {
  dateKey: string;
  phase: 'ready' | 'playing' | 'reveal' | 'complete';
  index: number;
  entries: Entry[];
  deadline: number | null;
  isTest?: boolean;
};
type LeaderboardRow = { name: string; score: number };

const MOCK_BOARD: LeaderboardRow[] = [
  { name: 'northstar', score: 612 },
  { name: 'echo.static', score: 575 },
  { name: 'mira_07', score: 540 },
  { name: 'orbitalmind', score: 488 },
  { name: 'YOU', score: 0 }
];
const DEMO_MODE = import.meta.env.MODE === 'pages';
const TEST_TIERS = [
  { score: 10, label: 'BACKGROUND' },
  { score: 15, label: 'FAMILIAR' },
  { score: 30, label: 'UNCOMMON' },
  { score: 60, label: 'RARE' },
  { score: 85, label: 'DEEP CUT' },
  { score: 100, label: 'SIGNAL FOUND' }
];

function blankRun(dateKey: string): RunState {
  return { dateKey, phase: 'ready', index: 0, entries: [], deadline: null };
}

function loadRun(dateKey: string): RunState {
  try {
    const raw = localStorage.getItem('signal:run:' + dateKey);
    if (!raw) return blankRun(dateKey);
    const saved = JSON.parse(raw) as Partial<RunState>;
    if (saved.dateKey !== dateKey || !Array.isArray(saved.entries)) return blankRun(dateKey);
    if (!['ready', 'playing', 'reveal', 'complete'].includes(String(saved.phase))) return blankRun(dateKey);
    const entries = saved.entries.slice(0, 7).filter((entry): entry is Entry => Boolean(
      entry && typeof entry === 'object'
      && typeof entry.promptId === 'string'
      && typeof entry.answer === 'string'
      && Number.isFinite(entry.score)
      && typeof entry.tier === 'string'
      && typeof entry.note === 'string'
    )).map((entry) => ({
      promptId: entry.promptId.slice(0, 80),
      answer: entry.answer.slice(0, 80),
      score: Math.max(0, Math.min(100, Math.floor(entry.score))),
      tier: entry.tier.slice(0, 32),
      note: entry.note.slice(0, 240),
      ...(Number.isFinite(entry.signalSeed) ? { signalSeed: entry.signalSeed } : {})
    }));
    const phase = saved.phase as RunState['phase'];
    const index = Number.isInteger(saved.index) ? Math.max(0, Math.min(6, saved.index as number)) : 0;
    const deadline = typeof saved.deadline === 'number' && Number.isFinite(saved.deadline) ? saved.deadline : null;
    if (phase === 'playing' && deadline === null) return blankRun(dateKey);
    if (phase === 'complete' && entries.length !== 7) return blankRun(dateKey);
    if (phase === 'reveal' && entries.length !== index + 1) return blankRun(dateKey);
    return { dateKey, phase, index, entries, deadline, isTest: Boolean(saved.isTest) };
  } catch {
    return blankRun(dateKey);
  }
}

function SignalIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="3.2" fill="currentColor" />
      <path d="M15 15a13 13 0 0 0 0 18M33 15a13 13 0 0 1 0 18M9.5 9.5a20.5 20.5 0 0 0 0 29M38.5 9.5a20.5 20.5 0 0 1 0 29" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function MountainScene() {
  return (
    <svg className="mountain-scene" viewBox="0 0 1440 640" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#07121f" /><stop offset="55%" stopColor="#172c48" /><stop offset="100%" stopColor="#37516a" />
        </linearGradient>
        <linearGradient id="ridge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7890a2" /><stop offset="35%" stopColor="#33475c" /><stop offset="100%" stopColor="#0a1724" />
        </linearGradient>
        <linearGradient id="dish" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9cb4c1" /><stop offset="42%" stopColor="#425a6b" /><stop offset="100%" stopColor="#142839" />
        </linearGradient>
        <radialGradient id="glow"><stop offset="0%" stopColor="#5bd8e8" stopOpacity=".28" /><stop offset="100%" stopColor="#5bd8e8" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width="1440" height="640" fill="url(#sky)" />
      <circle cx="990" cy="170" r="310" fill="url(#glow)" />
      <g fill="#d7e8f4" opacity=".75">
        <circle cx="145" cy="74" r="1.5"/><circle cx="211" cy="128" r="1.2"/><circle cx="310" cy="58" r="1.6"/><circle cx="405" cy="172" r="1.1"/>
        <circle cx="520" cy="92" r="1.4"/><circle cx="618" cy="48" r="1.1"/><circle cx="723" cy="123" r="1.8"/><circle cx="812" cy="63" r="1.2"/>
        <circle cx="905" cy="106" r="1.1"/><circle cx="1120" cy="52" r="1.5"/><circle cx="1205" cy="144" r="1.1"/><circle cx="1342" cy="76" r="1.7"/>
        <circle cx="1040" cy="212" r="1.1"/><circle cx="880" cy="205" r="1.3"/><circle cx="664" cy="220" r="1.2"/><circle cx="343" cy="209" r="1.4"/>
      </g>
      <path d="M0 430 115 312 210 392 330 240 450 390 570 270 700 402 820 240 940 386 1080 225 1200 385 1325 290 1440 410V640H0Z" fill="#203449"/>
      <path d="m270 304 60-64 55 72-31-17-24 18-25-17-18 16zM770 302l50-62 48 71-29-18-23 18-23-13zM1030 290l50-65 57 79-31-18-24 22-25-20z" fill="#cad7dd" opacity=".82"/>
      <path d="M0 480 130 390 225 458 355 340 500 470 650 352 790 478 945 360 1105 480 1250 375 1440 490V640H0Z" fill="url(#ridge)"/>
      <path d="M0 520Q180 450 340 508T680 500T1020 498T1440 500V640H0Z" fill="#0b1a27"/>
      <g fill="#07131d">
        <path d="M65 540 88 468 112 540zM88 540 112 450 138 540zM180 550 206 470 232 550zM285 565 315 464 345 565zM1180 550 1206 465 1232 550zM1280 555 1310 445 1340 555zM1370 550 1390 480 1410 550z"/>
      </g>
      <g transform="translate(1010 185)">
        <path d="M-10 240 0 80 13 240Z" fill="#293c4d"/>
        <path d="M-95 112Q-28 -40 95 25Q82 153-95 112Z" fill="url(#dish)" stroke="#9bb6c7" strokeWidth="5"/>
        <path d="M-95 112Q-28 -40 95 25" fill="none" stroke="#d0e0e8" strokeWidth="3" opacity=".65"/>
        <path d="M-75 94 78 42M-58 105 58 68M-38 111 32 89M-17 115 12 108M-58 33 29 126M-26 0 52 112M10 2 74 75" stroke="#718da0" strokeWidth="2" opacity=".8"/>
        <path d="M0 81 30 125 56 172M-4 92-34 140-56 173" stroke="#d17b43" strokeWidth="4"/>
        <circle cx="0" cy="81" r="5" fill="#f4a453"/>
        <path d="M0 240h72M-30 240h-35" stroke="#526d81" strokeWidth="8" strokeLinecap="round"/>
      </g>
      <g transform="translate(740 470)" opacity=".9">
        <rect width="220" height="84" rx="8" fill="#102231" stroke="#426176" strokeWidth="3"/>
        <path d="M18 0v-35h185v35" fill="#182f40" stroke="#526d7c" strokeWidth="3"/>
        <path d="M30 53h25v-21h28v21h25v-21h28v21h30" fill="none" stroke="#f2a24b" strokeWidth="3"/>
        <path d="M40 34h10M94 34h10M150 34h10" stroke="#ffbd73" strokeWidth="4"/>
        <path d="M54 84v18M166 84v18" stroke="#050b12" strokeWidth="7"/>
      </g>
    </svg>
  );
}

type TuningPhase = 'searching' | 'tracking' | 'locking' | 'surging' | 'slipping' | 'recovering' | 'locked' | 'failed';

type ReceiverBed = { gain: GainNode; sources: Array<OscillatorNode | AudioBufferSourceNode> };
type NoteShape = { attack?: number; overtone?: number; brightness?: number; pan?: number; bendTo?: number };

let signalAudioEnabled = true;
let signalAudioContext: AudioContext | null = null;
let signalMasterGain: GainNode | null = null;
let receiverBed: ReceiverBed | null = null;

function getSignalAudioContext(): AudioContext | null {
  if (typeof window === 'undefined' || typeof AudioContext === 'undefined') return null;
  try {
    if (!signalAudioContext) {
      signalAudioContext = new AudioContext();
      signalMasterGain = signalAudioContext.createGain();
      signalMasterGain.gain.value = signalAudioEnabled ? .48 : .0001;
      signalMasterGain.connect(signalAudioContext.destination);
    }
    if (signalAudioContext.state === 'suspended') void signalAudioContext.resume().catch(() => undefined);
    return signalAudioContext;
  } catch {
    return null;
  }
}

function scheduleNote(
  context: AudioContext,
  frequency: number,
  startAt: number,
  duration: number,
  volume: number,
  shape: NoteShape = {}
): void {
  if (!signalMasterGain || !signalAudioEnabled || frequency <= 0 || duration <= 0) return;
  const attack = Math.min(shape.attack ?? .12, duration * .42);
  const voice = context.createGain();
  const filter = context.createBiquadFilter();
  const panner = context.createStereoPanner();
  const fundamental = context.createOscillator();
  const overtone = context.createOscillator();
  const overtoneLevel = context.createGain();

  fundamental.type = 'sine';
  fundamental.frequency.setValueAtTime(frequency, startAt);
  if (shape.bendTo && shape.bendTo > 0) {
    fundamental.frequency.exponentialRampToValueAtTime(shape.bendTo, startAt + duration * .82);
  }
  overtone.type = 'sine';
  overtone.frequency.setValueAtTime(frequency * 2.002, startAt);
  overtoneLevel.gain.setValueAtTime(shape.overtone ?? .12, startAt);
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(shape.brightness ?? 1900, startAt);
  filter.Q.setValueAtTime(.55, startAt);
  panner.pan.setValueAtTime(Math.max(-.45, Math.min(.45, shape.pan ?? 0)), startAt);

  voice.gain.setValueAtTime(.0001, startAt);
  voice.gain.linearRampToValueAtTime(volume, startAt + attack);
  voice.gain.setValueAtTime(volume * .72, startAt + attack + Math.min(.08, duration * .1));
  voice.gain.exponentialRampToValueAtTime(.0001, startAt + duration);

  fundamental.connect(voice);
  overtone.connect(overtoneLevel);
  overtoneLevel.connect(voice);
  voice.connect(filter);
  filter.connect(panner);
  panner.connect(signalMasterGain);
  fundamental.start(startAt);
  overtone.start(startAt);
  fundamental.stop(startAt + duration + .04);
  overtone.stop(startAt + duration + .04);
}

function makeSoftNoiseBuffer(context: AudioContext, seconds: number): AudioBuffer {
  const frameCount = Math.max(1, Math.floor(context.sampleRate * seconds));
  const buffer = context.createBuffer(1, frameCount, context.sampleRate);
  const channel = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < frameCount; i++) {
    const white = Math.random() * 2 - 1;
    last = last * .78 + white * .22;
    channel[i] = last * .7;
  }
  return buffer;
}

function scheduleTuningSweep(context: AudioContext): void {
  if (!signalMasterGain || !signalAudioEnabled) return;
  const now = context.currentTime;
  const source = context.createBufferSource();
  const band = context.createBiquadFilter();
  const highPass = context.createBiquadFilter();
  const envelope = context.createGain();
  source.buffer = makeSoftNoiseBuffer(context, .95);
  highPass.type = 'highpass';
  highPass.frequency.setValueAtTime(180, now);
  band.type = 'bandpass';
  band.Q.setValueAtTime(.62, now);
  band.frequency.setValueAtTime(420, now);
  band.frequency.exponentialRampToValueAtTime(1450, now + .88);
  envelope.gain.setValueAtTime(.0001, now);
  envelope.gain.linearRampToValueAtTime(.008, now + .24);
  envelope.gain.exponentialRampToValueAtTime(.0001, now + .94);
  source.connect(highPass);
  highPass.connect(band);
  band.connect(envelope);
  envelope.connect(signalMasterGain);
  source.start(now);
  source.stop(now + .98);
}

function playSoftUiCue(): void {
  if (!signalAudioEnabled) return;
  const context = getSignalAudioContext();
  if (!context) return;
  const now = context.currentTime;
  // A small, rounded two-part wooden/plucked tick, not a notification beep.
  scheduleNote(context, 392, now, .16, .009, { attack: .008, overtone: .22, brightness: 1350, pan: -.08 });
  scheduleNote(context, 587.33, now + .035, .22, .005, { attack: .012, overtone: .1, brightness: 1700, pan: .08 });
}

function startReceiverBed(context: AudioContext): void {
  if (receiverBed || !signalMasterGain || !signalAudioEnabled) return;
  const now = context.currentTime;
  const mix = context.createGain();
  const bedGain = context.createGain();
  const airFilter = context.createBiquadFilter();
  const lfo = context.createOscillator();
  const lfoDepth = context.createGain();
  const sources: Array<OscillatorNode | AudioBufferSourceNode> = [];

  airFilter.type = 'bandpass';
  airFilter.frequency.setValueAtTime(720, now);
  airFilter.Q.setValueAtTime(.48, now);
  lfo.frequency.setValueAtTime(.075, now);
  lfoDepth.gain.setValueAtTime(155, now);
  lfo.connect(lfoDepth);
  lfoDepth.connect(airFilter.frequency);
  lfo.start(now);
  sources.push(lfo);

  const air = context.createBufferSource();
  const airLevel = context.createGain();
  air.buffer = makeSoftNoiseBuffer(context, 2);
  air.loop = true;
  airLevel.gain.setValueAtTime(.12, now);
  air.connect(airFilter);
  airFilter.connect(airLevel);
  airLevel.connect(mix);
  air.start(now);
  sources.push(air);

  // Low, gently beating tones give the station a sense of power without a loud hum.
  [73.42, 110, 146.83].forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const level = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, now);
    level.gain.setValueAtTime([.24, .13, .045][index], now);
    oscillator.connect(level);
    level.connect(mix);
    oscillator.start(now);
    sources.push(oscillator);
  });

  bedGain.gain.setValueAtTime(.0001, now);
  bedGain.gain.exponentialRampToValueAtTime(.0075, now + 1.1);
  mix.connect(bedGain);
  bedGain.connect(signalMasterGain);
  receiverBed = { gain: bedGain, sources };
}

function stopReceiverBed(): void {
  if (!receiverBed || !signalAudioContext) return;
  const bed = receiverBed;
  receiverBed = null;
  const now = signalAudioContext.currentTime;
  bed.gain.gain.cancelScheduledValues(now);
  bed.gain.gain.setTargetAtTime(.0001, now, .18);
  bed.sources.forEach((source) => {
    try { source.stop(now + .85); } catch { /* source already stopped */ }
  });
}

function setSignalAudioEnabled(enabled: boolean): void {
  signalAudioEnabled = enabled;
  if (!signalAudioContext || !signalMasterGain) {
    if (!enabled) stopReceiverBed();
    return;
  }
  const now = signalAudioContext.currentTime;
  signalMasterGain.gain.cancelScheduledValues(now);
  signalMasterGain.gain.setTargetAtTime(enabled ? .48 : .0001, now, .035);
  if (!enabled) stopReceiverBed();
}

function playReceiverPhaseCue(phase: TuningPhase, score: number): void {
  if (!signalAudioEnabled) return;
  const context = getSignalAudioContext();
  if (!context) return;
  const now = context.currentTime;

  switch (phase) {
    case 'searching':
      startReceiverBed(context);
      scheduleTuningSweep(context);
      scheduleNote(context, 146.83, now + .12, .9, .012, { attack: .28, overtone: .08, brightness: 850, bendTo: 164.81 });
      break;

    case 'tracking':
      // Two warm fifths, slightly offset in the stereo field.
      scheduleNote(context, 369.99, now, .62, .016, { attack: .16, overtone: .16, pan: -.16, brightness: 1500 });
      scheduleNote(context, 440, now + .18, .7, .014, { attack: .18, overtone: .12, pan: .16, brightness: 1650 });
      break;

    case 'locking':
      // A slow D-major arpeggio. Each note overlaps the previous one slightly.
      scheduleNote(context, 293.66, now, .94, .014, { attack: .18, overtone: .1, pan: -.18 });
      scheduleNote(context, 369.99, now + .16, .92, .013, { attack: .18, overtone: .12, pan: -.06 });
      scheduleNote(context, 440, now + .32, .9, .013, { attack: .18, overtone: .1, pan: .08 });
      scheduleNote(context, 587.33, now + .48, .88, .011, { attack: .2, overtone: .08, pan: .18 });
      break;

    case 'surging':
      if (score >= 85) {
        // Full, warm D-major voicing. The low notes add weight; the upper notes add air.
        scheduleNote(context, 146.83, now, 1.65, .013, { attack: .42, overtone: .08, brightness: 1050 });
        scheduleNote(context, 220, now + .04, 1.55, .009, { attack: .4, overtone: .06, brightness: 1250, pan: -.12 });
        scheduleNote(context, 293.66, now + .08, 1.48, .012, { attack: .38, overtone: .1, brightness: 1450, pan: .1 });
        scheduleNote(context, 369.99, now + .14, 1.38, .013, { attack: .36, overtone: .1, brightness: 1650, pan: -.08 });
        scheduleNote(context, 440, now + .2, 1.3, .013, { attack: .34, overtone: .08, brightness: 1800, pan: .1 });
        scheduleNote(context, 587.33, now + .26, 1.22, .009, { attack: .32, overtone: .06, brightness: 2050, pan: .18 });
      } else {
        scheduleNote(context, 293.66, now, .9, .012, { attack: .24, overtone: .08 });
        scheduleNote(context, 369.99, now + .16, .86, .01, { attack: .22, overtone: .07 });
        scheduleNote(context, 440, now + .32, .82, .009, { attack: .22, overtone: .06 });
      }
      break;

    case 'slipping':
      // The chord gently loses its center, like a receiver drifting off frequency.
      scheduleNote(context, 440, now, .95, .015, { attack: .08, overtone: .1, brightness: 1450, bendTo: 415.3 });
      scheduleNote(context, 293.66, now + .08, .82, .008, { attack: .12, overtone: .06, brightness: 1100, bendTo: 277.18 });
      break;

    case 'recovering':
      // A restrained upward interval suggests compensation, not a full resolution.
      scheduleNote(context, 277.18, now, 1.08, .008, { attack: .34, overtone: .05, brightness: 1120, bendTo: 293.66 });
      scheduleNote(context, 369.99, now + .22, .86, .006, { attack: .3, overtone: .04, brightness: 1420 });
      break;

    case 'locked':
      stopReceiverBed();
      if (score >= 100) {
        // A quiet, resolved upper octave after the large chord.
        scheduleNote(context, 587.33, now, 1.35, .012, { attack: .3, overtone: .11, brightness: 2100 });
        scheduleNote(context, 739.99, now + .12, 1.2, .007, { attack: .32, overtone: .07, brightness: 2300 });
      } else if (score >= 85) {
        // Near-perfect: deliberately leave the harmony open rather than falsely resolving it.
        scheduleNote(context, 293.66, now, .88, .009, { attack: .2, overtone: .06, brightness: 1250 });
        scheduleNote(context, 369.99, now + .12, .8, .007, { attack: .22, overtone: .05, brightness: 1450 });
      } else if (score >= 60) {
        scheduleNote(context, 293.66, now, .8, .011, { attack: .22, overtone: .08 });
        scheduleNote(context, 440, now + .16, .75, .008, { attack: .22, overtone: .06 });
      } else if (score > 0) {
        scheduleNote(context, 196, now, .78, .01, { attack: .24, overtone: .05, brightness: 950 });
      }
      break;

    case 'failed':
      stopReceiverBed();
      scheduleNote(context, 293.66, now, 1.0, .012, { attack: .12, overtone: .06, brightness: 1050, bendTo: 220 });
      break;
  }
}

function scoreLabel(score: number): string {
  if (score >= 700) return 'PERFECT LOCK';
  if (score >= 600) return 'RARE SIGNAL';
  if (score >= 450) return 'STRONG SIGNAL';
  if (score >= 300) return 'CLEAR SIGNAL';
  if (score >= 150) return 'FAINT SIGNAL';
  return 'MOSTLY NOISE';
}

function App() {
  const [dayKey, setDayKey] = useState(() => getNewYorkDateKey());
  const prompts = useMemo(() => getDailyPrompts(dayKey), [dayKey]);
  const answerInputRef = useRef<HTMLInputElement>(null);
  const [game, setGame] = useState<RunState>(() => loadRun(dayKey));
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [now, setNow] = useState(Date.now());
  const [playerName, setPlayerName] = useState(DEMO_MODE ? 'LOCAL EXPLORER' : 'REDDIT EXPLORER');
  const [playerCount, setPlayerCount] = useState(0);
  const [leaderboard, setLeaderboard] = useState<LeaderboardRow[]>([]);
  const [serverReady, setServerReady] = useState(false);
  const [copied, setCopied] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(() => {
    let enabled = true;
    try { enabled = localStorage.getItem('signal:sound') !== 'off'; } catch { /* sound preference is optional */ }
    signalAudioEnabled = enabled;
    return enabled;
  });
  const [canTest, setCanTest] = useState(DEMO_MODE);
  const [testPanelOpen, setTestPanelOpen] = useState(DEMO_MODE);
  const [isTuning, setIsTuning] = useState(false);
  const [tuningAnswer, setTuningAnswer] = useState('');
  const [tuningScore, setTuningScore] = useState<number | null>(null);
  const [tuningDisplayScore, setTuningDisplayScore] = useState(0);
  const [tuningSignalSeed, setTuningSignalSeed] = useState(() => Math.floor(Math.random() * 0xffffffff) || 1);
  const [tuningDuration, setTuningDuration] = useState(900);
  const [tuningStatus, setTuningStatus] = useState('CAPTURING INPUT // SCANNING NOISE');
  const [tuningPhase, setTuningPhase] = useState<TuningPhase>('searching');

  const currentPrompt: Prompt = prompts[Math.min(game.index, prompts.length - 1)];
  const answerCharacters = answer.length;
  const answerRemaining = Math.max(0, 80 - answerCharacters);
  const total = game.entries.reduce((sum, entry) => sum + entry.score, 0);
  const currentEntry = game.entries[game.entries.length - 1];
  const tuningSignalPaths = useMemo(() => buildReceiverPaths(tuningSignalSeed, tuningDisplayScore), [tuningSignalSeed, tuningDisplayScore]);
  const resultSignalPaths = useMemo(() => currentEntry ? buildReceiverPaths(currentEntry.signalSeed ?? 1, currentEntry.score) : null, [currentEntry]);
  const secondsLeft = game.deadline ? Math.max(0, Math.ceil((game.deadline - now) / 1000)) : ROUND_SECONDS;
  const completedPrompts = game.entries.length;
  const shownBoard = DEMO_MODE || !serverReady ? MOCK_BOARD : leaderboard;
  const tuningGrade = tuningScore === null ? 'searching' : tuningScore >= 100 ? 'perfect' : tuningScore >= 85 ? 'deep' : tuningScore >= 60 ? 'clear' : tuningScore >= 30 ? 'faint' : 'background';
  const tuningHeading = tuningStatus.startsWith('NO MATCH') ? 'NO CARRIER'
    : tuningStatus.startsWith('RECEIVER OFFLINE') ? 'RECEIVER OFFLINE'
    : tuningPhase === 'searching' || tuningScore === null ? 'READING THE STATIC'
    : tuningPhase === 'tracking' ? 'CARRIER DETECTED'
    : tuningPhase === 'locking' ? 'LOCKING SIGNAL'
    : tuningPhase === 'surging' ? (tuningScore === 100 ? 'CARRIER OVERLOAD' : 'PERFECT LOCK')
    : tuningPhase === 'slipping' ? 'SIGNAL SLIPPED'
    : tuningPhase === 'recovering' ? 'REACQUIRING CARRIER'
    : tuningScore >= 100 ? 'SIGNAL FOUND'
    : tuningScore >= 85 ? 'NEAR-PERFECT LOCK'
    : tuningScore >= 60 ? 'PARTIAL LOCK'
    : 'WEAK ACQUISITION';
  const tuningInputLabel = tuningPhase === 'searching' ? 'INPUT BUFFERED'
    : tuningPhase === 'tracking' ? 'CARRIER TRACKING'
    : tuningPhase === 'locking' ? 'ACQUIRING LOCK'
    : tuningPhase === 'surging' ? 'LOCK CONFIRMED'
    : tuningPhase === 'slipping' ? 'CARRIER DRIFT DETECTED'
    : tuningPhase === 'recovering' ? 'PHASE CORRECTION ACTIVE'
    : tuningPhase === 'locked' && tuningScore === 100 ? 'LOCK CONFIRMED'
    : tuningPhase === 'locked' && (tuningScore ?? 0) >= 85 ? 'NEAR-PERFECT LOCK'
    : tuningPhase === 'locked' && (tuningScore ?? 0) >= 60 ? 'PARTIAL LOCK'
    : tuningPhase === 'locked' ? 'WEAK LOCK'
    : 'SCAN FAILED';
  const tuningScreenState = tuningPhase === 'searching' ? 'SEARCHING'
    : tuningPhase === 'tracking' ? 'TRACKING'
    : tuningPhase === 'locking' ? 'ACQUIRING'
    : tuningPhase === 'surging' ? 'LOCKED'
    : tuningPhase === 'slipping' ? 'PHASE ERROR'
    : tuningPhase === 'recovering' ? 'REACQUIRING'
    : tuningPhase === 'locked' && tuningScore === 100 ? 'LOCKED'
    : tuningPhase === 'locked' && (tuningScore ?? 0) >= 85 ? 'NEAR LOCK'
    : tuningPhase === 'locked' && (tuningScore ?? 0) >= 60 ? 'PARTIAL LOCK'
    : tuningPhase === 'locked' ? 'WEAK LOCK'
    : 'NO CARRIER';
  const tuningCaption = tuningPhase === 'surging' && tuningScore === 100
    ? 'Carrier strength is breaking clean through the noise floor.'
    : tuningPhase === 'surging' && (tuningScore ?? 0) >= 85
      ? 'Full-strength carrier. Perfect lock confirmed.'
      : tuningPhase === 'slipping'
        ? 'A phase offset pulls the carrier outside the receiver window.'
         : tuningPhase === 'recovering'
           ? 'The receiver is compensating for the drift. A trace of interference remains.'
        : tuningPhase === 'locked' && tuningScore === 100
          ? 'Perfect acquisition. No interference detected.'
          : tuningPhase === 'locked' && (tuningScore ?? 0) >= 85
            ? 'Near-perfect acquisition. A trace of interference remains.'
            : 'Separating the carrier from the noise floor.';
  const tuningNoiseFinal = tuningScore === null ? 1 : Math.max(.025, 1 - tuningScore / 100 * .975);
  const tuningWaveFinal = tuningScore === null ? .02 : Math.max(.08, tuningScore / 100);
  const tuningChaosFinal = tuningScore === null ? .95 : Math.max(.03, .95 - tuningScore / 100 * .92);
  const tuningLockProgress = tuningPhase === 'recovering' && tuningScore !== null
    ? Math.max(0, Math.min(1, (100 - tuningDisplayScore) / Math.max(1, 100 - tuningScore)))
    : Math.max(0, Math.min(1, tuningDisplayScore / 100));
  const tuningCaptureStyle = {
    '--noise-final': String(tuningNoiseFinal),
    '--wave-final': String(tuningWaveFinal),
    '--wave-mid': String(Math.max(.01, tuningWaveFinal * .42)),
    '--chaos-final': String(tuningChaosFinal),
    '--tune-duration': tuningDuration + 'ms',
    '--score-width': tuningDisplayScore + '%',
    '--lock-progress': String(tuningLockProgress),
    '--lock-progress-pct': (tuningLockProgress * 100).toFixed(1) + '%',
    '--reticle-scale': String(1.48 - tuningLockProgress * .66),
    '--reticle-opacity': String(.22 + tuningLockProgress * .74),
    '--reticle-corner-size': (12 + tuningLockProgress * 8) + 'px',
    '--reticle-dot-size': (4 + tuningLockProgress * 4) + 'px',
    '--carrier-stroke-width': (1.45 + tuningLockProgress * .95) + 'px'
  } as React.CSSProperties;

  useEffect(() => {
    try { localStorage.setItem('signal:run:' + dayKey, JSON.stringify(game)); } catch { /* local storage is optional */ }
  }, [game, dayKey]);

  useEffect(() => {
    const checkNewDay = () => {
      const nextDay = getNewYorkDateKey();
      if (nextDay === dayKey) return;
      setDayKey(nextDay);
      setGame(blankRun(nextDay));
      setAnswer('');
      setMessage('A new daily transmission has arrived.');
      setNow(Date.now());
      setCopied(false);
    };
    const interval = window.setInterval(checkNewDay, 15000);
    return () => window.clearInterval(interval);
  }, [dayKey]);

  useEffect(() => {
    if (game.phase === 'playing' && !isTuning) answerInputRef.current?.focus({ preventScroll: true });
  }, [game.phase, game.index, isTuning]);

  useEffect(() => {
    let active = true;
    fetch('/api/bootstrap')
      .then((response) => { if (!response.ok) throw new Error('No Devvit server'); return response.json(); })
      .then((data) => {
        if (!active || !data?.ok) return;
        setServerReady(true);
        setCanTest(Boolean(data.canTest));
        setPlayerName(data.username ? String(data.username).toUpperCase() : 'REDDIT EXPLORER');
        setPlayerCount(Number(data.playerCount) || 0);
        if (Array.isArray(data.leaderboard)) setLeaderboard(data.leaderboard);
        if (data.result && Array.isArray(data.result.entries)) {
          setGame({ dateKey: data.result.dateKey || dayKey, phase: 'complete', index: 6, entries: data.result.entries, deadline: null });
        }
      })
      .catch(() => { if (active) setServerReady(false); });
    return () => { active = false; };
  }, [dayKey]);

  useEffect(() => {
    if (game.phase !== 'playing' || isTuning) return;
    const timer = window.setInterval(() => {
      const stamp = Date.now();
      setNow(stamp);
      if (game.deadline !== null && stamp >= game.deadline) {
        setGame((previous) => {
          if (previous.phase !== 'playing' || previous.deadline === null || stamp < previous.deadline) return previous;
          const prompt = prompts[previous.index];
          const entry: Entry = { promptId: prompt.id, answer: '', score: 0, tier: 'NO SIGNAL', note: 'The transmission window closed before an answer arrived.' };
          return { ...previous, phase: 'reveal', deadline: null, entries: [...previous.entries, entry] };
        });
        setMessage('The window closed. That round is logged as silence.');
      }
    }, 1000);
    return () => window.clearInterval(timer);
  }, [game.phase, game.index, game.deadline, prompts, isTuning]);

  useEffect(() => {
    if (game.phase !== 'complete' || game.isTest || DEMO_MODE || !serverReady) return;
    let active = true;
    fetch('/api/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entries: game.entries.map((entry) => ({ promptId: entry.promptId, answer: entry.answer })) })
    })
      .then((response) => { if (!response.ok) throw new Error('Could not save result'); return response.json(); })
      .then((data) => {
        if (!active || !data?.ok) return;
        setPlayerCount(Number(data.playerCount) || 0);
        if (Array.isArray(data.leaderboard)) setLeaderboard(data.leaderboard);
        if (data.result?.entries) setGame((previous) => ({ ...previous, entries: data.result.entries.map((entry: Entry, index: number) => ({ ...entry, signalSeed: previous.entries[index]?.signalSeed })) }));
      })
      .catch(() => setMessage('Result is visible locally. The community board is temporarily unavailable.'));
    return () => { active = false; };
  }, [game.phase, game.isTest, serverReady]);

  const setReceiverPhase = (phase: TuningPhase, score = 0) => {
    setTuningPhase(phase);
    if (soundEnabled) playReceiverPhaseCue(phase, score);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    try { localStorage.setItem('signal:sound', next ? 'on' : 'off'); } catch { /* sound preference is optional */ }
    setSignalAudioEnabled(next);
    if (next) playSoftUiCue();
  };

  const startGame = (isTest = false) => {
    if (soundEnabled) playSoftUiCue();
    setMessage('');
    setAnswer('');
    setNow(Date.now());
    setGame({ dateKey: dayKey, phase: 'playing', index: 0, entries: [], deadline: Date.now() + ROUND_SECONDS * 1000, isTest });
  };

  const validateAnswer = async (prompt: Prompt, raw: string) => {
    const clean = raw.trim();
    if (!clean) { setMessage('Enter an answer before transmitting.'); return; }
    if (isTuning) return;

    const tuningStartedAt = Date.now();
    const signalSeed = Math.floor(Math.random() * 0xffffffff) || 1;
    setTuningSignalSeed(signalSeed);
    setTuningAnswer(clean);
    setTuningScore(null);
    setTuningDisplayScore(0);
    setTuningDuration(900);
    setReceiverPhase('searching', 0);
    setTuningStatus('CAPTURING INPUT // SCANNING NOISE');
    setIsTuning(true);
    setMessage('');

    const resumeClock = () => {
      const elapsed = Date.now() - tuningStartedAt;
      setNow(Date.now());
      setGame((previous) => previous.phase === 'playing' && previous.deadline !== null
        ? { ...previous, deadline: previous.deadline + elapsed }
        : previous);
    };

    const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));
    const animateFailure = async (status: string) => {
      setTuningScore(0);
      setTuningDuration(900);
      setReceiverPhase('failed', 0);
      setTuningStatus(status);
      await wait(1700);
    };
    const animateCapture = async (score: number) => {
      // Each score gets a deliberate sequence, with enough time to read every receiver event.
      const duration = 1500 + Math.round(Math.max(0, Math.min(100, score)) * 30);
      setTuningScore(score);
      setTuningDisplayScore(0);
      setTuningDuration(duration);

      const perfect = score === 100;
      const nearMiss = score >= 85 && score < 100;
      const animateScore = async (from: number, to: number, segmentMs: number) => {
        const steps = Math.max(1, Math.ceil(segmentMs / 72));
        for (let step = 1; step <= steps; step++) {
          await wait(segmentMs / steps);
          setTuningDisplayScore(Math.round(from + (to - from) * (step / steps)));
        }
      };

      const trackingTarget = Math.round(score * (perfect ? .34 : nearMiss ? .36 : .38));
      const lockingTarget = Math.round(score * (perfect ? .86 : nearMiss ? .9 : .88));

      // Let the raw static register before the first carrier event appears.
      await wait(650);
      setReceiverPhase('tracking', score);
      setTuningStatus('CARRIER DETECTED // TRACKING FREQUENCY');
      await wait(360);
      await animateScore(0, trackingTarget, duration * .40);

      setReceiverPhase('locking', score);
      setTuningStatus(score >= 100
        ? 'FREQUENCY CENTERED // LOCKING CARRIER'
        : score >= 85
          ? 'FREQUENCY CENTERED // FINAL LOCK APPROACH'
          : score >= 60
            ? 'ALIGNING CARRIER // REDUCING INTERFERENCE'
            : 'WEAK CARRIER // ATTEMPTING ACQUISITION');
      await wait(430);
      await animateScore(trackingTarget, lockingTarget, duration * .30);

      if (perfect || nearMiss) {
        setReceiverPhase('surging', score);
        setTuningStatus(perfect
          ? 'CARRIER SPIKE // BREAKTHROUGH IMMINENT'
          : '100% CARRIER // LOCK CONFIRMED');
        await wait(420);
        await animateScore(lockingTarget, 100, duration * .12);

        if (nearMiss) {
          // Let the false-perfect reading sit long enough to feel convincing.
          await wait(Math.max(1250, duration * .28));
          setReceiverPhase('slipping', score);
          setTuningStatus('PHASE ERROR // CARRIER OUT OF ALIGNMENT');
          // Show the physical drift before the displayed score admits the miss.
          await wait(720);
          setReceiverPhase('recovering', score);
          setTuningStatus('AUTO-CORRECTION // REACQUIRING CARRIER');
          await animateScore(100, score, Math.max(1400, duration * .3));
          setReceiverPhase('locked', score);
          setTuningStatus('NEAR-PERFECT // RESIDUAL CARRIER DRIFT');
          await wait(Math.max(900, duration * .18));
        } else {
          setReceiverPhase('locked', score);
          setTuningStatus('100% CARRIER // SIGNAL FULLY ACQUIRED');
          await wait(Math.max(1100, duration * .24));
        }
      } else {
        setReceiverPhase(score > 0 ? 'locked' : 'failed', score);
        setTuningStatus(score >= 60
          ? 'PARTIAL LOCK // RESIDUAL NOISE'
          : score > 0
            ? 'WEAK LOCK // INTERFERENCE REMAINS'
            : 'NO CARRIER // SIGNAL NOT RECOVERED');
        await wait(450);
        await animateScore(lockingTarget, score, duration * .24);
        await wait(Math.max(850, duration * .18));
      }
      setTuningDisplayScore(score);
    };

    try {
      let result: { score: number; tier: string; note: string } | null = null;
      if (DEMO_MODE) {
        const module = await import('../shared/answerBank');
        result = module.evaluateAnswer(prompt.id, clean);
      } else {
        const response = await fetch('/api/check-answer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ promptId: prompt.id, answer: clean })
        });
        if (!response.ok) throw new Error('Signal service unavailable');
        const data = await response.json();
        result = data.valid ? data.result : null;
      }

      if (!result) {
        await animateFailure('NO MATCH // TRY A DIFFERENT FREQUENCY');
        resumeClock();
        setMessage('No match in today’s field catalog. Try another answer while the window is open.');
        return;
      }

      await animateCapture(result.score);

      const entry: Entry = { promptId: prompt.id, answer: clean, score: result.score, tier: result.tier, note: result.note, signalSeed };
      setGame((previous) => previous.phase === 'playing'
        ? { ...previous, phase: 'reveal', deadline: null, entries: [...previous.entries, entry] }
        : previous);
      setAnswer('');
      setMessage('');
    } catch {
      await animateFailure('RECEIVER OFFLINE // TRY AGAIN');
      resumeClock();
      setMessage('Could not reach the signal receiver. Check the connection and try again.');
    } finally {
      setIsTuning(false);
    }
  };

  const triggerTestAnswer = async (score: number) => {
    if (!game.isTest || game.phase !== 'playing' || isTuning) return;
    try {
      let candidate: string | null = null;
      if (DEMO_MODE) {
        const module = await import('../shared/answerBank');
        candidate = module.getTestAnswer(currentPrompt.id, score);
      } else {
        const response = await fetch('/api/test-answer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ promptId: currentPrompt.id, score })
        });
        if (!response.ok) throw new Error('Test endpoint unavailable');
        const data = await response.json();
        candidate = typeof data.answer === 'string' ? data.answer : null;
      }
      if (!candidate) {
        setMessage('This prompt has no catalog answer at ' + score + ' points. Try another tier.');
        return;
      }
      await validateAnswer(currentPrompt, candidate);
    } catch {
      setMessage('Could not trigger the test answer. Check the test connection.');
    }
  };

  const forceTimeout = () => {
    if (!game.isTest || game.phase !== 'playing' || isTuning) return;
    const entry: Entry = {
      promptId: currentPrompt.id,
      answer: '',
      score: 0,
      tier: 'NO SIGNAL',
      note: 'Test bench forced the transmission window to close.'
    };
    setGame((previous) => ({ ...previous, phase: 'reveal', deadline: null, entries: [...previous.entries, entry] }));
    setAnswer('');
    setMessage('');
  };

  const skipPrompt = () => {
    if (game.phase !== 'playing' || isTuning) return;
    const entry: Entry = { promptId: currentPrompt.id, answer: '', score: 0, tier: 'NO SIGNAL', note: 'You moved on without transmitting an answer.' };
    setGame((previous) => ({ ...previous, phase: 'reveal', deadline: null, entries: [...previous.entries, entry] }));
    setAnswer('');
    setMessage('');
  };

  const nextPrompt = () => {
    if (game.phase !== 'reveal') return;
    const nextIndex = game.index + 1;
    setAnswer('');
    setMessage('');
    if (nextIndex >= prompts.length) {
      setGame((previous) => ({ ...previous, phase: 'complete', index: prompts.length - 1, deadline: null }));
      return;
    }
    setNow(Date.now());
    setGame((previous) => ({ ...previous, phase: 'playing', index: nextIndex, deadline: Date.now() + ROUND_SECONDS * 1000 }));
  };

  const copyResult = async () => {
    const rows = prompts.map((prompt, index) => {
      const entry = game.entries[index];
      return String(index + 1).padStart(2, '0') + '. '
        + (entry?.answer || 'No answer')
        + '  |  ' + (entry?.score ?? 0) + '/100'
        + '  |  ' + (entry?.tier ?? 'NO SIGNAL');
    });
    const shareText = [
      'SIGNAL // ' + formatDay(game.dateKey),
      total + '/700  ·  ' + scoreLabel(total),
      '',
      ...rows,
      '',
      'Find the signal in the noise.'
    ].join('\\n');
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      const field = document.createElement('textarea');
      field.value = shareText;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      let success = false;
      try { success = document.execCommand('copy'); } catch { success = false; }
      field.remove();
      if (success) {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2200);
      } else {
        setMessage('Clipboard access is unavailable in this browser.');
      }
    }
  };

  const resetPreview = () => {
    if (!DEMO_MODE) return;
    try { localStorage.removeItem('signal:run:' + dayKey); } catch { /* storage may be disabled */ }
    setGame(blankRun(dayKey));
    setAnswer('');
    setMessage('');
    setNow(Date.now());
    setCopied(false);
  };

  const dateLabel = formatDay(dayKey);

  return (
    <div className="app-shell">
      <MountainScene />
      <div className="screen-vignette" />
      <header className="topbar">
        <div className="brand-row">
          <div className="brand">
            <div className="brand-symbol"><SignalIcon size={45} /></div>
            <div className="brand-copy">
              <div className="brand-name">SIGNAL</div>
              <div className="brand-tagline">FIND THE SIGNAL IN THE NOISE.</div>
            </div>
          </div>
          <button className="sound-toggle" type="button" onClick={toggleSound} aria-pressed={soundEnabled} aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'} title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 10v4h4l5 4V6l-5 4H4Z" />
              {soundEnabled ? <><path d="M16 9a5 5 0 0 1 0 6" /><path d="M18.5 6.5a8.5 8.5 0 0 1 0 11" /></> : <path d="m17 9 5 6m0-6-5 6" />}
            </svg>
            <span>{soundEnabled ? 'SFX ON' : 'SFX OFF'}</span>
          </button>
        </div>
        <div className="top-stats">
          <div className="top-stat date-stat"><span className="eyebrow">TODAY'S TRANSMISSION</span><strong>{dateLabel}</strong></div>
          <div className="top-stat"><span className="stat-icon flame" aria-hidden="true">✦</span><strong>07</strong><span className="eyebrow">PROMPTS</span></div>
          <div className="top-stat"><span className="stat-icon bars">▮▮▮</span><strong>{serverReady ? playerCount.toLocaleString() : '—'}</strong><span className="eyebrow">ON FREQUENCY</span></div>
        </div>
      </header>

      <main className="station-layout">
        <section className="main-column">
          <div className="station-kicker">
            <span className="live-dot" /><span>MT. AURORA LISTENING POST</span><span className="kicker-divider">/</span><span>CHANNEL 07</span>
            {DEMO_MODE && <span className="preview-chip">LOCAL PREVIEW</span>}
            {!DEMO_MODE && serverReady && <span className="preview-chip connected">REDDIT LINK ACTIVE</span>}
          </div>

          <section className="game-panel scan-hum">
            <div className="panel-scanline" aria-hidden="true" />
            <div className="panel-topline">
              <div><span className="eyebrow">INCOMING TRANSMISSION</span><div className="panel-title">Today's signal scan</div><span className="panel-subtitle">One answer. Seven chances to stand out.</span></div>
              <div className="round-count"><strong>{String(game.phase === 'complete' ? 7 : game.index + 1).padStart(2, '0')}</strong><span>/ 07</span></div>
            </div>
            <div
              className="progress-grid"
              role="progressbar"
              aria-label="Daily scan progress"
              aria-valuemin={0}
              aria-valuemax={7}
              aria-valuenow={completedPrompts}
              aria-valuetext={completedPrompts + ' of 7 prompts completed'}
            >
              {prompts.map((prompt, index) => (
                <div key={prompt.id} className={'progress-cell ' + (index < completedPrompts ? 'done' : index === game.index && game.phase !== 'complete' ? 'active' : '')}><span>{String(index + 1).padStart(2, '0')}</span></div>
              ))}
            </div>

            {game.phase === 'ready' && (
              <div className="ready-view">
                <div className="receiver-graphic">
                  <div className="receiver-orbit orbit-one" /><div className="receiver-orbit orbit-two" />
                  <div className="receiver-core"><SignalIcon size={52} /></div><div className="receiver-sweep" />
                  <span className="receiver-caption">SCANNER STANDBY</span>
                </div>
                <div className="ready-copy">
                  <div className="section-label">A SIGNAL IS WAITING</div>
                  <h1>Can you hear<br />what others miss?</h1>
                  <p>Seven open prompts. One answer each. Familiar answers barely register; unusual, valid answers send a stronger signal.</p>
                  <div className="rule-strip">
                    <div><strong>07</strong><span>PROMPTS</span></div><div><strong>25s</strong><span>PER ROUND</span></div><div><strong>700</strong><span>MAX POINTS</span></div>
                  </div>
                  <button className="primary-button" onClick={startGame}><span>BEGIN DAILY SCAN</span><span className="button-arrow">↗</span></button>
                  <p className="fine-print">One daily attempt · Resets at midnight Eastern</p>
                </div>
              </div>
            )}

            {game.phase === 'playing' && (
              <div className={'play-view ' + (isTuning ? 'tuning-view' : '')}>
                {isTuning && (
                  <div className={'signal-capture-overlay ' + ((tuningScore ?? 0) >= 85 ? 'perfect-capture' : '')} role="status" aria-live="polite">
                    <div
                      className="signal-capture"
                      key={tuningScore === null ? 'searching' : 'score-' + tuningScore}
                      data-grade={tuningGrade}
                      data-phase={tuningPhase}
                      style={tuningCaptureStyle}
                    >
                      <div className="signal-capture-head">
                        <span className="signal-station"><i /> MT. AURORA / RECEIVER 07</span>
                        <span className="signal-input-state" key={tuningPhase}>{tuningInputLabel}</span>
                      </div>
                      <div className="signal-capture-copy" key={tuningPhase}>
                        <div className="signal-capture-kicker">TRANSMISSION ANALYSIS</div>
                        <h2>{tuningHeading}</h2>
                        <p>{tuningCaption}</p>
                      </div>
                      <div className="signal-screen" aria-label="Live receiver waveform resolving from static">
                        <div className="signal-screen-grid" />
                        <div className="signal-static" />
                        <svg className="signal-traces" viewBox="0 0 720 180" preserveAspectRatio="none" aria-hidden="true">
                          <path className="signal-centerline" d="M0 90H720" />
                          <g className="signal-carrier-group">
                            <path id="signal-live-carrier" className="signal-clean-trace" d={tuningSignalPaths.carrier} />
                            {tuningAnswer && (
                              <text className="signal-carrier-word" aria-hidden="true">
                                <textPath
                                  href="#signal-live-carrier"
                                  startOffset="50%"
                                  textAnchor="middle"
                                  textLength={Math.min(650, Math.max(44,
                                    tuningAnswer.replace(/\s/g, '').length * 11.5
                                    + Math.max(0, tuningAnswer.trim().split(/\s+/).length - 1) * 22
                                  ))}
                                  lengthAdjust="spacing"
                                >{tuningAnswer.toUpperCase()}</textPath>
                              </text>
                            )}
                          </g>
                        </svg>
                        <div className="signal-lock-reticle" aria-hidden="true">
                          <i className="reticle-corner top-left" />
                          <i className="reticle-corner top-right" />
                          <i className="reticle-corner bottom-left" />
                          <i className="reticle-corner bottom-right" />
                          <b className="reticle-center" />
                        </div>
                        <span className="signal-screen-label">RF / {receiverFrequency(tuningSignalSeed)} MHZ</span>
                        <span className="signal-screen-state" key={tuningPhase}>{tuningScreenState}</span>
                      </div>
                      <div className="signal-lock-steps" data-phase={tuningPhase} aria-hidden="true">
                        <span><i />01 / SCAN</span>
                        <span><i />02 / TRACK</span>
                        <span><i />03 / LOCK</span>
                      </div>
                      <div className="signal-capture-readout">
                        <div className="signal-answer-readout">
                          <span>DECODED RESPONSE</span>
                          <strong>{tuningAnswer}</strong>
                        </div>
                        <div className="signal-score-readout">
                          <span>LIVE SCORE</span>
                          <strong>{tuningScore === null ? '···' : tuningDisplayScore}<small>/100</small></strong>
                        </div>
                      </div>
                      <div className="signal-quality-row">
                        <span>RECOVERED SIGNAL</span>
                        <div className="signal-quality-track"><i /></div>
                        <strong>{tuningScore === null ? '—' : tuningDisplayScore + '%'}</strong>
                      </div>
                      <div className="signal-capture-status"><i /><span key={tuningPhase}>{tuningStatus}</span></div>
                    </div>
                  </div>
                )}
                {!isTuning && <>
                <div className="question-meta">
                  <span className="channel-label">{currentPrompt.channel}</span>
                  <div
                    className={'timer-pill ' + (secondsLeft <= 7 ? 'urgent' : '')}
                    role="timer"
                    aria-label={secondsLeft + ' seconds remaining'}
                    aria-live={secondsLeft <= 5 ? 'polite' : 'off'}
                    aria-atomic="true"
                  ><span className="timer-ring" aria-hidden="true"><span /></span><strong>{String(secondsLeft).padStart(2, '0')}</strong><span>SEC</span></div>
                </div>
                <div className="timer-track"><i style={{ width: (secondsLeft / ROUND_SECONDS * 100) + '%' }} /></div>
                <div className="question-index">TRANSMISSION {String(game.index + 1).padStart(2, '0')}</div>
                <h1 className="question-text">{currentPrompt.prompt}</h1>
                <p className="question-context" id="question-context">{currentPrompt.context}</p>
                <details className="hint-disclosure">
                  <summary><span>REQUEST FIELD HINT</span><span className="hint-mark" aria-hidden="true">+</span></summary>
                  <p>{currentPrompt.hint}</p>
                </details>
                <form className="answer-form" onSubmit={(event) => { event.preventDefault(); void validateAnswer(currentPrompt, answer); }}>
                  <div className="answer-helper-row">
                    <label htmlFor="signal-answer">YOUR RESPONSE</label>
                    <span id="answer-counter" className={answerRemaining <= 12 ? 'answer-counter near-limit' : 'answer-counter'}>{answerCharacters}/80</span>
                  </div>
                  <div className="answer-control">
                    <input
                      ref={answerInputRef}
                      id="signal-answer"
                      value={answer}
                      onChange={(event) => { setAnswer(event.target.value); if (message) setMessage(''); }}
                      maxLength={80}
                      autoComplete="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      enterKeyHint="send"
                      aria-label="Your answer"
                      aria-describedby="question-context answer-counter"
                      placeholder="Type one answer..."
                      autoFocus
                      disabled={isTuning}
                    />
                    <button type="submit" className="primary-button submit-button" disabled={isTuning}>TRANSMIT <span className="button-arrow">↗</span></button>
                  </div>
                  <p className="answer-footnote">One answer per transmission. Specific answers can carry a stronger signal.</p>
                </form>
                <div className="play-footer"><span><span className="tiny-pulse" /> RECEIVER OPEN</span><button className="text-button" onClick={skipPrompt} disabled={isTuning}>SKIP THIS FREQUENCY</button></div>
                {message && <div className="inline-message" role="status" aria-live="polite">{message}</div>}
                </>}
              </div>
            )}

            {game.phase === 'reveal' && currentEntry && (
              <div className={'signal-result-view phase-in ' + (currentEntry.score >= 85 ? 'rare-reveal' : '')}>
                <div
                  className="signal-capture signal-result-card"
                  data-grade={currentEntry.score >= 100 ? 'perfect' : currentEntry.score >= 85 ? 'deep' : currentEntry.score >= 60 ? 'clear' : currentEntry.score >= 30 ? 'faint' : 'background'}
                  data-phase={currentEntry.score > 0 ? 'locked' : 'failed'}
                  style={{
                    '--noise-final': String(Math.max(.025, 1 - currentEntry.score / 100 * .975)),
                    '--wave-final': String(Math.max(.08, currentEntry.score / 100)),
                    '--wave-mid': String(Math.max(.01, currentEntry.score / 100 * .42)),
                    '--chaos-final': String(Math.max(.03, .95 - currentEntry.score / 100 * .92)),
                    '--tune-duration': '0ms',
                    '--score-width': currentEntry.score + '%',
                    '--reticle-scale': String(.78 + (1 - currentEntry.score / 100) * .65),
                    '--reticle-opacity': String(.4 + currentEntry.score / 100 * .6)
                  } as React.CSSProperties}
                >
                  <div className="signal-capture-head">
                    <span className="signal-station"><i /> MT. AURORA / RECEIVER 07</span>
                    <span className="signal-input-state">{currentEntry.score === 100 ? 'PERFECT ACQUISITION' : currentEntry.score > 0 ? 'CARRIER ACQUIRED' : 'NO CARRIER'}</span>
                  </div>
                  <div className="signal-result-hero">
                    <div className="signal-capture-copy">
                      <div className="signal-capture-kicker">TRANSMISSION {String(game.index + 1).padStart(2, '0')} / ACQUISITION REPORT</div>
                      <h2>{currentEntry.score === 100 ? 'SIGNAL LOCKED' : currentEntry.score >= 85 ? 'SIGNAL ALMOST LOCKED' : currentEntry.score > 0 ? 'PARTIAL SIGNAL LOCK' : 'NO SIGNAL'}</h2>
                      <p>{currentEntry.score === 100 ? 'Perfect carrier. The noise floor has been eliminated.' : currentEntry.score >= 85 ? 'It looked perfect for a moment. A final trace of drift kept the carrier just shy of a flawless lock.' : currentEntry.score >= 60 ? 'A stable carrier recovered from the interference.' : currentEntry.score > 0 ? 'A weak carrier recovered. Interference remains.' : 'No stable carrier could be recovered.'}</p>
                    </div>
                    <div className="signal-result-score">
                      <span>POINTS RECOVERED</span>
                      <strong>+{currentEntry.score}</strong>
                      <small>/ 100</small>
                      <div className="signal-result-tier">{currentEntry.tier}</div>
                    </div>
                  </div>
                  <div className="signal-screen signal-result-screen" aria-label={'Receiver signal quality: ' + currentEntry.score + ' out of 100'}>
                    <div className="signal-screen-grid" />
                    <div className="signal-static" />
                    <svg className="signal-traces" viewBox="0 0 720 180" preserveAspectRatio="none" aria-hidden="true">
                      <path className="signal-centerline" d="M0 90H720" />
                      <path className="signal-clean-trace" d={resultSignalPaths?.carrier ?? ''} />
                    </svg>
                    <div className="signal-lock-reticle" aria-hidden="true">
                      <i className="reticle-corner top-left" />
                      <i className="reticle-corner top-right" />
                      <i className="reticle-corner bottom-left" />
                      <i className="reticle-corner bottom-right" />
                      <b className="reticle-center" />
                    </div>
                    <span className="signal-screen-label">RF / {receiverFrequency(currentEntry.signalSeed ?? 1)} MHZ</span>
                    <span className="signal-screen-state">{currentEntry.score === 100 ? 'LOCKED' : currentEntry.score >= 85 ? 'NEAR LOCK' : currentEntry.score > 0 ? 'PARTIAL LOCK' : 'NO CARRIER'}</span>
                  </div>
                  <div className="signal-lock-steps" data-phase={currentEntry.score > 0 ? 'locked' : 'failed'} aria-label="Signal scan steps: scan, track, lock">
                    <span><i />01 / SCAN</span>
                    <span><i />02 / TRACK</span>
                    <span><i />03 / LOCK</span>
                  </div>
                  <div className="signal-result-readout">
                    <div className="signal-answer-readout">
                      <span>DECODED RESPONSE</span>
                      <strong>{currentEntry.answer || 'No answer transmitted'}</strong>
                    </div>
                    <div className="signal-result-scan-total">
                      <span>SCAN TOTAL</span>
                      <strong>{total}<small> / 700</small></strong>
                    </div>
                  </div>
                  <div className="signal-quality-row">
                    <span>RECOVERED SIGNAL</span>
                    <div className="signal-quality-track"><i /></div>
                    <strong>{currentEntry.score}%</strong>
                  </div>
                  <div className="signal-capture-status"><i /><span>{currentEntry.score === 100 ? '100% CARRIER // LOCK CONFIRMED' : currentEntry.score >= 85 ? 'NEAR-PERFECT // FINAL CARRIER DRIFT' : currentEntry.score > 0 ? 'CARRIER STABLE // RESULT RECORDED' : 'NO CARRIER // TRANSMISSION CLOSED'}</span></div>
                </div>
                <p className="signal-result-note">{currentEntry.note}</p>
                <button className="primary-button next-button" onClick={nextPrompt}>{game.index === 6 ? 'VIEW SCAN REPORT' : 'NEXT TRANSMISSION'} <span className="button-arrow">↗</span></button>
                {message && <div className="inline-message" role="status" aria-live="polite">{message}</div>}
              </div>
            )}

            {game.phase === 'complete' && (
              <div className="complete-view">
                <div className="complete-overline">DAILY SCAN COMPLETE <span>{game.entries.filter((entry) => entry.score > 0).length} SIGNALS RECOVERED</span></div>
                <h1>{scoreLabel(total)}</h1>
                <div className="final-score" role="group" aria-label={'Final score ' + total + ' out of 700'}><strong>{total}</strong><span>/ 700</span></div>
                <p className="complete-subtitle">{total >= 600 ? 'You found some remarkable signals in the noise.' : total >= 300 ? 'A good scan. You heard more than the obvious.' : 'The airwaves were crowded today. Tune in again tomorrow.'}</p>
                <div className="complete-stat-strip">
                  <span><strong>{game.entries.filter((entry) => entry.score > 0).length}</strong> SIGNALS FOUND</span>
                  <span><strong>{game.entries.filter((entry) => entry.score >= 85).length}</strong> DEEP CUTS</span>
                  <span><strong>{Math.round(total / Math.max(1, game.entries.length))}</strong> AVG / ROUND</span>
                </div>
                <div className="result-list">
                  {prompts.map((prompt, index) => {
                    const entry = game.entries[index] ?? { score: 0, tier: 'NO SIGNAL', answer: '' };
                    return <div className="result-row" key={prompt.id}>
                      <span className="result-number" aria-label={'Prompt ' + (index + 1)}>{String(index + 1).padStart(2, '0')}</span>
                      <span className="result-prompt">{prompt.prompt}</span>
                      <span className="result-answer" title={entry.answer || 'No answer'}>{entry.answer || '—'}</span>
                      <span className="result-tier">{entry.tier ?? 'NO SIGNAL'}</span>
                      <strong className={entry.score >= 60 ? 'rare-score' : ''} aria-label={entry.score + ' points'}>{entry.score}</strong>
                    </div>;
                  })}
                </div>
                <div className="complete-actions">
                  <button className="primary-button" onClick={() => void copyResult()} aria-label="Copy your complete daily result">{copied ? 'RESULT COPIED' : 'COPY FULL RESULT'} <span className="button-arrow">↗</span></button>
                  {DEMO_MODE && <button className="secondary-button" onClick={resetPreview}>RESET LOCAL PREVIEW</button>}
                </div>
                <p className="fine-print">{game.isTest ? 'TEST RUN · RESULTS ARE NOT SAVED TO THE COMMUNITY BOARD' : 'A new set of transmissions arrives at midnight Eastern.'}</p>
                {message && <div className="inline-message" role="status" aria-live="polite">{message}</div>}
              </div>
            )}
          </section>

          {canTest && (
            <section className={'test-bench ' + (testPanelOpen ? 'open' : '')}>
              <button className="test-bench-toggle" onClick={() => setTestPanelOpen((open) => !open)} aria-expanded={testPanelOpen}>
                <span className="test-led" />
                <span className="test-bench-heading">TEST BENCH <small>LOCAL CONTROLS · NO COMMUNITY SCORE</small></span>
                <span className="test-bench-action">{testPanelOpen ? '− CLOSE' : '+ OPEN'}</span>
              </button>
              {testPanelOpen && (
                <div className="test-bench-content">
                  <div className="test-bench-intro">
                    <strong>TRIGGER A RESULT</strong>
                    <span>{game.isTest ? 'Test run active. Pick a score tier to submit a catalog answer.' : 'Start a test run to trigger answers without recording a daily result.'}</span>
                  </div>
                  <div className="test-bench-controls">
                    <button className="test-start" onClick={() => startGame(true)} disabled={isTuning}>{game.isTest && game.phase === 'playing' ? 'RESTART TEST RUN' : 'START TEST RUN'} <b>↗</b></button>
                    <div className="test-tier-grid">
                      {TEST_TIERS.map((tier) => (
                        <button key={tier.score} disabled={!game.isTest || game.phase !== 'playing' || isTuning} onClick={() => void triggerTestAnswer(tier.score)}>
                          <strong>{tier.score}</strong><span>{tier.label}</span>
                        </button>
                      ))}
                    </div>
                    <div className="test-utility-row">
                      <button disabled={!game.isTest || game.phase !== 'playing' || isTuning} onClick={skipPrompt}>FORCE NO SIGNAL</button>
                      <button disabled={!game.isTest || game.phase !== 'playing' || isTuning} onClick={forceTimeout}>FORCE TIMEOUT</button>
                      <button disabled={isTuning} onClick={() => { setGame(blankRun(dayKey)); setMessage(''); setAnswer(''); }}>RESET GAME</button>
                    </div>
                  </div>
                </div>
              )}
            </section>
          )}

          <div className="bottom-note">
            <div className="bottom-note-icon"><SignalIcon size={24} /></div>
            <div><strong>A NEW SIGNAL ARRIVES DAILY</strong><span>Same seven transmissions for every listener.</span></div>
            <div className="bottom-wave" aria-hidden="true">{[8,14,23,12,31,17,9,26,38,13,22,8,17,29,12,7,19].map((height,index) => <i key={index} style={{height: height + 'px'}} />)}</div>
          </div>
        </section>

        <aside className="side-column">
          <section className="instrument-card signal-card">
            <div className="card-heading"><span className="eyebrow">SIGNAL STRENGTH</span><span className="card-index">01 / 03</span></div>
            <div className="strength-display">
              <div className="strength-number">{total}<span> / 700</span></div>
              <div className="strength-meter">{Array.from({length:14},(_,index) => <i key={index} className={index < Math.ceil((total / MAX_SCORE) * 14) ? (index >= 10 ? 'hot' : 'lit') : ''} />)}</div>
            </div>
            <div className="strength-caption"><span>NOISE FLOOR</span><span>STRONG SIGNAL</span></div>
            <div className="signal-wave" aria-hidden="true"><svg viewBox="0 0 300 48" preserveAspectRatio="none"><path d="M0 24h28l8-4 7 8 9-17 8 26 9-34 10 39 8-21 8 9h18l8-5 7 9 8-18 9 25 8-30 8 24 8-12h26l7-5 8 10 9-20 8 26 9-19 8 10h32" /></svg></div>
            <p className="instrument-footnote">{game.phase === 'complete' ? scoreLabel(total) : game.phase === 'ready' ? 'SCANNER AWAITING INPUT' : 'LIVE SCAN IN PROGRESS'}</p>
          </section>

          <section className="instrument-card leaderboard-card">
            <div className="card-heading"><span className="eyebrow">COMMUNITY FREQUENCY</span><span className="card-index">02 / 03</span></div>
            <div className="leaderboard-title"><span className="trophy">✦</span> TODAY'S STRONGEST SIGNALS</div>
            {shownBoard.length ? <div className="leaderboard-list">
              {shownBoard.slice(0,5).map((row,index) => <div className="leaderboard-row" key={row.name + index}>
                <span className="rank">{String(index + 1).padStart(2,'0')}</span><span className="listener-name">{row.name}</span><strong>{row.score}</strong>
              </div>)}
            </div> : <div className="empty-board">No completed scans yet. Be the first on frequency.</div>}
            <div className="leaderboard-foot"><span>{DEMO_MODE || !serverReady ? 'PREVIEW SCORES' : playerCount + ' LISTENERS'}</span><span>{DEMO_MODE || !serverReady ? 'SAMPLE DATA' : 'UPDATED LIVE'}</span></div>
          </section>

          <section className="instrument-card station-log-card">
            <div className="card-heading"><span className="eyebrow">STATION LOG</span><span className="card-index">03 / 03</span></div>
            <div className="log-entry"><span className="log-time">00:00 ET</span><div><strong>DAILY TRANSMISSION ROTATED</strong><p>Fresh prompts are now moving across all seven channels.</p></div></div>
            <div className="log-entry"><span className="log-time">SYSTEM</span><div><strong>FIELD CATALOG ONLINE</strong><p>Valid answers are checked against today's catalog.</p></div></div>
          </section>
          <div className="side-footer"><span>LISTENING POST A-17</span><span>EST. 1987 · MT. AURORA</span></div>
        </aside>
      </main>

      <footer className="app-footer">
        <span>SIGNAL <b>·</b> FIND THE SIGNAL IN THE NOISE.</span>
        <span>{DEMO_MODE ? 'BROWSER BUILD · LOCAL SAVE ONLY' : 'DEVVIT WEB · REDDIT COMMUNITY EDITION'}</span>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);