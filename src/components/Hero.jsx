import { TOURNAMENT_INFO } from '../data/tournament';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-glow hero-glow--top" />
      <div className="hero-glow hero-glow--left" />
      <div className="hero-grid-overlay" />

      <div className="hero-content">
        <div className="hero-badge hero-badge--anim" style={{ animationDelay: '0.15s' }}>
          <span className="hero-badge-dot" />
          August 1, 2026
        </div>

        <h1 className="hero-title">
          <span className="hero-title-line hero-title-line--anim" style={{ animationDelay: '0.25s' }}>
            CDS TURF
          </span>
          <span className="hero-title-line hero-title-line--accent hero-title-line--anim" style={{ animationDelay: '0.4s' }}>
            CRICKET
          </span>
          <span className="hero-title-line hero-title-line--anim" style={{ animationDelay: '0.55s' }}>
            TOURNAMENT
          </span>
        </h1>

        <p className="hero-tagline hero-tagline--anim" style={{ animationDelay: '0.75s' }}>
          17 teams &middot; 30 matches &middot; 1 epic day
        </p>

        <a
          href="https://maps.app.goo.gl/4QKdnfFAwDB9hva96"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-venue hero-venue--anim"
          style={{ animationDelay: '0.9s' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          New OMR Sports Arena, Nellikuppam Road
        </a>

        <div className="hero-actions hero-actions--anim" style={{ animationDelay: '1.05s' }}>
          <a href="#fixtures" className="hero-cta">
            View Fixtures
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
          <a href="#teams" className="hero-secondary">
            See Teams
          </a>
        </div>
      </div>

      <div className="hero-scroll-hint hero-scroll-hint--anim" style={{ animationDelay: '1.5s' }}>
        <div className="hero-scroll-mouse">
          <div className="hero-scroll-wheel" />
        </div>
      </div>
    </section>
  );
}
