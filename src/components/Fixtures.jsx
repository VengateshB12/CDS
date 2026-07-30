import { useState, useMemo } from 'react';
import { FIXTURES } from '../data/fixtures';
import FixtureRow from './FixtureRow';
import ScrollReveal from './ScrollReveal';
import './Fixtures.css';

const VIEW_TABS = [
  { key: 'time', label: 'By Time' },
  { key: 'league', label: 'By League' },
];

const LEAGUE_CONFIG = [
  { key: 'OA', label: 'Open A', groups: ['OA'] },
  { key: 'OB', label: 'Open B', groups: ['OB'] },
  { key: 'RA', label: 'Rising A', groups: ['RA'] },
  { key: 'RB', label: 'Rising B', groups: ['RB'] },
  { key: 'W', label: "Women's", groups: ['W'] },
  { key: 'semis', label: 'Semi Finals', stages: ['semi'] },
  { key: 'finals', label: 'Finals', stages: ['final'] },
  { key: 'ceremonies', label: 'Ceremonies', stages: ['ceremony'] },
];

export default function Fixtures() {
  const [view, setView] = useState('time');

  const allSorted = useMemo(
    () => [...FIXTURES].sort((a, b) => a.match - b.match),
    []
  );

  const leagueGrouped = useMemo(() => {
    if (view !== 'league') return null;
    return LEAGUE_CONFIG.map((config) => {
      const fixtures = FIXTURES.filter((f) => {
        if (config.groups) return config.groups.includes(f.group);
        if (config.stages) return config.stages.includes(f.stage);
        return false;
      }).sort((a, b) => a.match - b.match);
      return { ...config, fixtures };
    }).filter((g) => g.fixtures.length > 0);
  }, [view]);

  return (
    <section id="fixtures" className="section">
      <ScrollReveal>
        <div className="section-header">
          <h2>Schedule &amp; Fixtures</h2>
          <p>August 1, 2026 — One epic day of cricket</p>
          <span className="section-header-bar" />
        </div>
      </ScrollReveal>

      <div className="fixtures-view-toggle">
        {VIEW_TABS.map((v) => (
          <button
            key={v.key}
            className={`fixtures-view-btn${view === v.key ? ' active' : ''}`}
            onClick={() => setView(v.key)}
          >
            {v.label}
          </button>
        ))}
      </div>

      <div className="fixtures-match-count">
        {FIXTURES.length} matches
      </div>

      <div key={view} className="fixtures-tab-content fixtures-tab-content--animated">
        {view === 'time' && (
          <div className="fixtures-list">
            {allSorted.map((fixture, i) => (
              <FixtureRow
                key={fixture.match}
                fixture={fixture}
                index={i}
                direction={i % 2 === 0 ? 'left' : 'right'}
              />
            ))}
          </div>
        )}

        {view === 'league' && leagueGrouped &&
          leagueGrouped.map((league) => (
            <div key={league.key} className="fixtures-subgroup">
              <div className="fixtures-subgroup-header">
                <span className="fixtures-subgroup-label">{league.label}</span>
                <span className="fixtures-subgroup-count">{league.fixtures.length} matches</span>
                <span className="fixtures-subgroup-line" />
              </div>
              <div className="fixtures-list fixtures-list--compact">
                {league.fixtures.map((fixture, i) => (
                  <FixtureRow
                    key={fixture.match}
                    fixture={fixture}
                    index={i}
                    direction={i % 2 === 0 ? 'left' : 'right'}
                  />
                ))}
              </div>
            </div>
          ))
        }
      </div>
    </section>
  );
}
