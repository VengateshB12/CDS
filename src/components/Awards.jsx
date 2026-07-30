import { useRef } from 'react';
import ScrollReveal, { useInViewWithFallback } from './ScrollReveal';
import {
  FaTrophy,
  FaMedal,
  FaStar,
  FaPalette,
  FaGlobe,
  FaAward,
  FaCrown,
  FaBolt,
  FaBullseye,
  FaChartLine,
  FaFire,
  FaBowlingBall,
  FaShieldAlt,
} from 'react-icons/fa';
import { TEAM_AWARDS, INDIVIDUAL_AWARDS } from '../data/awards';
import './Awards.css';

const ICON_MAP = {
  trophy: FaTrophy,
  medal: FaMedal,
  star: FaStar,
  palette: FaPalette,
  globe: FaGlobe,
  award: FaAward,
  crown: FaCrown,
  zap: FaBolt,
  target: FaBullseye,
  trending: FaChartLine,
  flame: FaFire,
  bowling: FaBowlingBall,
  shield: FaShieldAlt,
};

function AwardCard({ award, index, variant }) {
  const Icon = ICON_MAP[award.icon] || FaTrophy;
  const ref = useRef(null);
  const inView = useInViewWithFallback(ref, { margin: '-40px' });

  return (
    <div
      ref={ref}
      className={`award-card award-card--${variant} scroll-reveal scroll-reveal--scaleUp ${inView ? 'scroll-reveal--visible' : ''}`}
      style={{
        transitionDelay: `${index * 0.08}s`,
        transitionDuration: '0.4s',
        transitionProperty: 'opacity, transform',
        transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
    >
      {variant === 'individual' && (
        <span className="award-card-rank">#{index + 1}</span>
      )}
      <div className={`award-card-icon award-card-icon--${variant}`}>
        <Icon />
      </div>
      <div className="award-card-body">
        <h4 className="award-card-name">{award.name}</h4>
        <p className="award-card-desc">{award.description}</p>
      </div>
    </div>
  );
}

export default function Awards() {
  return (
    <section id="awards" className="section">
      <ScrollReveal>
        <div className="section-header">
          <h2>Awards & Recognition</h2>
          <p>Glory awaits the best performers</p>
          <span className="section-header-bar" />
        </div>
      </ScrollReveal>

      <div className="awards-group awards-group--team">
        <div className="awards-group-header">
          <FaTrophy className="awards-group-header-icon" />
          <h3 className="awards-group-title">Team Awards</h3>
        </div>
        <div className="awards-grid">
          {TEAM_AWARDS.map((award, i) => (
            <AwardCard key={award.name} award={award} index={i} variant="team" />
          ))}
        </div>
      </div>

      <div className="awards-group awards-group--individual">
        <div className="awards-group-header">
          <FaCrown className="awards-group-header-icon" />
          <h3 className="awards-group-title">Individual Awards</h3>
        </div>
        <div className="awards-grid">
          {INDIVIDUAL_AWARDS.map((award, i) => (
            <AwardCard key={award.name} award={award} index={i} variant="individual" />
          ))}
        </div>
      </div>
    </section>
  );
}
