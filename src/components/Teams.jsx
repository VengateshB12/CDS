import { useState, useMemo } from 'react';
import { OPEN_LEAGUE, RISING_LEAGUE, WOMENS_LEAGUE } from '../data/teams';
import TeamCard from './TeamCard';
import ScrollReveal from './ScrollReveal';
import './Teams.css';

const FILTERS = [
  { key: 'all', label: 'All', league: null },
  { key: 'OA',  label: 'Open A', league: 'open' },
  { key: 'OB',  label: 'Open B', league: 'open' },
  { key: 'RA',  label: 'Rising A', league: 'rising' },
  { key: 'RB',  label: 'Rising B', league: 'rising' },
  { key: 'W',   label: "Women's", league: 'womens' },
];

function flattenTeams() {
  const teams = [];

  Object.entries(OPEN_LEAGUE.groups).forEach(([groupKey, group]) => {
    group.teams.forEach((team) => {
      teams.push({ ...team, group: groupKey });
    });
  });

  Object.entries(RISING_LEAGUE.groups).forEach(([groupKey, group]) => {
    group.teams.forEach((team) => {
      teams.push({ ...team, group: groupKey });
    });
  });

  WOMENS_LEAGUE.teams.forEach((team) => {
    teams.push({ ...team, group: 'W' });
  });

  return teams;
}

const ALL_TEAMS = flattenTeams();

export default function Teams() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return ALL_TEAMS;
    return ALL_TEAMS.filter((t) => t.group === activeFilter);
  }, [activeFilter]);

  return (
    <section id="teams" className="section">
      <ScrollReveal>
        <div className="section-header">
          <h2>Teams</h2>
          <p>17 teams across 5 groups battling for CDS supremacy</p>
          <span className="section-header-bar" />
        </div>
      </ScrollReveal>

      <div className="teams-toolbar">
        <div className="teams-filter" role="tablist">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              role="tab"
              aria-selected={activeFilter === f.key}
              className={`teams-filter-btn${activeFilter === f.key ? ' active' : ''}${f.key !== 'all' ? ` teams-filter-btn--${f.key}` : ''}`}
              onClick={() => setActiveFilter(f.key)}
            >
              {f.key !== 'all' && <span className={`teams-filter-dot teams-filter-dot--${f.key}`} />}
              {f.label}
            </button>
          ))}
        </div>
        <span className="teams-count">
          Showing {filtered.length} {filtered.length === 1 ? 'team' : 'teams'}
        </span>
      </div>

      <div key={activeFilter} className="teams-grid teams-grid--animated">
        {filtered.map((team, i) => (
          <TeamCard
            key={`${team.group}-${team.name}`}
            team={team}
            group={team.group}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}
