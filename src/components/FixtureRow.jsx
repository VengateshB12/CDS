import { useRef } from 'react';
import { isPlaceholder } from '../data/fixtures';
import { useInViewWithFallback } from './ScrollReveal';
import './FixtureRow.css';

const GROUP_BADGE_MAP = {
  OA:   { label: 'Open A',  cls: 'badge-oa' },
  OB:   { label: 'Open B',  cls: 'badge-ob' },
  RA:   { label: 'Rising A', cls: 'badge-ra' },
  RB:   { label: 'Rising B', cls: 'badge-rb' },
  W:    { label: "Women's", cls: 'badge-w' },
  'SF-R': { label: 'Semi', cls: 'badge-semi' },
  'SF-O': { label: 'Semi', cls: 'badge-semi' },
  RF:   { label: 'Final',  cls: 'badge-final' },
  OF:   { label: 'Final',  cls: 'badge-final' },
};

export default function FixtureRow({ fixture, index = 0, direction = 'left' }) {
  const { match, time, group, teamA, teamB, stage } = fixture;
  const ref = useRef(null);
  const inView = useInViewWithFallback(ref);

  const revealClass = direction === 'left' ? 'scroll-reveal--fadeLeft' : 'scroll-reveal--fadeRight';

  const style = {
    transitionDelay: `${index * 0.05}s`,
    transitionDuration: '0.4s',
    transitionProperty: 'opacity, transform',
    transitionTimingFunction: 'ease-out',
  };

  if (stage === 'ceremony') {
    return (
      <div
        ref={ref}
        className={`fixture-row fixture-row--ceremony scroll-reveal ${revealClass} ${inView ? 'scroll-reveal--visible' : ''}`}
        style={style}
      >
        <span className="fixture-match">#{match}</span>
        <span className="fixture-time">{time}</span>
        <span className="fixture-ceremony-text">{teamA}</span>
      </div>
    );
  }

  if (stage === 'women') {
    const badge = GROUP_BADGE_MAP[group];
    return (
      <div
        ref={ref}
        className={`fixture-row fixture-row--women scroll-reveal ${revealClass} ${inView ? 'scroll-reveal--visible' : ''}`}
        style={style}
      >
        <span className="fixture-match">#{match}</span>
        <span className="fixture-time">{time}</span>
        <span className="fixture-women-text">{teamA}</span>
        {badge && (
          <span className={`badge ${badge.cls} fixture-badge`}>{badge.label}</span>
        )}
      </div>
    );
  }

  const badge = GROUP_BADGE_MAP[group];
  const aIsPlaceholder = isPlaceholder(teamA);
  const bIsPlaceholder = isPlaceholder(teamB);

  return (
    <div
      ref={ref}
      className={`fixture-row scroll-reveal ${revealClass} ${inView ? 'scroll-reveal--visible' : ''}`}
      style={style}
    >
      <span className="fixture-match">#{match}</span>
      <span className="fixture-time">{time}</span>
      <span className={`fixture-team fixture-team--a${aIsPlaceholder ? ' fixture-team--placeholder' : ''}`}>
        {teamA}
      </span>
      <span className="fixture-vs">VS</span>
      <span className={`fixture-team fixture-team--b${bIsPlaceholder ? ' fixture-team--placeholder' : ''}`}>
        {teamB}
      </span>
      {badge && (
        <span className={`badge ${badge.cls} fixture-badge`}>{badge.label}</span>
      )}
    </div>
  );
}
