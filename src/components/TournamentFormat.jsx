import { useRef } from 'react';
import { TOURNAMENT_FORMAT } from '../data/tournament';
import ScrollReveal, { useInViewWithFallback } from './ScrollReveal';
import './TournamentFormat.css';

const LEAGUE_CONFIG = {
  open: { accent: '#ADFF2F', key: 'open' },
  rising: { accent: '#38BDF8', key: 'rising' },
  womens: { accent: '#F472B6', key: 'womens' },
};

function FormatCard({ league, config, index }) {
  const { label, emoji, teams, format, groups, phases } = league;
  const ref = useRef(null);
  const inView = useInViewWithFallback(ref, { margin: '-60px' });

  return (
    <div
      ref={ref}
      className={`format-card format-card--${config.key} scroll-reveal scroll-reveal--fadeUp ${inView ? 'scroll-reveal--visible' : ''}`}
      style={{
        '--card-accent': config.accent,
        transitionDelay: `${index * 0.15}s`,
        transitionDuration: '0.5s',
        transitionProperty: 'opacity, transform',
        transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
    >
      <div className="format-card-header">
        <span className="format-card-emoji">{emoji}</span>
        <h3 className="format-card-title">{label}</h3>
      </div>

      <div className="format-card-stats">
        <div className="format-stat">
          <span className="format-stat-value">{teams}</span>
          <span className="format-stat-label">Teams</span>
        </div>
        <div className="format-stat">
          <span className="format-stat-value">{format}</span>
          <span className="format-stat-label">Format</span>
        </div>
        {groups && (
          <div className="format-stat">
            <span className="format-stat-value">{groups}</span>
            <span className="format-stat-label">Groups</span>
          </div>
        )}
      </div>

      <div className="format-card-phases">
        <span className="format-phases-label">Tournament Flow</span>
        <div className="format-timeline">
          {phases.map((phase, i) => (
            <div className="format-phase" key={phase.name}>
              <div className="format-phase-node">
                <span
                  className="format-phase-dot"
                  style={{
                    background: i === phases.length - 1 ? config.accent : 'var(--bg-elevated)',
                    borderColor: config.accent,
                  }}
                />
                {i < phases.length - 1 && <span className="format-phase-line" style={{ background: config.accent }} />}
              </div>
              <div className="format-phase-content">
                <span className="format-phase-name">{phase.name}</span>
                <span className="format-phase-desc">{phase.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TournamentFormat() {
  return (
    <section id="format" className="section">
      <ScrollReveal>
        <div className="section-header">
          <h2>Tournament Format</h2>
          <p>Three leagues, one champion from each</p>
          <span className="section-header-bar" />
        </div>
      </ScrollReveal>

      <div className="format-grid">
        <FormatCard
          league={TOURNAMENT_FORMAT.open}
          config={LEAGUE_CONFIG.open}
          index={0}
        />
        <FormatCard
          league={TOURNAMENT_FORMAT.rising}
          config={LEAGUE_CONFIG.rising}
          index={1}
        />
        <FormatCard
          league={TOURNAMENT_FORMAT.womens}
          config={LEAGUE_CONFIG.womens}
          index={2}
        />
      </div>
    </section>
  );
}
