import './styles.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { requestExpandedMode } from '@devvit/web/client';
import { SignalIcon } from './splash-ui';

function Splash() {
  return (
    <main className="splash-shell">
      <div className="splash-sky">
        <div className="splash-stars" />
        <div className="splash-dish"><span /></div>
        <div className="splash-mountain mountain-a" />
        <div className="splash-mountain mountain-b" />
      </div>
      <div className="splash-content">
        <div className="splash-brand"><SignalIcon size={34} /><span>SIGNAL</span></div>
        <div className="splash-tagline">FIND THE SIGNAL IN THE NOISE.</div>
        <div className="splash-divider" />
        <div className="splash-kicker"><i /> DAILY TRANSMISSION AVAILABLE</div>
        <h1>Seven prompts.<br /><em>One uncommon answer.</em></h1>
        <p>Listen past the obvious. Find the answers that stand out from the noise.</p>
        <button className="splash-play" onClick={(event) => requestExpandedMode(event.nativeEvent, 'game')}>
          OPEN TODAY'S SCAN <span>↗</span>
        </button>
        <div className="splash-stats"><span><b>07</b> PROMPTS</span><span><b>25s</b> PER ROUND</span><span><b>700</b> MAX POINTS</span></div>
      </div>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode><Splash /></React.StrictMode>
);