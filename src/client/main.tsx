import './styles.css';
import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { getDailyPrompts, getNewYorkDateKey, formatDay, ROUND_SECONDS, MAX_SCORE, type Prompt } from '../shared/game';

type Entry = { promptId: string; answer: string; score: number; tier: string; note: string };
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
    const saved = JSON.parse(raw) as RunState;
    if (saved.dateKey !== dateKey || !Array.isArray(saved.entries)) return blankRun(dateKey);
    if (!['ready', 'playing', 'reveal', 'complete'].includes(saved.phase)) return blankRun(dateKey);
    return saved;
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

function scoreLabel(score: number): string {
  if (score >= 700) return 'PERFECT LOCK';
  if (score >= 600) return 'RARE SIGNAL';
  if (score >= 450) return 'STRONG SIGNAL';
  if (score >= 300) return 'CLEAR SIGNAL';
  if (score >= 150) return 'FAINT SIGNAL';
  return 'MOSTLY NOISE';
}

function App() {
  const dayKey = getNewYorkDateKey();
  const prompts = useMemo(() => getDailyPrompts(dayKey), [dayKey]);
  const [game, setGame] = useState<RunState>(() => loadRun(dayKey));
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [now, setNow] = useState(Date.now());
  const [playerName, setPlayerName] = useState(DEMO_MODE ? 'LOCAL EXPLORER' : 'REDDIT EXPLORER');
  const [playerCount, setPlayerCount] = useState(0);
  const [leaderboard, setLeaderboard] = useState<LeaderboardRow[]>([]);
  const [serverReady, setServerReady] = useState(false);
  const [copied, setCopied] = useState(false);
  const [canTest, setCanTest] = useState(DEMO_MODE);
  const [testPanelOpen, setTestPanelOpen] = useState(DEMO_MODE);
  const [isTuning, setIsTuning] = useState(false);
  const [tuningAnswer, setTuningAnswer] = useState('');
  const [tuningScore, setTuningScore] = useState<number | null>(null);
  const [tuningDuration, setTuningDuration] = useState(900);
  const [tuningStatus, setTuningStatus] = useState('CAPTURING INPUT // SCANNING NOISE');
  const [tuningPhase, setTuningPhase] = useState<'searching' | 'tracking' | 'locking' | 'locked' | 'failed'>('searching');

  const currentPrompt: Prompt = prompts[Math.min(game.index, prompts.length - 1)];
  const total = game.entries.reduce((sum, entry) => sum + entry.score, 0);
  const currentEntry = game.entries[game.entries.length - 1];
  const secondsLeft = game.deadline ? Math.max(0, Math.ceil((game.deadline - now) / 1000)) : ROUND_SECONDS;
  const completedPrompts = game.entries.length;
  const shownBoard = DEMO_MODE || !serverReady ? MOCK_BOARD : leaderboard;
  const tuningGrade = tuningScore === null ? 'searching' : tuningScore >= 100 ? 'perfect' : tuningScore >= 85 ? 'deep' : tuningScore >= 60 ? 'clear' : tuningScore >= 30 ? 'faint' : 'background';
  const tuningHeading = tuningStatus.startsWith('NO MATCH') ? 'NO CARRIER'
    : tuningStatus.startsWith('RECEIVER OFFLINE') ? 'RECEIVER OFFLINE'
    : tuningPhase === 'searching' || tuningScore === null ? 'READING THE STATIC'
    : tuningPhase === 'tracking' ? 'CARRIER DETECTED'
    : tuningPhase === 'locking' ? 'LOCKING SIGNAL'
    : tuningScore >= 100 ? 'SIGNAL LOCKED'
    : tuningScore >= 60 ? 'PARTIAL LOCK'
    : 'WEAK ACQUISITION';
  const tuningInputLabel = tuningPhase === 'searching' ? 'INPUT BUFFERED'
    : tuningPhase === 'tracking' ? 'CARRIER TRACKING'
    : tuningPhase === 'locking' ? 'ACQUIRING LOCK'
    : tuningPhase === 'locked' && tuningScore === 100 ? 'LOCK CONFIRMED'
    : tuningPhase === 'locked' ? 'PARTIAL LOCK'
    : 'SCAN FAILED';
  const tuningScreenState = tuningPhase === 'searching' ? 'SEARCHING'
    : tuningPhase === 'tracking' ? 'TRACKING'
    : tuningPhase === 'locking' ? 'ACQUIRING'
    : tuningPhase === 'locked' && tuningScore === 100 ? 'LOCKED'
    : tuningPhase === 'locked' ? 'PARTIAL LOCK'
    : 'NO CARRIER';
  const tuningNoiseFinal = tuningScore === null ? 1 : Math.max(.025, 1 - tuningScore / 100 * .975);
  const tuningWaveFinal = tuningScore === null ? .02 : Math.max(.08, tuningScore / 100);
  const tuningChaosFinal = tuningScore === null ? .95 : Math.max(.03, .95 - tuningScore / 100 * .92);
  const tuningCaptureStyle = {
    '--noise-final': String(tuningNoiseFinal),
    '--wave-final': String(tuningWaveFinal),
    '--wave-mid': String(Math.max(.01, tuningWaveFinal * .42)),
    '--chaos-final': String(tuningChaosFinal),
    '--tune-duration': tuningDuration + 'ms',
    '--score-width': (tuningScore ?? 0) + '%',
    '--reticle-scale': String(.78 + (1 - (tuningScore ?? 0) / 100) * .65),
    '--reticle-opacity': String(.4 + (tuningScore ?? 0) / 100 * .6)
  } as React.CSSProperties;

  useEffect(() => {
    try { localStorage.setItem('signal:run:' + dayKey, JSON.stringify(game)); } catch { /* local storage is optional */ }
  }, [game, dayKey]);

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
    }, 200);
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
        if (data.result?.entries) setGame((previous) => ({ ...previous, entries: data.result.entries }));
      })
      .catch(() => setMessage('Result is visible locally. The community board is temporarily unavailable.'));
    return () => { active = false; };
  }, [game.phase, game.isTest, serverReady]);

  const startGame = (isTest = false) => {
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
    setTuningAnswer(clean);
    setTuningScore(null);
    setTuningDuration(900);
    setTuningPhase('searching');
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
      setTuningPhase('failed');
      setTuningStatus(status);
      await wait(900);
    };
    const animateCapture = async (score: number) => {
      const duration = 900 + Math.round(Math.max(0, Math.min(100, score)) * 36);
      setTuningScore(score);
      setTuningDuration(duration);

      setTuningPhase('tracking');
      setTuningStatus('CARRIER DETECTED // TRACKING FREQUENCY');
      await wait(duration * .54);

      setTuningPhase('locking');
      setTuningStatus(score >= 100
        ? 'FREQUENCY CENTERED // LOCKING CARRIER'
        : score >= 60
          ? 'ALIGNING CARRIER // REDUCING INTERFERENCE'
          : 'WEAK CARRIER // ATTEMPTING ACQUISITION');
      await wait(duration * .26);

      setTuningPhase('locked');
      setTuningStatus(score >= 100
        ? 'LOCK CONFIRMED // SIGNAL FOUND'
        : score >= 60
          ? 'PARTIAL LOCK // RESIDUAL NOISE'
          : 'WEAK LOCK // INTERFERENCE REMAINS');
      await wait(duration * .20);
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

      const entry: Entry = { promptId: prompt.id, answer: clean, score: result.score, tier: result.tier, note: result.note };
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
    const marks = game.entries.map((entry, index) => String(index + 1).padStart(2, '0') + (entry.score >= 85 ? ' ◆' : entry.score >= 30 ? ' ◇' : ' ·'));
    const text = 'SIGNAL // ' + total + '/700\n' + scoreLabel(total) + '\n' + marks.join('  ') + '\nFind the signal in the noise.';
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch { setMessage('Clipboard access is unavailable in this browser.'); }
  };

  const resetPreview = () => {
    if (!DEMO_MODE) return;
    localStorage.removeItem('signal:run:' + dayKey);
    setGame(blankRun(dayKey));
    setAnswer('');
    setMessage('');
    setNow(Date.now());
  };

  const dateLabel = formatDay(dayKey);

  return (
    <div className="app-shell">
      <MountainScene />
      <div className="screen-vignette" />
      <header className="topbar">
        <div className="brand">
          <div className="brand-symbol"><SignalIcon size={45} /></div>
          <div className="brand-copy">
            <div className="brand-name">SIGNAL</div>
            <div className="brand-tagline">FIND THE SIGNAL IN THE NOISE.</div>
          </div>
        </div>
        <div className="top-stats">
          <div className="top-stat date-stat"><span className="eyebrow">TODAY'S TRANSMISSION</span><strong>{dateLabel}</strong></div>
          <div className="top-stat"><span className="stat-icon flame">✦</span><strong>01</strong><span className="eyebrow">DAILY SCAN</span></div>
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
              <div><span className="eyebrow">INCOMING TRANSMISSION</span><div className="panel-title">Today's signal scan</div></div>
              <div className="round-count"><strong>{String(game.phase === 'complete' ? 7 : game.index + 1).padStart(2, '0')}</strong><span>/ 07</span></div>
            </div>
            <div className="progress-grid" aria-label={completedPrompts + ' of 7 prompts completed'}>
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
              <div className="play-view">
                {isTuning && (
                  <div className="signal-capture-overlay" role="status" aria-live="polite">
                    <div
                      className="signal-capture"
                      key={tuningScore === null ? 'searching' : 'score-' + tuningScore}
                      data-grade={tuningGrade}
                      data-phase={tuningPhase}
                      style={tuningCaptureStyle}
                    >
                      <div className="signal-capture-head">
                        <span className="signal-station"><i /> MT. AURORA / RECEIVER 07</span>
                        <span className="signal-input-state">{tuningInputLabel}</span>
                      </div>
                      <div className="signal-capture-copy">
                        <div className="signal-capture-kicker">TRANSMISSION ANALYSIS</div>
                        <h2>{tuningHeading}</h2>
                        <p>Separating the carrier from the noise floor.</p>
                      </div>
                      <div className="signal-screen" aria-label="Live receiver waveform resolving from static">
                        <div className="signal-screen-grid" />
                        <div className="signal-static" />
                        <svg className="signal-traces" viewBox="0 0 720 180" preserveAspectRatio="none" aria-hidden="true">
                          <path className="signal-centerline" d="M0 90H720" />
                          <path className="signal-chaos-trace" d="M0 90 12 78 19 115 27 42 34 128 43 63 52 100 61 35 68 117 78 77 87 96 96 25 105 145 114 57 123 106 132 68 141 125 151 45 160 99 169 73 180 90 190 52 199 132 208 69 218 101 227 29 238 148 247 73 258 117 268 48 277 103 288 71 298 94 307 35 317 142 327 64 336 119 346 55 356 102 366 78 376 90 388 41 398 133 408 67 418 111 428 31 438 148 448 70 458 112 468 48 478 100 488 76 498 91 508 37 518 145 528 61 538 116 548 57 558 101 568 72 578 90 589 44 599 134 609 68 619 109 629 34 639 147 649 72 659 115 669 49 679 98 689 76 700 91 720 90" />
                          <path className="signal-clean-trace" d="M0 90 C30 90 30 35 60 35 S90 145 120 145 S150 90 180 90 C210 90 210 35 240 35 S270 145 300 145 S330 90 360 90 C390 90 390 35 420 35 S450 145 480 145 S510 90 540 90 C570 90 570 35 600 35 S630 145 660 145 S690 90 720 90" />
                        </svg>
                        <div className="signal-scanbeam" />
                        <div className="signal-lock-flare" />
                        <div className="signal-lock-reticle" aria-hidden="true">
                          <i className="reticle-corner top-left" />
                          <i className="reticle-corner top-right" />
                          <i className="reticle-corner bottom-left" />
                          <i className="reticle-corner bottom-right" />
                          <b className="reticle-center" />
                          <span className="reticle-axis horizontal" />
                          <span className="reticle-axis vertical" />
                        </div>
                        <span className="signal-screen-label">RF / 104.7 MHZ</span>
                        <span className="signal-screen-state">{tuningScreenState}</span>
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
                          <span>RESONANCE</span>
                          <strong>{tuningScore === null ? '···' : tuningScore}<small>/100</small></strong>
                        </div>
                      </div>
                      <div className="signal-quality-row">
                        <span>RECOVERED SIGNAL</span>
                        <div className="signal-quality-track"><i /></div>
                        <strong>{tuningScore === null ? '—' : tuningScore + '%'}</strong>
                      </div>
                      <div className="signal-capture-status"><i /><span>{tuningStatus}</span></div>
                    </div>
                  </div>
                )}
                <div className="question-meta">
                  <span className="channel-label">{currentPrompt.channel}</span>
                  <div className={'timer-pill ' + (secondsLeft <= 7 ? 'urgent' : '')}><span className="timer-ring"><span /></span><strong>{String(secondsLeft).padStart(2, '0')}</strong><span>SEC</span></div>
                </div>
                <div className="timer-track"><i style={{ width: (secondsLeft / ROUND_SECONDS * 100) + '%' }} /></div>
                <div className="question-index">TRANSMISSION {String(game.index + 1).padStart(2, '0')}</div>
                <h1 className="question-text">{currentPrompt.prompt}</h1>
                <p className="question-context">{currentPrompt.context}</p>
                <form className="answer-form" onSubmit={(event) => { event.preventDefault(); void validateAnswer(currentPrompt, answer); }}>
                  <label htmlFor="signal-answer">YOUR RESPONSE</label>
                  <div className="answer-control">
                    <input id="signal-answer" value={answer} onChange={(event) => setAnswer(event.target.value)} maxLength={80} autoComplete="off" spellCheck={false} placeholder="Type one answer..." autoFocus disabled={isTuning} />
                    <button type="submit" className="primary-button submit-button" disabled={isTuning}>TRANSMIT <span className="button-arrow">↗</span></button>
                  </div>
                </form>
                <div className="play-footer"><span><span className="tiny-pulse" /> RECEIVER OPEN</span><button className="text-button" onClick={skipPrompt} disabled={isTuning}>SKIP THIS FREQUENCY</button></div>
                {message && <div className="inline-message" role="status">{message}</div>}
              </div>
            )}

            {game.phase === 'reveal' && currentEntry && (
              <div className={'reveal-view phase-in ' + (currentEntry.score >= 85 ? 'rare-reveal' : '')}>
                <div className="reveal-particles" aria-hidden="true">{Array.from({ length: 18 }, (_, index) => <i key={index} />)}</div>
                <div className={'reveal-orb ' + (currentEntry.score >= 60 ? 'strong' : '')}><SignalIcon size={44} /></div>
                <div className="reveal-label">{currentEntry.score > 0 ? 'SIGNAL DETECTED' : 'NO SIGNAL DETECTED'}</div>
                <div className="reveal-answer">{currentEntry.answer || 'No answer transmitted'}</div>
                <div className="score-award"><strong>+{currentEntry.score}</strong><span>POINTS</span></div>
                <div className="tier-pill">{currentEntry.tier}</div>
                <p className="reveal-note">{currentEntry.note}</p>
                <div className="reveal-total"><span>SCAN TOTAL</span><strong>{total} <small>/ 700</small></strong></div>
                <button className="primary-button next-button" onClick={nextPrompt}>{game.index === 6 ? 'VIEW SCAN REPORT' : 'NEXT TRANSMISSION'} <span className="button-arrow">↗</span></button>
                {message && <div className="inline-message" role="status">{message}</div>}
              </div>
            )}

            {game.phase === 'complete' && (
              <div className="complete-view">
                <div className="complete-overline">DAILY SCAN COMPLETE</div>
                <h1>{scoreLabel(total)}</h1>
                <div className="final-score"><strong>{total}</strong><span>/ 700</span></div>
                <p className="complete-subtitle">{total >= 600 ? 'You found some remarkable signals in the noise.' : total >= 300 ? 'A good scan. You heard more than the obvious.' : 'The airwaves were crowded today. Tune in again tomorrow.'}</p>
                <div className="result-list">
                  {prompts.map((prompt, index) => {
                    const entry = game.entries[index] ?? { score: 0, tier: 'NO SIGNAL', answer: '' };
                    return <div className="result-row" key={prompt.id}>
                      <span className="result-number">{String(index + 1).padStart(2, '0')}</span>
                      <span className="result-prompt">{prompt.prompt}</span>
                      <span className="result-answer">{entry.answer || '—'}</span>
                      <strong className={entry.score >= 60 ? 'rare-score' : ''}>{entry.score}</strong>
                    </div>;
                  })}
                </div>
                <div className="complete-actions">
                  <button className="primary-button" onClick={() => void copyResult()}>{copied ? 'COPIED' : 'COPY RESULT'} <span className="button-arrow">↗</span></button>
                  {DEMO_MODE && <button className="secondary-button" onClick={resetPreview}>RESET LOCAL PREVIEW</button>}
                </div>
                <p className="fine-print">{game.isTest ? 'TEST RUN · RESULTS ARE NOT SAVED TO THE COMMUNITY BOARD' : 'A new set of transmissions arrives at midnight Eastern.'}</p>
                {message && <div className="inline-message" role="status">{message}</div>}
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